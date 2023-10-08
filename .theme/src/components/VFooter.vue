<script lang="ts" setup>
import dayjs from 'dayjs'
import VLink from './VLink.vue'
import { useTheme } from '@@/hooks/useTheme'

const year = dayjs.tz().year()

const name = useTheme().value.name
</script>

<template>
  <div class="w-full text-center mt-4 my-6">
    © 2017-{{ year }} @ {{ name }}. Built top on
    <v-link href="https://vitepress.dev/"> Vitepress </v-link>
    .
  </div>
</template>
