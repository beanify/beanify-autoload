import { Beanify } from 'beanify'

import { BeanifyAutoload, AutoloadOptions } from './types/options'

declare const autoload: BeanifyAutoload

export = autoload

export { AutoloadOptions } from './types/options'

declare module 'beanify' {
  interface BeanifyPlugin {
    (plugin: BeanifyAutoload, opts: AutoloadOptions): Beanify
  }
}
