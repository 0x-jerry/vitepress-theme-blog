<script lang="ts" setup>
import VButton from './VButton.vue'
import { useI18n } from '@@/lib/i18n'
import { useRouter } from 'vitepress'
import IconSearch from '~icons/carbon/search'

const { t } = useI18n()
const router = useRouter()
</script>

<template>
  <VButton class="w-full" @click="router.go('/search')">
    <IconSearch></IconSearch>
    <span class="flex-1 hidden lg:inline-block">{{ t('button.search') }}</span>
  </VButton>
</template>

<style lang="less" scoped></style>
