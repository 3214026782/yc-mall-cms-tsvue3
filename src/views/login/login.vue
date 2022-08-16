<template>
  <div class="login">
    <login-panel />
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue'
import loginPanel from './cpns/login-panel.vue'
export default defineComponent({
  components: { loginPanel },
  setup() {
    return {}
  }
})
</script>
<style lang="less" scoped>
.login {
  height: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
}
</style>
