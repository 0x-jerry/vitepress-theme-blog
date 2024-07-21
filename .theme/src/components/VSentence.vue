<script lang="ts" setup>
import { useAsyncData } from '@0x-jerry/vue-kit'
import { computed } from 'vue'

const hitokoto = useAsyncData(fetchHitokoto, {})
hitokoto.load()

async function fetchHitokoto() {
  const url = 'https://0x-jerry.icu/api/hitokoto?t=' + new Date().getTime()
  const resp = await (await fetch(url)).json()
  return resp.data
}

const from = computed(() => {
  const data = hitokoto.data.value

  return [data.from, data.from_who].filter(Boolean).join(' - ')
})

fetchHitokoto()
</script>

<template>
  <div class="text-lg">
    <div class="v-sentence text-center px-4">
      <template v-if="!hitokoto.isLoading">
        <!-- todo, add loading -->
        <div class="loading"></div>
      </template>
      <template v-else>
        <p class="font-italic">「 {{ hitokoto.data.value?.hitokoto }} 」</p>
        <p class="text-right">--- {{ from }}</p>
      </template>
    </div>
  </div>
</template>

<style></style>
