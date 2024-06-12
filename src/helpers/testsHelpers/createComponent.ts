import type { MethodOptions } from 'vue'

const createStubbedMethods = (methods: MethodOptions = {}) => {
  if (!methods) {
    return {}
  }

  return Object.keys(methods).reduce(
    (acc, key) =>
      Object.assign(acc, {
        [key]: () => {}
      }),
    {}
  )
}

export const stubComponent = (Component: any, options: Record<string, unknown> = {}) => {
  return {
    props: Component.props,
    model: Component.model,
    methods: createStubbedMethods(Component.methods),
    // Do not render any slots/scoped slots except default
    // This differs from VTU behavior which renders all slots
    template: '<div><slot></slot></div>',
    // allows wrapper.find(Component) to work for stub
    $_vueTestUtils_original: Component,
    ...options
  }
}
