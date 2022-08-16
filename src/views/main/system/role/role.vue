<template>
  <div class="role">
    <PageSearch :searchFormConfig="searchFormConfig"></PageSearch>
    <PageContent
      :contentTableConfig="contentTableConfig"
      pageName="role"
      @newBtnClick="handleNewData"
      @editBtnClick="handleEditData"
    ></PageContent>
    <pageModal
      ref="pageModalRef"
      :defaultInfo="defaultInfo"
      :otherInfo="otherInfo"
      :modalConfig="modalConfig"
      pageName="role"
    >
      <div class="menu-tree">
        <el-tree
          ref="elTreeRef"
          :data="menus"
          node-key="id"
          :props="{ children: 'children', label: 'name' }"
          show-checkbox
          @check="handleCheckChange"
        />
      </div>
    </pageModal>
  </div>
</template>

<script lang="ts">
import { defineComponent, computed, ref, nextTick } from 'vue'
import { useStore } from '@/store'
import { getMapLeafKeys } from '@/utils/map-menus'

import PageSearch from '@/components/page-search'
import PageContent from '@/components/page-content'
import pageModal from '@/components/page-modal'

import { searchFormConfig } from './config/search.config'
import { contentTableConfig } from './config/content.config'
import { modalConfig } from './config/modal.config'

import { usePageModal } from '@/hooks/use-page-modal'
import { ElTree } from 'element-plus'

export default defineComponent({
  name: 'role',
  components: {
    PageContent,
    PageSearch,
    pageModal
  },
  setup() {
    // 处理pageMadal的hook
    const elTreeRef = ref<InstanceType<typeof ElTree>>()
    const editCallback = (item: any) => {
      const leafKeys = getMapLeafKeys(item.menuList)
      nextTick(() => {
        console.log(elTreeRef.value)
        elTreeRef.value?.setCheckedKeys(leafKeys, false)
      })
    }
    const [pageModalRef, defaultInfo, handleNewData, handleEditData] =
      usePageModal(undefined, editCallback)

    const store = useStore()
    const menus = computed(() => store.state.entireMenu)

    const otherInfo = ref({})

    const handleCheckChange = (data1: any, data2: any) => {
      const checkedKeys = data2.checkedKeys
      const halfcheckedKeys = data2.halfCheckedKeys
      const menuList = [...checkedKeys, ...halfcheckedKeys]
      otherInfo.value = { menuList }
      console.log(otherInfo.value)
    }

    return {
      searchFormConfig,
      contentTableConfig,
      modalConfig,
      pageModalRef,
      defaultInfo,
      handleNewData,
      handleEditData,
      menus,
      otherInfo,
      handleCheckChange,
      elTreeRef
    }
  }
})
</script>

<style scoped>
.menu-tree {
  margin-left: 25px;
}
</style>
