<template>
  <div class="textAlignL">
    <div style="float: right;margin: 10px;">
      <el-button
        type="primary"
        style="background-color: #68AFFF;border-color: #68AFFF"
        @click="dialogVisibleAdd = true"
      >新建租户</el-button>
    </div>
    <!--    表格-->
    <el-table
      :data="tableDataCur.slice((currentPage-1)*pageSize,currentPage*pageSize)"
      stripe
      style="width: 100%"
    >
      <el-table-column label="名称" prop="name"></el-table-column>
      <el-table-column label="标识" prop="_id"></el-table-column>
      <el-table-column label="修改时间" prop="_admin.modified" :formatter="modifiedTimeFormat"></el-table-column>
      <el-table-column label="创建时间" prop="_admin.created" :formatter="createTimeFormat"></el-table-column>
      <el-table-column align="center">
        <template slot="header" slot-scope="scope">
          <el-input v-model="search" size="mini" placeholder="输入名称以搜索" />
        </template>
        <template slot-scope="scope">
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

    <!--新增租户-->
    <el-dialog
      title="新增租户"
      :visible.sync="dialogVisibleAdd"
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
        <el-form-item label="租户名" prop="name">
          <el-input v-model="addForm.name"></el-input>
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
export default {
  name: "project",
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
      projectSelect: "", //监听用
      currentPage: 1, //当前所在页面
      total: 0, //总共页数
      pageSize: 5, //每页展示数据数
      dialogVisible: false, //弹出框展示参数
      dialogVisibleAdd: false, //新增弹出框展示参数
      form: [], //当前行详情数据
      addForm: {
        name: ""
      }, //新增表数据
      addFormRule: {
        name: [{ required: true, message: "请输入租户名称", trigger: "blur" }]
      } //新增表数据校验
    };
  },
  mounted() {
    this.getProjects();
  },
  computed: {
    tableDataCur() {
      if (this.search) {
        let search = this.search;
        let res = this.tableData.filter(
          data =>
            !search ||
            data.name.toLowerCase().includes(search.toLowerCase()) ||
            data._id.toLowerCase().includes(search.toLowerCase())
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
    getProjects() {
      this.$api.project.list().then(response => {
        this.tableData = response.data;
      });
    },
    handleDelete(index, row) {
      this.$api.project.delete(row._id).then(() => {
        this.$message({
          type: "success",
          message: "删除成功",
          duration: 1500,
          forbidClick: true
        });
        this.getProjects();
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
    modifiedTimeFormat(row) {
      const date = new Date(row["_admin"]["modified"] * 1000);
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
    submitForm(addForm) {
      this.$refs[addForm].validate(valid => {
        console.log(this.addForm, valid);
        if (valid) {
          // this.isSure = true; //先让按钮做加载动画
          this.$api.project
            .create(this.addForm)
            .then(response => {
              // this.isSure = false; //关闭加载动画
              this.dialogVisibleAdd = false; //关闭dialog
              this.getProjects();
            })
        } else {
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
