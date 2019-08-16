<template>
  <div class="textAlignL">

    <div  style="position: absolute; border:1px; right:15px;top: 20px">
      <el-button type="primary" style="background-color: #68AFFF;border-color: #68AFFF"  @click="dialogVisibleAdd = true">新建VIM账户</el-button>
    </div>
<!--    表格-->
    <el-table
      :data="tableDataCur.slice((currentPage-1)*pageSize,currentPage*pageSize)"
      stripe
      style="width: 100%">
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
        prop="vim_type">
      </el-table-column>
      <el-table-column
        label="操作状态"
        prop="_admin.operationalState">
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
            <i class="el-icon-delete fs29" size="mini" title="删除"
               type="danger"
               @click="handleDelete(scope.$index, scope.row)"></i>
        </template>
      </el-table-column>
    </el-table>
<!--    分页-->
    <el-pagination
      @size-change="handleSizeChange"
      @current-change="handleCurrentChange"
      :current-page="currentPage"
      :page-sizes="[5, 10, 15, 20]"
      :page-size="pageSize"
      layout="total, sizes, prev, pager, next, jumper"
      :total="total">
    </el-pagination>

<!--    详情-->
    <el-dialog
      title="VIM账户详情"
      :visible.sync="dialogVisible"
      width="70%"
       class="h80PMt5P">
        <el-form  ref="form" :model="form" :inline="true" label-width="180px">
          <el-form-item label="名称">
            <el-input readonly v-model="form.name"></el-input>
          </el-form-item>
          <el-form-item label="租户名称">
            <el-input  readonly v-model="form.vim_tenant_name"></el-input>
          </el-form-item>
          <el-form-item label="VIM用户">
            <el-input readonly v-model="form.vim_user"></el-input>
          </el-form-item>
          <el-form-item label="描述">
            <el-input readonly v-model="form.description"></el-input>
          </el-form-item>
          <el-form-item label="VIM URL地址">
            <el-input readonly v-model="form.vim_url"></el-input>
          </el-form-item>
          <el-form-item label="Schema类型">
            <el-input readonly v-model="form.schema_type"></el-input>
          </el-form-item>
          <el-form-item label="类型">
            <el-input readonly v-model="form.vim_type"></el-input>
          </el-form-item>
          <el-form-item label="Schema版本">
            <el-input readonly v-model="form.schema_version"></el-input>
          </el-form-item>
          <el-collapse>
            <el-collapse-item title="配置参数">
              <div v-for="(cds,key,i) in configDatas" v-if="key === form.vim_type" :key="key">
                <el-form-item v-for="(cd,i) in cds" :label="cd.label" :key="i">
                <el-input readonly v-model="form.config[cd.value]"></el-input>
                </el-form-item>
              </div>
            </el-collapse-item>
          </el-collapse>
        </el-form>
      <span slot="footer" class="dialog-footer">
    <el-button type="primary" @click="dialogVisible = false">关闭</el-button>
  </span>
    </el-dialog>

    <!--新增VIM账户-->
    <el-dialog
      title="新增VIM账户"
      :visible.sync="dialogVisibleAdd" :before-close="handleClose"
      width="70%">
      <el-form ref="addForm" :model="addForm" :rules="addFormRule" :inline="true" label-width="180px" class="demo-ruleForm">
        <el-form-item label="名称" prop="name">
          <el-input v-model="addForm.name"></el-input>
        </el-form-item>
        <el-form-item label="类型" prop="vim_type">
          <el-select v-model="typeSelect" placeholder="请选择类型">
            <el-option label="openstack" value="openstack"></el-option>
            <el-option label="openVIM" value="openvim"></el-option>
            <el-option label="VMware vCD" value="vmware"></el-option>
            <el-option label="AWS" value="aws"></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="VIM URL地址" prop="vim_url">
          <el-input v-model="addForm.vim_url"></el-input>
        </el-form-item>
        <el-form-item label="VIM用户名称" prop="vim_user">
          <el-input v-model="addForm.vim_user"></el-input>
        </el-form-item>
        <el-form-item label="VIM密码" prop="vim_password">
          <el-input v-model="addForm.vim_password"></el-input>
        </el-form-item>
        <el-form-item label="租户名称" prop="vim_tenant_name">
          <el-input v-model="addForm.vim_tenant_name"></el-input>
        </el-form-item>
        <el-form-item label="描述" >
          <el-input v-model="addForm.description"></el-input>
        </el-form-item>
        <el-form-item label="Schema类型">
          <el-input v-model="addForm.schema_type"></el-input>
        </el-form-item>
        <el-form-item label="Schema版本">
          <el-input v-model="addForm.schema_version"></el-input>
        </el-form-item>
        <el-collapse>
          <el-collapse-item title="配置参数">
            <div v-for="(cds,key,i) in configDatas" v-if="key === addForm.vim_type" :key="key">
              <el-form-item v-for="(cd,i) in cds" :label="cd.label" :key="i">
                <el-input v-if="cd.type === 'input'" v-model="addForm.config[cd.value]"></el-input>
                <el-select v-if="cd.type === 'select'" class="w100P" v-model="addForm.config[cd.value]">
                  <el-option v-for="(d,x) in cd.options" :key="x" :label="d" :value="d"></el-option>
                </el-select>
              </el-form-item>
            </div>
          </el-collapse-item>
        </el-collapse>
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
        name: "vimAccount",
        data() {
            let url = /^(https?:\/\/)([0-9a-z.]+)(:[0-9]+)?([/0-9a-z.]+)?(\?[0-9a-z&=]+)?(#[0-9-a-z]+)?/;
            let isUrl = (rule, value, callback) => {
                console.log(rule,url,value)
                if (!url.test(value)) {
                    return callback(new Error('请输入正确的url地址'))
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
                configDatas:{
                    'openstack':[
                        {
                            label:'SDN 控制器',
                            value: 'sdn_ctrl',
                            type: 'input'
                        },
                        {
                            label:'SDN端口映射',
                            value: 'sdn_port_map',
                            type: 'input'
                        },
                        {
                            label:'VIM网络名称',
                            value: 'vim_network_name',
                            type: 'input'
                        },
                        {
                            label:'安全组',
                            value: 'security_groups',
                            type: 'input'
                        },
                        {
                            label:'可用区域',
                            value: 'availability_zone',
                            type: 'input'
                        },
                        {
                            label:'区域名称',
                            value: 'region_name',
                            type: 'input'
                        },
                        {
                            label:'不安全',
                            value: 'insecure',
                            type: 'select',
                            options: ['true','false','none']
                        },
                        {
                            label:'使用已存在的flavors',
                            value: 'use_existing_flavors',
                            type: 'select',
                            options: ['true','false','none']
                        },
                        {
                            label:'内部使用结点',
                            value: 'use_internal_endpoint',
                            type: 'select',
                            options: ['true','false','none']
                        },
                        {
                            label:'API版本',
                            value: 'APIversion',
                            type: 'input'
                        },
                        {
                            label:'项目域 id',
                            value: 'project_domain_id',
                            type: 'input'
                        },
                        {
                            label:'项目域 名称',
                            value: 'project_domain_name',
                            type: 'input'
                        },
                        {
                            label:'用户域id',
                            value: 'user_domain_id',
                            type: 'input'
                        },
                        {
                            label:'用户域名称',
                            value: 'user_domain_name',
                            type: 'input'
                        },
                        {
                            label:'密钥',
                            value: 'keypair',
                            type: 'input'
                        },
                        {
                            label:'Dataplane physical net',
                            value: 'dataplane_physical_net',
                            type: 'input'
                        },
                        {
                            label:'浮动ip',
                            value: 'use_floating_ip',
                            type: 'select',
                            options: ['true','false','none']
                        },
                        {
                            label:'Dataplane net vlan range',
                            value: 'dataplane_net_vlan_range',
                            type: 'input'
                        },
                        {
                            label:'Microversion',
                            value: 'microversion',
                            type: 'input'
                        }
                    ],
                    'aws':[
                        {
                            label:"aws",
                            value:"llaws",
                            type: 'input'
                        }
                    ],
                    'vmware':[
                        {
                            label:"vmware",
                            value:"llvmware",
                            type: 'input'
                        }
                    ],
                    'openvim':[
                        {
                            label:"openvim",
                            value:"llopenvim",
                            type: 'input'
                        }
                    ]
                }, //配置参数数据
                addForm:{
                    name: '',
                    vim_type:'openstack',
                    vim_url:'',
                    vim_user:'',
                    vim_password:'',
                    vim_tenant_name:'',
                    description:'',
                    schema_type:'',
                    schema_version:'',
                    config:{}
                  }, //新增表数据
                addFormRule:{
                    name:[{ required: true, message: '请输入名称', trigger: "blur" }],
                    vim_type:[{ required: true, message: '请选择类型', trigger: "blur" }],
                    vim_tenant_name:[{ required: true, message: '请输入租户名称', trigger: "blur" }],
                    vim_url:[{ required: true, message: '请输入地址', trigger: "blur" },{ validator:isUrl}],
                    vim_user:[{ required: true, message: '请输入用户名称', trigger: "blur" }],
                    vim_password:[{ required: true, message: '请输入密码', trigger: "blur" }]
                },//新增表数据校验
            }
        },
        mounted() {
            this.getVimAccount();
        },
        watch:{
            // 监控新增页面的下拉框
            typeSelect:function (val) {
                console.log(val)
                this.addForm.vim_type = val;
                var d = {};
                var data = this.configDatas[val];
                data.forEach((v, i) => {
                    d[v.label] = ''
                })
                console.log(d);
                this.addForm.config = d;
                console.log(this.addForm.config,this.addForm.vim_type);
            }
        },
        computed:{
        tableDataCur () {
          if (this.search){
            let search=this.search;
            let res=this.tableData.filter(data => !search || data.name.toLowerCase().includes(search.toLowerCase())
              || data._id.toLowerCase().includes(search.toLowerCase())
              || data.vim_type.toLowerCase().includes(search.toLowerCase())
              || data._admin.operationalState.toLowerCase().includes(search.toLowerCase())
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
          getVimAccount(){

            this.$api.vimApi().then((response) => {
                            this.tableData = response.data;
                        })
            //这样写每次请求
            // getVimAccount() {
            //     this.$axios.get('/osm/vimAccount')
            //         .then((response) => {
            //             this.tableData = response.data;
            //             console.log("接口返回的数据",this.tableData);
            //
            //         }, (response) => {
            //             console.log(response.data);
            //         });
            },
            handleEdit(index, row) {
                this.dialogVisible = true;
                this.form = row;
            },
            handleDelete(index, row) {
                console.log(index, row);
                alert(row['_id'])
            },
            handleSizeChange(val) {
                this.pageSize = val;
            },
            handleCurrentChange(val) {
                this.currentPage = val;
            },
            submitForm(addForm) {
                this.$refs[addForm].validate((valid) => {
                    console.log(this.addForm,valid)
                    if (valid) {
                        this.dialogVisibleAdd = false;
                        alert("新增成功")
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
