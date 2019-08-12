<template>
  <div>
  <div  class="in-coder-panel setTextLeft" @click.stop>
    <textarea  @click.stop class='left' ref="textarea" ></textarea>
  </div>
  </div>
</template>

<script>

  import CodeMirror from 'codemirror';
  import 'codemirror/lib/codemirror.css';
  // 引入主题后还需要在 options 中指定主题才会生效
  import 'codemirror/theme/neat.css';
  // 需要引入具体的语法高亮库才会有对应的语法高亮效果
  import 'codemirror/mode/javascript/javascript.js';
  import 'codemirror/mode/yaml/yaml.js';
  import 'codemirror/addon/fold/foldcode.js';
  import 'codemirror/addon/fold/foldgutter.js';
  import 'codemirror/addon/fold/brace-fold.js';
  import 'codemirror/addon/search/searchcursor.js';
  import 'codemirror/addon/search/search.js';
  import 'codemirror/addon/dialog/dialog.js';
  import 'codemirror/addon/edit/matchbrackets.js';
  import 'codemirror/addon/edit/closebrackets.js';
  import 'codemirror/addon/display/fullscreen.js';
  import 'codemirror/keymap/sublime.js';



  // 尝试获取全局实例
  // const CodeMirror = window.CodeMirror || _CodeMirror;


  export default {
    name: 'editor',
    components:{
    },
    props:{
    // 外部传入的内容，用于实现双向绑定
    value: {}
    },

    data () {
      return {
        // 内部真实的内容
        code: '',
        //编辑器
        coder:null,
        // 默认的语法类型
        mode: 'javascript',
        // 默认配置
        options: {
          showCursorWhenSelecting: false,
          // autofocus: true,
          autoRefresh: true,
          lineNumbers: true,
          lineWrapping: true,
          // foldGutter: true,
          // readOnly:'nocursor',
          fullScreen: false,
          // gutters: ["CodeMirror-linenumbers", "CodeMirror-foldgutter"],
          autoCloseBrackets: true,
          matchBrackets: true,
          extraKeys: {
            "F11": function (cm) {
              cm.setOption("fullScreen", !cm.getOption("fullScreen"));
            },
            "Esc": function (cm) {
              if (cm.getOption("fullScreen")) cm.setOption("fullScreen", false);
            },
          },
          theme: "neat",
          keyMap: "sublime"
        },
        modes: [{ value: 'yaml',
          label: 'yaml'
        },{ value: 'javascript',
          label: 'json'
        },]
      }
    },
    mounted(){
      this.coder=CodeMirror.fromTextArea(this.$refs.textarea, this.options)
    },
    methods: {
      // 初始化数据
      initialize () {
        // 初始化编辑器实例，传入需要被实例化的文本域对象和默认配置
        // 编辑器赋值
        this.coder.setValue(JSON.stringify(this.value,null,4));
        // this.coder.setOption("autoRefresh", true);
        this.coder.setSize("auto", "auto");
        // this.coder.on('change', (coder) => {
        //   this.code = coder.getValue()});
        // console.log(this.code)
        },
      //获取code
      getCode(){
        this.code=this.coder.getValue();
        console.log(this.code);
        return this.code;
      },
      // 更改模式
      changeMode (mod) {
        // 修改编辑器的语法配置
        this.coder.setOption('mode', `text/${mod}`);
      }
    }

  };
</script>

<style scoped>
  .setTextLeft {text-align: left !important;}
</style>
