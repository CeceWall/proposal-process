import { NuxtAxiosInstance } from '@nuxtjs/axios'

export default ($axios: NuxtAxiosInstance) => {
  return {
    async getProposalTypeList () {
      const response = await $axios.get('/api/proposal-type/all')
      return response.data.data
    }
  }
}
