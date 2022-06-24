<template>
<!-- 最大的父盒子 -->
  <div class="main">
      <!-- 页面头部区域 -->
    <el-row id="homepage">
       <el-button type="primary" plain @click="gohome">返回主页</el-button>
    </el-row>
      <!-- 页面主体区域 -->
      <div class="tbody">
          <!-- 左侧导航栏区域 -->
          <div class="left_aside">
              <!-- 左侧导航栏头部文字区域 -->
              <div class="left_aside_head">
                  <span>模型列表</span>
              </div>
              <!-- 左侧导航栏主体区域 -->
              <div class="left_aside_body">
                 <el-tree 
                  :data="testData.data"
                  :props="defaultProps"
                  node-key="id"
                  @node-click="handleNodeClick"
                  ref="treeRef"/>
              </div> 
               <!--左侧导航栏底部按钮  -->
               <div class="left_aside_bottom">
                 <el-row class="mb-4">
                   <Addmodul @get-child-data="getChildData"></Addmodul>
                   <!-- <el-button type="warning">修改</el-button> -->
                   <el-button type="danger" class="delete11" @click="deletemodel">删除</el-button>
                   <Editormodul @get-child-new-data="getChildNewData" :numb="testData.deleteList"></Editormodul>
                 </el-row>
               </div>
          </div>
          <!-- 中间模型区域 -->
          <div class="center_aside">
            <!-- 中间模型模块头部功能区域 -->
            <div class="center_aside_head">
              <span>三维模型</span>
             <div class="center_aside_head_btn">
             </div>
            </div>
            <!-- 模型展示区域 -->
            <div class="center_aside_body" >
              <Three ref="three" :index='testData.index3' :show ='testData.modelshow' ></Three>
            </div>
          </div>
          <!-- 右侧数据区域 -->
          <div class="right_aside">
            <span>基本信息</span>
            <div class="right_aside_body">
              <!-- 数据展示区域 -->
              <div class="right_aside_body_show" v-show="testData.DetailsShow">
              <table border="1" class="rightdata" >
                  <tr>
                    <th>类型</th>
                    <th>价格</th>
                  </tr>
                  <tr>
                  <td>{{store.state.a}}</td>
                  <td>{{store.state.b}}</td>
                  </tr>
            </table>
                <!-- 名称：{{testData.Details.name}}<br/>
                价格: {{testData.Details.Price}}<br/> -->
              </div>
            </div>
          </div>
      </div>
 </div>
</template>

<script  setup>
import API from "../plugins/axiosInstance"
import { reactive } from '@vue/reactivity'
import { useRouter  } from 'vue-router'
import { useStore } from 'vuex'
//导入$refs
import { getCurrentInstance, onMounted } from '@vue/runtime-core';
import { ref } from 'vue'
// 引入新增组件
import Addmodul from '@/components/Addmodul.vue'
import Editormodul from '@/components/Editormodul.vue'
import Three from '@/components/Three.vue'
onMounted(() => {
  
})
let a;
let b
const treeRef = ref()
const router = useRouter()
//car列的长度
let carlength = 4
let planelength = 8
const store = useStore()

//调用模型子组件
const three = ref(null);

const fun = () => {
	three.value.initLoader();// 调用子组件的方法,添加模型进去
}
// const delete11 = () => {
// 	three.value.deletemodel();// 调用子组件的方法,删除原来的模型
// }

const testData2 = reactive({
  index4: ''
})

const testData = reactive({
  //用来存储筛选出来的数据
  Details:[],
  // 编辑树形数组内容
  editList:[],
  // 删除树形数据数组内容
  deleteList:[],
  //存储获取的TreeNodeid
  editorid : '',
  //定义控制右侧显示和隐藏
  DetailsShow:false,
  //汽车索引
  index:'',
  //飞机索引
  index1:'',
  
  modelshow:true,
//左侧导航栏信息    
  data: [
  {
    id:0,
    label: '汽车',
    children: [
      {
        label: '轿车',
        id:1
      },
      {
        label: 'SUV',
        id:2
      },
      {
        label: '跑车',
        id:3
      }
      
    ],
  },
  {
    id:4,
    label: '飞机',
    children: [
      {
        label: '客机',
        id:5
      },
      {
        label: '直升机',
        id:6
      },
      {
        label: '战斗机',
        id:7
      }
    ],
  },
],
//有问题
  tableData: [
  {
    date: '类型',
    name: store.state.a,
  },
  {
    date: '价格',
    name: store.state.b,
  },
  ]
});

//新增功能
const getChildData = (list) => {
  console.log(list, '从子组件获取到的数据');
  //如果为1，汽车
  if(list.region == 1){
    console.log(testData.data[0])
    //新增模型
    testData.data[0].children.push({
    label:list.label,
    id:list.id
    })
  }else{
    //因为只有两个，不为一就是飞机
    testData.data[1].children.push({
    label:list.label,
    id:list.id
    })
  }
};
//点击左侧导航触发的事件（获取信息）
const handleNodeClick = (data, TreeNode) => {
  console.log(data);
  testData.modelshow = false
  //将选中的节点赋值给deleteList
  testData.deleteList = data
  //将选中的节点的$treeNodeId 赋值给editorid ，供编辑功能使用
  testData.editorid = data.$treeNodeId
 
  //返回和当前点击的node的id一样的car数组的索引
  testData2.index4 = store.state.car.findIndex(function(item) {
    return item.id == testData.deleteList.id;
  });
  //根据索引获取数据
  if(testData2.index4 !== -1){
  a = store.state.car[testData2.index4].name
  b = store.state.car[testData2.index4].Price
  store.commit('updatea',a)
  store.commit('updateb',b)
}
//传递id，目前供判断模型地址使用
 store.commit('setid',data.id)

  // delete11();
//判断，点击了具体类才显示和请求
  if(data.id >0 && data.id !=4 ){
  testData.DetailsShow=true
  fun();
  }else{
    testData.DetailsShow=false
    //可加个去除模型
  }
}
//删除功能
const deletemodel = () => {
  treeRef.value.remove(testData.deleteList)
  testData.Details = {}
  //点击删除，右侧详细信息模块隐藏
  testData.DetailsShow=false
}
//编辑功能
const getChildNewData = (list) => {
console.log(list,'编辑的新数据');
for (let i = 0; i < 3; i++) {
    //判断所编辑的节点是否在汽车里面
    if(testData.data[0].children[i].$treeNodeId == testData.editorid){
      testData.data[0].children[i].label = list.label
    // 右边数据同步变化
      testData.Details.name = list.label
      testData.Details.Price = list.price
    //不在汽车就在飞机
    }else if(testData.data[1].children[i].$treeNodeId == testData.editorid){
      testData.data[1].children[i].label = list.label
    // 右边数据同步变化
      testData.Details.name = list.label
      testData.Details.Price = list.price
    }
   
  }
}
//配置左侧树形结构
const defaultProps = {
  children: 'children',
  label: 'label',
}
//返回主页
const gohome = () => {
  router.push('/')
}
</script>

<style >
*{
    list-style: none;
    margin: 0;
    padding: 0;
    box-sizing: border-box;
}
.main{
  position:absolute;
  left: 0;
  top: 0;
  width: 100vw;
  height: 100vh;
  background: url(../assets/beijing.jpg);
  background-size: 100%;
  overflow: hidden;
}

.tbody{
    position: absolute;
    left: 0;
    top: 0;
    width: 100%;
    height: 100vh;
    color: #fff;
    
    /* background-color: rgb(182, 221, 52); */
}
.left_aside{
    position: absolute;
    left: 0;
    top: 0;
    width: 20vw;
    height: 100%;
    overflow: hidden;
    /* background-color: rgba(7, 70, 130, 0.549); */
    border: 4px solid rgb(35, 38, 106);
}
.left_aside_head{
    /* margin-left: 2vw; */
    margin-top: 3vh;
    height: 10vh;
    width: 100%;
    font-size: 20px;
    text-align: center;
    /* color: white; */
    /* background-color: rgb(41, 180, 92); */
}
.left_aside_body{
    padding-left: 0.5vw;
    height: 90vh;
    width: 100%;
    color: #fff;
    /* background-color: rgb(28, 26, 26); */
}

.left_aside_bottom{
    position: absolute;
    bottom: 0;
    left: 0;
    height: 5vh;
    width: 100%;
    padding-left: 2vw;
    /* background-color: rgb(185, 32, 32); */

}
.left_aside_bottom .el-button{
    margin-left: 3vw;
    
}

.center_aside{
    position: absolute;
    left: 22vw;
    top: 0;
    width: 56vw;
    height: 100%;
    /* background-color: rgb(232, 42, 42); */
    border: 4px solid rgb(35, 38, 106);
}
.center_aside_head {
  width: 100%;
  height: 10vh;
  /* background-color: rgb(185, 50, 50); */
}
.center_aside_head span{
  float: left;
  margin-top: 2vh;
  margin-left: 2vw;
}
.center_aside_head_btn{
  float: right;
  margin-top: 2vh;
  margin-right: 2vw;
}
.center_aside_body{
  position: absolute;
  margin-top: 10vh;
  width: 100%;
  height: 70vh;
  overflow: hidden;
}
.right_aside{
    position: absolute;
    left: 80vw;
    top: 0;
    width: 20vw;
    height: 100%;
    /* background-color: rgb(232, 42, 147); */
    border: 4px solid rgb(35, 38, 106);
}
.right_aside span {
 position: absolute;
 top: 2vh;
 left: 8vw; 
 font-size: 20px;
}
.right_aside_body_show{
  position: absolute;
  top: 10vh;
  
}
/* 右侧数据区域表格样式 */
.rightdata{
  border: 1px solid white;

}
th{
  width: 10vw;
  height: 2vw;
}
 td {
  width: 10vw;
  text-align: center;
}
#homepage .el-button{
  position:absolute;
  top: 1vh;
  left: 0.5vw;
  background-color: transparent !important;
  color: white;
  cursor: pointer;
  z-index: 10;
}
</style> 