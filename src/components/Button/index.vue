<template>
  <!-- 按钮封装 -->
  <!-- <el-button :size="size" :type="type"
    :loading="loading"  :disabled="disabled" v-if="hasPerms(perms)"  @click="handleClick">
    {{label}}
  </el-button> -->
  <el-button :size="size" :type="type"
    :loading="loading"  :disabled="disabled" @click="handleClick" :icon="icon">
    {{label}}
  </el-button>
</template>

<script>
//按钮权限标识，暂时不用
//import { hasPermission } from '@/permission/index.js'
export default {
  name: 'OnlyButton',
  props: {
    label: {  // 按钮显示文本
      type: String,
      default: 'Button'
    },
    size: {  // 按钮尺寸
      type: String,
      default: 'mini'
    },
    type: {  // 按钮类型
      type: String,
      default: null
    },
    loading: {  // 按钮加载标识
      type: Boolean,
      default: false
    },
    icon: { //按钮图标
      type: String,
      default: null
    },
    disabled: {  // 按钮是否禁用
      type: Boolean,
      default: false
    },
    perms: {  // 按钮权限标识，外部使用者传入
      type: String,
      default: null
    }
  },
  data() {
    return {
    }
  },
  methods: {
    handleClick: function () {
      // 按钮操作处理函数
      this.$emit('click', {})
    },
    hasPerms: function (perms) {
      // 根据权限标识和外部指示状态进行权限判断
      if(perms == "true"){
        return true
      }
      else {
        return hasPermission(perms)
      }
    }
  },
  mounted() {
  }
}
</script>