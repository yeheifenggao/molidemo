<template>
  <!-- Form -->
  <el-button text @click="dialogFormVisible = true">编辑</el-button>

  <el-dialog v-model="dialogFormVisible" title="编辑模型">
    <el-form :model="form">
      
      <!-- 新的模型名称 -->
      <el-form-item label="请输入新名称" :label-width="formLabelWidth">
        <el-input v-model="form.label" autocomplete="off" />
      </el-form-item>
      <!-- 新的模型实体价格 -->
      <el-form-item label="请输入新价格" :label-width="formLabelWidth">
        <el-input v-model="form.price" autocomplete="off" />
      </el-form-item>
    </el-form>
    <template #footer>
      <span class="dialog-footer">
        <el-button @click="dialogFormVisible = false">{{numb}}</el-button>
        <el-button
          type="primary"
          @click="
            dialogFormVisible = false;
            goCommit1();
          "
          >确认</el-button
        >
      </span>
    </template>
  </el-dialog>
</template>

<script  setup>
import { reactive, ref } from "vue";
import { useStore } from "vuex";
import { onMounted, computed, getCurrentInstance } from "vue";
import { mapState, mapGetters, mapActions, mapMutations } from "vuex";
import {defineProps} from 'vue';


const props = defineProps({
  numb: {
    type: Object,
    default: "",
  },
});
console.log(props.numb.label)
const emit = defineEmits(["getChildNewData"]);
const store = useStore();
const dialogTableVisible = ref(false);
const dialogFormVisible = ref(false);
const formLabelWidth = "140px";

const form = reactive({
  label:"",
  region: "",
  price: "",
  type: [],
  carid:2,
  planeid:2
});

//向父组件传数据
const goCommit1 = () => {
  emit("getChildNewData", form);
//   console.log(form);
};


</script>

<style  scoped>
.el-button--text {
  margin-right: 15px;
}
.el-select {
  width: 300px;
}
.el-input {
  width: 300px;
}
.dialog-footer button:first-child {
  margin-right: 10px;
}
</style>