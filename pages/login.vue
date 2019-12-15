<template>
  <div class="login-page page">
    <form @submit.prevent="handleLogin" class="form-signin">
      <img class="mb-4" src="https://getbootstrap.com/docs/4.0/assets/brand/bootstrap-solid.svg" alt="" width="72" height="72">
      <h1 class="h3 mb-3 font-weight-normal">
        欢迎登录XXXX系统
      </h1>
      <b-form-input id="inputUsername" v-model="username" placeholder="请输入用户名" autofocus />
      <b-form-input id="inputPassword" v-model="password" type="password" placeholder="请输入密码" />
      <b-button class="mt-3" size="lg" variant="primary" block type="submit">
        登录
      </b-button>
    </form>
  </div>
</template>

<script>
export default {
  layout: 'FullPage',
  name: 'Login',
  data () {
    return {
      username: '',
      password: ''
    }
  },
  methods: {
    handleLogin () {
      this.$api.login(this.username, this.password)
        .then(() => {
          this.$router.push('/')
        })
        .catch(() => {
          this.$toast('登录失败')
        })
    }
  }
}
</script>

<style lang="scss">
  .login-page.page {
    height: 100%;
    background-color: #f5f5f5;
    display: flex;
    align-items: center;
    padding-top: 40px;
    padding-bottom: 40px;
    text-align: center;

    .login-title {
      font-weight: normal;
      font-size: 1em;
      margin-bottom: 18px;
    }

    .form-cell-group {
      text-align: left;
    }

    .form-signin {
      width: 100%;
      max-width: 330px;
      padding: 15px;
      margin: auto;
    }

    .submit-button {
      width: 100%;
    }
  }
</style>
