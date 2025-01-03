<script setup>
// import { useAuthUserStore } from '@/stores/authUser'
import AlertNotification from '@/components/common/AlertNotification.vue'
import { requiredValidator, imageValidator } from '@/utils/validators'
import { formActionDefault } from '@/utils/supabase.js'
import { useDisplay } from 'vuetify'
import { ref, watch, onMounted } from 'vue'
import { useProductsStore } from '@/stores/product'
import { fileExtract } from '@/utils/helpers'

const props = defineProps(['isDialogVisible', 'productData', 'tableFilters'])

const emit = defineEmits(['update:isDialogVisible'])

// Utilize pre-defined Vue functions
const { mdAndDown } = useDisplay()

// Use Pinia Store
const productStore = useProductsStore()
// const authStore = useAuthUserStore()

// Load Variables
const formDataDefault = {
  name: '',
  price: 0,
  description: '',
  image: null,
  category_id: null,
  // user_id: authStore.userData.id,
}
const formData = ref({ ...formDataDefault })
const formAction = ref({ ...formActionDefault })
const refVForm = ref()
const isUpdate = ref(false)
const imgPreview = ref('/images/img-product.png')

// Static Food Categories
const foodCategories = [
  { id: 1, name: 'Rice' },
  { id: 2, name: 'Dishes' },
  { id: 3, name: 'Street Foods' },
  { id: 4, name: 'Drinks' },
  { id: 5, name: 'Desserts' },
]

// Monitor itemData if it has data
watch(
  () => props.productData,
  newValue => {
    isUpdate.value = !!newValue
    formData.value = newValue ? { ...newValue } : { ...formDataDefault }
    imgPreview.value = newValue?.image_url || '/images/img-product.png'
  },
  { immediate: true },
)

// Insert selected category into the database
const insertCategory = async categoryId => {
  const category = foodCategories.find(c => c.id === categoryId)
  if (!category) return

  const { data, error } = await productStore.addCategory(category)
  if (error) {
    console.error('Error adding category:', error.message)
  }
}

// Function to handle file change and show image preview
const onPreview = async event => {
  const { fileObject, fileUrl } = await fileExtract(event)
  formData.value.image = fileObject
  imgPreview.value = fileUrl
}

// Function to reset preview if file-input clear is clicked
const onPreviewReset = () => {
  imgPreview.value = formData.value.image_url || '/images/img-product.png'
}

// Function to handle form submission
const onSubmit = async () => {
  formAction.value = { ...formActionDefault, formProcess: true }

  // Insert selected category into the categories table
  await insertCategory(formData.value.category_id)

  const { data, error } = isUpdate.value
    ? await productStore.updateProduct(formData.value)
    : await productStore.addProduct(formData.value)

  if (error) {
    formAction.value.formErrorMessage = error.message
    formAction.value.formStatus = error.status
    formAction.value.formProcess = false
    return
  }

  formAction.value.formSuccessMessage = isUpdate.value
    ? 'Successfully Updated Item Information.'
    : 'Successfully Added Item.'

  await productStore.getProducts(props.tableFilters)

  setTimeout(() => {
    onFormReset()
  }, 2500)
}

// Trigger Validators
const onFormSubmit = () => {
  refVForm.value?.validate().then(({ valid }) => {
    if (valid) onSubmit()
  })
}

// Reset Form and Close Dialog
const onFormReset = () => {
  formData.value = { ...formDataDefault }
  imgPreview.value = '/images/img-product.png'
  formAction.value = { ...formActionDefault }
  emit('update:isDialogVisible', false)
}
</script>

<template>
  <v-dialog
    :max-width="mdAndDown ? undefined : '800'"
    :model-value="props.isDialogVisible"
    :fullscreen="mdAndDown"
    persistent
  >
    <v-card prepend-icon="mdi-information-box" title="Item Information">
      <AlertNotification
        :form-success-message="formAction.formSuccessMessage"
        :form-error-message="formAction.formErrorMessage"
      ></AlertNotification>

      <v-form ref="refVForm" @submit.prevent="onFormSubmit">
        <v-card-text>
          <v-row dense>
            <v-col cols="12">
              <v-text-field
                v-model="formData.name"
                label="Name"
                :rules="[requiredValidator]"
              ></v-text-field>
            </v-col>
            <v-col cols="12">
              <v-text-field
                v-model="formData.price"
                prefix="Php"
                label="Price"
                min="0"
                type="number"
                :rules="[requiredValidator]"
              ></v-text-field>
            </v-col>
            <v-col cols="12">
              <v-select
                v-model="formData.category_id"
                :items="foodCategories"
                item-value="id"
                item-title="name"
                label="Category"
                :rules="[requiredValidator]"
              ></v-select>
            </v-col>
            <v-col cols="12">
              <v-textarea
                v-model="formData.description"
                label="Description"
                rows="2"
                :rules="[requiredValidator]"
              ></v-textarea>
            </v-col>
            <v-col cols="12" sm="6" md="4">
              <v-img
                width="55%"
                class="mx-auto rounded-circle"
                color="red-darken-4"
                aspect-ratio="1"
                :src="imgPreview"
                alt="Item Picture Preview"
                cover
              ></v-img>
            </v-col>
            <v-col cols="12" sm="6" md="8">
              <v-file-input
                class="mt-5"
                :rules="[imageValidator]"
                accept="image/png, image/jpeg"
                label="Browse Item Picture"
                placeholder="Browse Item Picture"
                prepend-icon="mdi-camera"
                show-size
                chips
                @change="onPreview"
                @click:clear="onPreviewReset"
              ></v-file-input>
            </v-col>
          </v-row>
        </v-card-text>
        <v-divider></v-divider>
        <v-card-actions class="pa-4">
          <v-spacer></v-spacer>
          <v-btn
            text="Close"
            variant="plain"
            prepend-icon="mdi-close"
            @click="onFormReset"
          ></v-btn>
          <v-btn
            prepend-icon="mdi-pencil"
            color="orange-darken-2"
            type="submit"
            variant="elevated"
            :disabled="formAction.formProcess"
            :loading="formAction.formProcess"
          >
            {{ isUpdate ? 'Update Item' : 'Add Item' }}
          </v-btn>
        </v-card-actions>
      </v-form>
    </v-card>
  </v-dialog>
</template>
