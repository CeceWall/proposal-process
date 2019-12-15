<template>
  <b-card :title="proposal.proposalName" class="proposal-item component mt-2">
    <b-card-body>
      <slot />
    </b-card-body>
    <div class="mt-2">
      <slot name="footer" />
    </div>
  </b-card>
</template>

<script>
export default {
  name: 'ProposalItem',
  props: {
    proposal: {
      type: Object,
      required: true
    }
  }
}
</script>

<style lang="scss">
  .proposal-item.component {
    position: relative;
  }
</style>
