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

interface Month {
  month: number
  items: ArchiveItem[]
}

interface Year {
  year: number
  items: Month[]
}

const data: Year[] = []

modules.forEach((m) => {
  const date = dayjs(m.data.date)

  const item: ArchiveItem = {
    date,
    title: m.data.title,
    tags: m.data.tags || [],
    href: m.extra.href,
  }

  //  ---------

  const year = date.year()
  const month = date.month() + 1

  let theYear = data.find((n) => n.year === year)
  if (!theYear) {
    theYear = { year, items: [] }
    data.push(theYear)
  }

  let theMonth = theYear.items.find((n) => n.month === month)

  if (!theMonth) {
    theMonth = { month, items: [] }
    theYear.items.push(theMonth)
  }

  theMonth.items.push(item)
})
</script>

<template>
  <div class="v-archives" flex="~ col" grid="gap-y-6" m="t-4" p="x-4">
    <div v-for="yearItem in data" :key="yearItem.year" class="flex flex-col gap-y-6">
      <div v-for="monthItem in yearItem.items" :key="monthItem.month">
        <h2 font="bold" text="2xl" m="y-4">{{ yearItem.year }} - {{ monthItem.month }}</h2>

        <div p="l-4" class="flex flex-col gap-y-6">
          <a
            v-for="i in monthItem.items"
            :key="i.date.unix()"
            @click="$router.push(i.href)"
            cursor="pointer"
          >
            <v-card p="x-6 y-4">
              <div>
                <h1 m="b-2">
                  <span m="r-2" text="gray-500">{{ i.date.format('YYYY-MM-DD') }}</span>
                  <v-link :href="i.href" class="text-xl mr-2">
                    {{ i.title }}
                  </v-link>
                </h1>

                <div>
                  <router-link
                    class="py-2"
                    v-for="o in i.tags"
                    :key="o"
                    :to="`/tag/${o}`"
                    @click.stop
                  >
                    <v-tag>{{ o }} </v-tag>
                  </router-link>
                </div>
              </div>
            </v-card>
          </a>
        </div>
      </div>
    </div>
  </div>
</template>
