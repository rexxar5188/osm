<template>
  <div>
<!--    新增按钮-->
    <div  style="float: right;margin: 10px;">
      <el-button type="primary" style="background-color: #68AFFF;border-color: #68AFFF"  @click="createVisible = true">新建NSD</el-button>
    </div>
<!--    新增对话框-->
    <el-dialog
      title="新增ns"
      :visible.sync="createVisible"
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
    <el-button type="primary" @click="createVisible = false" style="background: #aaaaaa;position: absolute; border:1px; left:15px;bottom: 10px">取 消</el-button>
    <el-button type="primary" @click="compose" style="position: absolute; border:1px; right:15px;bottom: 10px;background-color: #68AFFF;border-color: #68AFFF">新建</el-button>
  </span>
    </el-dialog>
<!--    表格-->
    <el-table
      :data="tableDataCur.slice((currentPage-1)*pageSize,currentPage*pageSize)"
      height='420'
      size="medium"
      border
      stripe
      style="width: 100%">
      <el-table-column
        prop="id"
        label="名称"
        width="180">
      </el-table-column>
      <el-table-column
        prop="_id"
        label="ID"
        width="180">
      </el-table-column>
      <el-table-column
        prop="description"
        label="描述"
        width="180">
      </el-table-column>
      <el-table-column
        prop="vendor"
        label="供应商">
      </el-table-column>
      <el-table-column
        prop="_admin.usageState"
        label="使用情况"
      >
      </el-table-column>
      <el-table-column
        prop=""
        label="操作">
        <template slot="header" slot-scope="scope">
          <el-input
            v-model="search"
            size="mini"
            placeholder="搜索"/>
        </template>
        <div slot-scope="scope">
          <i class="el-icon-caret-right action_icon" title='实例化' @click="handleInstantiate(scope.$index, scope.row)"></i>
          <i class="el-icon-edit-outline action_icon" title='编辑' @click="handleEdit(scope.$index, scope.row)"></i>
          <i class="el-icon-folder-opened action_icon" title='目录展示' @click="handleArtifacts()"></i>
          <i class="el-icon-data-board action_icon" title='拓扑图' @click="handleTopoLogic()"></i>
          <i class="el-icon-download action_icon" title='下载包' @click="handleDownload(scope.row)"></i>
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
              <i class="el-icon-delete action_icon" title='删除' slot="reference"></i>
            </el-popover>
          </template>
        </div>
      </el-table-column>
    </el-table>
<!--    编辑-->
    <el-dialog
      @click.stop
      title="NSD编辑"
      :visible.sync="editVisible"
      width="70%"
      :before-close="handleClose"
      @opened="initContent('editorRef',reqId)">
      <label>
        <Editor ref="editorRef"></Editor>
      </label>
      <span slot="footer" class="dialog-footer">
   <el-button icon="el-icon-close" @click="editVisible=false">取消</el-button>
    <el-button type="primary" @click="saveNsd(reqId)" :loading="this.saveLoading">保存<i class="el-icon-upload el-icon--left"></i></el-button>
  </span>
    </el-dialog>
<!--    实例化-->
    <instantiation :datas="datas" :addarg="addarg" topic="ssi"  title='子网切片实例化' ref="instantiation"></instantiation>
    <!--    分页器-->
    <div class="pagination">
      <el-pagination
        @size-change="handleSizeChange"
        @current-change="handleCurrentChange"
        :current-page="currentPage"
        :page-sizes="[5, 10, 15, 20]"
        :page-size="pageSize"
        layout="total, sizes,prev, pager, next"
        :total="total"
        prev-text="上一页"
        next-text="下一页">
      </el-pagination>
    </div>
    <!--    上传-->
    <uploadFiles topic="ns" @refresh="refreshTableData" size="100000"></uploadFiles>
  </div>



</template>


<script>
  import Editor from '../Editor'
  import uploadFiles from "../upload.vue";
  import instantiation from "../instantiation.vue";
  import {MessageBox} from 'element-ui';

  export default {
    name: 'ns',
    components: {
      Editor,
      instantiation,
      uploadFiles,
    },
    data(){
      return{
        createVisible: false,
        input2: "",
        tableData: [],
        search:'',
        currentPage: 1,
        pageSize:5,
        total: 0,
        reqId:{},
        editVisible: false,
        saveLoading:false,
        vimOptions:[],
        addarg:{},
      }
    },
    mounted() {
      this.getNs();
      this.getVimOptions();
    },
    computed:{
      tableDataCur () {
        if (this.search){
          let search=this.search;
          let res=this.tableData.filter(data => !search || data.id.toLowerCase().includes(search.toLowerCase())
            || data._id.toLowerCase().includes(search.toLowerCase())
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
      },
      datas(){
        return [
        {
          name: "名称",
          nameCode: "nsName",
          type: "input",
          placeholder: "子网切片名称",
          required: true,
          message: "请填写子网切片名称"
        },
        {
          name: "备注",
          nameCode: "nsDescription",
          type: "input",
          placeholder: "切片备注",
          required: false,
        },
        {
          name: "vimAccount",
          nameCode: "vimAccountId",
          type: "select",
          placeholder: "选择vimAccount",
          required: true,
          message: "请选择vimAccount",
          options: this.vimOptions
        },
        {
          name: "SSH Key",
          nameCode: "ssh_keys",
          type: "textarea",
          placeholder: "ssh公钥",
          required: false
        },
        {
          name: "配置",
          nameCode: "config",
          type: "textarea",
          placeholder: "额外配置,yaml格式",
          required: false
        }
      ]},
    },
    methods:{
      getNs() {
        this.$api.ns.list().then((response) => {
          this.tableData = response.data;
        })
      },
      getVimOptions(){
        this.$api.vim.list().then((response) => {
          response.data.forEach((v,i)=>{
            this.vimOptions.push({name:v.name,nameCode:v._id})
          });
        })},
      handleClose(done){
        this.$confirm('确认关闭？')
          .then(() => {
            done();
          })
          .catch(() => {});
      },
      initContent(name,reqId){
        this.$api.ns.detail(reqId)
          .then((response) => {
            this.$refs[name].initialize(response.data);
          });

      },
      handleEdit(index,row) {
        this.editVisible=true;
        this.reqId=row._id;
      },
      saveNsd(id) {
        let code = this.$refs.editorRef.getCode();
        try {
          JSON.parse(code);
        }catch (e) {
          MessageBox.alert(e,'json格式错误');
          return
        }
        // this.saveLoading = true;
        this.$api.ns.put(id,code).then(()=>{
          this.$message({
            message: "保存成功",
            type: "success"
          });
        });
        // this.saveLoading = false;
        this.editVisible = false;

      },
      handleInstantiate(i, v) {
        //接口需要nsdId 不需要出现在表单选择,直接传给后台
        this.addarg={'nsdId':v._id};
        this.$refs.instantiation.open();
      },
      handleDelete(index,row){
        this.$api.ns.delete(row._id).then(()=>{
          this.$message({
            type:'success',
            message: '删除成功',
            duration: 1500,
            forbidClick: true
          });
          this.getNs();
        });
        this.$refs[index].doClose();
      },
      cancelDelete(id){
        this.$refs[id].doClose();
      },
      compose(){
        //this.$router.push({ path:'/npage/osm/composeVnf'})
      },
      handleSizeChange(val) {
        this.pageSize = val;
      },
      handleCurrentChange(val) {
        this.currentPage = val;
      },
      refreshTableData(data){
        this.tableData=data
      },
      handleDownload(row) {
        let url='http://172.18.234.111:8000/api/v1/nsd/download/'+row._id+'/';
        // window.open(urls, '_blank');
        this.$api.downLoadPost(url,null,row.id)
      },
    }
  };
</script>

<style scoped>

</style>
