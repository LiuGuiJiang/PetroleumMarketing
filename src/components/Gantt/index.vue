<template>
<!-- 甘特图封装 -->
  <div ref="gantt"></div>
</template>

<script>
import 'dhtmlx-gantt'
//导入语言包
import "dhtmlx-gantt/codebase/locale/locale_cn"

export default {
    name: 'DhtmlxGantt',
    props: {
        tasks: {
            type: Object,
            default () {
                return {data: [], links: []}
            }
        }
    },
    mounted() {
        // 在时间线上增加一行年份显示
        gantt.config.subscales = [
            {
                unit: 'year',
                step: 1,
                date: '%Y'
            }
        ]
        // 初始化
        gantt.init(this.$refs.gantt)
        // 数据解析
        gantt.parse(this.tasks)
    }
}
</script>

<style>
    @import "dhtmlx-gantt/codebase/dhtmlxgantt.css";
</style>