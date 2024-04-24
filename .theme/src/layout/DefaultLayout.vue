<script lang="ts" setup>
import VFooter from '@@/components/VFooter.vue'
import Sidebar from './components/Sidebar.vue'
</script>

<template>
  <div class="relative w-full xl:(w-700px mx-auto)">
    <Sidebar class="sidebar flex xl:(fixed top-0)"></Sidebar>
    <div class="flex flex-col min-h-screen px-2 xl:px-0">
      <div class="flex-1">
        <slot></slot>
      </div>

      <div class="mt-6">
        <VFooter />
      </div>
    </div>
  </div>
</template>

<style lang="less" scoped>
@media (min-width: 1280px) {
  .sidebar {
    @apply transition;
    transform: translate(calc(-100% - 2rem), -40px);
    opacity: 0.1;
    filter: blur(2px) grayscale(1);

    &:hover {
      transform: translate(calc(-100% - 2rem), 0);
      opacity: 1;
      filter: none;
    }
  }
}

</style>
