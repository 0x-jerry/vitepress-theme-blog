import { PluginContext } from 'rollup'
import { ResolvedConfig } from 'vite'

export const globalData = {
  ctx: null as any as PluginContext,
  conf: null as any as ResolvedConfig,
}
