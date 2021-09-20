<script lang="ts" setup>
import { computed } from 'vue'
import { useRoute } from 'vue-router'
import { blog } from '~/blog'

const route = useRoute()

const label = computed(() => route.params.label as string)

const posts = computed(() => blog.articles.filter((p) => p.tags.includes(label.value)))
</script>

<template>
  <div class="v-tag-detail" m="t-4">
    <header text="center">
      <v-tag>{{ label }} | {{ posts.length }}</v-tag>
    </header>
    <hr m="t-4" />

    <v-excerpt v-for="o in posts" :info="o"></v-excerpt>
  </div>
</template>

<style></style>
