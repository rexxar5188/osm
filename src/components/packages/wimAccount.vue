<template>
  <div class="textAlignL">
    <div style="float: right;margin: 10px;">
      <el-button
        type="primary"
        style="background-color: #68AFFF;border-color: #68AFFF"
        @click="dialogVisibleAdd = true"
      >新建WIM账户</el-button>
    </div>
    <!--    表格-->
    <el-table
      :data="tableDataCur.slice((currentPage-1)*pageSize,currentPage*pageSize)"
      stripe
      style="width: 100%"
    >
      <el-table-column label="名称" prop="name"></el-table-column>
      <el-table-column label="标识号" prop="_id"></el-table-column>
      <el-table-column label="类型" prop="wim_type"></el-table-column>
      <el-table-column label="操作状态" prop="_admin.operationalState"></el-table-column>
      <el-table-column align="center">
        <template slot="header" slot-scope="scope">
          <el-input v-model="search" size="mini" placeholder="输入名称以搜索" />
        </template>
        <template slot-scope="scope">
          <i class="el-icon-info fs29" size="mini" title="详情" @click="handleEdit(scope.$index, scope.row)"
          ></i>
          <template>
            <el-popover placement="top" width="160" :ref="scope.$index" trigger="click">
              <p>确定删除吗？</p>
              <div style="text-align: right; margin: 0">
                <el-button size="mini" type="text" @click="cancelDelete(scope.$index)">取消</el-button>
                <el-button
                  type="primary"
                  size="mini"
                  @click="handleDelete(scope.$index,scope.row)"
                >确定</el-button>
              </div>
              <i class="el-icon-delete action_icon" title="删除" slot="reference"></i>
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
        next-text="下一页"
      ></el-pagination>
    </div>

    <!--    详情-->
    <el-dialog title="WIM账户详情" :visible.sync="dialogVisible" width="70%" class="h80PMt5P">
      <el-form ref="form" :model="form" :inline="true" label-width="180px">
        <el-form-item label="名称">
          <el-input readonly v-model="form.name"></el-input>
        </el-form-item>
        <el-form-item label="WIM用户">
          <el-input readonly v-model="form.user"></el-input>
        </el-form-item>
        <el-form-item label="描述">
          <el-input readonly v-model="form.description"></el-input>
        </el-form-item>
        <el-form-item label="WIM URL地址">
          <el-input readonly v-model="form.wim_url"></el-input>
        </el-form-item>
        <el-form-item label="类型">
          <el-input readonly v-model="form.wim_type"></el-input>
        </el-form-item>
        <el-form-item label="Schema版本">
          <el-input readonly v-model="form.schema_version"></el-input>
        </el-form-item>
      </el-form>
      <span slot="footer" class="dialog-footer">
        <el-button type="primary" @click="dialogVisible = false">关闭</el-button>
      </span>
    </el-dialog>

    <!--新增WIM账户-->
    <el-dialog
      title="新增WIM账户"
      :visible.sync="dialogVisibleAdd"
      :before-close="handleClose"
      width="70%"
    >
      <el-form
        ref="addForm"
        :model="addForm"
        :rules="addFormRule"
        :inline="true"
        label-width="180px"
        class="demo-ruleForm"
      >
        <el-form-item label="名称" prop="name">
          <el-input v-model="addForm.name"></el-input>
        </el-form-item>
        <el-form-item label="类型" prop="wim_type">
          <el-select v-model="addForm.wim_type" placeholder="请选择类型">
            <el-option label="Tapi" value="tapi"></el-option>
            <el-option label="Onos" value="onos"></el-option>
            <el-option label="OpenDaylight" value="odl"></el-option>
            <el-option label="DynPac" value="dynpac"></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="WIM URL地址" prop="wim_url">
          <el-input v-model="addForm.wim_url"></el-input>
        </el-form-item>
        <el-form-item label="WIM用户名称" prop="user">
          <el-input v-model="addForm.user"></el-input>
        </el-form-item>
        <el-form-item label="WIM密码" prop="password">
          <el-input v-model="addForm.password"></el-input>
        </el-form-item>
        <el-form-item label="描述">
          <el-input v-model="addForm.description"></el-input>
        </el-form-item>
      </el-form>
      <span slot="footer" class="dialog-footer">
        <el-button type="primary" @click="submitForm('addForm')">确定</el-button>
        <el-button @click="dialogVisibleAdd = false">关闭</el-button>
      </span>
    </el-dialog>
  </div>
</template>

<script>
import { setTimeout } from 'timers';
export default {
  name: "wimAccount",
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
      tableData: [], //查询出的所有数据
      search: "", //筛选条件
      currentPage: 1, //当前所在页面
      total: 0, //总共页数
      pageSize: 5, //每页展示数据数
      dialogVisible: false, //弹出框展示参数
      dialogVisibleAdd: false, //新增弹出框展示参数
      form: [], //当前行详情数据
      addForm: {
        name: "",
        wim_type: "odl",
        wim_url: "",
        user: "",
        password: "",
        description: "无"
      }, //新增表数据
      addFormRule: {
        name: [{ required: true, message: "请输入名称", trigger: "blur" }],
        wim_type: [{ required: true, message: "请选择类型", trigger: "blur" }],
        wim_url: [
          { required: true, message: "请输入地址", trigger: "blur" },
          { validator: isUrl }
        ],
        user: [{ required: true, message: "请输入用户名称", trigger: "blur" }],
        password: [{ required: true, message: "请输入密码", trigger: "blur" }]
      } //新增表数据校验
    };
  },
  mounted() {
    this.getWimAccount();
  },
  computed: {
    tableDataCur() {
      if (this.search) {
        let search = this.search;
        let res = this.tableData.filter(
          data =>
            !search ||
            data.name.toLowerCase().includes(search.toLowerCase()) ||
            data._id.toLowerCase().includes(search.toLowerCase()) ||
            data.wim_type.toLowerCase().includes(search.toLowerCase()) ||
            data._admin.operationalState
              .toLowerCase()
              .includes(search.toLowerCase())
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
    getWimAccount() {
      this.$api.wim.list().then(response => {
        this.tableData = response.data;
      });
    },
    handleEdit(index, row) {
      this.$api.wim.detail(row._id).then(response => {
        this.form = response.data;
      });
      this.dialogVisible = true;
    },
    handleDelete(index, row) {
      this.$api.wim.delete(row._id).then(() => {
        this.$message({
          type: "success",
          message: "删除成功",
          duration: 1500,
          forbidClick: true
        });
        setTimeout(this.getWimAccount,2000);
      });
      this.$refs[index].doClose();
    },
    cancelDelete(id) {
      this.$refs[id].doClose();
    },
    handleSizeChange(val) {
      this.pageSize = val;
    },
    handleCurrentChange(val) {
      this.currentPage = val;
    },
    submitForm(addForm) {
      this.$refs[addForm].validate(valid => {
        console.log(this.addForm, valid);
        if (valid) {
          // this.isSure = true; //先让按钮做加载动画
          this.$api.wim.create(this.addForm).then(response => {
            // this.isSure = false; //关闭加载动画
            this.dialogVisibleAdd = false; //关闭dialog
            this.getWimAccount();
          });
        } else {
          // this.isSure = false; //关闭加载动画
          this.$message({
            type: "info",
            message: "error submit!!"
          });
          return false;
        }
      });
    },
    handleClose(done) {
      this.$confirm("确认关闭？")
        .then(_ => {
          done();
          this.$refs["addForm"].resetFields();
        })
        .catch(_ => {});
    }
  }
};
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
