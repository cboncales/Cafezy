<template>
  <div class="preloader">
    <div class="burger">
      <div class="bun top"></div>
      <div class="patty"></div>
      <div class="bun bottom"></div>
    </div>
  </div>
</template>

<script setup></script>

<style scoped>
/* Add your preloader styles (same as before) */
.preloader {
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100vh;
  background-color: #f8f8f8;
}

.burger {
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 5px;
  animation: stackBurger 2s ease-in-out forwards;
}

.bun,
.patty {
  width: 100px;
  height: 20px;
  background-color: #d35400;
  border-radius: 5px;
}

.bun.top {
  background-color: #e67e22;
}

.bun.bottom {
  background-color: #e67e22;
}

.patty {
  background-color: #c0392b;
}

@keyframes stackBurger {
  0% {
    transform: translateY(100%);
    opacity: 0;
  }
  100% {
    transform: translateY(0);
    opacity: 1;
  }
}
</style>
