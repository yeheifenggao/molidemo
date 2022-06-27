<template>
<div id="btn">
    <el-row>
    <el-button @click="Frontview">正</el-button>
    <el-button @click="Leftview">左</el-button>
    <el-button @click="Rightview">右</el-button>
    <el-button @click="Topview">俯</el-button>
    <el-button @click="Bottomview">底</el-button>
  </el-row>
</div>
  <div id="create" >
  </div>
</template>

<script>
import * as THREE from 'three'
import { onMounted, reactive } from '@vue/runtime-core';
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader.js';
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls.js'
import { DragControls } from 'three/examples/jsm/controls/DragControls.js';
import { useStore } from 'vuex'
import { defineComponent, ref } from 'vue'
export default {
 props: ['show'],
 setup(props) {
    const store = useStore()
     //容器
    let container;
    //视口高度
    let width;
    //视口宽度
    let height;
     //场景
    let scene; 
    //组
    let group
    //相机
    let camera
     //渲染器
    let renderer
     //材质
    let material;
     //
    let geometry;
    // 
    let cube;
    //gltf
    let loader  = new GLTFLoader();
    //点光源
    let pointLight;
    //拖拽控件
    let dragControls
    //相机控件对象
    let controls;
    //控制请求帧
    let renderRequested ;
    //
    let model

    let i = 0
    
    const testData1 = reactive({
        modelurl: ''
    })
    //挂载完毕获取dom并插入渲染结果
    onMounted (() => {
        container = document.getElementById('create');
        width = container.clientWidth;
        height = container.clientHeight
        initScene();
        initCamera();
        Fangkuai();
        initRenderer();
        // initLoader();
        // deletemodel()
        initLight();
        // initDragControls();
        initControls();
        animate();
        resize();
        
    })
    
    //初始化场景
    const initScene = () => {
        scene = new THREE.Scene();
        group = new THREE.Group();
        scene.add(group)
        // console.log(group+'还没添加模型');
    }
    //初始化相机
    const initCamera = () => {
        const fov = 25
        camera = new THREE.PerspectiveCamera( fov, width / height, 0.1, 1000 );
        camera.position.z = -5;
        // camera.position.z = -100;
        camera.position.x = 0;//相机的位置
        camera.position.y = 2;
        // camera.position.y = 100;
        //创建相机辅助对象
        const helper = new THREE.CameraHelper( camera );
        scene.add( helper );
        camera.lookAt({
                    x : 0,
                    y : 0,
                    z : 0
                })
    }
    //渲染器
    const initRenderer = () => {
        renderer = new THREE.WebGLRenderer();
        renderer.setSize( width, height );
        //设置渲染背景
        renderer.setClearColor('#428bca',0);
        container.appendChild(renderer.domElement)
    }
    //光源
    const initLight = () => {
        //点光
        pointLight = new THREE.PointLight(0xffffff);
        pointLight.position.set(20, 100, -40); //点光源位置
        //环境光，，环境光会均匀的照亮场景中的所有物体
        const pointLight1 = new THREE.AmbientLight(0xffffff);
        // pointLight1.position.set(-20, 100, 40); //点光源位置
        //平行光，太阳光
        const pointLight2 = new THREE.DirectionalLight( 0xffffff, 0.9 );
        //半球光/天空色/地面色 /强度，，光源直接放置于场景之上，光照颜色从天空光线颜色渐变到地面光线颜色。
        const light = new THREE.HemisphereLight( 0xffffff, 0xffffff, 1 );
        // scene.add(pointLight); //点光源添加到场景中
        // scene.add(pointLight1); //点光源1添加到场景中
        // scene.add(pointLight2); //点光源1添加到场景中
        scene.add(light); //点光源1添加到场景中
        
           
    }
    //相机控件
    const initControls = () => {
        controls = new OrbitControls(camera,renderer.domElement);
        // controls.enableDamping = true;//增加某种惯性, 让整个画面显得不那么僵硬.
        controls.addEventListener("change", () => {
        // controls.update();
        renderer.render(scene, camera);
      }); //监听鼠标、键盘事件

    }

    //通过语句判断模型需要哪个地址  
    const getmodelurl = () => { 
        switch (store.state.id) {
            case 1:
                testData1.modelurl = store.state.modelurl[0].address
                console.log(1);
                break;
            case 2:
                testData1.modelurl = store.state.modelurl[1].address
                console.log(2);
                break;
            case 3:
                testData1.modelurl = store.state.modelurl[2].address
                console.log(3);
                break;
            default:
                console.log(4);
                break;   
        }
        return testData1.modelurl
    }
    //引入gltf模型
    const initLoader = () => {
        //调用方法，获取地址
        getmodelurl()
        // loader = new GLTFLoader();
        // loader.load("moxings/slamvan/scene.gltf",(gltf) => {
        // loader.load("moxings/gltf/BotSkinned/glTF-MaterialsUnlit/Bot_Skinned.gltf",(gltf) => {
        loader.load(testData1.modelurl,(gltf) => {
            model && model.removeFromParent ()//移出上一个模型
            model = gltf.scene;
            model.scale.set(15, 15, 15); //缩放
            model.position.copy(new THREE.Vector3(0, -0.2, 0)); //基于原点的位置，没有需求改为0即可
            model.rotation.copy(new THREE.Euler(0, Math.PI + 0.6, 0)); //旋转，没有需求改为0即可
            group.add(model);
        })
    }
    
    //创建方块模型
    const Fangkuai =() => {
        geometry = new THREE.BoxGeometry( 1, 1, 1 );
	    material = new THREE.MeshBasicMaterial( { color: 0x00ff00 } );
	    cube = new THREE.Mesh( geometry, material );
	    // scene.add( cube );
    }
	//渲染
	function animate() {
	// model.rotation.x += 0.01;
	// model.rotation.y += 0.01;
	
    requestAnimationFrame( animate );
    renderer.render( scene, camera );
    };
    // 自适应
   const resize = () => {
    window.addEventListener('resize', function(){
        renderer.setSize(container.offsetWidth,container.offsetHeight);
        camera.aspect = container.offsetWidth/container.offsetHeight;
        camera.updateProjectionMatrix();
        // console.log(container.offsetWidth,container.offsetHeight);
        })
   }
   //正视图
   const Frontview = () => {
        camera.position.z = -5;
        camera.position.x = -3.5;//相机的位置
        camera.position.y = 0;
        camera.lookAt({
                    x : 0,
                    y : 0,
                    z : 0
                })
        
   }
   //左视图
   const Leftview = () => {
        camera.position.z = -5;
        camera.position.x = 7;//相机的位置
        camera.position.y = 0;
        camera.lookAt({
                    x : 0,
                    y : 0,
                    z : 0
                })
   }
   //右视图
   const Rightview = () => {
        camera.position.z = 4;
        camera.position.x = -8;//相机的位置
        camera.position.y = 0;
        camera.lookAt({
                    x : 0,
                    y : 0,
                    z : 0
                })
   }
   //俯视图
   const Topview = () => {
        camera.position.z = 0;
        camera.position.x = 0;//相机的位置
        camera.position.y = 5;
        camera.lookAt({
                    x : 0,
                    y : 0,
                    z : 0
                })
   }
   //底视图
   const Bottomview = () => {
        camera.position.z = 0;
        camera.position.x = 0;//相机的位置
        camera.position.y = -5;
        camera.lookAt({
                    x : 0,
                    y : 0,
                    z : 0
                })
   }
   return{
       initLoader,
       Frontview,
       Leftview,
       Rightview,
       Topview,
       Bottomview,
    //    deletemodel
   }
 }

}
</script>

<style>
#create {
    width: 56vw;
    height:60vh;
}
#btn .el-button {
    float: right;
    background-color: transparent !important;
    color: white;
}
</style>