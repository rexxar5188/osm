<template><div>
  <el-table
    :data="tableData.slice((currentPage-1)*pageSize,currentPage*pageSize)"
    height='420'
    size="medium "
    border
    stripe
    style="width: 100%">
    <el-table-column
      prop="id"
      label="ID"
      width="180">
    </el-table-column>
    <el-table-column
      prop="operationParams.lcmOperationType"
      label="操作类型">
    </el-table-column>
    <el-table-column
      prop="operationState"
      label="操作状态">
    </el-table-column>
    <el-table-column
      prop="startTime"
      label="开始时间"
      :formatter="startTimeFormat"
      value-format="yyyy-MM-dd">
    </el-table-column>
    <el-table-column
      prop="statusEnteredTime"
      label="状态输入时间"
      :formatter="enterTimeFormat">
    </el-table-column>
    <el-table-column
      prop=""
      label="详情">
      <div slot-scope="scope">
        <i  title="信息" class="el-icon-info action_icon" @click="handleInfo(scope.$index, scope.row)"></i>
      </div>
    </el-table-column>
  </el-table>
  <!--    分页器-->
  <div class="pagination">
    <el-pagination
      @size-change="handleSizeChange"
      @current-change="handleCurrentChange"
      :current-page="currentPage"
      :page-sizes="[5, 8, 10, 20]"
      :page-size="pageSize"
      layout="total, sizes,prev, pager, next"
      :total="total"
      prev-text="上一页"
      next-text="下一页">
    </el-pagination>
  </div>
  <!--    信息-->
  <el-dialog
    title="历史操作信息"
    :visible.sync="infoVisible"
    width="70%"
  >
    <label>
      <info :value="this.operationInfo"></info>
    </label>
    <span slot="footer" class="dialog-footer">
    <el-button @click="infoVisible = false">返 回</el-button>
  </span>
  </el-dialog>
</div>
</template>

<script>
  import Info from './info';
  export default {
    name: 'operation',
    components:{
      Info,
    },
    data(){
      return{
        operationInfo:{},
        infoVisible:false,
        tableData:[],
        currentPage:1,
        pageSize:5,

      }
    },
    mounted(){
      this.getOperation();
    },
    methods:{
      getOperation(){
        let type=this.$route.params.type;
        let id=this.$route.params.id;
        this.$api.operation[type](id)
          .then((response) => {this.tableData = response.data; },
            (response) => {console.log(response.data);
            })
      },
      handleInfo(index,row){
          this.infoVisible=true;
          this.operationInfo=row;
      },
      startTimeFormat (row) {
        const date = new Date(row.startTime * 1000);
        const Y = date.getFullYear() + '-';
        const M = (date.getMonth() + 1 < 10 ? '0' + (date.getMonth() + 1) : date.getMonth() + 1) + '-';
        const D = date.getDate() + ' ';
        const h = date.getHours() + ':';
        const m = date.getMinutes() + ':';
        const s = date.getSeconds();
        return Y+M+D+h+m+s;
      },
      enterTimeFormat (row) {
        const date = new Date(row.statusEnteredTime * 1000);
        const Y = date.getFullYear() + '-';
        const M = (date.getMonth() + 1 < 10 ? '0' + (date.getMonth() + 1) : date.getMonth() + 1) + '-';
        const D = date.getDate() + ' ';
        const h = date.getHours() + ':';
        const m = date.getMinutes() + ':';
        const s = date.getSeconds();
        return Y+M+D+h+m+s;
      },
    },
  };
</script>

<style scoped>

</style>
