<script lang="ts" setup>
import dayjs from 'dayjs'
import VLink from './VLink.vue'

const year = dayjs().year()
</script>

<template>
  <div w="full" text="center" m="t-4 y-6">
    © 2017-{{ year }} @ 0x-Jerry. Built top on
    <v-link href="https://vitejs.dev/"> vite </v-link>
    and
    <v-link href="https://v3.vuejs.org/"> vue </v-link>.
  </div>
</template>
