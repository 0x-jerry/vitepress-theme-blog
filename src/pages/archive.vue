<script lang="ts" setup>
import { useHead } from '@vueuse/head'
import dayjs, { Dayjs } from 'dayjs'
import { useI18n } from 'vue-i18n'
import { modules } from '~blog/excerpts/entry'

const { t } = useI18n()

useHead({
  title: t('title.archive', [t('name')]),
})

interface ArchiveItem {
  date: Dayjs
  title: string
  tags: string[]
  href: string
}

function isTheSameMouth(d1: Dayjs, d2: Dayjs) {
  return d1.year() === d2.year() && d1.month() === d2.month()
}

const data: { date: Dayjs; items: ArchiveItem[] }[] = []

modules.forEach((m) => {
  const lastOne = data[data.length - 1]

  const item: ArchiveItem = {
    date: dayjs(m.data.date),
    title: m.data.title,
    tags: m.data.tags || [],
    href: m.extra.href,
  }

  if (lastOne && isTheSameMouth(lastOne.date, item.date)) {
    lastOne.items.push(item)
  } else {
    data.push({
      date: item.date,
      items: [item],
    })
  }
})
</script>

<template>
  <div class="v-archives" flex="~ col" grid="gap-y-6" m="t-4" p="x-4">
    <div v-for="o in data" :key="o.date.format('YYYY-MM')" class="flex flex-col gap-y-6">
      <h2 font="bold" text="2xl">{{ o.date.format('YYYY-MM') }}</h2>

      <a v-for="i in o.items" :key="i.date.unix()" @click="$router.push(i.href)" cursor="pointer">
        <v-card p="x-6 y-4">
          <div>
            <h1 m="b-2">
              <span m="r-2" text="gray-500">{{ i.date.format('YYYY-MM-DD') }}</span>
              <v-link :href="i.href" class="text-xl mr-2">
                {{ i.title }}
              </v-link>
            </h1>

            <div>
              <router-link class="py-2" v-for="o in i.tags" :key="o" :to="`/tag/${o}`" @click.stop>
                <v-tag>{{ o }} </v-tag>
              </router-link>
            </div>
          </div>
        </v-card>
      </a>
    </div>
  </div>
</template>
