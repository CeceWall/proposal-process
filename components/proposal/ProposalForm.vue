<template>
  <div class="proposal-form component">
    <b-form novalidate @submit.prevent="handleSubmitProposal">
      <b-form-group
        id="input-group-1"
        label="提案名称"
        label-for="input-1"
      >
        <b-form-input
          id="input-1"
          v-model="proposal.proposalName"
          :state="getFieldState('proposalName')"
          type="email"
          required
          placeholder="提案名称"
        />
        <b-form-invalid-feedback>
          {{ errors.proposalName }}
        </b-form-invalid-feedback>
      </b-form-group>
      <b-form-group label="岗位">
        <b-form-input
          v-model="proposal.proposalStaff"
          :state="getFieldState('proposalStaff')"
          placeholder="岗位"
        />
        <b-form-invalid-feedback>
          {{ errors.proposalStaff }}
        </b-form-invalid-feedback>
      </b-form-group>
      <b-form-group label="提案类别">
        <b-form-select
          v-model="proposal.proposalTypeId"
          :options="proposalTypeList"
          :state="getFieldState('proposalTypeId')"
          value-field="proposalTypeCode"
          text-field="proposalTypeName"
        />
        <b-form-invalid-feedback>
          {{ errors.proposalTypeId }}
        </b-form-invalid-feedback>
      </b-form-group>
      <b-form-group label="改善前情况描述">
        <b-form-textarea
          id="textarea"
          v-model="proposal.beforeImprove"
          :state="getFieldState('beforeImprove')"
          placeholder="改善前情况描述"
          rows="3"
          max-rows="6"
        />
        <b-form-invalid-feedback>
          {{ errors.beforeImprove }}
        </b-form-invalid-feedback>
      </b-form-group>
      <b-form-group label="改善前情况附件">
        <b-form-file
          v-model="fileList"
          placeholder="改善前情况附件"
          drop-placeholder="请将文件拖动到框中"
          browse-text="选择"
        />
      </b-form-group>
      <b-form-group label="改善后情况描述">
        <b-form-textarea
          id="textarea"
          v-model="proposal.afterImprove"
          :state="getFieldState('afterImprove')"
          placeholder="改善后情况描述"
          rows="3"
          max-rows="6"
        />
        <b-form-invalid-feedback>
          {{ errors.afterImprove }}
        </b-form-invalid-feedback>
      </b-form-group>
      <b-form-group label="改善后情况附件">
        <b-form-file
          v-model="fileList"
          placeholder="改善后情况附件"
          drop-placeholder="请将文件拖动到框中"
          browse-text="选择"
        />
      </b-form-group>
      <b-form-group label="改善对策及实施办法">
        <b-form-textarea
          v-model="proposal.counterMeasure"
          :state="getFieldState('counterMeasure')"
          rows="3"
          max-rows="6"
          placeholder="改善对策及实施办法"
        />
        <b-form-invalid-feedback>
          {{ errors.counterMeasure }}
        </b-form-invalid-feedback>
      </b-form-group>
      <b-form-group label="实施成果及经济效益">
        <b-form-textarea
          v-model="proposal.effect"
          :state="getFieldState('effect')"
          rows="3"
          max-rows="3"
          placeholder="实施成果及经济效益"
        />
        <b-form-invalid-feedback>
          {{ errors.effect }}
        </b-form-invalid-feedback>
      </b-form-group>
      <b-form-group label="创效(元)">
        <b-form-input
          v-model.number="proposal.effectValue"
          :state="getFieldState('effectValue')"
          type="number"
          placeholder="创效(元)"
        />
        <b-form-invalid-feedback>
          {{ errors.effectValue }}
        </b-form-invalid-feedback>
      </b-form-group>
      <b-form-group>
        <b-button block variant="primary" type="submit">
          提交
        </b-button>
      </b-form-group>
    </b-form>
    <gallery :images="proposal.afterImproveAttachment" :index="index" @close="index = null" />
  </div>
</template>

<script>
import { mapState } from 'vuex'
import { requireValidator, rangeValidator } from '../../utils/validators'
import formValidateMixin from '../../mixins/formValidateMixin'

const rules = {
  proposalName: [requireValidator('提案名称'), rangeValidator(10, 50)],
  proposalStaff: [requireValidator('岗位')],
  proposalTypeId: [requireValidator('提案类别')],
  beforeImprove: [requireValidator('改善前情况描述'), rangeValidator(30, 200)],
  afterImprove: [requireValidator('改善前情况描述'), rangeValidator(30, 200)],
  counterMeasure: [requireValidator('改善对策及实施办法'), rangeValidator(80, 200)],
  effect: [requireValidator('实施成果及经济效益'), rangeValidator(80, 200)],
  effectValue: [requireValidator('创效'), { type: 'number', message: '请输入数字' }]
}

export default {
  name: 'ProposalForm',
  mixins: [formValidateMixin],
  data () {
    return {
      errors: {},
      index: null,
      fileList: [],
      proposalTypePopup: false,
      proposal: {
        proposalName: '',
        proposalStaff: '',
        proposalTypeId: '',
        beforeImprove: '',
        beforeImproveAttachment: [],
        afterImprove: '',
        afterImproveAttachment: [],
        counterMeasure: '',
        effect: '',
        effectValue: '',
        attachment: ''
      }
    }
  },
  computed: {
    ...mapState({
      proposalTypeList: state => state.proposalTypeList
    })
  },
  methods: {
    getProposalTypeName (proposalTypeId) {
      const item = this.proposalTypeList.find(item => item.proposalTypeId === proposalTypeId)
      if (item) {
        return item.proposalTypeName
      }
      return '- -'
    },
    onConfirm (value) {
      this.proposal.proposalTypeId = value.proposalTypeId
      this.proposalTypePopup = false
    },
    onFileChange (fileList) {
      this.fileList = [...fileList]
      this.$nextTick(() => {
        if (this.fileList.length > 0) {
          this.$refs.upload.submit()
        }
      })
    },

    onUploadProgressChange (a, b, c) {
      console.log('upload progress change', a, b, c)
    },
    onUploadSuccess (fileIndex, response) {
      const { data: fileId } = response
      const file = this.fileList[fileIndex]
      console.log(file, response)
      this.proposal.afterImproveAttachment.push({
        href: `/api/files/${fileId}`,
        type: file.type
      })
      this.$refs.upload.remove(fileIndex)
    },
    onUploadFailed (a, b, c) {
      console.log('upload failed', a, b, c)
    },
    onUploadFinished (a, b, c) {
      console.log('upload finished', a, b, c)
    },
    handleSubmitProposal () {
      this.validate(rules, this.proposal, () => {
        this.$emit('submit', this.proposal)
      })
    }
  }
}
</script>

<style scoped>

</style>
