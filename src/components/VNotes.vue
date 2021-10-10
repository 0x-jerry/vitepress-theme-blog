<script lang="ts" setup>
import { components as NotesComponent } from '~blog/notes'
</script>

<template>
  <div class="v-notes">
    <div class="mt-2" v-for="o in NotesComponent">
      <component :is="o"></component>
    </div>
  </div>
</template>
