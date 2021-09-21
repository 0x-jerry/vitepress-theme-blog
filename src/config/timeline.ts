import dayjs from 'dayjs'
import { Component } from 'vue'

const mds = import.meta.globEager('./events/*.md')

const keys = Object.keys(mds).map((n) => ({
  time: dayjs(n.slice(-'YYYY-HH-MM.md'.length, -'.md'.length)).unix(),
  name: n,
}))

const events: Component[] = keys.sort((a, b) => b.time - a.time).map((key) => mds[key.name].default)

export const timeline = {
  events,
}
