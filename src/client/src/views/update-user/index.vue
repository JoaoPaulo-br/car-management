<template>
  <div class="app-container">
    <el-form ref="form" :model="form" :rules="carFormRules" label-width="120px">
      <el-form-item label="Name">
        <el-input v-model="form.name" />
      </el-form-item>
      <el-form-item prop="email" label="Email">
        <el-input
          ref="email"
          v-model="form.email"
          placeholder="Email"
          name="email"
          type="text"
          tabindex="1"
          auto-complete="on"
        />
      </el-form-item>
      <el-form-item prop="mobileNo" label="Mobile No.">
        <el-input
          ref="mobileNo"
          v-model="form.mobileNo"
          placeholder="Mobile No"
          name="mobileNo"
          type="text"
          tabindex="1"
          auto-complete="on"
        />
      </el-form-item>
      <el-form-item>
        <el-button type="primary" @click.native.prevent="handleSubmit">Update</el-button>
      </el-form-item>
    </el-form>
  </div>
</template>

<script>
import { validEmail, validMobileNumber } from '@/utils/validate'
const { getUserInfo, updateUserInfo } = require('../../api/user')

export default {
  data() {
    const validateEmail = (rule, value, callback) => {
      if (!validEmail(value)) {
        callback(new Error('Please enter the correct email'))
      } else {
        callback()
      }
    }

    const validateMobileNumber = (rule, value, callback) => {
      if (!validMobileNumber(value)) {
        callback(new Error('Please enter the correct mobile number'))
      } else {
        callback()
      }
    }

    return {
      form: {
        name: '',
        email: '',
        mobileNo: ''
      },
      carFormRules: {
        email: [{ required: true, trigger: 'blur', validator: validateEmail }],
        mobileNo: [{ required: true, trigger: 'blur', validator: validateMobileNumber }]
      }
    }
  },
  created() {
    if (this.$route.params.id == ':id') {
      this.$router.push({ path: '/dashboard' })
    } else {
      this.fetchData(this.$route.params.id)
    }
  },
  methods: {
    fetchData(id) {
      getUserInfo(id, (error, response) => {
        if (!error) {
          if (response['data']['success']) {
            const {
              _id = '',
              name = '',
              email = '',
              mobileNo = ''
            } = response['data']['data']
            this.form = {
              _id,
              name,
              email,
              mobileNo
            }
          }
        } else {
          this.$message('Invalid car id.')
        }
      })
    },
    handleSubmit() {
      this.$refs.form.validate(valid => {
        if (valid) {
          const {
            _id,
            name = '',
            email = '',
            mobileNo = ''
          } = this.form;
          const payLoad = {
            _id,
            name,
            email,
            mobileNo
          };
          updateUserInfo(payLoad, (error, response) => {
            if (!error) {
              this.$message('Information Updated')
            } else {
              this.$message('Mail or mobile number already in use.')
            }
          })
        } else {
          return false
        }
      })
    },
    onCancel() {
      this.$message({
        message: 'cancel!',
        type: 'warning'
      })
    }
  }
}
</script>

<style scoped>
.line{
  text-align: center;
}
</style>
