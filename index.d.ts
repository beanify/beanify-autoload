import { Beanify } from 'beanify'

import { BeanifyAutoload, AutoloadOptions } from './types/options'

declare const autoload: BeanifyAutoload

export = autoload

declare module 'beanify' {
  interface BeanifyPlugin {
    (plugin: BeanifyAutoload, opts: AutoloadOptions): Beanify
  }
}
