<template>
    <div id="sys-operatin-data">
        <!-- 功能菜单栏 -->
        <div>
            <onlyFunctionMenu 
            :funMenuButList="funMenuButList"
            :tabActiveName="tabActiveName"
            @tabHandleClick="tabHandleClick"/>
        </div>
        <!-- 内容 -->
        <div class="content">
            <!-- 列表 -->
            <div>
                <el-dialog class="dialog" title="筛选条件" :visible.sync="dialogScreenVisible">
                    <el-form :model="formCondition">
                        <el-form-item label="用户" :label-width="formLabelWidth">
                            <el-input size="mini" v-model="formCondition.uName" placeholder="输入设备名称"></el-input>
                        </el-form-item>
                        <el-form-item label="开始" :label-width="formLabelWidth">
                                <div class="block">
                                    <el-date-picker
                                    size="mini"
                                    v-model="formCondition.startTime"
                                    type="datetime"
                                    placeholder="请选择日期时间"
                                    format="yyyy-MM-dd HH:mm:ss"
                                    value-format="yyyy-MM-dd HH:mm:ss"
                                    align="right"
                                    :picker-options="pickerOptions">
                                    </el-date-picker>
                                </div>
                            </el-form-item>
                            <el-form-item label="结束" :label-width="formLabelWidth">
                                <div class="block">
                                    <el-date-picker
                                    size="mini"
                                    v-model="formCondition.endTime"
                                    type="datetime"
                                    placeholder="请选择日期时间"
                                    format="yyyy-MM-dd HH:mm:ss"
                                    value-format="yyyy-MM-dd HH:mm:ss"
                                    align="right"
                                    :picker-options="pickerOptions">
                                    </el-date-picker>
                                </div>
                            </el-form-item>
                    </el-form>
                    <div slot="footer" class="dialog-footer">
                        <el-button size="mini" @click="dialogScreenVisible = false">取 消</el-button>
                        <el-button size="mini" type="primary" @click="subQueryData">确 定</el-button>
                    </div>
                </el-dialog>

                <!-- list 列表展示-->
                <div class="table-list" v-loading="this.$store.getters.isLoading"
                element-loading-text="加载中..."
                element-loading-background="rgba(0, 0, 0, 0.5)">
                    <only-table :list="list"
                        @handleSelectionChange="handleSelectionChange"
                        :options="options"
                        :columns="columns"
                        :operates="operates"
                        :inline="inline"
                        :defaultSort="defaultSort">
                    </only-table>
                </div>

                <!-- paging 分页-->
                <div class="paging">
                    <only-paging 
                    @handleSizeChange="handleSizeChange"
                    @handleCurrentChange="handleCurrentChange"
                    :delDisabled='delDisabled'
                    :delIsShow='delIsShow'
                    :currentPage='currentPage' 
                    :total='total' 
                    :pageSizes='pageSizes' 
                    :pageSize='pageSize' >
                    </only-paging>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
export default {
    data () {
        return {
            /** 内部组件*/
            formCondition: {
                shedId: '', //棚点id
                uName: '', //用户
                startTime: '', //开始时间
                endTime: '' //结束时间
            },
            pickerOptions: {
                shortcuts: [{
                    text: '今天',
                    onClick(picker) {
                    picker.$emit('pick', new Date());
                    }
                }, {
                    text: '昨天',
                    onClick(picker) {
                    const date = new Date();
                    date.setTime(date.getTime() - 3600 * 1000 * 24);
                    picker.$emit('pick', date);
                    }
                }, {
                    text: '一周前',
                    onClick(picker) {
                    const date = new Date();
                    date.setTime(date.getTime() - 3600 * 1000 * 24 * 7);
                    picker.$emit('pick', date);
                    }
                }]
            },
            dialogScreenVisible: false,
            formLabelWidth: '50px',
            checkedData: '', //保存选中行,数据id
            head: '',//表头
            fileName: '报表', //文件名
            url: process.env.API_ROOT, //实时地址

            /*1.0功能按钮组件，name必须为字符串*/
            tabActiveName: null, //默认选中项
            funMenuButList: [ //列表
                {
                    name: '1',
                    label: '查询',
                    icon: 'el-icon-search'
                },
                {
                    name: '2',
                    label: '筛选',
                    icon: 'el-icon-coin'
                },
                {
                    name: '3',
                    label: '删除',
                    icon: 'el-icon-folder-delete'
                },
                {
                    name: '4',
                    label: '刷新',
                    icon: 'el-icon-refresh'
                },
                {
                    name: '5',
                    label: '导入',
                    icon: 'el-icon-sell'
                },
                {
                    name: '6',
                    label: '导出',
                    icon: 'el-icon-sold-out'
                },
                {
                    name: '7',
                    label: '返回',
                    icon: 'el-icon-d-arrow-left'
                },
            ],

            /**2.0table组件参数 */
            list: [], // table数据
            options: {
                stripe: true, // 是否为斑马纹 table
                loading: false, // 是否添加表格loading加载动画
                highlightCurrentRow: false, // 是否支持当前行高亮显示
                mutiSelect: true, // 是否支持列表项复选框功能
                expand: true //是否可以展开行数据
            }, // table 的参数
            columns: [
                {
                    prop: 'serialNumber',  //对应字段
                    label: '序号',  //表头
                    align: 'center',  //对齐方式
                    sortable: true,  //是否显示排序 
                    minWidth: 80
                },
                 {
                    prop: 'serialNumber',  //对应字段
                    label: '操作记录',  //表头
                    align: 'center',  //对齐方式
                    sortable: true,  //是否显示排序 
                    minWidth: 80
                },
                 {
                    prop: 'serialNumber',  //对应字段
                    label: '操作员',  //表头
                    align: 'center',  //对齐方式
                    sortable: true,  //是否显示排序 
                    minWidth: 80
                },
            ], // 需要展示的列
            operates: {
                width: 140,
                fixed: 'right',
                list: [
                    {
                        id:'1',
                        label: '查看',
                        type: 'warning',
                        show: true,
                        icon: 'el-icon-edit',
                        plain: true,
                        disabled: false,
                        method: (index, row) => {
                            this.handleEdit(index, row)
                        }
                    },
                    {
                        id:'2',
                        label: '删除',
                        type: 'danger',
                        icon: 'el-icon-delete',
                        show: true,
                        plain: false,
                        disabled: false,
                        method: (index, row) => {
                            this.handleDel(index, row)
                        }
                    }
                ]
            }, // 列操作按钮
            inline: false, //展开行，行内还是块级
            defaultSort: {prop: 'serialNumber', order: ''}, //默认排序,ordeer取值

            /**3.0paging组件参数 */
            currentPage: 1, //默认第一页
            total: 0, //总条数
            pageSizes: [20, 40, 60, 100, 200], //每页展示多少条
            pageSize: 20 ,//默认第一页展示10条
            delIsShow: false,
            delDisabled: false //默认批量删除按钮禁用
        }        
    },
    created () {
    },
    methods: {
        /**内部方法 */
        //1.0查询列表
        subQueryData () { 
            this.dialogScreenVisible = false
            this.$message({
                message: '调用查询接口',
                center: true
            });
            //console.log(this.formCondition.startTime)
        },
         //3.0 CSV数据导出
        derivedData(){ //导出数据
            alert("导出数据")
        },

        /**
         * 外部方法
         */
        //1.0 tab功能选中项,需要与功能、事件一一对应
        tabHandleClick (name) {
            //console.log(name)
            //1.1 列表功能
            switch (name) {
                case '1':
                    this.subQueryData()
                    break;
                case '2':
                    this.dialogScreenVisible = true
                    break;
                case '3':
                    this.deletedData()
                    break;
                case '4':
                    this.$router.go(0)
                    break;
                case '5':
                    alert("导入数据")
                    break;
                case '6':
                    this.derivedData()
                    break;
                case '7':
                    this.$router.go(-1)
                    break;
            }
        },
       

        /**table组件事件 */
        //1.0查看、编辑
        handleEdit (index,row) {
            console.log(' index:', index)
            console.log(' row:', row)
        },
        // 2.0选中行
        handleSelectionChange (val) {
            console.log('val:', val)
            this.checkedData = '1,2,3'
            if(val.length>0){
                this.delDisabled = false
            }else{
                this.delDisabled = true
            }
        },
        //3.0删除封装
        deletedData(){ 
            console.log('需要删除的数据')
            this.$confirm('此操作将永久删除该数据, 是否继续?', '提示', {
                confirmButtonText: '确定',
                cancelButtonText: '取消',
                type: 'warning'
            }).then(() => {
                this.$message({
                    type: 'success',
                    message: '调用接口，删除成功!'
                });
            }).catch(() => {
                this.$message({
                    type: 'info',
                    message: '已取消删除'
                });          
            });
        },

        /**paging组件事件 */
        //4.0分页查询
        handleSizeChange(val){
            // 改变父组件的值
            this.currentPage = arguments[0].currentPage;
            this.pageSize = arguments[0].pageSize
            this.subQueryData()
            //console.log('传过来的数据'+this.currentPage,this.pageSize)
        },
        //4.1分页查询
        handleCurrentChange(val){
            this.currentPage = arguments[0].currentPage;
            this.pageSize = arguments[0].pageSize
            this.subQueryData()
            //console.log('第二个数据'+this.currentPage,this.pageSize)
        }
        
    }

}
</script>

<style lang="scss">
    #sys-operatin-data {
        height: 100%;
        position: relative;
        &>div.content {
            position: absolute;
            top: 40px;
            right: 0px;
            bottom: 0px;
            left: 0px;
            &>div {
                height: 100%;
                position: relative;
            }
        }

        /*列表样式*/
        div.content>div>div.table-list {
            position: absolute;
            top: 0px;
            right: 5px;
            bottom: 40px;
            left: 5px;
        }

    }
</style>
