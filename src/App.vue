<template>
  <div class="app">
    <el-config-provider :locale="locale">
      <router-view></router-view>
    </el-config-provider>
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue'
import { ElConfigProvider } from 'element-plus'

import zhCn from 'element-plus/lib/locale/lang/zh-cn'

// defineComponent 对js没有实际用处，对于ts来说里面存在大量泛型，方便进行类型推导
export default defineComponent({
  name: 'App',
  components: {
    ElConfigProvider
  },
  setup() {
    return {
      locale: zhCn
    }
  }
})
</script>

<style lang="less">
.app {
  height: 100%;
}
</style>
