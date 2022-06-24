<template>
  <div class="main">
    <div class="father">
        <div class="btn btn1" @click="jump1"> 模型</div>
        <div class="btn"></div>
        <div class="btn"></div>
        <div class="btn"></div>
        <div class="son"></div>
    </div>
  </div>
</template>

<script>
import { useRouter  } from 'vue-router'
export default {
    setup(){
        const router = useRouter()
        const jump1 = () => {
            router.push('/model')
        }



        return{
            jump1
        }
    }
}
</script>

<style scoped>
.main{
  position: relative;
  
  /* background:url('../assets/beijing.jpg'); */
  /* background-size: auto; */
  background: url();
  background-color: rgb(24, 88, 100) ;
  height:100vh
}
.father{
  position:absolute;
  margin: 0;
  padding: 0;
  width: 100%;
}
.btn{
  list-style:none;
  float: left;
  color: #F9A647;
  width: 300px;
  height: 300px;
  margin-left: 300px;
  margin-top: 25px;
  font-size: 30px;
  text-align: center;
  line-height: 300px;
  border-radius: 50%;
  background-color: rgb(21, 28, 100);
  opacity: 0.9;
  cursor: pointer;
  
}
.btn1{
  /* background: url(@/assets/123.jpg); */
  background-size: 300px 300px;
  animation: myfirst 5s infinite;
  /* animation: mytwo 5s infinite; */

}
@keyframes myfirst
{
	0%   {background-color: #EDCFAB;}
  25%  {background-color: #FE894B;}
  50%  {background-color: #05348B;}
  100% {background-color: #CAE0E5;}
}
.btn:hover{
 transform:scale(1.5, 1.5);
}
@keyframes mytwo
{
  
  100% {transform:rotateZ(36000deg)}
  /* 75% {transform:rotateZ(180deg)} */
  /* 90%  {transform:translateY(-200px,)} */
}
.son {
  position: absolute;
  left:45vw;
  top: 40vh;
  width: 10vw;
  height: 20vh;
  background-color: rgb(156, 47, 47);
  background: url(@/assets/456.jfif);
  background-size: 10vw , 20vh;
  animation: mytwo 1s infinite;
}
</style>

