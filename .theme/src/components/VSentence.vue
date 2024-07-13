<script lang="ts" setup>
import { computed, ref } from 'vue'

const isFetched = ref(false)

const data = ref<any>({})

async function fetchHitokoto() {
  const url = 'https://0x-jerry.icu/api/hitokoto?t=' + new Date().getTime()
  const resp = await (await fetch(url)).json()
  data.value = resp.data
  isFetched.value = true
}

const from = computed(() =>
  [data.value?.from, data.value?.from_who].filter(Boolean).join(' - '),
)

fetchHitokoto()
</script>

<template>
  <div class="text-lg">
    <div class="v-sentence text-center px-4">
      <template v-if="!isFetched">
        <!-- todo, add loading -->
        <div class="loading"></div>
      </template>
      <template v-else>
        <p class="font-italic">「 {{ data?.hitokoto }} 」</p>
        <p class="text-right">--- {{ from }}</p>
      </template>
    </div>
  </div>
</template>

<style></style>
