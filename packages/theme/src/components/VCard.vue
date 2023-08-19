<template>
  <div class="v-card">
    <slot></slot>
  </div>
</template>

<style scoped>
.v-card {
  @apply border shadow-sm transition-(~ shadow) bg-light-2;
  @apply md: (border-none shadow-md backdrop-blue-md);
}
</style>