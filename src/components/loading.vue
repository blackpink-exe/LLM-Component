<template>
  <div>
    <div class="loader"></div>
  </div>
</template>
<script setup></script>
<style scoped lang="scss">
.loader {
  -webkit-animation: spin 1s linear infinite;
  animation: spin 1s linear infinite;
  border: 3px solid #ddd;
  border-top: 3px solid #42a5f5;
  border-radius: 50%;
  height: 30px;
  width: 30px;
}

@-webkit-keyframes spin {
  to {
    border-top-color: #ec407a;
    -webkit-transform: rotate(360deg);
    transform: rotate(360deg);
  }
}

@keyframes spin {
  to {
    border-top-color: #ec407a;
    -webkit-transform: rotate(360deg);
    transform: rotate(360deg);
  }
}
</style>
