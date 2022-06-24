import { createStore } from 'vuex'

export default createStore({
  state: {
    car:[
      {
      type:'1',
      id:"1",
		  name: "轿车",
		  Price: "10W"
    	},
    	{
      type:'1',
      id:"2",
		  name: "suv",
		  Price: "12W"
	    },
	    {
      type:'1',
      id:"3",
		  name: "跑车",
		  Price: "100W"
	    },
      {
      id:"5",
      name: "客机",
      Price: "3000W"
      },
      {
      id:"6",
      name: "直升机",
      Price: "1000W"
      },
      {
      id:"7",
      name: "战斗机",
      Price: "1000000W"
      }
      
    ],
    // 接收新增表单的表单数据
    addform:{
      type:'',
      id: '5',
      name:'',
      price:''
    },
    modelurl:[
      {address:"moxings/gltf/AnimatedMorphSphere/glTF/AnimatedMorphSphere.gltf"},
      {address:"moxings/gltf/BoomBox/glTF/BoomBox.gltf"},
      {address:"moxings/gltf/BotSkinned/glTF-MaterialsUnlit/Bot_Skinned.gltf"}, 
    ],
    a:'',
    b:'',
    id:''

    
    
  },
  getters: {
  },
  mutations: {
    // 新增模型信息
    AddModeliInformation (state,data) {
      state.addform.type = data.region
      state.addform.name = data.name
      state.addform.price = data.price
     },
    //向car中新增
    AddCar (state) {
      state.car.push(state.addform)
      console.log(state.addform);
      console.log(state.car,1222);
      //加一个for循环
    },
    Addplane (state) {
      state.plane.push(state.addform)
    },
    updatea (state,a) {
      state.a = a
    },
    updateb (state,b) {
      state.b = b
    },
    setid (state,id) {
      state.id = id
    }
    
  },
  actions: {

  },
  modules: {

  }
})
