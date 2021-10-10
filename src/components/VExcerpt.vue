<script lang="ts" setup>
defineProps<{
  title: string
}>()
</script>

<template>
  <v-card text="break-words">
    <router-link to="/">
      <h2 text="xl blue-500">
        {{ title }}
      </h2>
      <hr m="y-4" />
      <div class="prose m-auto text-left">
        <slot />
      </div>
    </router-link>
  </v-card>
</template>
