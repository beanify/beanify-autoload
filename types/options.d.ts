import { Beanify, PluginDoneCallback, PluginOptions } from 'beanify'

export class AutoloadOptions extends PluginOptions {
  dir: string
  dirAsScope?: boolean
  ignorePattern?: RegExp
  indexPattern?: RegExp
  maxDepth?: number
}

export type BeanifyAutoload = (
  beanify: Beanify,
  opts: AutoloadOptions,
  done: PluginDoneCallback
) => Promise<void>
