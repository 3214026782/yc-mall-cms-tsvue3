<template>
  <div class="login-account">
    <el-form label-width="60px" :rules="rules" :model="phone">
      <el-form-item label="手机号" prop="num">
        <el-input v-model="phone.num"></el-input>
      </el-form-item>
      <el-form-item label="验证码" prop="code">
        <div class="get-code">
          <el-input v-model="phone.code"></el-input>
          <el-button type="primary" class="get-bnt">获取验证码</el-button>
        </div>
      </el-form-item>
    </el-form>
  </div>
</template>

<script lang="ts">
import { defineComponent, reactive } from 'vue'
// 导入rules规则
import { rules } from '../config/account-config'
export default defineComponent({
  setup() {
    const phone = reactive({
      num: '',
      code: ''
    })

    return { phone, rules }
  }
})
</script>
<style lang="less" scoped>
.get-code {
  display: flex;
  .get-bnt {
    margin-left: 8px;
  }
}
</style>
