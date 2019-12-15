<template>
  <div class="container">
    <proposal-form @submit="addProposal" />
  </div>
</template>

<script>
import ProposalForm from '~/components/proposal/ProposalForm'

export default {
  name: 'ProposalIndex',
  components: {
    ProposalForm
  },
  methods: {
    addProposal (proposal) {
      this.$api.proposal.addProposal(proposal)
        .then(() => {
          this.$bvToast.toast('创建成功', {
            title: '提示',
            autoHideDelay: 2500
          })
          this.$router.replace('/proposal')
        })
    }
  }
}
</script>

<style lang="scss" scoped>
  .attachment-preview-list {
    display: flex;
    margin: 0 -12px;
    .attachment-preview-list__item {
      width: 90px;
      height: 90px;
      background-position: 50%;
      background-size: cover;
      background-repeat: no-repeat;
      padding: 0 12px;
      background-clip: content-box;
      box-sizing: content-box;
    }
  }

</style>
