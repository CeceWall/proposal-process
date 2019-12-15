import Component from 'nuxt-class-component'
import Vue, { CreateElement, VNode } from 'vue'
import { Context } from '@nuxt/types'
import { Proposal } from '~/api/proposal'

interface Pageable<T> {
  content: T[]
}

@Component({
  name: 'ApprovalIndex'
})
export default class ApprovalIndex extends Vue {
  async asyncData (ctx: Context) {
    const { $api } = ctx.app
    $api.proposal.addProposal({
      proposalTypeId: 123
    })
    return {
      proposalList: await $api.proposal.getShouldApproveProposalList()
    }
  }

  proposalList!: Proposal[]

  render (h: CreateElement): VNode {
    return (
      <b-container class="page approval-index" fluid>

      </b-container>
    )
  }
}
