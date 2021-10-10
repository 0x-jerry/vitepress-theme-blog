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
    </router-link>
    <hr m="y-4" />
    <div class="prose m-auto text-left">
      <slot />
    </div>
  </v-card>
</template>
