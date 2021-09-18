<script lang="ts" setup>
interface NoteHeaderProps {
  title?: string
  tags?: string[]
}

defineProps<NoteHeaderProps>()
</script>

<template>
  <div class="header">
    <h1>{{ title ?? '' }}</h1>
    <div class="tags">
      <v-tag v-for="o in tags ?? []">
        {{ o }}
      </v-tag>
    </div>
  </div>
</template>
