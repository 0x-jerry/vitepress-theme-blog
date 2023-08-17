<script lang="ts" setup>
import { modules } from '@blog/notes'
</script>

<template>
  <div class="v-notes">
    <div class="mt-2" v-for="o in modules">
      <component :is="o.module"></component>
    </div>
  </div>
</template>
