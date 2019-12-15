import createProposal from './proposal'
import createProposalType from './proposal-type'
import createLogin from './login'
import { NuxtAxiosInstance } from '~/node_modules/@nuxtjs/axios'

export default ($axios: NuxtAxiosInstance) => {
  return {
    proposal: createProposal($axios),
    proposalType: createProposalType($axios),
    ...createLogin($axios)
  }
}
