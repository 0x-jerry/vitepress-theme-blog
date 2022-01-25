<script lang="ts" setup>
import dayjs from 'dayjs'
import { computed } from 'vue'

const props = defineProps<{
  title: string
  href: string
  date: string
  tags: string[]
}>()

const formateDate = computed(() => dayjs(new Date(props.date)).format('YYYY-MM-DD'))
</script>

<template>
  <v-card text="break-words">
    <router-link :to="href">
      <h2 text="xl blue-500">
        {{ title }}
      </h2>
    </router-link>
    <div m="t-1 b-5" text="gray-400 xs">
      <span class="tag">{{ formateDate }}</span>
      <span class="tag" v-for="o in tags" :key="o">
        <v-link theme="text" :href="`/tag/${o}`">
          {{ o }}
        </v-link>
      </span>
    </div>
    <!-- <hr m="y-4" /> -->
    <div class="heti !max-w-full m-auto text-left">
      <slot />
    </div>
  </v-card>
</template>

<style scoped>
.tag {
  @apply px-2 py-1px  mr-1;
  @apply border rounded-full bg-light-400;
}
</style>
