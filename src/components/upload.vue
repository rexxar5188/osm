<template>
  <div>
    <el-upload
      class="upload-demo"
      drag
      :limit="1"
      ref="upload"
      :auto-upload="false"
      action=""
      :http-request="handleUpload"
    >
      <div class="el-upload__text">
        将文件拖到此处，或
        <em>点击上传</em>
        <i class="el-icon-upload"></i>
      </div>


      <!--      <div class="el-upload__tip" slot="tip">只能上传{{type}}文件,且不超过{{size}}字节</div>-->
    </el-upload>
    <el-button style="margin-left: 10px;" size="small" type="success" @click="submitUpload">上传到服务器</el-button>
  </div>
</template>
<script>

  export default {
    name: 'uploadFiles',
    props: { topic: String },
    data() {
      return {
      };
    },
    mounted() {
      console.log(this.$refs);
    },
    methods: {
      submitUpload() {
        // this.$refs.upload.$refs["upload-inner"].fileList

        // this.$refs.upload.$refs["upload-inner"].fileList.length

        let fileNum = this.$refs.upload.$refs['upload-inner'].fileList.length;
        if (fileNum == '0') {
          this.$message('请先选择上传文件');
        }
        // else {
        //   var size = this.$refs.upload.$refs["upload-inner"].fileList[0].size;
        //   var type = this.$refs.upload.$refs["upload-inner"].fileList[0].raw.type;
        //     console.log("文件的值", type, size);
        //   if (size > this.size) {
        //     this.$message("上传文件大小不得超过" + this.size + "字节");
        //   } else {
        //     if (type != this.type) {
        //       this.$message("只能上传" + this.type + "格式的文件");
        //     }
        else {
          console.log(this.$refs.upload);
          this.$refs.upload.submit();
        }
      },
       handleUpload(file) {
        let formData=new FormData();
        formData.append("file", file.file);
        console.log(formData);
         this.$api[this.topic].upload(formData)
          .then((response) => {
            if (response.status==201) {
              this.$message({
                type: 'success',
                message: '上传成功',
                duration: 1500,
                forbidClick: true
              });
              this.$api[this.topic].list()
                .then((response)=>{
                this.$emit('refresh',response.data)
              })
            }else{alert(response.data)}}).catch(()=>{});
        this.$refs['upload'].clearFiles()
      },
      handleRemove(file, fileList) {
      },
      handlePreview(file) {
      }
    }
  };

</script>
<style>
  .el-upload,
  .el-upload-dragger {
    width: 100% !important;
  }

  /* .el-upload-list {
    margin-top: -62px;
  } */
</style>
