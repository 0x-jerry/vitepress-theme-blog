<script lang="ts" setup>
import dayjs from 'dayjs'
import VLink from './VLink.vue'

const year = dayjs.tz().year()
</script>

<template>
  <div class="w-full text-center mt-4 my-6">
    © 2017-{{ year }} @ 0x-Jerry. Built top on
    <v-link href="https://vitejs.dev/"> vite </v-link>
    and
    <v-link href="https://v3.vuejs.org/"> vue </v-link>.
  </div>
</template>
