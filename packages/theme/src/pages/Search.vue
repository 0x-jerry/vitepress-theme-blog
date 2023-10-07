<script setup>
import VTitle from '@@/components/VTitle.vue'
import { useI18n } from '@@/lib/i18n'
import { reactive, watch } from 'vue'

const { t } = useI18n()

const state = reactive({
  input: '',
  results: [],
})

let pagefind

init()

async function init() {
  const url = `/pagefind/pagefind.js`

  pagefind = await import(/* @vite-ignore */ url)
  pagefind.init()
}

watch(
  () => state.input,
  async () => {
    if (!pagefind) return

    const resp = await pagefind.search(state.input)

    const p = resp.results.map((n) => n.data())

    state.results = await Promise.all(p)
  },
)
</script>

<template>
  <div>
    <VTitle show-back :title="t('title.search')"></VTitle>
    <div>
      <input v-model="state.input" />
    </div>
    <div>
      <div v-for="result in state.results">
        <div class="title">
          <a :href="result.url">
            {{ result.meta.title }}
          </a>
        </div>
        <div v-html="result.excerpt"></div>
      </div>
    </div>
  </div>
</template>

<style lang="less" scoped></style>
