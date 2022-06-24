<template>
  <!-- Form -->
  <el-button text @click="dialogFormVisible = true">新增</el-button>

  <el-dialog v-model="dialogFormVisible" title="新增模型">
    <el-form :model="form">
      <!-- 新增模型类别 -->
      <el-form-item label="模型类型" :label-width="formLabelWidth">
        <el-select v-model="form.region" placeholder="请选择">
          <!-- 1代表汽车 -->
          <el-option label="汽车" value="1" />
          <!-- 5代表飞机 -->
          <el-option label="飞机" value="5" />
        </el-select>
      </el-form-item>
      <!-- 新增模型名称 -->
      <el-form-item label="模型名称" :label-width="formLabelWidth">
        <el-input v-model="form.label" autocomplete="off" />
      </el-form-item>
      <!-- 模型实体价格 -->
      <el-form-item label="实体价格" :label-width="formLabelWidth">
        <el-input v-model="form.price" autocomplete="off" />
      </el-form-item>
    </el-form>
    <template #footer>
      <span class="dialog-footer">
        <el-button @click="dialogFormVisible = false">取消</el-button>
        <el-button
          type="primary"
          @click="
            dialogFormVisible = false;
            goCommit();
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

const emit = defineEmits(["getChildData"]);
const store = useStore();
const dialogTableVisible = ref(false);
const dialogFormVisible = ref(false);
const formLabelWidth = "140px";

const form = reactive({
  label: "",
  region: "",
  price: "",
  type: [],
  id:8,
});

//向父组件传数据
const goCommit = () => {
    form.id++
  emit("getChildData", form);
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