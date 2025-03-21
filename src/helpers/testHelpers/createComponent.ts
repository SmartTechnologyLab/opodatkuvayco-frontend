import type { ComponentInstance, ComponentOptions } from 'vue'

export const stubComponent = <T extends ComponentOptions>(
  Component: ComponentInstance<T>,
  options: Record<keyof ComponentOptions, unknown> = {}
) => {
  return {
    props: Component.props,
    // Do not render any slots/scoped slots except default
    // This differs from VTU behavior which renders all slots
    template: '<div><slot></slot></div>',
    // allows wrapper.find(Component) to work for stub
    $_vueTestUtils_original: Component,
    ...options
  }
}
