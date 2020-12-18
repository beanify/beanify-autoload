import { Beanify, PluginDoneCallback } from 'beanify'

export interface AutoloadOptions {
  dir?: string
}

export type BeanifyAutoload = (
  beanify: Beanify,
  opts: AutoloadOptions,
  done?: PluginDoneCallback
) => PromiseLike<void> | void
