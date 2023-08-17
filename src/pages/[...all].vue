<script setup lang="ts">
import { useI18n } from '@/lib/i18n'

const { t } = useI18n()
</script>

<template>
  <div>
    {{ t('not-found') }}
  </div>
</template>

<route lang="yaml">
meta:
  layout: 404
</route>
