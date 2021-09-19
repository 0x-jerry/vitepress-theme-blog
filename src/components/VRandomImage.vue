<script lang="ts" setup>
import { computed, ref, watchEffect } from 'vue'
import { useRoute } from 'vue-router'
import loadingImg from '~/assets/loading.svg'

const props = defineProps<{
  id?: string
}>()

const route = useRoute()

const url = computed(() => {
  return `https://api.tiny-online.online/img/random?id=${props.id || route.path}`
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
