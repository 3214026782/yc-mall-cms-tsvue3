<template>
  <div class="nav-header">
    <el-icon class="icon_box" @click="handleFoldClick">
      <template v-if="!isFold">
        <Fold class="icon" />
      </template>
      <template v-else>
        <Expand class="icon" />
      </template>
    </el-icon>
    <div class="content">
      <HyBreadcrumb :breadcrumbs="breadcrumbs"></HyBreadcrumb>
      <UserInfo></UserInfo>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent, ref, computed } from 'vue'
import UserInfo from './user-info.vue'
import HyBreadcrumb, { IBreadcrumb } from '@/base-ui/breadcrumb'

import { pathMapToBreadcrumbs } from '@/utils/map-menus'

import { useRoute } from 'vue-router'
import { useStore } from '@/store'

export default defineComponent({
  components: { UserInfo, HyBreadcrumb },
  emits: ['foldChange'],
  setup(props, { emit }) {
    let isFold = ref(false)
    const handleFoldClick = () => {
      isFold.value = !isFold.value
      emit('foldChange', isFold.value)
    }

    //  面包屑的数据
    const store = useStore()
    const breadcrumbs = computed(() => {
      const userMenus = store.state.login.userMenus
      const route = useRoute()
      const currentPath = route.path
      return pathMapToBreadcrumbs(userMenus, currentPath)
    })
    return { handleFoldClick, isFold, breadcrumbs }
  }
})
</script>
<style lang="less" scoped>
.nav-header {
  display: flex;
  width: 100%;
  align-items: center;
  .icon_box {
    font-size: 30px;
    cursor: pointer;
    .icon {
      width: 1em;
      height: 1em;
      margin-right: 8px;
    }
  }
  .content {
    flex: 1;
    padding: 0 20px;
    display: flex;
    justify-content: space-between;
    align-items: center;
  }
}
</style>
