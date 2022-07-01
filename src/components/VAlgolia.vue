<script lang="ts" setup>
import { onMounted } from 'vue'

//
onMounted(() => {
  // @ts-ignore
  algoliasearchNetlify({
    appId: 'XP2151RITM',
    apiKey: '43dc8c4281920640734b034804f37605',
    siteId: 'a59f0d12-ac84-4bf4-a017-7d6fc5be71de',
    branch: 'main',
    selector: 'div#search',
  })
})
</script>

<template>
  <div id="search"></div>
</template>

<style lang="less"></style>
