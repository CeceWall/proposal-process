import Schema from 'async-validator'

export default {
  data () {
    return {
      errors: {}
    }
  },
  methods: {
    getFieldState (fieldName) {
      if (fieldName in this.errors) {
        return false
      }
      return null
    },
    validate (rules, model, callback) {
      const validator = new Schema(rules)
      validator.validate(model, (errors) => {
        if (!errors) {
          this.errors = {}
          callback()
        } else {
          this.errors = errors.reduce((result, item) => {
            return {
              ...result,
              [item.field]: item.message
            }
          }, {})
        }
      })
    }
  }
}
