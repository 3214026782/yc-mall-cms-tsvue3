<template>
  <div class="login-panel">
    <h1 class="title">后台管理系统</h1>
    <el-tabs type="border-card" class="demo-tabs" stretch v-model="currentTab">
      <el-tab-pane name="account">
        <template #label>
          <span class="custom-tabs-label">
            <el-icon class="el-icon"><Avatar class="icon" /></el-icon>
            <span class="icon-text">账号登入</span>
          </span>
        </template>
        <login-account ref="accountRef" />
      </el-tab-pane>
      <el-tab-pane name="phone">
        <template #label>
          <span class="custom-tabs-label">
            <el-icon class="el-icon"><Iphone class="icon" /></el-icon>
            <span class="icon-text">手机登入</span>
          </span>
        </template>
        <login-phone ref="phoneRef" />
      </el-tab-pane>
    </el-tabs>
    <div class="account-control">
      <el-checkbox v-model="isKeepPassword">记住密码</el-checkbox>
      <el-link type="primary">忘记密码</el-link>
    </div>

    <el-button type="primary" class="login-bnt" @click="handleLoginClick"
      >立即登入</el-button
    >
  </div>
</template>

<script lang="ts">
import { defineComponent, ref } from 'vue'
import LoginAccount from './login-account.vue'
import LoginPhone from './login-phone.vue'
export default defineComponent({
  components: {
    LoginAccount,
    LoginPhone
  },
  setup() {
    // 1.定义属性
    const isKeepPassword = ref(true)
    // 传入LoginAccount的TS类型
    const accountRef = ref<InstanceType<typeof LoginAccount>>()
    const phoneRef = ref<InstanceType<typeof LoginPhone>>()
    const currentTab = ref('account')

    // 2.定义方法
    const handleLoginClick = () => {
      if (currentTab.value === 'account') {
        accountRef.value?.logionAction(isKeepPassword.value)
      } else {
        console.log('phoneRef调用phoneAction')
      }
    }
    return {
      isKeepPassword,
      handleLoginClick,
      accountRef,
      currentTab,
      phoneRef
    }
  }
})
</script>
<style lang="less" scoped>
.login-panel {
  width: 320px;
  margin-bottom: 150px;
  .custom-tabs-label {
    display: flex;
    justify-content: center;
  }
  .account-control {
    margin-top: 10px;
    display: flex;
    justify-content: space-between;
  }
  .el-icon {
    width: 20px;
    height: 30px;
  }
  .icon {
    margin-top: 10px;
    width: 20px;
    height: 20px;
  }
  .icon-text {
    margin-bottom: 10px;
    font-size: 10px;
  }

  .title {
    text-align: center;
  }
  .border-card {
  }
  .el-tabs__item {
    display: flex;
    align-items: center;
  }
  .login-bnt {
    width: 100%;
    margin-top: 10px;
  }
}
</style>
