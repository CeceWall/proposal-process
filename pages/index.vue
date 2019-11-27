<template>
  <section>
    <van-panel
      v-for="menu of menus"
      :title="menu.title"
      :key="menu.title"
      class="menu-panel"
    >
      <van-grid>
        <van-grid-item
          v-for="item of menu.items"
          :text="item.text"
          :key="item.text"
        >
          <template slot="icon">
            <icon :name="item.icon" />
          </template>
        </van-grid-item>
      </van-grid>
    </van-panel>
  </section>
</template>

<script>

export default {
  components: {
  },
  data () {
    return {
      menus: [
        {
          title: '提案管理',
          items: [
            { icon: '#iconshoudongshangchuan', text: '提案提报', link: '' },
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
  .menu-panel {
    margin-bottom: 12px;
  }
</style>
