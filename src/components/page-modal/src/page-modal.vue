<template>
  <div class="page-model">
    <el-dialog
      v-model="dialogVisible"
      title="Warning"
      width="30%"
      center
      destroy-on-close
    >
      <HyForm v-bind="modalConfig" v-model="fromData"> </HyForm>
      <slot></slot>
      <template #footer>
        <span class="dialog-footer">
          <el-button @click="dialogVisible = false">取消</el-button>
          <el-button type="primary" @click="handleConfirmClick">确定</el-button>
        </span>
      </template>
    </el-dialog>
  </div>
</template>

<script lang="ts">
import { defineComponent, ref, watch } from 'vue'

import HyForm from '@/base-ui/form'
import { useStore } from '@/store'

export default defineComponent({
  props: {
    modalConfig: {
      type: Object,
      required: true
    },
    defaultInfo: {
      type: Object,
      default: () => ({})
    },
    pageName: {
      type: String,
      required: true
    },
    otherInfo: {
      type: Object,
      default: () => ({})
    }
  },
  components: {
    HyForm
  },
  setup(props) {
    const dialogVisible = ref(false)
    const fromData = ref<any>({})

    watch(
      () => props.defaultInfo,
      (newValue) => {
        console.log(newValue)

        for (const item of props.modalConfig.formItems) {
          fromData.value[`${item.field}`] = newValue[`${item.field}`]
        }
      }
    )

    // 点击确定按钮的逻辑
    const store = useStore()
    const handleConfirmClick = () => {
      dialogVisible.value = false
      // 检查props.defaultInfo是否有值（判断是新建还是编辑）
      if (Object.keys(props.defaultInfo).length) {
        // 编辑
        store.dispatch('system/editPageDataAction', {
          pageName: props.pageName,
          // 将fromData和otherInfo的数据组合在一起发送出去
          editData: { ...fromData.value, ...props.otherInfo },
          id: props.defaultInfo.id
        })
      } else {
        // 新建
        store.dispatch('system/createPageDataAction', {
          pageName: props.pageName,
          newData: { ...fromData.value, ...props.otherInfo }
        })
      }
    }

    return { dialogVisible, fromData, handleConfirmClick }
  }
})
</script>
<style lang="less" scoped></style>
