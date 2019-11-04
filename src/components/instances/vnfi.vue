<template>
  <div>
    <el-table
      :data="tableDataCur.slice((currentPage-1)*pageSize,currentPage*pageSize)"
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
        prop="vnfd-ref"
        label="vnfd">
      </el-table-column>
      <el-table-column
        prop="member-vnf-index-ref"
        label="成员索引">
      </el-table-column>
      <el-table-column
        prop="nsr-id-ref"
        label="所属子网切片id">
      </el-table-column>
      <el-table-column
        prop="create-time"
        label="创建时间"
        :formatter="createTimeFormat">
      </el-table-column>
      <el-table-column
        prop=""
        label="详情">
        <template slot="header" slot-scope="scope">
          <el-input
            v-model="search"
            size="mini"
            placeholder="输入名称以搜索"/>
        </template>
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
      title="虚拟网元实例信息"
      :visible.sync="infoVisible"
      width="70%">
      <label>
        <info :value="this.vnfiInfo"></info>
      </label>
      <span slot="footer" class="dialog-footer">
    <el-button @click="infoVisible = false">返 回</el-button>
  </span>
    </el-dialog>
  </div>
</template>

<script>
  import Info from '../info';
  export default {
    name: 'vnfi',
    components:{
      Info
    },

    data(){
      return{
        vnfiInfo:{},
        infoVisible:false,
        tableData:[],
        search:'',
        currentPage: 1,
        pageSize:5,
        total: 0,

      }
    },
    mounted(){
      this.getVnfi();
    },
    computed:{
      tableDataCur () {
        if (this.search){
          let search=this.search;
          let res=this.tableData.filter(data => !search || data.id.toLowerCase().includes(search.toLowerCase())
            || data['vnfd-ref'].toLowerCase().includes(search.toLowerCase())
            || data['nsr-id-ref'].toLowerCase().includes(search.toLowerCase())
          );
          this.total = res.length;
          this.currentPage = 1;
          return res
        }
        this.total = this.tableData.length;
        this.currentPage = 1;
        return this.tableData
      }
    },
    methods:{
      getVnfi(){
        this.$api.vnfi.list().then((response) => {
          this.tableData = response.data;
        })
      },
      handleInfo(index,row){
        this.infoVisible=true;
        this.vnfiInfo=row;
      },
      createTimeFormat (row) {
        const date = new Date(row['created-time'] * 1000);
        const Y = date.getFullYear() + '-';
        const M = (date.getMonth() + 1 < 10 ? '0' + (date.getMonth() + 1) : date.getMonth() + 1) + '-';
        const D = date.getDate() + ' ';
        const h = date.getHours() + ':';
        const m = date.getMinutes() + ':';
        const s = date.getSeconds();
        return Y+M+D+h+m+s;
      },
      handleSizeChange(val) {
        this.pageSize = val;
      },
      handleCurrentChange(val) {
        this.currentPage = val;
      },

    },
  };
</script>

<style scoped>

</style>
