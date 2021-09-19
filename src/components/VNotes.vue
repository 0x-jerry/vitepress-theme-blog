<script lang="ts" setup>
const NotesComponent = import.meta.globEager('./notes/**.md')

const all: Record<string, any> = {}

Object.entries(NotesComponent).forEach(([key, value]) => {
  all[key] = value.default
})
</script>

<template>
  <div class="v-notes">
    <div class="mt-2" v-for="o in all">
      <component :is="o"></component>
    </div>
  </div>
</template>
