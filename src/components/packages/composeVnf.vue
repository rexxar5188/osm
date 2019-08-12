<template>
  <div id="main">
    <div id="leftside">
      <div class="section">
        <span style="font-weight: 500;">选择元素</span>
      </div>
      <div id="palette">
        <div class="icon" style="position:absolute; top:240px; background-color: #9182B6"></div>
        <div class="name1" style="position:absolute; top:240px; ">VDU</div>
        <div class="icon" style="position:absolute; top:270px; background-color: #c6b63f"></div>
        <div class="name1" style="position:absolute; top:270px; ">CP</div>
        <div class="icon" style="position:absolute; top:300px; background-color: #5BC0DE"></div>
        <div class="name1" style="position:absolute; top:300px; ">IntVL</div>
        <div class="icon" style="position:absolute; top:330px; background-color: #e3bfad"></div>
        <div class="name1" style="position:absolute; top:330px; ">IntCP</div>
      </div>
    </div>
    <div id="graph_editor_container" >
      <div>
        <el-button-group style="position: absolute;left:40px;top: 10px;border-radius: 0px; ">
          <el-button class="button" type="primary" icon="el-icon-connection"></el-button>
          <el-button class="button" type="primary" icon="el-icon-edit" title="编辑"></el-button>
          <el-button class="button" type="primary" icon="el-icon-message" title="帮助"></el-button>
        </el-button-group>

      </div>
      <div id="legenda">
        <div>
          <div class="icon show" style=" background-color: #9182B6"></div>
          <div class="show">VDU</div>
        </div>
        <div>
          <div class="icon show" style=" background-color: #c6b63f"></div>
          <div class="show" >CP</div>
        </div>
        <div>
          <div class="icon show" style=" background-color: #5BC0DE"></div>
          <div class="show" >IntVL</div>
        </div>
        <div>
          <div class="icon show" style="background-color: #e3bfad"></div>
          <div class="show">IntCP</div>
        </div>
      </div>
    </div>
    <div id="side">
      <div class="section">
        <span style="font-weight: 500;">VNFD</span>
        <el-button class="button" type="primary" icon="el-icon-wallet" @click="update">保存</el-button>
      </div>
      <div style="margin: 20px;"></div>

      <el-form  label-width="80px" :model="formLabelAlign">
        <el-form-item label="简称">
          <el-input v-model="formLabelAlign.abbr"></el-input>
        </el-form-item>
        <el-form-item label="描述">
          <el-input v-model="formLabelAlign.description"></el-input>
        </el-form-item>
        <el-form-item label="版本">
          <el-input v-model="formLabelAlign.version"></el-input>
        </el-form-item>
        <el-form-item label="标识号">
          <el-input v-model="formLabelAlign.id"></el-input>
        </el-form-item>
        <el-form-item label="名称">
          <el-input v-model="formLabelAlign.name"></el-input>
        </el-form-item>
      </el-form>

    </div>
  </div>
</template>

<style>
  #main {
    height: 100%;
    display: flex;
  }
  #leftside {
    border-right: 1px solid #AFAFAF;
    flex: 0 0 ;
    height: 500px;
    max-width: 300px;
    min-width: 150px;
    padding: 20px 30px;
    display: flex;
    flex-direction: column;
  }
  #graph_editor_container {
    position: relative;
    min-height: 100vh;
    flex: 1 1 auto;
    display: flex;
    align-items: center;
    justify-content: center;
  }
  #legenda {
    position: absolute;
    top: 30px;
    right: 40px;
    border: 1px solid #cdcdcd;
    border-radius: 1px;
    padding: 15px;
    text-align: left;
  }
  #side {
    border-left: 1px solid #AFAFAF;
    flex: 0 0 auto;
    max-width: 500px;
    min-width: 300px;
    padding: 20px 30px;
    display: flex;
    flex-direction: column;
  }
  .section {
    font-size: 16px;
    line-height: 40px;
    letter-spacing: 0.4px;
    border-bottom: 1px solid #ccc;
    margin-bottom: 10px;
    margin-top: 20px;
    display: flex;
    justify-content: space-between;
  }
  .button{

    border-color: #68AFFF;
    background-color: #68AFFF

  }

  .icon{
    width: 20px;
    height: 20px;
    border-radius: 1px;
    margin-right: 10px;
  }

  .name{
    width: 20px;
    height: 20px;
    border-radius: 1px;
    margin-right: 10px;



  }
  .name1{
    width: 20px;
    height: 20px;
    border-radius: 1px;
    margin-right: 760px;
    right:420px;
  }
  .show{
    display: inline-block;
  }

</style>

<script>
    export default {
        data() {
            return {
                formLabelAlign: {
                    abbr: '',
                    description: '',
                    version: '',
                    id: '',
                    name:''
                }
            };
        },

        methods: {
            update(){

            }

        }
    }
</script>
