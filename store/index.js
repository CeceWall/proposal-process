export const state = () => ({
  proposalTypeList: []
})

export const mutations = {
  setProposalTypeList (state, proposalList) {
    state.proposalTypeList = proposalList
  }
}

export const actions = {
  async nuxtServerInit ({ commit }, { app }) {
    const proposalTypeList = await app.$api.proposalType.getProposalTypeList()
    commit('setProposalTypeList', proposalTypeList)
  }
}
