<script lang="ts" setup>
import Sidebar from './components/Sidebar.vue'
</script>

<template>
  <div>
    <Sidebar class="flex lg:(fixed left-0 top-0)"></Sidebar>
    <div class="ml-0 lg:ml-80">
      <slot></slot>
    </div>
  </div>
</template>

<style lang="less" scoped></style>
