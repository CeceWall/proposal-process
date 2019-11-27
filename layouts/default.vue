<template>
  <div class="layout">
    <van-nav-bar
      title="标题"
      left-text="返回"
      right-text="按钮"
      left-arrow
    />
    <div class="layout__content">
      <nuxt />
    </div>
  </div>
</template>

<style lang="scss">
  .layout {
    height: 100vh;
    display: flex;
    flex-direction: column;
    .layout__content {
      flex: 1 1 auto;
      min-height: 0;
      background: #f3f3f3;
    }
  }
</style>
