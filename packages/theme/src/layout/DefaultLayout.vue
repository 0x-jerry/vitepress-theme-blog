<script lang="ts" setup>
import VHeader from '../components/VHeader.vue'
import VFooter from '../components/VFooter.vue'
import VGoTop from '../components/VGoTop.vue'
</script>

<template>
  <div>
    <VHeader></VHeader>
    <div class="w-(full md:max-1200px) mx-auto">
      <slot></slot>
      <br />
    </div>
    <VFooter></VFooter>
    <VGoTop></VGoTop>
  </div>
</template>

<style lang="less" scoped></style>
