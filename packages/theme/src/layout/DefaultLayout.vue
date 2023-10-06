<script lang="ts" setup>
import VFooter from '@@/components/VFooter.vue'
import Sidebar from './components/Sidebar.vue'
</script>

<template>
  <div>
    <Sidebar class="flex lg:(fixed left-0 top-0)"></Sidebar>
    <div class="ml-0 lg:ml-80">
      <div class="flex px-4 flex-col min-h-screen lg:px-10">
        <div class="flex-1">
          <slot></slot>
        </div>

        <div class="mt-6">
          <VFooter />
        </div>
      </div>
    </div>
  </div>
</template>

<style lang="less" scoped></style>
