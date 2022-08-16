<template>
  <div class="login-account">
    <el-form label-width="60px" :rules="rules" :model="account" ref="fromRef">
      <el-form-item label="账号" prop="name">
        <el-input v-model="account.name"></el-input>
      </el-form-item>
      <el-form-item label="密码" prop="password">
        <el-input v-model="account.password"></el-input>
      </el-form-item>
    </el-form>
  </div>
</template>

<script lang="ts">
import { ElForm } from 'element-plus/lib/components'
import { defineComponent, reactive, ref } from 'vue'
import LocalCache from '@/utils/cache'
import { useStore } from 'vuex'
// 导入rules规则
import { rules } from '../config/account-config'
export default defineComponent({
  setup() {
    const store = useStore()

    const account = reactive({
      name: LocalCache.getCache('name') ?? '',
      password: LocalCache.getCache('password') ?? ''
    })

    const fromRef = ref<InstanceType<typeof ElForm>>()

    const logionAction = (isKeepPassword: boolean) => {
      fromRef.value?.validate((valid) => {
        if (valid) {
          // 1.判断是否需要记住密码
          if (isKeepPassword) {
            // 本地缓存
            LocalCache.setCache('name', account.name)
            LocalCache.setCache('password', account.password)
          } else {
            LocalCache.deleteCache('name')
            LocalCache.deleteCache('password')
          }
          // 2.开始进行登录验证
          // store.dispatch('login/accountLoginAction', { ...account })
          store.dispatch('login/accountLoginAction', { ...account })
        }
      })
    }

    return { account, rules, logionAction, fromRef }
  }
})
</script>
<style lang="less" scoped></style>
