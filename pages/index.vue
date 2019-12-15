<template>
  <div class="container-fluid pt-2">
    <div class="row">
      <section class="home-page page col-md-10 col-12 m-auto">
        <div
          v-for="menu of menus"
          :key="menu.title"
          class="panel px-4 py-3"
        >
          <h3 class="panel-title border-bottom py-2">
            {{ menu.title }}
          </h3>
          <div class="row text-center">
            <div
              v-for="item of menu.items"
              :key="item.text"
              class="panel-item col-4 col-md-3"
              @click="$router.push(item.link)"
            >
              <icon :name="item.icon" class="panel-item__icon" />
              <p class="mt-2">
                {{ item.text }}
              </p>
            </div>
          </div>
        </div>
      </section>
    </div>
  </div>
</template>

<script>

export default {
  components: {},
  data () {
    return {
      menus: [
        {
          title: '提案管理',
          items: [
            { icon: '#iconshoudongshangchuan', text: '提案提报', link: '/proposal' },
            { icon: '#iconfenxiang', text: '提案分享', link: '' }
          ]
        },
        {
          title: '提案审批',
          items: [
            { icon: '#icondaibanshixiang', text: '待办任务', link: '' },
            { icon: '#iconyibanshixiang', text: '已办任务', link: '' }
          ]
        },
        {
          title: '专家评分',
          items: [
            { icon: '#iconzhuanshen', text: '任务发出', link: '' },
            { icon: '#icondaibanshixiang', text: '待办任务', link: '' },
            { icon: '#iconyibanshixiang', text: '已办任务', link: '' }
          ]
        },
        {
          title: '工作报表',
          items: [
            { icon: '#iconmendianKPI', text: '创效排行', link: '' },
            { icon: '#iconjujue', text: '提案黑榜', link: '' },
            { icon: '#icondenglupaihang', text: '优秀提案', link: '' }
          ]
        }
      ]
    }
  }
}
</script>

<style lang="scss">
  .home-page {
    background: #E7EFF4;
    .panel {
      background: #ffffff;
      width: 100%;

      .panel-title {
        font-size: 18px;
      }

      .panel-item {
        padding: 12px;
      }

      .icon {
        font-size: 2rem;
      }
    }
  }

</style>
