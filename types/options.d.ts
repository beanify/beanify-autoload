import { Beanify, PluginDoneCallback, PluginOptions, Route } from 'beanify'

export class AutoloadOptions extends PluginOptions {
  dir: string
  dirAsScope?: boolean
  ignorePattern?: RegExp
  indexPattern?: RegExp
  maxDepth?: number
}

export type BeanifyAutoloadRoute = (route: Route) => Route

export type BeanifyAutoload = {
  (beanify: Beanify, opts: AutoloadOptions, done: PluginDoneCallback): Promise<
    void
  >
  route: BeanifyAutoloadRoute
}
