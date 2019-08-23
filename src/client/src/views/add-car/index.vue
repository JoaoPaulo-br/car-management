<template>
  <div class="app-container">
    <el-form ref="form" :model="form" :rules="carFormRules" label-width="120px">
      <el-form-item label="Car Name">
        <el-input v-model="form.carName" />
      </el-form-item>
      <el-form-item label="Registration">
        <el-col :span="11">
          <el-date-picker v-model="form.carRegistrationDate" type="date" placeholder="Pick a date" style="width: 100%;" />
        </el-col>
      </el-form-item>
      <el-form-item label="Car Description">
        <el-input v-model="form.carDescription" type="textarea" />
      </el-form-item>
      <el-form-item label="Car Mileage">
        <el-input type="number" v-model="form.carMilage" />
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
        <el-button type="primary" @click.native.prevent="handleSubmit">Create</el-button>
        <el-button @click="onCancel">Cancel</el-button>
      </el-form-item>
    </el-form>
  </div>
</template>

<script>
const { addCar } = require('../../api/car')
import { validEmail, validMobileNumber } from '@/utils/validate'

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
        carName: '',
        carRegistrationDate: '',
        carMilage: 0,
        carDescription: '',
        email: '',
        mobileNo: ''
      },
      carFormRules: {
        email: [{ required: true, trigger: 'blur', validator: validateEmail }],
        mobileNo: [{ required: true, trigger: 'blur', validator: validateMobileNumber }]
      }
    }
  },
  methods: {
    handleSubmit() {
      this.$refs.form.validate(valid => {
        if (valid) {
          addCar(this.form, (error, response) => {
            if (!error) {
              this.$message('Car Added')
              this.$router.push({ path: '/car-list/index' })
            } else {
              this.$message('Invalid entry.')
            }
          })
        } else {
          return false
        }
      })
    },
    onSubmit() {
      addCar(this.form, (error, response) => {
        if (!error) {
          this.$message('Car Added')
        } else {
          this.$message('Invalid entry.')
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

