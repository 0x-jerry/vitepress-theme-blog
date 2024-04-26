<script lang="ts" setup>
import VFooter from '@@/components/VFooter.vue'
import Sidebar from './components/Sidebar.vue'
</script>

<template>
  <div class="w-full flex flex-col xl:flex-row">
    <div class="left flex-1" id="layout-content-left">
      <Sidebar class="sidebar flex xl:(fixed top-0)"></Sidebar>
    </div>
    <div class="flex flex-col min-h-screen px-2 xl:px-0 w-full xl:w-700px">
      <div class="flex-1">
        <slot></slot>
      </div>

      <div class="mt-6">
        <VFooter />
      </div>
    </div>
    <div class="right flex-1" id="layout-content-right">
      <!-- used by Teleport -->
    </div>
  </div>
</template>

<style lang="less" scoped>
@media (min-width: 1280px) {
  .sidebar {
    @apply transition;
    transform: translateY(-40px);
    opacity: 0.05;
    filter: blur(2px) grayscale(1);

    &:hover {
      transform: translateY(0);
      opacity: 1;
      filter: none;
    }
  }
}
</style>
