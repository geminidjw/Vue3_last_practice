<template>
  <el-card class="box-card">
    <template #header>
      <div class="card-header">
        <span>用户详情</span>
        <el-button class="button" text @click="goBack">返回</el-button>
      </div>
    </template>
    <div class="text item">
      <p>姓名:{{ userInfo.name }}</p>
      <p>年龄:{{ userInfo.age }}</p>
      <p>头衔:{{ userInfo.position }}</p>
    </div>
  </el-card>
</template>

<script>
export default {
  name: 'UserDetail',
  props: ['id'],
  data() {
    return {
      userInfo: {}
    }
  },
  created() {
    this.getUserInfo()
  },
  methods: {
    async getUserInfo() {
      const { data: res } = await this.$http.get('/api/users/' + this.id)
      if (res.status !== 0) return this.$message.error('请求失败')
      this.userInfo = res.data
      console.log(this.userInfo)
    },
    goBack() {
      this.$router.go(-1)
    }
  }
}
</script>

<style lang="less" scoped></style>
