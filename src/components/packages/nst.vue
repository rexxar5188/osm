<template>
  <div>
<!--    表格-->
    <el-table
      :data="tableDataCur.slice((currentPage-1)*pageSize,currentPage*pageSize)"
      height='420'
      size="medium "
      border
      stripe
      style="width: 100%">
      <el-table-column
        prop="id"
        label="模板名称"
        width="180">
      </el-table-column>
      <el-table-column
        prop="_id"
        label="模板ID"
        width="180">
      </el-table-column>
      <el-table-column
        prop="_admin.usageState"
        label="使用情况">
      </el-table-column>
      <el-table-column
        prop="SNSSAI-identifier.slice-service-type"
        label="切片模板类型">
      </el-table-column>
      <el-table-column
        prop=""
        label="操作">
        <template slot="header" slot-scope="scope">
          <el-input
            v-model="search"
            size="mini"
            placeholder="输入名称以搜索"/>
        </template>
        <div slot-scope="scope">
          <i title="实例化" class="el-icon-caret-right action_icon" @click="handleInstantiate(scope.$index, scope.row)"></i>
          <i  title="编辑" class="el-icon-edit-outline action_icon" @click="handleEdit(scope.row)"></i>
          <i  title="信息" class="el-icon-info action_icon" @click="handleInfo(scope.$index, scope.row)"></i>
          <template>
            <el-popover
              placement="top"
              width="160"
              :ref="scope.$index"
              trigger="click"
              >
              <p>确定删除吗？</p>
              <div style="text-align: right; margin: 0">
                <el-button size="mini" type="text" @click="cancelDelete(scope.$index)">取消</el-button>
                <el-button type="primary" size="mini" @click="handleDelete(scope.$index,scope.row)">确定</el-button>
              </div>
              <i title="删除" class="el-icon-delete action_icon"  slot="reference"></i>
            </el-popover>
          </template>
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

<!--    上传-->
    <uploadFiles type="yaml" size="100000"></uploadFiles>
<!--    实例化-->
    <instantiation :datas="datas" title='网络切片模板实例化' ref="instantiation"></instantiation>
<!--    信息-->
    <el-dialog
      title="网络切片模板信息"
      :visible.sync="infoVisible"
      width="70%"
      >
      <label>
        <info :value="this.nstInfo"></info>
      </label>
      <span slot="footer" class="dialog-footer">
    <el-button @click="infoVisible = false">返 回</el-button>
  </span>
    </el-dialog>
<!--    编辑-->
    <el-dialog

      @click.stop
      title="网络切片模板编辑"
      :visible.sync="editVisible"
      width="70%"
      :before-close="handleClose"
      @opened="initContent('editorRef')">
      <label>
      <Editor ref="editorRef" :value="nstInfo"></Editor>
      </label>
      <span slot="footer" class="dialog-footer">
   <el-button icon="el-icon-close" @click="editVisible=false">取消</el-button>
    <el-button type="primary" @click="saveNst" :loading="this.saveLoading">保存<i class="el-icon-upload el-icon--left"></i></el-button>
  </span>
    </el-dialog>
  </div>
</template>

<script>
import Info from '../info';
import Editor from '../Editor'
import uploadFiles from "../upload.vue";
import instantiation from "../instantiation.vue";

export default {
  name: "nst",
  components: {
    uploadFiles,
    instantiation,
      Editor,
      Info
  },
  data() {
    return {
      search:'',
      currentPage: 1,
      pageSize:5,
      total: 0,
      tableData: [],
      infoVisible: false,
      editVisible: false,
      nstInfo:{},
      saveLoading:false,
      datas: [
        {
          name: "名称",
          nameCode: "name",
          type: "input",
          placeholder: "切片名称",
          required: true,
          message: "请填写切片名称"
        },
        {
          name: "备注",
          nameCode: "description",
          type: "input",
          placeholder: "切片备注",
          required: false,
        },
        {
          name: "切片模板id",
          nameCode: "nstId",
          type: "select",
          placeholder: "选择切片模板",
          required: true,
          message: "请选择切片模板",
          options: [
            {
              name: "slice_hackfest_nst",
              nameCode: "slice_hackfest_nst"
            }
          ]
        },
        {
          name: "配置",
          nameCode: "config",
          type: "textarea",
          placeholder: "额外配置",
          required: false
        }
      ]
    };
  },
  mounted() {
    this.getNst();
  },

  computed:{
    tableDataCur () {
      if (this.search){
        let search=this.search;
        let res=this.tableData.filter(data => !search || data.id.toLowerCase().includes(search.toLowerCase())
          || data._id.toLowerCase().includes(search.toLowerCase())
          || data['SNSSAI-identifier']['slice-service-type'].toLowerCase().includes(search.toLowerCase())
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
  methods: {
    //调用接口请求nst数据,暂时代理转发本地
    //这样写每次请求
    getNst() {
      this.$axios.get("/osm/nst")
        .then((response) => {this.tableData = response.data;},
          (response) => {console.log(response.data);
          })
    },
    handleSizeChange(val) {
      this.pageSize = val;
    },
    handleCurrentChange(val) {
      this.currentPage = val;
    },

    handleEdit(row) {
      this.nstInfo=row;
      this.editVisible=true;
    },
    handleInfo(index,row){
    this.infoVisible=true;
    this.nstInfo=row;},
    //作废
    // this.$nextTick(
    //   ()=>{
    //     this.$refs.editorRef.value=
    //     this.$refs.editorRef.initialize();
    // );
    handleInstantiate(i, v) {
            this.$refs.instantiation.open();
    },
    handleDelete(id,row){
      alert(row['_id'])
      this.$refs[id].doClose();
    },
    cancelDelete(id){
      this.$refs[id].doClose();
      console.log(id)
    },
    initContent(name){
      // 暂时先请求这个总接口,等后端写好了单独的查询接口再替换数据渲染
      this.$axios.get('/osm/nst')
        .then((response) => {
          // console.log(response.data);
          this.tableData = response.data;
        }, (response) => {
          console.log(response.data);
        });
      this.$refs[name].initialize();
    },
    handleClose(done){

      this.$confirm('确认关闭？')
        .then(() => {
          done();
        })
        .catch(() => {});
    },
    sleep(d) {
      return new Promise((resolve) => setTimeout(resolve, d))
    },
    //先假装保存
    async saveNst(){
      let code = this.$refs.editorRef.getCode();
      console.log(code);
      this.saveLoading=true;
      await this.sleep(1800);
      this.saveLoading=false;
      this.editVisible=false;
      this.$message({
        message: '保存成功',
        type: 'success'
      });
    },
  },}
</script>

<style scoped>
  /*就算设置了也啥用没有*/
  /*.el-table__column-filter-trigger i{*/
  /*  font-size: 20px !important;*/
  /*  font-weight: 900 !important;*/
  /*}*/

</style>
