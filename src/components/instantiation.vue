<template>
  <div>
    <!-- <el-button type="text" @click="dialogVisible = true;">点击打开 Dialog</el-button> -->

    <el-dialog :title="this.title"
               v-if='dialogVisible'
               :visible.sync="dialogVisible"
               width="45%"
               :before-close="handleClose">
      <el-form
        :model="ruleForm"
        :rules="rules"
        ref="ruleForm"
        label-width="100px"
        class="demo-ruleForm"
      >
        <el-form-item v-for="(data,i) in datas" :key="i" :label="data.name" :prop="data.nameCode">
          <el-input
            v-if="data.type == 'input'"
            :placeholder="data.placeholder"
            v-model="ruleForm[data.nameCode]"
          ></el-input>
          <el-select v-if="data.type == 'select'" class="w100P" v-model="ruleForm[data.nameCode]">
            <el-option v-for="(d,x) in data.options" :key="x" :label="d.name" :value="d.nameCode"></el-option>
          </el-select>
          <el-input
            v-if="data.type == 'textarea'"
            type="textarea"
            :placeholder="data.placeholder"
            v-model="ruleForm[data.nameCode]"
          ></el-input>
        </el-form-item>
        <el-form-item>
          <el-button type="primary" @click="submitForm('ruleForm')">立即创建</el-button>
          <el-button @click="resetForm('ruleForm')">重置</el-button>
        </el-form-item>
      </el-form>
    </el-dialog>
  </div>
</template>
<script>
export default {
  name: "instantiation",
  props: ["datas",'title','topic','addarg'],
  data() {
    return {
      dialogVisible: false,
      ruleForm: {},
      rules: {},
      instantiateApi:{'ns':this.$api.ns}
    };
  },
  created() {
    console.log("子组件datas", this.datas);
    let form = {};
    this.datas.forEach((v, i) => {
      let name = v.nameCode;
      let isRequired = v.required;
      let message = "";
      if (!isRequired) {
        message = "";
      } else {
        message = v.message;
      }
      form[name] = "";
      let rulesChild = [
        { required: isRequired, message: message, trigger: "blur" }
      ];
      this.rules[name] = rulesChild;
    }
    );
    this.ruleForm = form;
  },
  methods: {
    open() {
      this.dialogVisible = true;
    },
    refreshData(){
      this.$api[this.topic].list()
        .then((response)=>{
          this.$emit('refresh',response.data)
        })
    },
    async submitForm(formName) {
      this.$refs[formName].validate(valid => {
        if (valid) {
          this.ruleForm={
            ...this.ruleForm,
            ...this.addarg,
          };
          // delete this.ruleForm.config;
          // delete this.ruleForm.nsDescription;
          // delete this.ruleForm.ssh_keys;
          this.$api[this.topic].create(this.ruleForm)
            .then((response)=>{
              alert('实例化成功,实例id:'+response.data.id);
            });
          this.dialogVisible = false;
          this.resetForm('ruleForm')
        } else {
          console.log("error submit!!");
          return false;
        }
        this.resetForm('ruleForm');
      });
    },
    resetForm(formName) {
      this.$refs[formName].resetFields();
    },
    handleClose(done) {
      this.$confirm("确认关闭？")
        .then(_ => {
          done();
          this.resetForm('ruleForm')
        })
        .catch(_ => {});
    }
  }
};
</script>
<style scoped>
.w100P {
  width: 100% !important;
}
</style>
