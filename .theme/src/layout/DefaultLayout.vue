<script lang="ts" setup>
import VFooter from '@@/components/VFooter.vue'
import LayoutHeader from './components/LayoutHeader.vue'
</script>

<template>
  <div class="w-full flex flex-col xl:flex-row">
    <div class="left flex-1 text-right" id="layout-content-left">
      <LayoutHeader class="sidebar"></LayoutHeader>
    </div>
    <div class="flex flex-col min-h-screen px-2 xl:px-0 w-full xl:w-700px">
      <div class="flex-1">
        <slot></slot>
      </div>

      <div class="mt-6">
        <VFooter />
      </div>
    </div>
    <div class="right flex-1 hidden xl:block" id="layout-content-right">
      <!-- used by Teleport -->
    </div>
  </div>
</template>

<style lang="less" scoped>
.sidebar {
  display: flex;
}

@media (min-width: 1280px) {
  .sidebar {
    display: inline-block;
    position: fixed;
    top: 0;
    margin-right: 2rem;

    @apply transition;
    transform: translate(calc(-100% - 2rem), -40px);
    opacity: 0.05;
    filter: blur(2px) grayscale(1);

    &:hover {
      transform: translate(calc(-100% - 2rem), 0);
      opacity: 1;
      filter: none;
    }
  }
}
</style>
