<template>
  <div>
    <!--    新增按钮-->
    <div style="float: right;margin: 10px;">
      <el-button
        type="primary"
        style="background-color: #68AFFF;border-color: #68AFFF"
        @click="createPdu"
      >新建物理部署单元</el-button>
    </div>
    <!--    新建实例对话框-->
    <el-dialog title="新建pdu" :visible.sync="dialogVisible" :before-close="closeDialog" width="50%">
      <label>
        <el-form :model="pduForm" ref="pduForm" label-width="140px" class>
          <el-form-item
            label="名称"
            :rules="{ required: true, message: '请输入名称', trigger: 'blur' }">
            <el-input v-model="pduForm.name"></el-input>
          </el-form-item>
          <el-form-item
            label="物理部署单元类型"
            :rules="{ required: true, message: '请输入类型', trigger: 'blur' }"
          >
            <el-input v-model="pduForm.type"></el-input>
          </el-form-item>
          <el-form-item  label="云计算账户">
            <el-select type="select" v-model="pduForm.vim_accounts">
              <el-option v-for="(v,i) in vimAccounts" :key="i" :label="v.name" :value="[v._id]"></el-option>
            </el-select>
          </el-form-item>
          <el-form-item
            v-for="(_interface, index) in pduForm.interfaces"
            :label="'接口' + (index+1)+': '"
            :key="index"
          >
            <el-input placeholder="接口名:" v-model="_interface.name"></el-input>
            <el-input placeholder="IP:" v-model="_interface['ip-address']"></el-input>
            <el-form-item label="是否为管理网络:"><el-select  v-model="_interface.mgmt" >
              <el-option
                label="是"
                :value='true'
              ></el-option>
              <el-option
                label="否"
                :value='false'
              ></el-option>
            </el-select></el-form-item>
            <el-input placeholder="网络名称:" v-model="_interface['vim-network-name']"></el-input>
            <el-button @click.prevent="removeInterface(_interface)">删除</el-button>
          </el-form-item>
          <el-button type="success" @click="addInterface">新增配置</el-button>
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
    <!--    表格-->
    <el-table
      :data="tableDataCur.slice((currentPage-1)*pageSize,currentPage*pageSize)"
      height="420"
      size="medium "
      border
      stripe
      style="width: 100%"
    >
      <el-table-column prop="_id" label="ID" width="180"></el-table-column>
      <el-table-column prop="name" label="名称"></el-table-column>
      <el-table-column prop="type" label="类型"></el-table-column>
      <el-table-column prop="_admin.usageState" label="使用情况"></el-table-column>
      <el-table-column prop="_admin.created" label="创建时间" :formatter="createTimeFormat"></el-table-column>
      <el-table-column prop label="操作">
        <template slot="header" slot-scope="scope">
          <el-input v-model="search" size="mini" placeholder="输入名称以搜索" />
        </template>
        <div slot-scope="scope">
          <i
            title="信息"
            class="el-icon-info action_icon"
            @click="handleInfo(scope.$index, scope.row)"
          ></i>
          <el-popover placement="top" width="160" :ref="scope.$index" trigger="click">
            <p>确定删除吗？</p>
            <div style="text-align: right; margin: 0">
              <el-button size="mini" type="text" @click="canceldelete(scope.$index)">取消</el-button>
              <el-button type="primary" size="mini" @click="handleDelete(scope.$index,scope.row)">确定</el-button>
            </div>
            <i title="删除" class="el-icon-delete action_icon" slot="reference"></i>
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
        next-text="下一页"
      ></el-pagination>
    </div>
    <!--    信息-->
    <el-dialog title="虚拟网元实例信息" :visible.sync="infoVisible" width="70%">
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
import Info from "../info";
import instantiation from "../instantiation";
export default {
  name: "pdu",
  components: {
    Info
  },
  data() {
    return {
      vimAccounts: [],
      pduForm: {
        interfaces: [
          {
            name: "",
            "ip-address": "",
            mgmt: true,
            "vim-network-name": "",
          }
        ],
        name: "",
        type: "",
        vim_accounts: ""
      },
      dialogVisible: false,
      pduInfo: {},
      infoVisible: false,
      tableData: [],
      search: "",
      currentPage: 1,
      pageSize: 5,
      total: 0
    };
  },
  mounted() {
    this.getPdu();
    this.getVimAccount();
  },
  computed: {
    tableDataCur() {
      if (this.search) {
        let search = this.search;
        let res = this.tableData.filter(
          data =>
            !search ||
            data._id.toLowerCase().includes(search.toLowerCase()) ||
            data.name.toLowerCase().includes(search.toLowerCase()) ||
            data.type.toLowerCase().includes(search.toLowerCase()) ||
            data._admin.usageState.toLowerCase().includes(search.toLowerCase())
        );
        this.total = res.length;
        this.currentPage = 1;
        return res;
      }
      this.total = this.tableData.length;
      this.currentPage = 1;
      return this.tableData;
    }
  },
  methods: {
    getPdu() {
      this.$api.pdu.list().then(response => {
        this.tableData = response.data;
      });
    },
    getVimAccount() {
      this.$api.vim.list().then(response => {
        this.vimAccounts = response.data;
      });
    },
    handleInfo(index, row) {
      this.infoVisible = true;
      this.pduInfo = row;
    },
    createTimeFormat(row) {
      const date = new Date(row["_admin"]["created"] * 1000);
      const Y = date.getFullYear() + "-";
      const M =
        (date.getMonth() + 1 < 10
          ? "0" + (date.getMonth() + 1)
          : date.getMonth() + 1) + "-";
      const D = date.getDate() + " ";
      const h = date.getHours() + ":";
      const m = date.getMinutes() + ":";
      const s = date.getSeconds();
      return Y + M + D + h + m + s;
    },
    handleSizeChange(val) {
      this.pageSize = val;
    },
    handleCurrentChange(val) {
      this.currentPage = val;
    },
    submitForm(formName) {
      this.$refs[formName].validate(valid => {
        if (valid) {
          // alert(JSON.stringify(this.pduForm));
          this.$api.pdu.create(this.pduForm).then(
            (response)=>{
              alert('实例化成功,实例id:'+response.data.id);
              this.getPdu();
            });
          this.dialogVisible = false;
          this.resetForm('pduForm')
        } else {
          console.log("error submit!!");
          return false;
        }
      });
    },
    resetForm(formName) {
      this.$refs[formName].resetFields();
      this.pduForm = {
        interfaces: [
          {
            name: "",
            "ip-address": "",
            mgmt: true,
            "vim-network-name": "",
          }
        ],
        name: "",
        type: "",
        vim_accounts: ""
    };
    },
    removeInterface(i) {
      var index = this.pduForm.interfaces.indexOf(i);
      if (index !== -1) {
        this.pduForm.interfaces.splice(index, 1);
      }
    },
    addInterface() {
      this.pduForm.interfaces.push({
        name: "",
        "ip-address": "",
        mgmt: true,
        "vim-network-name": "",
      });
    },
    createPdu() {
      this.dialogVisible = true;
    },
    closeDialog() {
      this.dialogVisible = false;
      this.resetForm("pduForm");
    },
    handleDelete(index, row) {
      this.$api.pdu.delete(row._id).then(()=>{
        this.$message({
          type:'success',
          message: '删除成功',
          duration: 1500,
          forbidClick: true
        });
        this.getPdu();
      });
      this.$refs[index].doClose();
    },
    cancelDelete(id) {
      this.$refs[id].doClose();
    }
  }
};
</script>
<style scoped>
</style>
