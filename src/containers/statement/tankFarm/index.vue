<template>
    <div id="sys-well-site">
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
                <!-- 筛选 -->
                <el-dialog v-dialogDrag class="dialog" title="筛选条件" :visible.sync="dialogScreenVisible">
                    <el-form :model="formCondition" :inline="false" label-width="60px">

                        <el-col :xs="24" :sm="24" :md="12" :lg="12" :xl="12">
                            <el-form-item label="项目">
                                <el-select size="mini" v-model="formCondition.shedId" placeholder="选择项目">
                                    <el-option label="全部" value=""></el-option>
                                    <!-- <el-option v-for="(item,i) in this.$store.getters.getShedList" :key="i" :label="item.baseName" :value="item.id"></el-option> -->
                                </el-select>
                            </el-form-item>
                        </el-col>
                        
                        <el-col :xs="24" :sm="24" :md="12" :lg="12" :xl="12">
                            <el-form-item label="油田">
                                <el-select size="mini" v-model="formCondition.shedId" placeholder="选择油田">
                                    <el-option label="全部" value=""></el-option>
                                    <!-- <el-option v-for="(item,i) in this.$store.getters.getShedList" :key="i" :label="item.baseName" :value="item.id"></el-option> -->
                                </el-select>
                            </el-form-item>
                        </el-col>
                        
                        <el-col :xs="24" :sm="24" :md="12" :lg="12" :xl="12">
                            <el-form-item label="井位">
                                <el-input size="mini" v-model="formCondition.search" placeholder="输入井位标识、井号、井型"></el-input>
                            </el-form-item>
                        </el-col>
                        
                    </el-form>
                    <div slot="footer" class="dialog-footer">
                        <el-button size="mini" @click="dialogScreenVisible = false">取 消</el-button>
                        <el-button size="mini" type="primary" @click="subQueryData">确 定</el-button>
                    </div>
                </el-dialog>
                
                <!-- 新增/编辑 -->
                <el-dialog v-dialogDrag class="dialog" :title="isAddEdit == 1 ? '新增信息' : '编辑信息'" :visible.sync="dialogScreenVisible1">
                    <el-form :model="messageData" :rules="rules" ref="messageData" :inline="false" label-width="100px">
                        <el-col :xs="24" :sm="24" :md="12" :lg="12" :xl="12">
                            <el-form-item label="井号" prop="wellNum" autofocus>
                                <el-input size="mini" v-model="messageData.wellNum"></el-input>
                            </el-form-item>
                        </el-col>
                        
                        <el-col :xs="24" :sm="24" :md="12" :lg="12" :xl="12">
                            <el-form-item label="井别" prop="wellSpacing">
                                <el-input size="mini" v-model="messageData.wellSpacing"></el-input>
                            </el-form-item>
                        </el-col>

                        <el-col :xs="24" :sm="24" :md="12" :lg="12" :xl="12">
                            <el-form-item label="井型" prop="wellType">
                                <el-input size="mini" v-model="messageData.wellType"></el-input>
                            </el-form-item>
                        </el-col>

                        <el-col :xs="24" :sm="24" :md="12" :lg="12" :xl="12">
                            <el-form-item label="井位图片" prop="imageUrl">
                                <el-input size="mini" v-model="messageData.imageUrl"></el-input>
                            </el-form-item>
                        </el-col>

                        <el-col :xs="24" :sm="24" :md="12" :lg="12" :xl="12">
                            <el-form-item label="合同类型" prop="contractType">
                                <el-input size="mini" v-model="messageData.contractType"></el-input>
                            </el-form-item>
                        </el-col>

                        <el-col :xs="24" :sm="24" :md="12" :lg="12" :xl="12">
                            <el-form-item label="方向海拔" prop="directionAltitude">
                                <el-input size="mini" v-model="messageData.directionAltitude" placeholder="方向海拔高程"></el-input>
                            </el-form-item>
                        </el-col>

                        <el-col :xs="24" :sm="24" :md="12" :lg="12" :xl="12">
                            <el-form-item label="钻机型号" prop="drillingRigModel">
                                <el-input size="mini" v-model="messageData.drillingRigModel"></el-input>
                            </el-form-item>
                        </el-col>

                        <el-col :xs="24" :sm="24" :md="12" :lg="12" :xl="12">
                            <el-form-item label="地面海拔" prop="groundAltitude">
                                <el-input size="mini" v-model="messageData.groundAltitude" placeholder="地面海拔高程"></el-input>
                            </el-form-item>
                        </el-col>

                        <el-col :xs="24" :sm="24" :md="12" :lg="12" :xl="12">
                            <el-form-item label="补心海拔" prop="heartAltitude">
                                <el-input size="mini" v-model="messageData.heartAltitude"></el-input>
                            </el-form-item>
                        </el-col>

                        <el-col :xs="24" :sm="24" :md="12" :lg="12" :xl="12">
                            <el-form-item label="标识符" prop="wellIdentifier">
                                <el-input size="mini" v-model="messageData.wellIdentifier"></el-input>
                            </el-form-item>
                        </el-col>

                        <el-col :xs="24" :sm="24" :md="12" :lg="12" :xl="12">
                            <el-form-item label="项目" prop="projectId">
                                <el-select size="mini" v-model="messageData.projectId" placeholder="请选择项目">
                                    <el-option label="暂不确定" value="" ></el-option>
                                </el-select>
                            </el-form-item>
                        </el-col>

                        <el-col :xs="24" :sm="24" :md="12" :lg="12" :xl="12">
                            <el-form-item label="油田" prop="oilfieldId">
                                <el-select size="mini" v-model="messageData.oilfieldId" placeholder="请选择项目">
                                    <el-option label="暂不确定" value="" ></el-option>
                                </el-select>
                            </el-form-item>
                        </el-col>

                        <el-col :xs="24" :sm="24" :md="12" :lg="12" :xl="12">
                            <el-form-item label="井队" prop="teamId">
                                <el-select size="mini" v-model="messageData.teamId" placeholder="请选择项目">
                                    <el-option label="暂不确定" value="" ></el-option>
                                </el-select>
                            </el-form-item>
                        </el-col>

                        <el-col :span="24">
                            <el-form-item label="状态" prop="state">
                                <el-radio-group v-model="messageData.state">
                                    <el-radio label="1">运行</el-radio>
                                    <el-radio label="2">启动</el-radio>
                                    <el-radio label="3">封存</el-radio>
                                    <el-radio label="">未知</el-radio>
                                </el-radio-group>
                            </el-form-item>
                        </el-col>

                        <el-col :xs="24" :sm="24" :md="12" :lg="12" :xl="12">
                            <el-form-item label="测量井深" prop="wellDeptMeasure">
                                <el-input size="mini" v-model="messageData.wellDeptMeasure"></el-input>
                            </el-form-item>
                        </el-col>

                        <el-col :xs="24" :sm="24" :md="12" :lg="12" :xl="12">
                            <el-form-item label="井深垂深" prop="wellDeptVertical">
                                <el-input size="mini" v-model="messageData.wellDeptVertical"></el-input>
                            </el-form-item>
                        </el-col>

                        <el-col :xs="24" :sm="24" :md="12" :lg="12" :xl="12">
                            <el-form-item label="纵坐标" prop="x">
                                <el-input size="mini" v-model="messageData.x" placeholder="井口实测纵坐标"></el-input>
                            </el-form-item>
                        </el-col>

                        <el-col :xs="24" :sm="24" :md="12" :lg="12" :xl="12">
                            <el-form-item label="横坐标" prop="y">
                                <el-input size="mini" v-model="messageData.y" placeholder="井口实测横坐标"></el-input>
                            </el-form-item>
                        </el-col>

                        <el-col :xs="24" :sm="24" :md="12" :lg="12" :xl="12">
                            <el-form-item label="位置坐标" prop="xy">
                                <el-input size="mini" v-model="messageData.xy" placeholder="格式为：0000,000"></el-input>
                            </el-form-item>
                        </el-col>

                        <el-col :xs="24" :sm="24" :md="12" :lg="12" :xl="12">
                            <el-form-item label="备注" prop="remarks">
                                <el-input size="mini" type="textarea" autosize v-model="messageData.remarks"></el-input>
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
import onlyLine from '@/components/Echarts/Line.js'
export default {
    data () {
        return {
            /** 内部组件*/
            formCondition: { //筛选条件
                id: '', //井位id
                pId: '', //项目id
                oId: '', //油田id
                search: '', //井位标识、井号、井型
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
            dialogScreenVisible: false, //筛选
            dialogScreenVisible1: false, //新增、编辑
            dialogScreenVisible2: false, //详情
            isAddEdit:1,  //是否增加、编辑
            messageData: { //新增、编辑字段
                id: "", //井位id
                wellNum: "", //井号
                wellSpacing: "", //井别
                wellType: "", //井型
                imageUrl: "", //井位图片，特殊
                contractType: "", //合同类型
                directionAltitude: "", //方向海拔高程
                drillingRigModel: "", //钻机型号
                groundAltitude: "", //地面海拔高程
                heartAltitude: "", //补心海拔
                wellIdentifier: "", //标识符
                oilfieldId: "", //油田id
                projectId: "", //项目id
                remarks: "", //备注
                state: "", //状态，单选框
                teamId: "", //井队id
                wellDeptMeasure: "", //测量井深
                wellDeptVertical: "", //井深，垂深
                x: "", //井口实测纵坐标
                xy: "", //未知坐标
                y: "" //井口实测横坐标
            },
            detailsData:{}, //查看详情数据
            rules: {  //验证
                wellNum: [
                    { required: true, message: '请输入井号', trigger: 'blur' }
                ],
                // projectId:[
                //     { required: true, message: '请选择项目', trigger: 'change' }
                // ]
            },
            checkedData: null, //保存选中行数据
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
                highlightCurrentRow: true, // 是否支持当前行高亮显示
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
                    prop: 'wellNum',  //对应字段
                    label: '井号',  //表头
                    align: 'center',  //对齐方式
                    sortable: true,  //是否显示排序 
                    minWidth: 120
                },
                {
                    prop: 'wellSpacing',  //对应字段
                    label: '井别',  //表头
                    align: 'center',  //对齐方式
                    sortable: true,  //是否显示排序 
                    minWidth: 80
                },
                {
                    prop: 'wellType',  //对应字段
                    label: '井型',  //表头
                    align: 'center',  //对齐方式
                    sortable: true,  //是否显示排序 
                    minWidth: 100
                },
                 {
                    prop: 'pName',  //对应字段
                    label: '项目名称',  //表头
                    align: 'center',  //对齐方式
                    sortable: true,  //是否显示排序 
                    minWidth: 120
                },
                // {
                //     prop: 'wellIdentifier',  //对应字段
                //     label: '标识符',  //表头
                //     align: 'center',  //对齐方式
                //     sortable: true,  //是否显示排序 
                //     minWidth: 110
                // },
                {
                    prop: 'drillingRigModel',  //对应字段
                    label: '钻机型号',  //表头
                    align: 'center',  //对齐方式
                    sortable: true,  //是否显示排序 
                    minWidth: 120
                },
                {
                    prop: 'xy',  //对应字段
                    label: '地理位置坐标',  //表头
                    align: 'center',  //对齐方式
                    sortable: true,  //是否显示排序 
                    minWidth: 160
                },
                
                {
                    prop: 'contractType',  //对应字段
                    label: '合同类型',  //表头
                    align: 'center',  //对齐方式
                    sortable: true,  //是否显示排序 
                    minWidth: 120
                },               
                // {
                //     prop: 'imageUrl',  //对应字段
                //     label: '井位图片',  //表头
                //     align: 'center',  //对齐方式
                //     sortable: true,  //是否显示排序 
                //     minWidth: 130
                // },
                {
                    prop: 'pManager',  //对应字段
                    label: '项目经理',  //表头
                    align: 'center',  //对齐方式
                    sortable: true,  //是否显示排序 
                    minWidth: 120
                },
                  {
                    prop: 'state',  //对应字段
                    label: '状态',  //表头
                    align: 'center',  //对齐方式
                    sortable: true,  //是否显示排序 
                    minWidth: 70,
                    render: (h, params) => {
                        return h('el-tag', {
                            props: {type: params.row.state === '1' ? 'success' : params.row.state === '2' ? 'primary' : params.row.state === '3' ? 'warning' : 'info'} // 组件的props
                        }, params.row.state === '1' ? '运行' : params.row.state === '2' ? '启动' : params.row.state === '3' ? '封存' : '未知')
                    }
                },
                {
                    prop: 'directionAltitude',  //对应字段
                    label: '方向海拔高程',  //表头
                    align: 'center',  //对齐方式
                    sortable: true,  //是否显示排序 
                    minWidth: 160
                },           
                {
                    prop: 'groundAltitude',  //对应字段
                    label: '地面海拔高程',  //表头
                    align: 'center',  //对齐方式
                    sortable: true,  //是否显示排序 
                    minWidth: 160
                },
                {
                    prop: 'tTeamNum',  //对应字段
                    label: '队号',  //表头
                    align: 'center',  //对齐方式
                    sortable: true,  //是否显示排序 
                    minWidth: 80
                },
                {
                    prop: 'heartAltitude',  //对应字段
                    label: '补心海拔',  //表头
                    align: 'center',  //对齐方式
                    sortable: true,  //是否显示排序 
                    minWidth: 120
                },
                {
                    prop: 'wellDeptMeasure',  //对应字段
                    label: '井深（测量）',  //表头
                    align: 'center',  //对齐方式
                    sortable: true,  //是否显示排序 
                    minWidth: 120
                },
                {
                    prop: 'oFirstParty',  //对应字段
                    label: '甲方',  //表头
                    align: 'center',  //对齐方式
                    sortable: true,  //是否显示排序 
                    minWidth: 100
                },
                {
                    prop: 'tTeamManager',  //对应字段
                    label: '平台经理',  //表头
                    align: 'center',  //对齐方式
                    sortable: true,  //是否显示排序 
                    minWidth: 100
                },
                {
                    prop: 'oAddress',  //对应字段
                    label: '所在位置',  //表头
                    align: 'center',  //对齐方式
                    sortable: true,  //是否显示排序 
                    minWidth: 120
                },
                {
                    prop: 'x',  //对应字段
                    label: '井口实测纵坐标',  //表头
                    align: 'center',  //对齐方式
                    sortable: true,  //是否显示排序 
                    minWidth: 160
                },
                {
                    prop: 'tTeamName',  //对应字段
                    label: '队名',  //表头
                    align: 'center',  //对齐方式
                    sortable: true,  //是否显示排序 
                    minWidth: 80
                },
                {
                    prop: 'y',  //对应字段
                    label: '井口实测横坐标',  //表头
                    align: 'center',  //对齐方式
                    sortable: true,  //是否显示排序 
                    minWidth: 160
                },
                 
                {
                    prop: 'oOwner',  //对应字段
                    label: '业主',  //表头
                    align: 'center',  //对齐方式
                    sortable: true,  //是否显示排序 
                    minWidth: 70
                },
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
                    // {
                    //     id:'2',
                    //     label: '删除',
                    //     type: 'danger',
                    //     icon: 'el-icon-delete',
                    //     show: true,
                    //     plain: false,
                    //     disabled: false,
                    //     method: (index, row) => {
                    //         this.handleDel(index, row)
                    //     }
                    // }
                ]
            }, // 列操作按钮
            inline: false, //展开行，行内还是块级
            defaultSort: {prop: 'serialNumber', order: ''}, //默认排序,ordeer取值

            /**3.0paging组件参数 */
            currentPage: 1, //默认第一页
            total: 0, //总条数
            pageSizes: [30, 40, 60, 100, 200], //每页展示多少条
            pageSize: 30 ,//默认第一页展示10条
            delName:'点我删除', //删除按钮名字
            delIsShow: true,
            delDisabled: true //默认批量删除按钮禁用
        }        
    },
    created () {
        this.subQueryData()
    },
    mounted () {},
    methods: {
        /************** 内部组件方法 ***************/
        //1.0查询列表
        subQueryData () { 
            this.dialogScreenVisible = false
            this.$store.commit("onIsLoading",true)
            let id = this.formCondition.id;
            let pId = this.formCondition.pId;
            let oId = this.formCondition.oId;
            let search = this.formCondition.search

            this.$api.JWellSite.selWellSite(id,pId,oId,search,this.pageSize,this.currentPage).then(res => {
                //console.log(res)
                if(res.code == 200){
                    let rows = res.data.datas;
                    for(var i=0;i<rows.length;i++){
                        rows[i].serialNumber = i+1
                    }
                    this.list = rows;
                    this.total = res.data.total
                }else{
                    this.$message({
                        message: (res.data),
                        type: 'error'
                    })
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
        //1.1更新列表，恢复筛选前默认列表
        renewalList () {
            for(var key in this.formCondition){
                this.formCondition[key] = ''
            }
            this.subQueryData()
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
        //4.0 新增\编辑确认
        addEditAffirm (formName) {
            this.$refs[formName].validate((valid) => {
                if (valid) {
                    let data = this.messageData;
                    //console.log(data)

                    //1.判断是添加还是编辑,去掉id,bug
                    // if(this.isAddEdit == 1){
                    //     delete data.id
                    // }
                    
                    this.$api.JWellSite.updWellSite(data).then(res => {
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
            if(ids){
                //2.提醒是否确定删除
                this.$confirm('此操作将永久删除该数据, 是否继续?', '提示', {
                    confirmButtonText: '确定',
                    cancelButtonText: '取消',
                    type: 'warning'
                }).then(() => {
                    //3.调用删除接口
                    this.$api.JWellSite.delWellSite(ids).then(res => {
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
        //6.0 数据导出
        derivedData(){ //导出数据
            alert("导出数据")
        },

        /************** 外部组件方法 ***************/
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
        //1.0 查看、编辑（表格最后一个单元格操作）
        handleEdit (index,row) {
            console.log(' index:', index)
            console.log(' row:', row)
            this.detailsData = row
            this.dialogScreenVisible2 = true
        },
        //1.1 删除单条（表格最后一个单元格操作）
        handleDel (index,row) {
            console.log(' index:', index)
            console.log(' row:', row)
        },
        //2.0 当表格的当前行发生变化的时候会触发该事件,选中单行
        selectTheSingle (currentRow) {
            //console.log(currentRow)
        },
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
            //console.log(row)
            this.isAddEdit = 2;
            for(var key in this.messageData){
                this.messageData[key] = row[key]
            }
            this.dialogScreenVisible1 = true;
        },
        

        /**paging组件事件 */
        //1.0分页查询
        handleSizeChange(val){
            // 改变父组件的值
            this.currentPage = arguments[0].currentPage;
            this.pageSize = arguments[0].pageSize
            this.subQueryData()
            //console.log('传过来的数据'+this.currentPage,this.pageSize)
        },
        //1.1分页查询
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
    #sys-well-site {
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
        div.content div.table-list {
            position: absolute;
            top: 0px;
            right: 5px;
            bottom: 40px;
            left: 5px;
        }

    }
</style>
