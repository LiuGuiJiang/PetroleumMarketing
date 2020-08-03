<template>
    <div id="ite-production-day">
        <!-- 生产日报 -->
        <!-- 功能菜单栏 -->
        <div>
            <onlyFunctionMenu 
            :funMenuButList="funMenuButList"
            :tabActiveName="tabActiveName"
            @tabHandleClick="tabHandleClick"/>
            <div style="margin-left:20px;margin-top:10px;">
                <el-radio @change="switcherItem" v-model="radio" :label="1">国内生产</el-radio>
                <el-radio @change="switcherItem" v-model="radio" :label="2">国际生产</el-radio>
            </div>
        </div>
        <!-- 内容 -->
        <div class="content">
            <!-- 列表 -->
            <div>
                <!-- 筛选 -->
                <el-dialog v-dialogDrag class="dialog" title="筛选条件" :visible.sync="dialogScreenVisible">
                    <el-form :model="formCondition" :inline="false" label-width="80px">
                        <el-col :xs="24" :sm="24" :md="12" :lg="12" :xl="12">
                            <el-form-item label="项目">
                                <el-input size="mini" v-model="formCondition.id"></el-input>
                            </el-form-item>
                        </el-col> 
                        <el-col :xs="24" :sm="24" :md="12" :lg="12" :xl="12">
                            <el-form-item label="队号/井号">
                                <el-input size="mini" v-model="formCondition.search" placeholder="请输入队号、井号"></el-input>
                            </el-form-item>
                        </el-col>                        
                    </el-form>
                    <div slot="footer" class="dialog-footer">
                        <el-button size="mini" @click="dialogScreenVisible = false">取 消</el-button>
                        <el-button size="mini" type="primary" @click="subQueryData">确 定</el-button>
                    </div>
                </el-dialog>
                
                <!-- 新增/编辑 -->
                <el-dialog v-dialogDrag class="dialog" :title="isAddEdit == 1 ? '新增信息' : '编辑信息'" :visible.sync="dialogScreenVisible1" 
               >
                    <el-form :model="messageData" :rules="rules" ref="messageData" :inline="false" label-width="150px">

                        <el-col :span="24">
                            <el-form-item label="类别" prop="country" autofocus>
                                <el-radio v-model="messageData.country" :label="1">国内生产</el-radio>
                                <el-radio v-model="messageData.country" :label="2">国际生产</el-radio>
                            </el-form-item>
                        </el-col> 

                        <el-col :xs="24" :sm="24" :md="12" :lg="12" :xl="12">
                            <el-form-item label="月度计划（m）" prop="monthPlan" autofocus>
                                <el-input size="mini" v-model="messageData.monthPlan"></el-input>
                            </el-form-item>
                        </el-col>                        
                        <el-col :xs="24" :sm="24" :md="12" :lg="12" :xl="12">
                            <el-form-item label="实际完成（m）" prop="monthActual">
                                <el-input size="mini" v-model="messageData.monthActual"></el-input>
                            </el-form-item>
                        </el-col>
                        <el-col :xs="24" :sm="24" :md="12" :lg="12" :xl="12">
                            <el-form-item label="年累计（m）" prop="yearAdd">
                                <el-input size="mini" v-model="messageData.yearAdd"></el-input>
                            </el-form-item>
                        </el-col>
                        <el-col :xs="24" :sm="24" :md="12" :lg="12" :xl="12">
                            <el-form-item label="年累计开钻（口）" prop="yearAddStartDrill">
                                <el-input size="mini" v-model="messageData.yearAddStartDrill"></el-input>
                            </el-form-item>
                        </el-col>

                        <el-col :xs="24" :sm="24" :md="12" :lg="12" :xl="12">
                            <el-form-item label="库存柴油（T）" prop="inventoryDiesel">
                                <el-input size="mini" autosize v-model="messageData.inventoryDiesel"></el-input>
                            </el-form-item>
                        </el-col>
                        <el-col :xs="24" :sm="24" :md="12" :lg="12" :xl="12">
                            <el-form-item label="日进尺（m）" prop="dayFootage">
                                <el-input size="mini" autosize v-model="messageData.dayFootage"></el-input>
                            </el-form-item>
                        </el-col>
                        <el-col :xs="24" :sm="24" :md="12" :lg="12" :xl="12">
                            <el-form-item label="概况" prop="survey">
                                <el-input size="mini"  autosize v-model="messageData.survey"></el-input>
                            </el-form-item>
                        </el-col>
                        <el-col :xs="24" :sm="24" :md="12" :lg="12" :xl="12">
                            <el-form-item label="工作内容" prop="workContent">
                                <el-input size="mini" autosize type="textare" v-model="messageData.workContent"></el-input>
                            </el-form-item>
                        </el-col>
                        <el-col :xs="24" :sm="24" :md="12" :lg="12" :xl="12">
                            <el-form-item label="操作者" prop="updateUser">
                                <el-input size="mini" autosize v-model="messageData.updateUser"></el-input>
                            </el-form-item>
                        </el-col>                       
                        <el-col :xs="24" :sm="24" :md="12" :lg="12" :xl="12">
                            <el-form-item label="实际井深（m）" prop="wellDepthActual">
                                <el-input size="mini" autosize v-model="messageData.wellDepthActual"></el-input>
                            </el-form-item>
                        </el-col>
                        <el-col :xs="24" :sm="24" :md="12" :lg="12" :xl="12">
                            <el-form-item label="计划井深（m）" prop="wellDepthPlan">
                                <el-input size="mini"  autosize v-model="messageData.wellDepthPlan"></el-input>
                            </el-form-item>
                        </el-col>
                        <el-col :xs="24" :sm="24" :md="12" :lg="12" :xl="12">
                            <el-form-item label="搬安日期" prop="moveDate">
                                <el-input size="mini"  autosize v-model="messageData.moveDate"></el-input>
                            </el-form-item>
                        </el-col>
                         <el-col :xs="24" :sm="24" :md="12" :lg="12" :xl="12">
                            <el-form-item label="完钻日期" prop="finishDrillDate">
                                <el-input size="mini"  autosize v-model="messageData.finishDrillDate"></el-input>
                            </el-form-item>
                        </el-col>
                         <el-col :xs="24" :sm="24" :md="12" :lg="12" :xl="12">
                            <el-form-item label="完井日期" prop="finishWellDate">
                                <el-input size="mini" autosize v-model="messageData.finishWellDate"></el-input>
                            </el-form-item>
                        </el-col>
                         <el-col :xs="24" :sm="24" :md="12" :lg="12" :xl="12">
                            <el-form-item label="年累计交井（口）" prop="planBuildWellDay">
                                <el-input size="mini"  autosize v-model="messageData.planBuildWellDay"></el-input>
                            </el-form-item>
                        </el-col>
                         <el-col :xs="24" :sm="24" :md="12" :lg="12" :xl="12">
                            <el-form-item label="开钻日期" prop="drillingDate">
                                <el-input size="mini"  autosize v-model="messageData.drillingDate"></el-input>
                            </el-form-item>
                        </el-col>
                    </el-form>
                    <div slot="footer" class="dialog-footer">
                        <el-button size="mini" @click="dialogScreenVisible1 = false">取 消</el-button>
                        <el-button size="mini" type="primary" @click="addEditAffirm('messageData')">确 定</el-button>
                    </div>
                </el-dialog>

                <!-- 查看详情 -->
                <el-dialog v-dialogDrag class="dialog"
                title="详情数据"
                :visible.sync="dialogScreenVisible2">
                <div class="details">
                    <p>
                        <span>名称</span>
                        <span style="float:right;">数据</span>
                    </p>
                    <p v-for="(item,i) in detailsData" :key="i">
                        <span>{{i}}</span>
                        <span style="float:right;">{{item}}</span>
                    </p>
                </div>
                <span slot="footer" class="dialog-footer">
                    <el-button type="primary" @click="dialogScreenVisible2 = false">退出</el-button>
                </span>
                </el-dialog>

                <!-- list 列表展示-->
                <div class="table-list" v-loading="this.$store.getters.isLoading"
                element-loading-text="加载中..."
                element-loading-background="rgba(0, 0, 0, 0.5)">
                    <only-table :list="list"
                        @handleSelectionChange="handleSelectionChange"
                        @selectTheSingle="selectTheSingle"
                        @doubleClickTheSelected="doubleClickTheSelected"
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
                    @deleteSelectedItems="deleteSelectedItems"
                    :delName="delName"
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
                id:'',
                bId:'',
                search:'',
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
            radio: 1,
            dialogScreenVisible: false,
            dialogScreenVisible1: false,
            dialogScreenVisible2: false, //详情
            isAddEdit:1,  //是否增加/编辑
            messageData: { //新增/编辑字段
                id:'',
                baseId:'',
                monthPlan:'',
                monthActual:'',
                finishPercentage:'',
                yearAdd:'',
                yearAddStartDrill:'',
                yearAddFinishDrill:'',
                inventoryDiesel:'',
                dayFootage:'',
                survey:'',
                workContent:'',
                existProblems:'',
                // updateUser:'',
                // updateTime:'',
                remarks:'',
                wellDepthActual:'',
                wellDepthPlan:'',
                moveDate:'',
                finishDrillDate:'',
                finishWellDate:'',
                planBuildWellDay:'',
                country:'', //1是国内、2是国际
                drillingDate:''
            },
            detailsData:{}, //查看详情数据
            rules: {  //验证
                 country: [
                     { required: true, message: '请选择类别', trigger: 'change' }
                 ],
                // account: [
                //     { required: true, message: '请输入账号', trigger: 'blur' }
                // ],
                // password: [
                //     { required: true, message: '请输入密码', trigger: 'blur' }
                // ],
                // phone:[
                //     { required: true, message: '请输入电话', trigger: 'blur' },
                //     { max: 11, message: '长度在 11 个字符之内', trigger: 'blur' }
                // ]
                // deptId:[
                //     { required: true, message: '请选择部门', trigger: 'change' }
                // ]
            },
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
                    label: '更新',
                    icon: 'el-icon-search'
                },
                {
                    name: '2',
                    label: '新增',
                    icon: 'el-icon-plus'
                },
                {
                    name: '3',
                    label: '筛选',
                    icon: 'el-icon-coin'
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
                stripe: false, // 是否为斑马纹 table
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
                    prop: 'pName',  //对应字段*
                    label: '项目',  //表头
                    align: 'center',  //对齐方式
                    sortable: true,  //是否显示排序 
                    minWidth: 130
                },
                 {
                    prop: 'tTeamNum',  //对应字段*
                    label: '井号',  //表头
                    align: 'center',  //对齐方式
                    sortable: true,  //是否显示排序 
                    minWidth: 130
                },
                // {
                //     prop: 'existProblems',  //对应字段*
                //     label: '',  //表头
                //     align: 'center',  //对齐方式
                //     sortable: true,  //是否显示排序 
                //     minWidth: 130
                // },
                 {
                    prop: 'wellDepthPlan',  //对应字段*
                    label: '计划井深（m）',  //表头
                    align: 'center',  //对齐方式
                    sortable: true,  //是否显示排序 
                    minWidth: 130
                },
                {
                    prop: 'montnPlan',  //对应字段*
                    label: '月度计划（m）',  //表头
                    align: 'center',  //对齐方式
                    sortable: true,  //是否显示排序 
                    minWidth: 130
                },
                // {
                //     prop: 'sumYearAddStartDrill',  //对应字段*
                //     label: '',  //表头
                //     align: 'center',  //对齐方式
                //     sortable: true,  //是否显示排序 
                //     minWidth: 130
                // },
               
                {
                    prop: 'monthActual',  //对应字段*
                    label: '实际完成（m）',  //表头
                    align: 'center',  //对齐方式
                    sortable: true,  //是否显示排序 
                    minWidth:130
                },
                 {
                    prop: 'drillingDate',  //对应字段
                    label: '开钻日期',  //表头
                    align: 'center',  //对齐方式
                    sortable: true,  //是否显示排序 
                    minWidth: 120
                },
                {
                    prop: 'finishDrillDate',  //对应字段*
                    label: '完钻日期',  //表头
                    align: 'center',  //对齐方式
                    sortable: true,  //是否显示排序 
                    minWidth: 100
                },
                {
                    prop: 'proDayFootage',  //对应字段
                    label: '日进尺（m）',  //表头
                    align: 'center',  //对齐方式
                    sortable: true,  //是否显示排序 
                    minWidth: 120
                },           
               
                {
                    prop: 'InventoryDiesel',  //对应字段*
                    label: '库存柴油（T）',  //表头
                    align: 'center',  //对齐方式
                    sortable: true,  //是否显示排序 
                    minWidth: 130
                },
                // {
                //     prop: 'bWellSpacing',  //对应字段*
                //     label: '',  //表头
                //     align: 'center',  //对齐方式
                //     sortable: true,  //是否显示排序 
                //     minWidth: 80
                // },
                // {
                //     prop: 'sumYearAdd',  //对应字段*
                //     label: '年累计（m）',  //表头
                //     align: 'center',  //对齐方式
                //     sortable: true,  //是否显示排序 
                //     minWidth: 100
                // },
                {
                    prop: 'yearAddStartDrill',  //对应字段*
                    label: '年累计开钻（口）',  //表头
                    align: 'center',  //对齐方式
                    sortable: true,  //是否显示排序 
                    minWidth: 150
                },
                {
                    prop: 'planBuildWellDay',  //对应字段*
                    label: '年累计交井（口）',  //表头
                    align: 'center',  //对齐方式
                    sortable: true,  //是否显示排序 
                    minWidth: 150
                },
                
                {
                    prop: 'pManager',  //对应字段*
                    label: '负责人',  //表头
                    align: 'center',  //对齐方式
                    sortable: true,  //是否显示排序 
                    minWidth: 130
                },
                {
                    prop: 'bWellType',  //对应字段*
                    label: '井型',  //表头
                    align: 'center',  //对齐方式
                    sortable: true,  //是否显示排序 
                    minWidth: 120
                },
                {
                    prop: 'wellDepthActual',  //对应字段*
                    label: '实际井深（m）',  //表头
                    align: 'center',  //对齐方式
                    sortable: true,  //是否显示排序 
                    minWidth: 140
                },
                {
                    prop: 'yearAdd',  //对应字段*
                    label: '年累计（m）',  //表头
                    align: 'center',  //对齐方式
                    sortable: true,  //是否显示排序 
                    minWidth: 140
                },
               
                 {
                    prop: 'moveDate',  //对应字段
                    label: '搬安日期',  //表头
                    align: 'center',  //对齐方式
                    sortable: true,  //是否显示排序 
                    minWidth: 120
                },
                //  {
                //     prop: 'country',  //对应字段*
                //     label: '',  //表头
                //     align: 'center',  //对齐方式
                //     sortable: true,  //是否显示排序 
                //     minWidth: 80
                // },
                //  {
                //     prop: 'yearAddFinishDrill',  //对应字段*
                //     label: '',  //表头
                //     align: 'center',  //对齐方式
                //     sortable: true,  //是否显示排序 
                //     minWidth: 300
                // },
                 {
                    prop: 'finishWellDate',  //对应字段*
                    label: '完井日期',  //表头
                    align: 'center',  //对齐方式
                    sortable: true,  //是否显示排序 
                    minWidth: 120
                },
                 {
                    prop: 'tTeamManager',  //对应字段*
                    label: '平台经理',  //表头
                    align: 'center',  //对齐方式
                    sortable: true,  //是否显示排序 
                    minWidth: 120
                },
                // {
                //     prop: 'sumMonthPlan',  //对应字段*
                //     label: '月度计划（m）',  //表头
                //     align: 'center',  //对齐方式
                //     sortable: true,  //是否显示排序 
                //     minWidth: 120
                // },
                {
                    prop: 'finishPercentage',  //对应字段*
                    label: '完成百分比',  //表头
                    align: 'center',  //对齐方式
                    sortable: true,  //是否显示排序 
                    minWidth: 120
                },
                // {
                //     prop: 'sumFinishPercentage',  //对应字段*
                //     label: '完成百分比',  //表头
                //     align: 'center',  //对齐方式
                //     sortable: true,  //是否显示排序 
                //     minWidth: 120
                // },
                {
                    prop: 'survey',  //对应字段*
                    label: '概况',  //表头
                    align: 'center',  //对齐方式
                    sortable: true,  //是否显示排序 
                    minWidth: 120
                },
                 {
                    prop: 'workContent',  //对应字段*
                    label: '工作内容',  //表头
                    align: 'center',  //对齐方式
                    sortable: true,  //是否显示排序 
                    minWidth: 300
                },
                // {
                //     prop: 'sumMonthActual',  //对应字段*
                //     label: '实际完成（m）',  //表头
                //     align: 'center',  //对齐方式
                //     sortable: true,  //是否显示排序 
                //     minWidth: 120
                // },
                // {
                //     prop: 'bWellNum',  //对应字段*
                //     label: '',  //表头
                //     align: 'center',  //对齐方式
                //     sortable: true,  //是否显示排序 
                //     minWidth: 120
                // },
                // {
                //     prop: 'sumYearAddFinishDrillthActual',  //对应字段*
                //     label: '',  //表头
                //     align: 'center',  //对齐方式
                //     sortable: true,  //是否显示排序 
                //     minWidth: 120
                // },
                // {
                //     prop: 'sumDayFootage',  //对应字段*
                //     label: '日进尺',  //表头
                //     align: 'center',  //对齐方式
                //     sortable: true,  //是否显示排序 
                //     minWidth: 120
                // },

            ], // 需要展示的列
            operates: {
                width: 70,
                fixed: 'right',
                list: [
                    {
                        id:'1',
                        label: '查看',
                        type: 'success',
                        show: true,
                        icon: 'el-icon-view',
                        plain: true,
                        disabled: false,
                        method: (index, row) => {
                            this.handleEdit(index, row)
                        }
                    },
                ]
            }, // 列操作按钮
            inline: false, //展开行，行内还是块级
            defaultSort: {prop: 'serialNumber', order: ''}, //默认排序,ordeer取值

            /**3.0paging组件参数 */
            currentPage: 1, //默认第一页
            total: 0, //总条数
            pageSizes: [20, 40, 60, 100, 200], //每页展示多少条
            pageSize: 30 ,//默认第一页展示10条
            delName:'点我删除', //删除按钮名字
            delIsShow: true,
            delDisabled: false //默认批量删除按钮禁用
        }        
    },
    created () {
    },
    mounted () {       
       this.subQueryData()
    },
    methods: {
         // 更新列表
        renewalList(){
             for(var key in this.formCondition){
                this.formCondition[key] = ''
            }
            this.subQueryData ()
        },
        /**内部方法 */
        //1.0查询列表
        subQueryData () { 
           this.dialogScreenVisible = false
            this.$store.commit("onIsLoading",true)
            let id = this.formCondition.id;
            let bId = this.formCondition.bId;
            let state=this.radio;
            let search = this.formCondition.search;
            this.$api.wProductionDay.selProductionDay(id,bId,state,search,this.pageSize,this.currentPage).then((res) => {                
                console.log(res.data) 
                if(res.code == 200){
                    var list=res.data.datas            
                    for(var i=0;i<res.data.datas.length;i++){
                        list[i].serialNumber=i+1
                    }    
                    this.list=list 
                    this.total = res.data.total
                }
                this.$store.commit("onIsLoading",false)                         
             }).catch((res) => {
                this.$message({
                    message: (res.message),
                    type: 'error'
                })
                this.$store.commit("onIsLoading",false)
            });
        },
        //2.0切换显示项
        switcherItem () {
            if(this.radio == 2) {
                //this.funMenuButList = this.funMenuButList2
                this.subQueryData()
            }else {
                //this.funMenuButList = this.funMenuButList1
                this.subQueryData()
            }
        },
         //2.0选中单行
        selectTheSingle (val) {
            // console.log(val)
        },
         //2.0 新增信息
        addMessage () {
           //2.1清空、显示弹框
            for(var key in this.messageData){
                this.messageData[key] = ''
            }
            this.dialogScreenVisible1 = true;
            this.isAddEdit = 1;
        },
        //3.0 编辑信息
        editMessage () {
            this.dialogScreenVisible1 = true;
            this.isAddEdit = 2;
        },
        //4.0 新增/编辑确认
        addEditAffirm (formName) {
            // this.dialogScreenVisible1 = false;
             this.$refs[formName].validate((valid) => {
                if (valid) {
                    let data = this.messageData;
                    console.log(data)

                    //1.判断是添加还是编辑,去掉id,bug
                    // if(this.isAddEdit == 1){
                    //     delete data.id
                    // }    

                    this.$api.wProductionDay.updProductionDay(data).then(res => {
                        //console.log(res)
                        if(res.code == 200){
                            this.$message({
                                message: "成功!",
                                type: 'success'
                            })
                            this.dialogScreenVisible1 = false;
                            this.subQueryData() //重新查询
                        }else{
                            this.$message({
                                message: (res.data),
                                type: 'error'
                            })
                        }                        
                    }).catch((res) => {
                        this.$message({
                            message: (res.message),
                            type: 'error'
                        })
                    });
                } else {
                    return false;
                }
            });
        },
         //5.0 删除封装,单条或者多条
        deletedData(ids){ 
            //1.判断是否选中有id
            console.log(ids)
            if(ids){
                //2.提醒是否确定删除
                this.$confirm('此操作将永久删除该数据, 是否继续?', '提示', {
                    confirmButtonText: '确定',
                    cancelButtonText: '取消',
                    type: 'warning'
                }).then(() => {
                    //3.调用删除接口
                    this.$api.wProductionDay.delProductionDay(ids).then(res => {
                        //console.log(res)
                        if(res.code == 200) {
                            this.$message({
                                type: 'success',
                                message: '删除成功!'
                            });
                            //4.如果删除成功！重置选中的ids,并重新查询，切记切记
                            this.checkedData = null;
                            this.subQueryData()
                        }else{
                            this.$message.error("删除失败!")
                        }
                    }).catch((res) => {
                        this.$message({
                            message: (res.message),
                            type: 'error'
                        })
                    });
                    
                }).catch(() => {
                    this.$message({
                        type: 'info',
                        message: '已取消删除'
                    });          
                });
            }else{
                this.$message.error("请选中选项！")
            }
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
                case '1': //更新
                    this.renewalList()
                    break;
                case '2': //新增、数据清空
                    this.addMessage()
                    break;
                case '3': //筛选
                    this.dialogScreenVisible = true
                    break;
                case '4': //刷新 
                    this.$router.go(0)
                    break;
                case '5': //导入
                    alert("导入数据")
                    break;
                case '6': //导出
                    this.derivedData()
                    break;
                case '7': //返回
                    this.$router.go(-1)
                    break;
            }
        },
       

        /**table组件事件 */
        //1.0查看、编辑
        handleEdit (index,row) {
            console.log(' index:', index)
            console.log(' row:', row)
            this.detailsData = row
            this.dialogScreenVisible2 = true
        },
        // 2.0选中行
        // 3.0 当选择项发生变化时会触发该事件、删除选中项
        handleSelectionChange (val) {
            //console.log('val:', val)
            //1.改变删除按钮是否禁用状态
            if(val.length>0){
                this.checkedData = val
                this.delDisabled = false
            }else{
                this.delDisabled = true
            }
        },
        // 4.0 某一行被双击时、编辑内容
        doubleClickTheSelected (row) {
            console.log(row)
            this.messageData=row
            this.isAddEdit = 2;
            for(var key in this.messageData){
                this.messageData[key] = row[key]
            }
            this.dialogScreenVisible1 = true;
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
        },
         //2.0 删除选中项
        deleteSelectedItems(){
            let ids = ''
            //1.拼接id
            for(var item of this.checkedData){
                ids += item.id+','
            }
            //2.去掉最后一个逗号
            ids = ids.slice(0,ids.length-1)
            this.deletedData(ids)
        }
        
    }

}
</script>

<style lang="scss">
    #ite-production-day {
        height: 100%;
        position: relative;
        &>div.content {
            position: absolute;
            top: 80px;
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
