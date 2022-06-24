<template>
123
  <div id="create" >
    123
  </div>
</template>

<script >
  import * as Three from 'three'
  import {onMounted , ref , reactive} from 'vue'
export default {
  
  setup () {
    onMounted(() => {
      document.getElementById("create").appendChild(renderer.domElement)
    })
    // 1、创建场景和摄像机
    const scene = new Three.Scene()
    // 2、创建摄像机 PerspectiveCamera('视角', '指定投影窗口长宽比', '从距离摄像机多远开始渲染', '截止多远停止渲染100')
    const camera = new Three.PerspectiveCamera(75, container.innerWidth / container.innerHeight, 2, 1000)

    // 3、创建ThreeJs 渲染器
    const renderer = new Three.WebGLRenderer({ antialias: true })
    // 设置渲染器场景大小
    // renderer.setSize(window.innerWidth, window.innerHeight)
    renderer.setSize(300, 500)
    
    // document.body.appendChild(renderer.domElement)
    container = document.getElementById("create")
    // container.appendChild(renderer.domElement)
    // 创建几何模型 BoxGeometry('x轴', '轴', 'z轴')
    const geometry = new Three.BoxGeometry(1, 1, 1)

    
    // 添加材质
    const material = new Three.MeshBasicMaterial({ color: 0x00ff00 })
    // const material = new Three.MeshBasicMaterial({ map: texture })

    // 创建网格对象
    const cube = new Three.Mesh(geometry, material)
    // 添加到场景中去
    scene.add(cube)

    // 添加帧渲染
    const animate = () => {
      requestAnimationFrame(animate)

      // 网格旋转
      cube.rotation.x += 0.01
      cube.rotation.y += 0.01

      // 渲染场景
      renderer.render(scene, camera)
    }

    animate()
    // 摄影机空间Z轴
    camera.position.z = 5

    // 自适应
    window.addEventListener('resize', () => {
      // 初始化摄像机
      camera.aspect = window.innerWidth / window.innerHeight
      camera.updateProjectionMatrix()

      // 初始化渲染器尺寸
      renderer.setSize(window.innerWidth, window.innerHeight)
    })
     
  }
}

</script>

<style>
.Create {
  width: 20vw;
  height: 50vh;
  position: absolute;
  
}
</style>