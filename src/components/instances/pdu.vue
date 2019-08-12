<template>
  <div>
    <!--    新增按钮-->
    <div  style="position: absolute; border:1px; right:15px;top: 20px">
      <el-button type="primary" style="background-color: #68AFFF;border-color: #68AFFF"  @click="createPdu">新建物理部署单元</el-button>
    </div>
    <!--    新建实例对话框-->
    <el-dialog
      title="新建pdu"
      :visible.sync="dialogVisible"
      :before-close="closeDialog"
      width="50%">
      <label>
        <el-form :model="pduForm" ref="pduForm" label-width="140px" class="">
          <el-form-item
            prop="name"
            label="名称"
            :rules="[
      { required: true, message: '请输入名称', trigger: 'blur' },
    ]"><el-input v-model="pduForm.name"></el-input>
          </el-form-item>
          <el-form-item
            prop="type"
            label="物理部署单元类型"
            :rules="{ required: true, message: '请输入类型', trigger: 'blur' }">
            <el-input v-model="pduForm.type"></el-input>
          </el-form-item>
          <el-form-item
            prop="vimAccount"
            label="云计算账户">
            <el-select type="select" v-model="pduForm.vimAccount">
              <el-option v-for="(v,i) in vimAccounts" :key="i" :label="v.name" :value="v.id"></el-option>
            </el-select>
          </el-form-item>
          <el-form-item
            v-for="(_interface, index) in pduForm.interfaces"
            :label="'接口' + (index+1)+': '"
            :key="_interface.key"
            :prop="'interfaces.' + index">

            <el-input placeholder="接口:" v-model="_interface.name"></el-input>
            <el-input  placeholder="IP:" v-model="_interface.ip"></el-input>
            <el-input  placeholder="管理端口:" v-model="_interface.port"></el-input>
            <el-input  placeholder="网络名称:" v-model="_interface.net"></el-input>
            <el-button @click.prevent="removeInterface(_interface)">删除</el-button>
          </el-form-item>
          <el-button  type="success" @click="addInterface">新增配置</el-button>
          <p></p>
          <el-form-item>
            <el-button type="primary" @click="submitForm('pduForm')">提交</el-button>
            <el-button @click="resetForm('pduForm')">重置</el-button>
          </el-form-item>
        </el-form>
      </label>
      <span slot="footer" class="dialog-footer">
    <el-button @click="closeDialog">返 回</el-button>
  </span>
    </el-dialog>
    <el-table
      :data="tableDataCur.slice((currentPage-1)*pageSize,currentPage*pageSize)"
      height='420'
      size="medium "
      border
      stripe
      style="width: 100%">
      <el-table-column
        prop="_id"
        label="ID"
        width="180">
      </el-table-column>
      <el-table-column
        prop="name"
        label="名称">
      </el-table-column>
      <el-table-column
        prop="type"
        label="类型">
      </el-table-column>
      <el-table-column
        prop="_admin.usageState"
        label="使用情况">
      </el-table-column>
      <el-table-column
        prop="_admin.created"
        label="创建时间"
        :formatter="createTimeFormat">
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
          <i  title="信息" class="el-icon-info action_icon" @click="handleInfo(scope.$index, scope.row)"></i>
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
        <info :value="this.pduInfo"></info>
      </label>
      <span slot="footer" class="dialog-footer">
    <el-button @click="infoVisible = false">返 回</el-button>
  </span>
    </el-dialog>
  </div>
</template>

<script>
  import Info from '../info';
  import instantiation from '../instantiation';
  export default {
    name: 'pdu',
    components:{
      Info,

    },
    data(){
      return{
        vimAccounts:[
          {'name':'ops1','id':'e3650643-7d29-4bc8-b9ef-5c576098b6aa'},
          {'name':'ops2','id':'2094f61b-a20c-406e-a99b-43b7893eee80'},
        ],
        pduForm:{
          interfaces: [{
            name:'',
            ip: '',
            port: '',
            net: '',
            key:Date.now(),
          }],
          name: '',
          type:'',
          vimAccount:'',
        },
        dialogVisible:false,
        pduInfo:{},
        infoVisible:false,
        tableData:[],
        search:'',
        currentPage: 1,
        pageSize:5,
        total: 0,

      }
    },
    mounted(){
      this.getPdu();
    },
    computed:{
      tableDataCur () {
        if (this.search){
          let search=this.search;
          let res=this.tableData.filter(data => !search || data._id.toLowerCase().includes(search.toLowerCase())
            || data.name.toLowerCase().includes(search.toLowerCase())
            || data.type.toLowerCase().includes(search.toLowerCase())
            || data._admin.usageState.toLowerCase().includes(search.toLowerCase())
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
      getPdu(){
        // const id=this.$route.params.id
        // const type=this.$route.params.type
        this.$axios.get("/osm/pdu")
          .then((response) => {this.tableData = response.data; },
            (response) => {console.log(response.data);
            })
      },
      handleInfo(index,row){
        this.infoVisible=true;
        this.pduInfo=row;
      },
      createTimeFormat (row) {
        const date = new Date(row['_admin']['created'] * 1000);
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
      submitForm(formName) {
        this.$refs[formName].validate((valid) => {
          if (valid) {
            alert(JSON.stringify(this.pduForm));
          } else {
            console.log('error submit!!');
            return false;
          }
        });
      },
      resetForm(formName) {
        this.$refs[formName].resetFields();
        this.pduForm={
          interfaces: [{
            name:'',
            ip: '',
            port: '',
            net: '',
            key:Date.now(),
          }],
            name: '',
            type:'',
            vimAccount:'',
        };
      },
      removeInterface(i){
        var index = this.pduForm.interfaces.indexOf(i);
        if (index !== -1) {
          this.pduForm.interfaces.splice(index, 1)
        }
      },
      addInterface() {
        this.pduForm.interfaces.push({
          name:'',
          ip: '',
          port: '',
          net: '',
          key:Date.now(),
        });
      },
      createPdu(){
        this.dialogVisible=true;
      },
      closeDialog(){
        this.dialogVisible=false;
        this.resetForm('pduForm');
      },
      handleDelete(id,row){
        alert(row['_id']);
        this.$refs[id].doClose();
      },
      cancelDelete(id){
        this.$refs[id].doClose();
      },
    }
  };
</script>

<style scoped>

</style>
