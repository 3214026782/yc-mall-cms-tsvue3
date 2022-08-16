<template>
  <div class="rose-echart">
    <BaseEchart :options="options"></BaseEchart>
  </div>
</template>

<script lang="ts" setup>
import { defineProps, computed } from 'vue'
import BaseEchart from '@/base-ui/echart'
import { IDataType } from '../type'

const props = defineProps<{
  roseData: IDataType[]
}>()

const options = computed(() => {
  return {
    toolbox: {
      show: true,
      feature: {
        mark: { show: true },
        dataView: { show: true, readOnly: false },
        restore: { show: true },
        saveAsImage: { show: true }
      }
    },
    series: [
      {
        name: '类别数据',
        type: 'pie',
        radius: [10, 100],
        center: ['50%', '50%'],
        roseType: 'area',
        itemStyle: {
          borderRadius: 8
        },
        data: props.roseData
      }
    ]
  }
})
</script>
<style lang="less" scoped></style>
