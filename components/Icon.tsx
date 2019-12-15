import { CreateElement, FunctionalComponentOptions, VNode } from 'vue'

export default {
  name: 'Icon',
  functional: true,
  render (h: CreateElement, context: FunctionalComponentOptions<{name: string}, {name: string}>):VNode {
    const { name } = context.props!
    return (
      <svg class="icon" aria-hidden="true">
        <use xlinkHref={name} />
      </svg>
    )
  }

}
