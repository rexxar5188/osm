
<template>
  <div>
    <div  style="position: absolute; border:1px; right:15px;top: 30px">
      <el-button type="primary" style="background-color: #68AFFF;border-color: #68AFFF"  @click="dialogVisible = true">创建虚拟网元</el-button>
    </div>

    <el-dialog
      title="创建虚拟网元"
      :visible.sync="dialogVisible"
      width="30%"
      >
      <span>
        <div>
          包名*：
          <el-input
            placeholder="name"
            prefix="name"
            v-model="input2"
            style="width: auto" required>
          </el-input>
        </div>
      </span>
      <span slot="footer" class="dialog-footer">
    <el-button type="primary" @click="dialogVisible = false" style="background: #aaaaaa;position: absolute; border:1px; left:15px;bottom: 10px">取 消</el-button>
    <el-button type="primary" @click="compose" style="position: absolute; border:1px; right:15px;bottom: 10px;background-color: #68AFFF;border-color: #68AFFF">新建</el-button>
  </span>
    </el-dialog>
    <el-table
      stripe
      ref="filterTable"
      border

      :data="tableDataCur.slice((currentPage-1)*pageSize,currentPage*pageSize)"
      height="420">
      <el-table-column
        prop="name"
        label="简称"
        width="180">
      </el-table-column>
      <el-table-column
        prop="_id"
        label="ID"
        width="180">
      </el-table-column>
      <el-table-column
        prop="_admin.type"
        label="类型"
        width="90"
      >
      </el-table-column>
      <el-table-column
        prop="description"
        label="描述"
        width="180">
      </el-table-column>
      <el-table-column
        prop="vendor"
        label="供应方"
        width="180">
      </el-table-column>
      <el-table-column
        prop="version"
        label="版本"
        width="120">
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
              <i title= "编辑" class="el-icon-edit-outline action_icon" @click="handleEdit(scope.$index)"></i>
          <i title= "目录结构" class="el-icon-folder-opened action_icon" @click="handleArtifacts()"></i>
          <i title= "拓扑图" class="el-icon-data-board action_icon" @click="handleTopoLogic()"></i>
          <i title= "下载包" class="el-icon-download action_icon" @click="handleDownload()"></i>  <template>
          <el-popover
            placement="top"
            width="160"
            :ref="scope.$index"
            trigger="click">
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
        :page-sizes="[5, 10, 15, 20]"
        :page-size="10"
        layout="total, sizes, prev, pager, next, jumper"
        :total=total>
      </el-pagination>
    </div>
<!--    上传-->
    <uploadFiles type="yaml" size="100000"></uploadFiles>
<!--编辑-->
    <el-dialog
      @click.stop
      title="VNFD编辑"
      :visible.sync="editVisible"
      width="70%"
      :before-close="handleClose"
      @opened="initContent('editorRef')">
      <label>
        <Editor ref="editorRef" ></Editor>
      </label>
      <span slot="footer" class="dialog-footer">
   <el-button icon="el-icon-close" @click="editVisible=false">取消</el-button>
    <el-button type="primary" @click="saveVnfd" :loading="this.saveLoading">保存<i class="el-icon-upload el-icon--left"></i></el-button>
  </span>
    </el-dialog>
  </div>

</template>

<script>

  import Editor from '../Editor'
  import uploadFiles from "../upload.vue";
  import instantiation from "../instantiation.vue";
    export default {
      name:'vnf',
      components:{
        uploadFiles,
        instantiation,
        Editor,

      },

        data() {
            return {
              dialogVisible: false,
              input1: "",
              input2: "",
              tableData: [],
              search:'',
              currentPage: 1,
              pageSize:5,
              total: 0,
              vnfdIndex:{},
              editVisible: false,
              saveLoading:false,
            }
        },
      mounted(){
        this.getVnf()
      },
      computed:{
        tableDataCur () {
          if (this.search){
            let search=this.search;
            let res=this.tableData.filter(data => !search || data.name.toLowerCase().includes(search.toLowerCase())
              || data._id.toLowerCase().includes(search.toLowerCase())
              || data._admin.type.toLowerCase().includes(search.toLowerCase())
              || data.description.toLowerCase().includes(search.toLowerCase())
              || ((data.vendor)?(data.vendor):('')).toLowerCase().includes(search.toLowerCase())
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
          getVnf(){
            this.$axios.get('/osm/vnf_packages')
              .then((response) => {
                  // console.log(response.data);
                  this.tableData = response.data;
                }, (response) => {
                console.log(response.data);
              });
          },
          handleSizeChange(val) {
              console.log(`每页 ${val} 条`);
          },
          handleCurrentChange(val) {
              console.log(`当前页: ${val}`);
          },
          compose(){

              this.$router.push({ path:'/npage/osm/composeVnf'})
          },
          handleDelete(id,row){
            alert(row['_id']);
            this.$refs[id].doClose();
          },
          cancelDelete(id){
            this.$refs[id].doClose();
            console.log(id)
          },
          handleClose(done){

            this.$confirm('确认关闭？')
              .then(() => {
                done();
              })
              .catch(() => {});
          },
          initContent(name){
            // 暂时先请求这个总接口,等后端写好了单独的查询接口再替换数据渲染
            this.$axios.get('/osm/vnf_packages')
              .then((response) => {
                // console.log(response.data);
                this.tableData = response.data;
                this.$refs[name].initialize(this.tableData[this.vnfdIndex]);
              }, (response) => {
                console.log(response.data);
              });

          },
          handleEdit(index) {
            this.vnfdIndex=index;
            this.editVisible=true;
          },
          sleep(d) {
            return new Promise((resolve) => setTimeout(resolve, d))
          },
          //先假装保存
          async saveVnfd(){
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
        handleSizeChange(val) {
          this.pageSize = val;
        },
        handleCurrentChange(val) {
          this.currentPage = val;
        },
      }

    }
</script>
