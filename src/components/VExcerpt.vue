<script lang="ts" setup>
defineProps<{
  title: string
  href: string
}>()
</script>

<template>
  <v-card text="break-words">
    <router-link :to="href">
      <h2 text="xl blue-500">
        {{ title }}
      </h2>
      <hr m="y-4" />
      <div class="excerpt-content prose m-auto text-left">
        <slot />
      </div>
    </router-link>
  </v-card>
</template>

<style lang="less">
.excerpt-content {
  a {
    pointer-events: none;
  }
}
</style>
