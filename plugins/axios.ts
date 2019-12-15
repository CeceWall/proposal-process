import { Context } from '@nuxt/types'
import { NuxtAxiosInstance } from '@nuxtjs/axios'
import createApi from '~/api'
import { AxiosError } from '~/node_modules/axios'

declare module '@nuxt/types' {
  interface NuxtAppOptions {
    $api: ReturnType<typeof createApi>
  }
  interface Context {
    $axios: NuxtAxiosInstance
  }
}

export default function (ctx: Context, inject: (key: string, value: any) => void) {
  const { $axios, redirect } = ctx
  inject('api', createApi($axios))
  $axios.onError((error:AxiosError) => {
    if (error.response && error.response.status === 401 && ctx.route.path !== '/login') {
      redirect('/login')
    }
    return Promise.resolve(error.response)
  })
}
