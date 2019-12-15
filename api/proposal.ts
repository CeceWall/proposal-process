import { NuxtAxiosInstance } from '@nuxtjs/axios'

export interface Proposal {
  proposalName: string,
  proposalTypeId: number,
  proposalStaff: string,
  beforeImprove: string,
  beforeImproveAttachment?: string[],
  afterImprove: string,
  afterImproveAttachment?: string[],
  counterMeasure: string,
  effect: string,
  effectValue: string,
}

export interface ProposalQuery {
  startDate?: string
  endDate?: string
  approvalState?: string
  pageNo: number
  pageSize: number
}

export default ($axios: NuxtAxiosInstance) => {
  return {
    async addProposal (proposal: Proposal) {
      const response = await $axios.post('/api/proposal/add', proposal)
      return response.data.data
    },
    async getProposalList ({ startDate, endDate, pageNo, pageSize }: ProposalQuery) {
      const response = await $axios.get('/api/proposal/my', {
        params: {
          startDate,
          endDate,
          pageNo,
          pageSize
        }
      })
      return response.data.data
    },
    async getShouldApproveProposalList ({ startDate, endDate, approvalState, pageNo, pageSize }: ProposalQuery = {
      pageNo: 0,
      pageSize: 10
    }) {
      const response = await $axios.get('/api/proposal/approval/current', {
        params: {
          startDate,
          endDate,
          approvalState,
          pageNo,
          pageSize
        }
      })
      return response.data.data
    }
  }
}
