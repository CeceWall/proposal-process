<script lang="jsx">
export default {
  functional: true,
  render (h, context) {
    const { name } = context.props
    return (
      <svg class="icon" aria-hidden="true">
        <use xlinkHref={name} />
      </svg>
    )
  }

}
</script>
