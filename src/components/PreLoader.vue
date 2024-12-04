<template>
  <div class="preloader">
    <div class="burger">
      <div class="bun top"></div>
      <div class="patty"></div>
      <div class="cheese"></div>
      <div class="lettuce"></div>
      <div class="bun bottom"></div>
    </div>
  </div>
</template>

<script setup></script>

<style scoped>
.preloader {
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100vh;
  background-color: #f5f5f5;
}

.burger {
  display: flex;
  flex-direction: column;
  align-items: center;
  animation: stack 2s infinite;
}

.bun,
.patty,
.cheese,
.lettuce {
  width: 100px;
  height: 20px;
  margin: 5px 0;
  border-radius: 5px;
}

.bun {
  background-color: #f39c12;
}

.bun.top {
  border-radius: 50px 50px 10px 10px;
}

.bun.bottom {
  border-radius: 10px 10px 50px 50px;
}

.patty {
  background-color: #6f4e37;
}

.cheese {
  background-color: #f1c40f;
}

.lettuce {
  background-color: #27ae60;
}

@keyframes stack {
  0%,
  100% {
    transform: translateY(0);
  }
  50% {
    transform: translateY(-10px);
  }
}
</style>
