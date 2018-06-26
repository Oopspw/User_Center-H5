<!--弹层组件 -->
<template>
  <!--提示弹窗-->
  <div class="toast">
    <div>
      {{alertText}}
    </div>
  </div>
</template>

<script>
//  import $ from 'jquery'
export default {
  data: function() {
    return {
      paramData: this.data
    }
  },
  mounted: function() {},
  props: {
    alertText: {
      type: String,
      default: ''
    },
    // 传递的参数
    data: {}
  },
  methods: {}
}
</script>
