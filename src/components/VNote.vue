<script lang="ts" setup>
interface NoteProps {
  name?: string
  tags?: string[]
}

defineProps<NoteProps>()
</script>

<template>
  <div class="v-note prose prose-sm w-prose m-auto">
    <h2>{{ name ?? '' }}</h2>
    <div class="tags">
      <v-tag v-for="o in tags ?? []">
        {{ o }}
      </v-tag>
    </div>
    <slot></slot>
  </div>
</template>
