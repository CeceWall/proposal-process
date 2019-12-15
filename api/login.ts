import { NuxtAxiosInstance } from '@nuxtjs/axios'

export default ($axios: NuxtAxiosInstance) => {
  return {
    async login (username: string, password: string) {
      const formData = new FormData()
      formData.append('username', username)
      formData.append('password', password)
      const response = await $axios.post('/api/login', formData)
      return response.data.data
    }
  }
}
