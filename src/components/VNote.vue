<script lang="ts" setup>
interface NoteProps {
  name?: string
  tags?: string[]
}

defineProps<NoteProps>()
</script>

<template>
  <v-card p="5">
    <div class="v-note heti m-auto" w="full">
      <h2>{{ name ?? '' }}</h2>
      <div class="tags">
        <v-tag v-for="o in tags ?? []">
          {{ o }}
        </v-tag>
      </div>
      <slot></slot>
    </div>
  </v-card>
</template>
