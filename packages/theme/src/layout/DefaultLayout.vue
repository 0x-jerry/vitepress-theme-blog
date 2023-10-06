<script lang="ts" setup>
import Sidebar from './components/Sidebar.vue'
</script>

<template>
  <div>
    <Sidebar class="flex lg:(fixed left-0 top-0)"></Sidebar>
    <div class="ml-0 lg:ml-80">
      <div class="flex px-4 flex-col min-h-screen lg:px-10">
        <slot></slot>
      </div>
    </div>
  </div>
</template>

<style lang="less" scoped></style>
