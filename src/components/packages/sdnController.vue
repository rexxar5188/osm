<template>
  <div class="textAlignL">

    <div  style="float: right;margin: 10px;">
      <el-button type="primary" style="background-color: #68AFFF;border-color: #68AFFF"  @click="dialogVisibleAdd = true">新建SND控制器</el-button>
    </div>
    <!--    表格-->
    <el-table
      :data="tableDataCur.slice((currentPage-1)*pageSize,currentPage*pageSize)"
      stripe
      style='width:100%'>
      <el-table-column
        label="名称"
        prop="name">
      </el-table-column>
      <el-table-column
        label="标识号"
        prop="_id">
      </el-table-column>
      <el-table-column
        label="类型"
        prop="type">
      </el-table-column>
      <el-table-column
        label="操作状态"
        prop="_admin.operationalState">
      </el-table-column>
      <el-table-column
        label="ip"
        prop="ip">
      </el-table-column>
      <el-table-column
        label="port"
        prop="port">
      </el-table-column>
      <el-table-column
        align="center">
        <template slot="header" slot-scope="scope">
          <el-input
            v-model="search"
            size="mini"
            placeholder="输入名称以搜索"/>
        </template>
        <template slot-scope="scope" >
          <i class="el-icon-info fs29" size="mini" title="详情"
             @click="handleEdit(scope.$index, scope.row)"></i>
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
        </template>
      </el-table-column>
    </el-table>
    <!--    分页-->
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
    <!--    详情-->
    <el-dialog
      title="SDN详情"
      :visible.sync="dialogVisible"
      class="h80PMt5P">
      <el-row>
        <el-col :span="24"><div class="grid-content bg-purple-dark">
          ID: {{form._id}}
        </div></el-col>
      </el-row>
      <el-divider></el-divider>
      <el-row>
        <el-col :span="12"><div class="grid-content bg-purple">
          名称: {{form.name}}
        </div></el-col>
        <el-col :span="12"><div class="grid-content bg-purple-light">
          ip: {{form.ip}}
        </div></el-col>
      </el-row>
      <el-divider></el-divider>
      <el-row>
<!--        <el-col :span="12"><div class="grid-content bg-purple">-->
<!--          操作状态:{{form._admin.operationalState}}-->
<!--        </div></el-col>-->
        <el-col :span="12"><div class="grid-content bg-purple-light">
          port:{{form.port}}
        </div></el-col>
      </el-row>
      <el-divider></el-divider>
      <el-row>
        <el-col :span="12"><div class="grid-content bg-purple">
          类型:{{form.type}}
        </div></el-col>
        <el-col :span="12"><div class="grid-content bg-purple-light">
          版本:{{form.version}}
        </div></el-col>
      </el-row>
      <el-divider></el-divider>
      <el-row>
        <el-col :span="12"><div class="grid-content bg-purple">
          sdn用户:{{form.user}}
        </div></el-col>
        <el-col :span="12"><div class="grid-content bg-purple-light">
          dpid:{{form.dpid}}
        </div></el-col>
      </el-row>
<!--      <el-row>-->
<!--        <el-col :span="12"><div class="grid-content bg-purple">-->
<!--          创建时间:{{form._admin.created|timeFormatFilter}}-->
<!--        </div></el-col>-->
<!--        <el-col :span="12"><div class="grid-content bg-purple-light">-->
<!--          修改时间:{{form._admin.modified|timeFormatFilter}}-->
<!--        </div></el-col>-->
<!--      </el-row>-->
<!--      <el-row>-->
<!--        <el-col :span="24"><div class="grid-content bg-purple-dark">-->
<!--          depolyed: {{form._admin.deployed}}-->
<!--        </div></el-col>-->
<!--      </el-row>-->
      <span slot="footer" class="dialog-footer">
    <el-button type="primary" @click="dialogVisible = false">关闭</el-button>
  </span>
    </el-dialog>

    <!--新增sdn-->
    <el-dialog
      title="新增sdn控制器"
      :visible.sync="dialogVisibleAdd" :before-close="handleClose"
      width="70%">
      <el-form ref="addForm" :model="addForm" :rules="addFormRule" :inline="true" label-width="180px" class="demo-ruleForm">
        <el-form-item label="名称" prop="name">
          <el-input  v-model="addForm.name"></el-input>
        </el-form-item>
        <el-form-item label="ip" prop="ip">
          <el-input  v-model="addForm.ip"></el-input>
        </el-form-item>
        <el-form-item label="port" prop="port">
          <el-input type="" v-model.number="addForm.port"></el-input>
        </el-form-item>
        <el-form-item label="类型" prop="type">
          <el-select v-model="addForm.type" placeholder="请选择类型">
            <el-option label="onos" value="onos"></el-option>
            <el-option label="OpenDaylight" value="opendaylight"></el-option>
            <el-option label="Floodlight" value="floodlight"></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="sdn用户" prop="user">
          <el-input  v-model="addForm.user"></el-input>
        </el-form-item>
        <el-form-item label="sdn密码" prop="password">
          <el-input  v-model="addForm.password"></el-input>
        </el-form-item>
        <el-form-item label="DPID" prop="dpid" >
          <el-input  v-model="addForm.dpid"></el-input>
        </el-form-item>
        <el-form-item label="描述" prop="description" >
          <el-input  v-model="addForm.description"></el-input>
        </el-form-item>
      </el-form>
      <span slot="footer" class="dialog-footer">
    <el-button type="primary" @click="submitForm('addForm')">确定</el-button>
    <el-button  @click="dialogVisibleAdd = false">关闭</el-button>
  </span>
    </el-dialog>
  </div>
</template>

<script>

  export default {
    name: "sdnController",
    data() {
      let ip = /((25[0-5]|2[0-4]\d|1\d{2}|[1-9]?\d)\.){3}(25[0-5]|2[0-4]\d|1\d{2}|[1-9]?\d)/;
      let isIp = (rule, value, callback) => {
        if (!ip.test(value)) {
          return callback(new Error('请输入正确的ip地址'))
        } else {
          callback()
        }
      };
      return {
        tableData: [], //查询出的所有数据
        search: '',  //筛选条件
        typeSelect:'',//监听用
        currentPage: 1, //当前所在页面
        total: 0, //总共页数
        pageSize:5, //每页展示数据数
        dialogVisible:false, //弹出框展示参数
        dialogVisibleAdd:false, //新增弹出框展示参数
        form:[], //当前行详情数据
        addForm:{
          name: '',
          type:'',
          ip:'',
          port:'',
          user:'',
          password:'',
          description:'',
          version:'1',
        }, //新增表数据
        addFormRule:{
          name:[{ required: true, message: '请输入名称', trigger: "blur" }],
          type:[{ required: true, message: '请选择类型', trigger: "blur" }],
          port:[{ required: true, message: '请输入端口', trigger: "blur" }],
          ip:[{ required: true, message: '请输入地址', trigger: "blur" },{ validator:isIp}],
          user:[{ required: true, message: '请输入sdn用户名称', trigger: "blur" }],
          password:[{ required: true, message: '请输入sdn密码', trigger: "blur" }],
          dpid:[{ required: true, message: '请输入dpid', trigger: "blur" }],
          description:[{ required: true, message: '请输入描述', trigger: "blur" }],
        },//新增表数据校验
      }
    },
    mounted() {
      this.getSdn();
    },
    computed:{
      tableDataCur () {
        if (this.search){
          let search=this.search;
          let res=this.tableData.filter(data => !search || data.name.toLowerCase().includes(search.toLowerCase())
            || data._id.toLowerCase().includes(search.toLowerCase())
            || data.type.toLowerCase().includes(search.toLowerCase())
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
      getSdn(){
        this.$api.sdn.list().then((response) => {
          this.tableData = response.data;
        })
      },
      handleEdit(index, row) {
        this.$api.sdn.detail(row._id).then((response)=>{
          this.form=response.data;
        });
        this.dialogVisible = true;
      },
      handleDelete(index, row) {
        this.$api.sdn.delete(row._id).then(()=>{
          this.$message({
            type:'success',
            message: '删除成功',
            duration: 1500,
            forbidClick: true
          });
          this.getSdn();
        });
        this.$refs[index].doClose();
      },
      cancelDelete(id){
        this.$refs[id].doClose();
      },
      handleSizeChange(val) {
        this.pageSize = val;
      },
      handleCurrentChange(val) {
        this.currentPage = val;
      },
      submitForm(addForm) {
        this.$refs[addForm].validate((valid) => {
          if (valid) {
            this.$api.sdn.create(this.addForm).then(
              (response)=>{
                this.dialogVisibleAdd = false;
                this.getSdn()
              }
            ).catch((response)=>{
              alert(JSON.stringify(response.data))
            })
          } else {
            console.log('error submit!!');
            return false;
          }
        });
      },
      handleClose(done) {
        this.$confirm('确认关闭？')
          .then(_ => {
            done();
            this.$refs['addForm'].resetFields();
          })
          .catch(_ => {});
      },


    },
  }
</script>

<style scoped>
  .textAlignL{
    text-align: left;
  }
  .fs29{
    font-size: 16px;
    padding: 5px;
  }
  .h80PMt5P{
    height: 80% !important;
    margin-top: 5%;
  }
</style>
