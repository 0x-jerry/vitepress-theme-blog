<script lang="ts" setup>
import VImageCard from '@@/components/VImageCard.vue'
import VTitle from '@@/components/VTitle.vue'
</script>

<template>
  <div>
    <VTitle show-back title="404"></VTitle>
    <div class="my-12 mx-auto w-fit">
      You are in an unkonwn area, even for the owner. Good luck!
    </div>
    <div class="mt-3">
      <VImageCard></VImageCard>
    </div>
  </div>
</template>

<style lang="less" scoped></style>
