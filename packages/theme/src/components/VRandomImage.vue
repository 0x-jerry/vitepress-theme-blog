<script lang="ts" setup>
import { computed, ref, watchEffect } from 'vue'
import loadingImg from '@@/assets/loading.svg'

const props = defineProps<{
  id?: number
  range?: [number, number]
}>()

const url = computed(() => {
  return `https://0x-jerry.icu/api/img?i=${calcId()}`
})

function calcId() {
  if (props.id) {
    return props.id
  }

  if (props.range) {
    const [min, max] = props.range
    return min + ~~(Math.random() * (max - min))
  }

  return new Date().getTime()
}

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
  <img :src="imgUrl" class="block object-cover" />
</template>

<style></style>
