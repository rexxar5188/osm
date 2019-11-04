<template>
  <div class="textAlignL">

    <!--展开行-->
    <el-table
      ref="multipleTable"
      :data="vnfrData"
      style="width: 100%"
      border
      :header-cell-style="{background:'#eef1f6',color:'#606266'}"
      @cell-click="cellClick"
    >
      <el-table-column type="expand">
        <template slot-scope="props">
          <el-table
            :data="props.row.vdu"
            stripe
            style="width: 100%"
            :row-style="tableRowStyle"
          >
            <el-table-column  label="vdu-id-ref" prop="vdu_id_ref"></el-table-column>
            <el-table-column label="策略状态" prop="policystatus" :formatter="polStatusFormat"></el-table-column>
            <el-table-column label="策略id" prop="policyid" ></el-table-column>
            <el-table-column align="center" label="操作">
              <template slot-scope="scope">
                <el-button  title="创建策略"  class='action_icon'v-if="scope.row.policystatus == '无策略'" visabled = true type="text" icon="el-icon-circle-plus-outline" @click="addFormPol(scope.row.vnfrid,scope.row.vdu_id_ref)"></el-button>
                <i  title="策略详情"  class="el-icon-info action_icon" v-if="scope.row.policystatus != '无策略'" disabled = true @click="handleInfo(scope.row.vnfrid, scope.row.policyid)"></i>
                <i title='修改策略' class="el-icon-edit action_icon"v-if="scope.row.policystatus != '无策略'" disabled = true @click="handleEdit(scope.row.vnfrid, scope.row.policyid)"></i>
                <el-button  title="激活"  class='action_icon'v-if="scope.row.policystatus != '无策略'" visabled = false type="text"  icon="el-icon-video-play" @click="startPol(scope.row.vnfrid, scope.row.policyid)"></el-button>
                <el-button  title="去激活"  class='action_icon'v-if="scope.row.policystatus != '无策略'" visabled = false type="text" icon="el-icon-video-pause" @click="stopPol(scope.row.vnfrid, scope.row.policyid)"></el-button>
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
                      <el-button type="primary" size="mini" @click="handleDelete(scope.row.vnfrid, scope.row.policyid)">确定</el-button>
                    </div>
                    <i title="删除" class="el-icon-delete action_icon" v-if="scope.row.policystatus != '无策略'" disabled = true slot="reference"></i>
                  </el-popover>
                </template>

              </template>
            </el-table-column>

          </el-table>
        </template>
      </el-table-column>

      <el-table-column
        label="虚拟网元实例id"
        prop="id">
      </el-table-column>
      <el-table-column
        label="所属ns实例名称"
        prop="name">
      </el-table-column>
      <el-table-column
        label="成员索引"
        prop="index">
      </el-table-column>
      <el-table-column
        label="所属vnfd"
        prop="vnfdRef">
      </el-table-column>
      <el-table-column
        label="vnf描述"
        prop="vnfdDes">
      </el-table-column>
    </el-table>

    <!--    策略信息-->
    <el-dialog
      title="策略信息"
      :visible.sync="infoVisible"
      width="70%"
    >
      <label>
        <info :value="this.polInfo"></info>
      </label>
      <span slot="footer" class="dialog-footer">
    <el-button @click="infoVisible = false">返 回</el-button>
  </span>
    </el-dialog>
    <!--新建自动伸缩-->
    <el-dialog
      title="新建自动伸缩"
      :visible.sync="dialogVisibleAddAuto"
      :before-close="handleClose"
      width="50%"
      ref="addProjectDialog"
    >
      <el-form
        ref="addForm"
        :model="addForm"
        :rules="addFormRule"
        :inline="true"
        label-width="180px"
        class="demo-ruleForm"
        label-position="right"
      >
        <el-form-item label="最小实例数" prop="min_instance_count">
          <el-input v-model="addForm.min_instance_count" suffix-icon="xxxx"></el-input>
        </el-form-item>
        <el-form-item label="最大实例数" prop="max_instance_count">
          <el-input v-model="addForm.max_instance_count" suffix-icon="xxxx"></el-input>
        </el-form-item>
        <el-form-item label="条件" >
          <el-button type="primary" @click="addCondition">新增</el-button>
        </el-form-item>
        <el-form-item
          v-for="(condition, index) in dynamicValidateForm.condition"
          :label="'条件' + index"
          :key="condition.key"
          :prop="'condition.' + index + '.value'"
        >
          <el-form-item label="名称" prop="name">
            <el-input v-model="condition.name"style="width:217px"></el-input>
          </el-form-item>
          <el-form-item label="冷却时间" prop="cooldown_time">
            <el-input v-model="condition.cooldown_time"style="width:217px"></el-input>
          </el-form-item>
          <el-form-item label="key" prop="key">
            <el-select v-model="condition.key" placeholder="请选择类型">
              <el-option label="cpu" value="cpu"></el-option>
              <el-option label="memory" value="memory"></el-option>
            </el-select>
            <el-button type="warning" @click.prevent="removeCondition(condition)">删除该条件</el-button>
          </el-form-item>
          <el-form-item label="缩小值" prop="scale_in_value">
            <el-input v-model="condition.scale_in_value"style="width:217px"></el-input>
          </el-form-item>
          <el-form-item label="放大值" prop="scale_out_value">
            <el-input v-model="condition.scale_out_value"style="width:217px"></el-input>
          </el-form-item>

        </el-form-item>

      </el-form>
      <span slot="footer" class="dialog-footer">
        <el-button type="primary" @click="submitForm('addForm')">确定</el-button>
        <el-button @click="dialogVisibleAddAuto = false">关闭</el-button>
      </span>
    </el-dialog>
    <!--新建定时伸缩-->
    <el-dialog
      title="新建定时伸缩"
      :visible.sync="dialogVisibleAddTim"
      :before-close="handleClose"
      width="70%"
      ref="addProjectDialog"
    >
      <el-form
        ref="addForm"
        :model="addForm"
        :rules="addFormRule"
        :inline="true"
        label-width="180px"
        class="demo-ruleForm"
      >
        <el-form-item label="vnfrId" prop="vnfrId">
          <el-select v-model="addForm.vnfrId" placeholder="请选择">
            <el-option
              v-for="item in vnfrIdOptions"
              :key="item.value"
              :label="item.label"
              :value="item.value">
            </el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="VDU_ID" prop="vduName">
          <el-select v-model="addForm.vduName" placeholder="请选择">
            <el-option
              v-for="item in vduIdOptions"
              :key="item.value"
              :label="item.label"
              :value="item.value">
            </el-option>
          </el-select>
        </el-form-item>
      </el-form>
      <span slot="footer" class="dialog-footer">
        <el-button type="primary" @click="submitForm('addForm')">确定</el-button>
        <el-button @click="dialogVisibleAddTim = false">关闭</el-button>
      </span>
    </el-dialog>

    <!--修改-->
    <el-dialog
      @click.stop
      title="策略修改"
      :visible.sync="editVisible"
      width="70%"
      :before-close="handleClose"
      @opened="initContent('editorRef')">
      <label>
        <Editor ref="editorRef"></Editor>
      </label>
      <span slot="footer" class="dialog-footer">
   <el-button icon="el-icon-close" @click="editVisible=false">取消</el-button>
    <el-button type="primary" @click="saveVnfd()" :loading="this.saveLoading">保存<i
      class="el-icon-upload el-icon--left"></i></el-button>
  </span>
    </el-dialog>
  </div>
</template>

<script>
    import Info from '../info';
    import Editor from '../Editor';
    export default {
        name: "policy",
        components: {
            Info,
            Editor,
        },
        data() {
            let url = /^(https?:\/\/)([0-9a-z.]+)(:[0-9]+)?([/0-9a-z.]+)?(\?[0-9a-z&=]+)?(#[0-9-a-z]+)?/;
            let isUrl = (rule, value, callback) => {
                if (!url.test(value)) {
                    return callback(new Error("请输入正确的url地址"));
                } else {
                    callback();
                }
            };
            return {
                // isSure: false, //按钮的加载动画
                polInfo:{},
                infoVisible:false,
                editVisible: false,
                saveLoading: false,
                dialogVisibleAddAuto: false, //新增弹出框展示参数
                dialogVisibleAddTim: false, //新增弹出框展示参数
                vnfrData: [],//vnf实例数据
                addForm: {
                    vnfrid: "",
                    vdu_id: "",
                    min_instance_count:'',
                    max_instance_count:'',
                    cooldown_time:'',
                    condition:{key:'',
                        scale_in_value:'',
                        scale_out_value:''}


                }, //新增表数据
                addFormVnfrid:[],
                addFormVduid:[],
                editPolicyId:[],
                addFormRule: {
                    vnfrid: [{ required: true, message: "请输入vnfrId", trigger: "blur" }],
                    vdu_id: [{ required: true, message: "请输入vduId", trigger: "blur" }],
                    min_instance_count: [{ required: true, message: "请输入min_instance_count", trigger: "blur" }],
                    max_instance_count: [{ required: true, message: "请输入max_instance_count", trigger: "blur" }],
                    // scale_in_value: [{ required: true, message: "请输入cooldown_time", trigger: "blur" }],

                } ,//新增表数据校验
                vnfrIdOptions: [],
                vduIdOptions:[],
                dynamicValidateForm: {
                    condition: [{
                        name:'',
                        key: '',
                        cooldown_time:'',
                        scale_out_value:'',
                        scale_in_value:''

                    }]
                },//动态增加input

            };
        },
        mounted() {
            this.getVnfi();

        },
        computed: {
        },
        methods: {
            cellClick(row, column, event) {
                if(event.cellIndex != 0){
                    this.$refs.multipleTable.toggleRowExpansion(row)
                }
            },
            tableRowStyle ({ row, rowIndex }) {
                return 'background-color:#ecf5ff'
            },
            submitForm(addForm) {

                let policys = {};
                let temPolicys = {};
                this.$refs[addForm].validate(
                    valid => {
                    temPolicys={ vnfrid: this.addFormVnfrid,
                            vdu_id: this.addFormVduid,
                            min_instance_count:this.addForm.min_instance_count,
                            max_instance_count:this.addForm.max_instance_count,
                            condition:this.dynamicValidateForm.condition};
                    policys=({policy:temPolicys});
                    // console.log(policys);
                    if (valid) {
                        // this.isSure = true; //先让按钮做加载动画
                        this.$api.pol.create(this.addFormVnfrid,policys)
                            .then(response => {
                                // this.isSure = false; //关闭加载动画
                                this.dialogVisibleAddAuto = false; //关闭dialog
                                this.getVnfi();
                            })
                    }
                    else {
                        // this.isSure = false; //关闭加载动画
                        this.$message({
                            type: "info",
                            message: "error submit!!"
                        });
                        return false;
                    }
                });
                this.$refs['addProjectDialog'].doClose();

            },
            addFormPol(vnfrid,vduid){
                this.addFormVnfrid = vnfrid;
                this.addFormVduid = vduid;
                this.dialogVisibleAddAuto = true;
            },
            handleClose(done) {
                this.$confirm("确认关闭？")
                    .then(_ => {
                        done();
                        // this.$refs["addForm"].resetFields();
                    })
                    .catch(_ => {});
            },
            handleInfo(vnfrid,policyid){
                this.infoVisible=true;
                this.$api.pol.detail(vnfrid,policyid).then(response=>{this.polInfo=response.data;})
                },
            handleEdit(vnfrid,policyid) {
                this.editVisible = true;
                this.addFormVnfrid = vnfrid;
                this.editPolicyId = policyid;
            },
            initContent(name) {
                this.$api.pol.detail(this.addFormVnfrid,this.editPolicyId)
                    .then((response) => {
                        this.$refs[name].initialize(response.data);
                    });
            },
            saveVnfd() {
                let code = this.$refs.editorRef.getCode();//获取Edit里的内容
                try {
                    JSON.parse(code);
                }catch (e) {
                    MessageBox.alert(e,'json格式错误');
                    return
                }
                // this.saveLoading = true;
                this.$api.pol.update(this.addFormVnfrid,this.editPolicyId,code).then(()=>{
                    this.$message({
                        message: "策略修改成功",
                        type: "success"
                    });
                });
                // this.saveLoading = false;
                this.editVisible = false;

            },
            handleDelete(vnfrid,policy_id){
                this.$api.pol.delete(vnfrid,policy_id).then(()=>{
                    this.$message({
                        type:'success',
                        message: '删除成功',
                        duration: 1500,
                        forbidClick: true
                    });
                    this.getVnfi();
                });
                this.$refs[index].doClose();
            },
            cancelDelete(id){
                this.$refs[id].doClose();
            },
            getVnfi(){
                let tempDatas = [];
                let tempVnfr=[];
                let tempVnfrs=[];
                let tempNs = [];
                let tempVdur = [];
                let Policise = [];

                this.$api.pol.list().then((response) => {
                    Policise = response.data;//获取所有策略
                    this.$api.vnfi.list().then(response => {
                        for (let i in response.data) {
                            let tempData = response.data[i];
                            let tempVdu= [];

                            tempVdur = tempData.vdur;
                            for (let tempOneVdur in tempVdur){
                                let tempPolicyStatus = '无策略';
                                let tempPolicyId = '-----------';
                                for(let tempPol in Policise ){
                                        if (Policise[tempPol].policy.vdu_id==tempVdur[tempOneVdur]['vdu-id-ref'] && Policise[tempPol].policy.vnfrid == tempData._id) {
                                            tempPolicyStatus = Policise[tempPol].policystatus;
                                            tempPolicyId = Policise[tempPol].policyid;
                                            tempVdu.push({
                                                vdu_id_ref: tempVdur[tempOneVdur]['vdu-id-ref'],
                                                status: tempVdur[tempOneVdur].status,
                                                name: tempVdur[tempOneVdur].name,
                                                vnfrid: tempData._id,
                                                policystatus: tempPolicyStatus,
                                                policyid: tempPolicyId

                                            });
                                            break;
                                        }

                                    }
                                if(tempPolicyStatus=='无策略' && tempPolicyId == '-----------'){
                                        tempVdu.push({
                                            vdu_id_ref: tempVdur[tempOneVdur]['vdu-id-ref'],
                                            status: tempVdur[tempOneVdur].status,
                                            name: tempVdur[tempOneVdur].name,
                                            vnfrid: tempData._id,
                                            policystatus: tempPolicyStatus,
                                            policyid: tempPolicyId

                                        });
                                    }

                                }

                            tempVnfr.push({vnfdRef:tempData['vnfd-ref'],
                                id:tempData.id,
                                index:tempData['member-vnf-index-ref'],
                                nsr_id_ref:tempData['nsr-id-ref'],
                                vnfd_id:tempData['vnfd-id'],
                                vdu:tempVdu
                            });

                        };

                        this.$api.ssi.list().then(response => {
                            for (let vnfr in tempVnfr) {
                                for (let j in response.data) {
                                    let tempOneNs = response.data[j];
                                    if(tempOneNs.id == tempVnfr[vnfr].nsr_id_ref){
                                        tempNs.push({name: tempOneNs.name});
                                        break;}
                                }
                            }
                            this.$api.vnf.list().then(response => {
                                for (let vnfr in tempVnfr) {
                                    for (let vnf in response.data) {
                                        let tempVnf = response.data[vnf];
                                        if(tempVnfr[vnfr].vnfd_id ==tempVnf._id){
                                            tempVnfrs.push({vnfdDes:tempVnf.description,
                                                name:tempNs[vnfr].name,
                                                vnfdRef:tempVnfr[vnfr].vnfdRef,
                                                id:tempVnfr[vnfr].id,
                                                index:tempVnfr[vnfr].index,
                                                vdu:tempVnfr[vnfr].vdu});
                                            break;
                                        };

                                    }
                                }
                            });
                        });
                    });
                })

                this.vnfrIdOptions = tempDatas;
                // console.log('tempVnfrs');
                // console.log(tempVnfrs);
                this.vnfrData = tempVnfrs;
            },
            startPol(vnfrid,policyid) {
                this.$api.pol.start(vnfrid, policyid).then(response=> {
                    if(response.status == 204){
                        for(let index1 in this.vnfrData){
                        for(let index2 in this.vnfrData[index1].vdu){
                            if(this.vnfrData[index1].vdu[index2].vnfrid == vnfrid && this.vnfrData[index1].vdu[index2].policyid ==policyid ){
                                // console.log(this.vnfrData);
                                this.vnfrData[index1].vdu[index2].policystatus = '1';
                                break
                            }}

                    }}
                });
            },
            stopPol(vnfrid,policyid){
                this.$api.pol.stop(vnfrid,policyid).then(response=> {
                    if(response.status == 204){
                        for(let index1 in this.vnfrData){
                            for(let index2 in this.vnfrData[index1].vdu){
                                if(this.vnfrData[index1].vdu[index2].vnfrid == vnfrid && this.vnfrData[index1].vdu[index2].policyid ==policyid ){
                                    // console.log(this.vnfrData);
                                    this.vnfrData[index1].vdu[index2].policystatus = '0';
                                    break
                                }}

                        }
                    }
                })
            },
            polStatusFormat(row){
                if(row.policystatus>0){
                    return "已激活";
                }
                else if(row.policystatus==0){
                    return "未激活";
                }
                else{
                    return "无策略";
                }
            },
            resetForm(formName) {
                this.$refs[formName].resetFields();
            },
            removeCondition(item) {
                var index = this.dynamicValidateForm.condition.indexOf(item)
                if (index !== -1) {
                    this.dynamicValidateForm.condition.splice(index, 1)
                }
            },
            addCondition() {
                this.dynamicValidateForm.condition.push({
                    key:'',
                    scale_out_value:'',
                    scale_in_value:''

                });
            }
        }

    }
</script>

<style scoped>
  .textAlignL {
    text-align: left;
  }
  .fs29 {
    font-size: 16px;
    padding: 5px;
  }
  .h80PMt5P {
    height: 80% !important;
    margin-top: 5%;
  }

</style>
