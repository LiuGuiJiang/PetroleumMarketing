
<template>
    <!-- 分页组件封装  -->
    <div class="paging">
        <el-row>
            <el-col :span="3" style="text-align: center;">
                <el-button v-show="delIsShowL == true" type="danger" icon="el-icon-delete" size="mini"
                @click="deleteSelectedItems"
                :disabled="delDisabledL">{{delName}}</el-button>
            </el-col>
            <el-col :span="21" style="float: right;text-align:right;">
                <el-pagination background 
                @size-change="handleSizeChange" 
                @current-change="handleCurrentChange" 
                :current-page="currentPageL" 
                :page-sizes="pageSizesL" 
                :page-size="pageSizeL" 
                :pager-count="5"
                layout="total, sizes, prev, pager, next, jumper" 
                :total="totalL">
                </el-pagination>
            </el-col>
        </el-row>
    </div>
    
</template>
 
<script>
export default {
    props: {
        currentPage: Number,
        total: Number,
        pageSizes: Array,
        pageSize: Number,
        delName: {
            default: '批量删除',
            type:String
        },
        delDisabled: Boolean,
        delIsShow: Boolean
    },
    data() {
        return {
            currentPageL: this.currentPage, //默认第一页
            totalL: this.total, //总条数
            pageSizesL: this.pageSizes, //每页展示多少条
            pageSizeL: this.pageSize, //默认第一页展示10条
            delDisabledL: this.delDisabled, //删除按钮禁用状态
            delIsShowL: this.delIsShow //是否显示删除按钮
        };
    },
    computed: {
        
    },
    watch: {
        total(val){ //监听总数量
            this.totalL = val
        },
        delDisabled(val){ //监听批量删除按钮的状态
            this.delDisabledL = val
        }
    },
    mounted() {},
    methods: {
        handleSizeChange(val) { //页数改变 
            //console.log(val)
            this.pageSizeL = val
            this.$emit('handleSizeChange',{ currentPage: this.currentPageL, pageSize: val } )
                
        },
        handleCurrentChange(val) { //条数改变
            //console.log(val)
            this.currentPageL = val
            this.$emit('handleCurrentChange', { currentPage: val, pageSize: this.pageSizeL })
        },
        deleteSelectedItems() { //删除选中项
            this.$emit('deleteSelectedItems')
        }
    }
  
};
</script>

<style lang="scss">
    .paging {
        padding:0 5px;
        /*按钮样式*/
        .el-button--mini {
            padding: 7px 3px;
            margin: 2px 0;
        }

        /*分页样式*/
        .el-pagination__total,.el-pagination__jump {
            color: aliceblue;
        }
        .el-pagination__jump {
            margin-left: 10px;
        }
        .el-pagination__total,.el-pagination__sizes {
            margin-right: 0px;
        }
        @media screen and (max-width: 992px) {
            .el-pager {
                display: none;
            }
        }
        @media screen and (max-width: 768px) {
            .el-pagination__jump {
                display: none !important; 
            }
        }
    }
</style>