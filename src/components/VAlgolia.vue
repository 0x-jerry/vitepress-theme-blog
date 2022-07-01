<script lang="ts" setup>
import { onMounted } from 'vue'
// @ts-ignore
import docsearch from '@docsearch/js'

import '@docsearch/css'

//
onMounted(() => {
  docsearch({
    container: '#docsearch',
    appId: 'YOUR_APP_ID',
    indexName: 'netlify_a59f0d12-ac84-4bf4-a017-7d6fc5be71de_main_all',
    apiKey: '43dc8c4281920640734b034804f37605',
  })
})
</script>

<template>
  <div hidden id="docsearch" flex="grow-0"></div>
</template>

<style lang="less"></style>
