<script lang="ts" setup>
import { computed, ref, watchEffect } from 'vue'
import loadingImg from '~/assets/loading.svg'

const props = defineProps<{
  id?: number
}>()

const url = computed(() => {
  return `https://api.0x-jerry.icu/img/random?id=${props.id || new Date().getTime()}`
})

const isLoading = ref(true)

watchEffect(() => {
  if (import.meta.env.SSR) {
    isLoading.value = false
    return
  }

  isLoading.value = true

  const img = new Image()
  img.onload = () => (isLoading.value = false)

  img.src = url.value
})

const imgUrl = computed(() => (isLoading.value ? loadingImg : url.value))
</script>

<template>
  <img :src="imgUrl" display="inline-block" object="cover" />
</template>

<style></style>
