<template>
  <v-header />

  <div w="full md:max-1200px" m="x-auto">
    <router-view />
    <br />
  </div>
  <v-footer />
  <v-go-top />
</template>

<style lang="less" scoped>
.header {
  &.active {
    @apply shadow-md;
  }
}
</style>
