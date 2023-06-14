<template>
  <div>
    <el-button text @click="dialogVisible = true" style="background-color: orange"> 注册按钮 </el-button>
    <el-table :data="userList" stripe border style="width: 100%">
      <el-table-column type="index" width="50" />
      <el-table-column label="Name" prop="name" width="80" />
      <el-table-column label="年龄" prop="age" />
      <el-table-column label="职位" prop="position" />
      <el-table-column label="时间">
        <template #default="scope">
          {{ dateFormat(scope.row.addtime) }}
        </template>
      </el-table-column>
      <el-table-column label="选项">
        <template #default="{ row }">
          <div>
            <router-link :to="'/users/' + row.id">详情</router-link>&nbsp;
            <a href="#" @click.prevent="onRemove(row.id)">删除----{{ row.id }}</a>
          </div>
        </template>
      </el-table-column>
    </el-table>
    <el-dialog v-model="dialogVisible" title="添加新用户" width="30%" :before-close="handleClose" @close="onDialogClosed">
      <!-- 表单注册 -->
      <el-form :model="form" :rules="rules" label-width="120px" ref="myAddForm">
        <el-form-item label="姓名" prop="name">
          <el-input v-model="form.name" />
        </el-form-item>
        <el-form-item label="年龄" prop="age">
          <el-input v-model.number="form.age" />
        </el-form-item>
        <el-form-item label="职位" prop="position">
          <el-input v-model="form.position" />
        </el-form-item>
      </el-form>

      <template #footer>
        <span class="dialog-footer">
          <el-button @click="dialogVisible = false">Cancel</el-button>
          <el-button type="primary" @click="onAddNewUser"> Confirm </el-button>
        </span>
      </template>
    </el-dialog>
  </div>
</template>

<script>
export default {
  name: 'UserList',
  data() {
    let checkAge = (rule, value, callback) => {
      if (!value) {
        return callback(new Error('Please input the age'))
      }
      setTimeout(() => {
        if (!Number.isInteger(value)) {
          callback(new Error('Please input digits'))
        } else {
          if (value < 18) {
            callback(new Error('Age must be greater than 18'))
          } else {
            callback()
          }
        }
      }, 1000)
    }
    return {
      // 用户列表数据，默认为空数组
      userList: [],
      dialogVisible: false,
      form: {
        name: '',
        age: '',
        position: ''
      },
      rules: {
        name: [
          { required: true, message: 'Please input Activity name', trigger: 'blur' },
          { min: 1, max: 15, message: '长度必须在 1 ~ 15之间', trigger: 'blur' }
        ],
        age: [
          { required: true, message: 'Please input Activity age', trigger: 'blur' },
          { validator: checkAge, trigger: 'blur' }
        ],
        position: [
          { required: true, message: 'Please input Activity position', trigger: 'blur' },
          { min: 1, max: 8, message: '长度必须在 1 ~ 8之间', trigger: 'blur' }
        ]
      }
    }
  },
  created() {
    // 调用此方法，请求用户列表数据
    this.getUserList()
  },
  computed: {
    dateFormat: function () {
      return function (scope) {
        const dt = new Date(scope)
        const y = dt.getFullYear()
        const m = dt.getMonth() + 1
        const d = dt.getDate()
        const hh = dt.getHours()
        const mm = dt.getMinutes()
        const ss = dt.getSeconds()
        return `${y}-${m}-${d}-${hh}-${mm}-${ss}`
      }
    }
  },
  methods: {
    // 请求用户列表的数据
    async getUserList() {
      const { data: res } = await this.$http.get('/api/users')
      // res.status 等于 0 表示数据请求成功，否则，请求失败！
      if (res.status !== 0) return console.log('用户列表数据请求失败')
      this.userList = res.data
      console.log(this.userList)
    },
    onDialogClosed() {
      console.log('ok')
      this.$refs.myAddForm.resetFields()
    },
    onAddNewUser() {
      this.$refs.myAddForm.validate(async valid => {
        if (!valid) return this.$message.error('添加用户失败')
        const { data: res } = await this.$http.post('/api/users', this.form)
        this.$message.success('添加成功')
        this.dialogVisible = false
        this.getUserList()
      })
    },
    async onRemove(id) {
      const confirmResult = await this.$confirm('是否确认删除？', 'Warning', {
        confirmButtonText: '确认',
        cancelButtonText: '取消',
        type: 'warning'
      }).catch(error => error)
      console.log(confirmResult)

      if (confirmResult !== 'confirm') return this.$message.info('用户取消删除')
      const { data: res } = await this.$http.delete('/api/users/' + id)
      if (res.status !== 0) return this.$message.info('删除失败')
      this.$message.info('删除成功')
      this.getUserList()
    }
  }
}
</script>

<style lang="less" scoped>
.el-table {
  margin-top: 15px;
}
</style>
