<!--region 封装的表格 table-->
<template>
    <div class="table">
        <el-table id="iTable" 
        v-loading.iTable="options.loading" 
        :data="list" 
        :stripe="options.stripe"
        height="100%"
        :highlight-current-row="options.highlightCurrentRow"
        :default-sort = defaultSort
        ref="mutipleTable"
        @selection-change="handleSelectionChange"
        @current-change="handleCurrentChange"
        @row-dblclick="doubleClickTheSelected"
        @row-contextmenu="rightClickSelected">

            <!-- expand 数据展开 -->
            <el-table-column v-if="options.expand" type="expand">
                <template slot-scope="props">
                    <el-form label-position="left" :inline="inline" class="demo-table-expand">
                        <el-form-item :label="item.label" v-for="(item,index) in columns" :key="index">
                            <span>{{ props.row[item.prop]}}</span>
                        </el-form-item>
                    </el-form>
                </template>
            </el-table-column>

            <!--region 选择框-->
            <el-table-column  v-if="options.mutiSelect" type="selection" width="30">
            </el-table-column>

            <!--endregion-->
            <!--region 数据列-->
            <template v-for="(column, index) in columns">
                <el-table-column  :prop="column.prop"
                    :key='column.label'
                    :label="column.label"
                    :align="column.align"
                    :width="column.width"
                    :min-width="column.minWidth"
                    :max-width="column.maxWidth"
                    :sortable="column.sortable">

                    <template slot-scope="scope">
                        <template v-if="!column.render">
                            <template v-if="column.formatter">
                                <span v-html="column.formatter(scope.row, column)"></span>
                            </template>
                            <template v-else>
                                 <span>{{scope.row[column.prop]}}</span>
                            </template>
                        </template>
                        <template v-else>
                            <expand-dom :column="column" :row="scope.row" :render="column.render" :index="index"></expand-dom>
                        </template>
                    </template>

                </el-table-column>
            </template>

            <!--endregion-->
            <!--region 按钮操作组-->
            <el-table-column ref="fixedColumn" label="操作" align="center" :width="operates.width" :fixed="operates.fixed"
                v-if="operates.list.filter(_x=>_x.show === true).length > 0">
                <template slot-scope="scope">
                    <div class="operate-group">
                        <template v-for="(btn, key) in operates.list">
                            <div class="item" v-if="btn.show" :key='btn.id'>
                                <el-button :type="btn.type" size="mini" :icon="btn.icon" :disabled="btn.disabled"
                                :plain="btn.plain" @click.native.prevent="btn.method(key,scope.row)">{{ btn.label }}
                                </el-button>
                            </div>
                        </template>
                    </div>
                </template>
            </el-table-column>
            <!--endregion-->
        </el-table>
    
    </div>
</template>
<!--endregion-->
<script>
    export default {
        props: {
            list: {
                type: Array,
                default: []
            }, // 数据列表
            columns: {
                type: Array,
                default: []
            }, // 需要展示的列 === prop：列数据对应的属性，label：列名，align：对齐方式，width：列宽
            operates: {}, // 操作按钮组 === label: 文本，type :类型（primary / success / warning / danger / info / text），show：是否显示，icon：按钮图标，plain：是否朴素按钮，disabled：是否禁用，method：回调方法
            options: {
                type: Object,
                default: {
                    stripe: false, // 是否为斑马纹 table
                    highlightCurrentRow: false // 是否要高亮当前行
                },
            }, // table 表格的控制参数
            inline: { //
                type: Boolean,
                default: true
            },
            defaultSort: {} //默认排序
            
        },
        //组件
        components: {
            expandDom: {
                functional: true,
                props: {
                    row: Object,
                    render: Function,
                    index: Number,
                    column: {
                        type: Object,
                        default: null
                    }
                },
                render: (h, ctx) => {
                    const params = {
                    row: ctx.props.row,
                    index: ctx.props.index
                }
                if (ctx.props.column) params.column = ctx.props.column
                    return ctx.props.render(h, params)
                }
            }
        },
        // 数据
        data () {
            return {
                pageIndex: 1,
                multipleSelection: [] // 多行选中
            }
        },
        mounted () {
        },
        computed: {
        },
        methods: {
            //1.当表格的当前行发生变化的时候会触发该事件
            handleCurrentChange (currentRow, oldCurrentRow) {
                this.$emit('selectTheSingle',currentRow)
            },

            //2.某一行被双击时
            doubleClickTheSelected (row, column, event) {
                //console.log(column, event)
                this.$emit('doubleClickTheSelected',row)
            },
        
            //3. 当选择项发生变化时会触发该事件
            handleSelectionChange (val) {
                this.$emit('handleSelectionChange', val)
            },

            //4.某一行被鼠标右键点击
            rightClickSelected (row, column, event) {
                this.$emit('rightClickSelected',row)
            }
        }
    }
</script>
<style lang="scss" >
$bg-hover-color:rgba(214, 214, 216, 0.198);

.table{
    height: 100%;
    .item {
        display: inline-block;
    }
    // 表头样式修改
    .el-table th {
        background-color: rgb(104, 148, 230);
        height: 36px;
        padding: 0px 0;
    }
    .el-table thead {
        color: rgb(27, 27, 27) !important;
        font-family: "微软雅黑";
    }
    
    // 表内容样式修改
    .el-table td {
        padding: 5px 0;
    }
    .el-table tr,.el-table tr td {
        background-color: #03173C;
        form{
            margin-left: 50px;  
            div {
                margin: 0px 10px 0px  0px;
            }
        }
    }
    .el-table__body-wrapper,.table-data td {
        background-color: #03173C;
        color: rgb(252, 252, 250);
    }
    .el-table td, .el-table th.is-leaf {
        border-bottom: 1px solid rgb(6, 66, 177);
    }

    /*悬停样式*/
    .el-table__body tr.hover-row>td,
    .el-table__body tr.current-row>td{
        background-color: $bg-hover-color !important;
    }
    
    .el-table--striped .el-table__body tr.el-table__row--striped td {
        background-color: $bg-hover-color;
    }
    
    .el-table__row:hover,
    .el-table__body tr:hover td {
        background-color: $bg-hover-color;
    }

    /*左侧箭头按钮样式*/
    .el-table__expand-icon {
        color: aliceblue;
    }
    .el-form-item__label {
        color: beige;
    }

    /*右侧按钮样式*/
    .el-button {
        margin: 0px 3px;
    }
    .el-button--mini, .el-button--mini.is-round {
        padding: 5px 5px;
    }
    /*状态样式*/
    .el-tag {
        height: 25px;
        line-height: 25px;
    }

}
</style>