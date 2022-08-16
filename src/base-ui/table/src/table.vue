<template>
  <div class="hy-table">
    <div class="header">
      <solt name="header">
        <div class="title">{{ title }}</div>
      </solt>
      <div class="handler">
        <slot name="headerHandler"></slot>
      </div>
    </div>
    <el-table
      :data="listData"
      border
      style="width: 100%"
      @selection-change="handleSelectionChange"
      v-bind="childrenProps"
    >
      <el-table-column
        v-if="showIndexColumn"
        type="selection"
        align="center"
        width="60"
      ></el-table-column>
      <el-table-column
        v-if="showIndexColumn"
        type="index"
        label="序号"
        align="center"
        width="80"
      ></el-table-column>
      <template v-for="propItem in propList" :key="propItem.prop">
        <el-table-column align="center" v-bind="propItem" show-overflow-tooltip>
          <template #default="scope">
            <!-- 动态给插槽设置名字 -->
            <slot :name="propItem.slotName" :row="scope.row"
              >{{ scope.row[propItem.prop] }}
            </slot>
          </template>
        </el-table-column>
      </template>
    </el-table>
    <div class="footer" v-if="showFooter">
      <solt name="footer"
        ><el-pagination
          v-model:currentPage="page.currentPage"
          v-model:page-size="page.pageSize"
          :page-sizes="[10, 20, 30, 40]"
          layout="total, sizes, prev, pager, next, jumper"
          :total="listCount"
          @size-change="handleSizeChange"
          @current-change="handleCurrentChange"
        />
      </solt>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue'
export default defineComponent({
  props: {
    title: {
      type: String,
      default: ''
    },
    listData: {
      type: Array,
      required: true
    },
    listCount: {
      type: Number,
      default: 0
    },
    propList: {
      type: Array,
      required: true
    },
    showIndexColumn: {
      type: Boolean,
      default: false
    },
    showSelectColumn: {
      type: Boolean,
      default: false
    },
    page: {
      type: Object,
      default: () => ({ currentPage: 0, pageSize: 10 })
    },
    showFooter: {
      type: Boolean,
      default: true
    },
    // 如果需要tree形式展开菜单，就在自己的配置文件内配置childrenProps
    childrenProps: {
      type: Object,
      default: () => ({})
    }
  },
  emits: ['selectionChange', 'update:page'],
  setup(prop, { emit }) {
    const handleSelectionChange = (value: any) => {
      emit('selectionChange', value)
    }

    const handleSizeChange = (pageSize: number) => {
      emit('update:page', { ...prop.page, pageSize })
    }

    const handleCurrentChange = (currentPage: number) => {
      emit('update:page', { ...prop.page, currentPage })
    }

    return { handleSelectionChange, handleSizeChange, handleCurrentChange }
  }
})
</script>
<style lang="less" scoped>
.header {
  width: 100%;
  display: flex;
  height: 45px;
  padding: 0 5px;
  justify-content: space-between;
  align-items: center;
  .title {
    font-size: 20px;
    font-weight: 700;
  }
  .handler {
    align-items: center;
  }
}
.footer {
  margin-top: 20px;
  display: flex;
  justify-content: right;
}
</style>
