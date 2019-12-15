<template>
  <div class="container mt-2">
    <b-form novalidate>
      <b-form-group label-cols="3" label="开始日期">
        <b-form-input v-model="params.startDate" type="date" placeholder="请选择开始日期" />
      </b-form-group>
      <b-form-group label-cols="3" label="结束日期">
        <b-form-input v-model="params.endDate" type="date" placeholder="请选择结束日期" />
      </b-form-group>
      <b-form-group>
        <div class="d-flex justify-content-between">
          <b-button variant="primary" @click="handleSearchProposal">
            查询
          </b-button>
          <b-button variant="success" @click="$router.push('/proposal/add')">
            新增
          </b-button>
          <b-button variant="outline-primary">
            重置条件
          </b-button>
        </div>
      </b-form-group>
    </b-form>
    <div>
      <proposal-item v-for="item of proposalList" :key="item.id" :proposal="item">
        <template slot="footer">
          <a href="#" class="card-link">
            修改
          </a>
          <b-link href="#" class="card-link">
            删除
          </b-link>
        </template>
      </proposal-item>
      <client-only>
        <infinite-loading :identifier="loadIdentifier" @infinite="loadProposalList" />
      </client-only>
    </div>
  </div>
</template>

<script>
import InfiniteLoading from 'vue-infinite-loading'
import ProposalItem from '../../components/proposal/ProposalItem'

export default {
  name: 'ProposalList',
  components: {
    ProposalItem,
    InfiniteLoading
  },
  data () {
    return {
      loadIdentifier: new Date()
    }
  },
  async asyncData ({ app }) {
    const pageableResult = await app.$api.proposal.getProposalList({
      pageNo: 0,
      pageSize: 10
    })
    return {
      proposalList: pageableResult.content,
      last: pageableResult.last,
      params: {
        startDate: '',
        endDate: '',
        pageNo: 1,
        pageSize: 10
      }
    }
  },
  methods: {
    async loadProposalList ($state) {
      if (!this.last) {
        await this.fetchData()
        if (this.last) {
          $state.complete()
        } else {
          $state.loaded()
        }
      } else {
        $state.complete()
      }
    },
    async handleSearchProposal () {
      this.params.pageNo = 0
      this.proposalList = []
      this.loadIdentifier = new Date()
      await this.fetchData()
    },
    async fetchData () {
      const response = await this.$api.proposal.getProposalList({
        startDate: this.params.startDate,
        endDate: this.params.endDate,
        pageNo: this.params.pageNo,
        pageSize: this.params.pageSize
      })
      this.params.pageNo += 1
      this.proposalList.push(...response.content)
      this.last = response.last
      return response
    }
  }
}
</script>

<style lang="scss">

</style>
