<template>
<div>
  <!--    新增按钮-->
  <div  style="position: absolute; border:1px; right:15px;top: 20px">
    <el-button type="primary" style="background-color: #68AFFF;border-color: #68AFFF"  @click="handleInstantiate">新建网络切片实例</el-button>
  </div>
    <!--    新建实例对话框-->
    <instantiation :datas="datas" title='新建网络切片实例' ref="instantiation"></instantiation>
    <!--    表格-->
    <el-table
      :data="tableDataCur.slice((currentPage-1)*pageSize,currentPage*pageSize)"
      height='420'
      size="medium "
      stripe
      style="width: 100%">
      <el-table-column
        prop="name"
        label="名称"
        width="180">
      </el-table-column>
      <el-table-column
        prop="id"
        label="ID"
        width="180">
      </el-table-column>
      <el-table-column
        prop="nst-ref"
        label="NST名称">
      </el-table-column>
      <el-table-column
        prop="operational-status"
        label="运行状态">
      </el-table-column>
      <el-table-column
        :prop="this.tableData['config-status']?'config-status':'operational-status'"
        label="配置状态">
      </el-table-column>
      <el-table-column
        prop="detailed-status"
        label="详情">
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
          <i  title="虚拟网元指令" class="el-icon-magic-stick action_icon" @click="handlePrimitive(scope.row)"></i>
          <i  title="操作历史" class="el-icon-s-order action_icon" @click="handleHistory(scope.row)"></i>
          <el-button  title="激活" disabled   class='action_icon' type="text" icon="el-icon-video-play" @click="startNs(scope.row)"></el-button>
          <el-button  title="去激活" disabled   class='action_icon' type="text" icon="el-icon-video-pause" @click="stopNs(scope.row)"></el-button>
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
        :page-sizes="[5, 10, 5, 20]"
        :page-size="pageSize"
        layout="total, sizes,prev, pager, next"
        :total="total"
        prev-text="上一页"
        next-text="下一页">
      </el-pagination>
    </div>
    <!--    信息-->
    <el-dialog
      title="子网切片实例信息"
      :visible.sync="infoVisible"
      width="70%"
    >
      <label>
        <info :value="this.nsiInfo"></info>
      </label>
      <span slot="footer" class="dialog-footer">
    <el-button @click="infoVisible = false">返 回</el-button>
  </span>
    </el-dialog>.
    <!--    虚拟网元指令dialog-->
    <el-dialog
      title="操作虚拟网元"
      :visible.sync="primitiveVisible"
      :before-close="closePrimitive"
      width="50%">
      <label>
        <el-form :model="primitiveForm" ref="primitiveForm" label-width="140px" class="">
          <el-form-item
            prop="item"
            label="操作项"
            :rules="[
      { required: true, message: '请输入操作项', trigger: 'blur' },
    ]"><el-input v-model="primitiveForm.item"></el-input>
          </el-form-item>
          <el-form-item
            prop="vnfIndex"
            label="虚拟网元成员索引"
            :rules="{ required: true, message: '请输入索引', trigger: 'blur' }">
            <el-input v-model="primitiveForm.vnfIndex"></el-input>
          </el-form-item>
          <el-form-item
            v-for="(config, index) in primitiveForm.configs"
            :label="'配置' + (index+1)+': '"
            :key="config.key"
            :prop="'configs.' + index">

            <el-input placeholder="配置名:" v-model="config.name"></el-input>
            <el-input type="textarea" placeholder="值:" v-model="config.value"></el-input><el-button @click.prevent="removeConfig(config)">删除</el-button>
          </el-form-item>
          <el-button  type="success" @click="addConfig">新增配置</el-button>
          <p></p>
          <el-form-item>
            <el-button type="primary" @click="submitForm('primitiveForm')">提交</el-button>
            <el-button @click="resetForm('primitiveForm')">重置</el-button>
          </el-form-item>
        </el-form>
      </label>
      <span slot="footer" class="dialog-footer">
    <el-button @click="closePrimitive">返 回</el-button>
  </span>
    </el-dialog>
  </div>
</template>

<script>
  import Info from '../info';
  import instantiation from "../instantiation.vue"
  export default {
    name: 'nsi',
    components: {
      instantiation,
      Info
    },
    data(){
      return {
        createVisible: false,
        infoVisible:false,
        primitiveVisible:false,
        tableData: [],
        search:'',
        currentPage: 1,
        pageSize:5,
        total: 0,
        nsiInfo:{},
        saveLoading:false,
        datas:[
          {
            name: "名称",
            nameCode: "name",
            type: "input",
            placeholder: "网络切片名称",
            required: true,
            message: "请填写子网切片名称"
          },
          {
            name: "备注",
            nameCode: "description",
            type: "input",
            placeholder: "网络切片备注",
            required: false,
          },
          {
            name: "NST id",
            nameCode: "nsdId",
            type: "select",
            placeholder: "选择网络切片模板",
            required: true,
            message: "请选择网络切片模板",
            options: [
              {
                name: "slice_hackfest_nst",
                nameCode: "id1"
              },
            ]
          },
          {
            name: "vimAccount",
            nameCode: "vimAccount",
            type: "select",
            placeholder: "选择vimAccount",
            required: true,
            message: "请选择vimAccount",
            options: [
              {
                name: "ops",
                nameCode: "ops"
              },
            ]
          },
          {
            name: "SSH Key",
            nameCode: "ssh_key",
            type: "textarea",
            placeholder: "ssh公钥",
            required: false
          },
          {
            name: "配置",
            nameCode: "config",
            type: "textarea",
            placeholder: "额外配置",
            required: false
          }
        ],
        primitiveNsi:'',
        primitiveForm: {
          configs: [{
            name:'',
            value: '',
            key: '',
          }],
          item: '',
          vnfIndex:'',
        }
      }
    },
    computed:{
      tableDataCur () {
        if (this.search){
          let search=this.search;
          let res=this.tableData.filter(data => !search || data.name.toLowerCase().includes(search.toLowerCase())
            || data.id.toLowerCase().includes(search.toLowerCase())
            || data['network-slice-template'].name.toLowerCase().includes(search.toLowerCase())
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
    mounted() {
      this.getNsi();
    },
    methods:{
      getNsi(){
        this.$axios.get('/osm/nsi')
          .then((response) => {
            // console.log(response.data);
            this.tableData =  response.data;
          }, (response) => {
            console.log(response.data);
          });
      },
      handleSizeChange(val) {
        this.pageSize = val;
      },
      handleCurrentChange(val) {
        this.currentPage = val;
      },
      handleInstantiate() {
        this.$refs.instantiation.open();
      },
      submitForm(formName) {
        this.$refs[formName].validate((valid) => {
          if (valid) {
            alert(JSON.stringify(this.primitiveForm));
          } else {
            console.log('error submit!!');
            return false;
          }
        });
      },
      resetForm(formName) {
        this.$refs[formName].resetFields();
        this.primitiveForm= {
          configs: [],
          item: '',
          vnfIndex:'',
        }
      },
      removeConfig(config){
        var index = this.primitiveForm.configs.indexOf(config);
        if (index !== -1) {
          this.primitiveForm.configs.splice(index, 1)
        }
      },
      addConfig() {
        this.primitiveForm.configs.push({
          name:'',
          value: '',
          key: Date.now()
        });
      },
      handlePrimitive(row){
        this.primitiveNsi=row.id;
        this.primitiveVisible=true;
      },
      closePrimitive(){
        this.primitiveVisible=false;
        this.resetForm('primitiveForm');
      },
      handleInfo(index,row){
        this.infoVisible=true;
        this.nsiInfo=row;},
      handleDelete(id,row){
        alert(row['_id']);
        this.$refs[id].doClose();
      },
      cancelDelete(id){
        this.$refs[id].doClose();
        console.log(id)
      },
      handleHistory(row){
        this.$router.push({
          name: 'operation',
          params: {
            id: row.id,
            type:'nsi',
          }
        })
      },
      startNs(){},
    }
  };
</script>

<style scoped>

</style>
