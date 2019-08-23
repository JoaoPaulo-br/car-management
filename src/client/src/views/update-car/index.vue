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
        <el-button type="primary" @click.native.prevent="handleSubmit">Update</el-button>
      </el-form-item>
    </el-form>
  </div>
</template>

<script>
import { validEmail, validMobileNumber } from '@/utils/validate'
const { updateCar, getCar } = require('../../api/car')

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
  created() {
    if (this.$route.params.id == ':id') {
      this.$router.push({ path: '/car-list/index' })
    } else {
      this.fetchData(this.$route.params.id)
    }
  },
  methods: {
    fetchData(id) {
      getCar(id, (error, response) => {
        if (!error) {
          if (response['data']['success']) {
            const {
              _id = '',
              carName = '',
              carRegistrationDate = '',
              carMilage = 0,
              carDescription = '',
              email = '',
              mobileNo = ''
            } = response['data']['data']
            this.form = {
              _id,
              carName,
              carRegistrationDate,
              carMilage,
              carDescription,
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
            carName = '',
            carRegistrationDate = '',
            carMilage = 0,
            carDescription = '',
            email = '',
            mobileNo = ''
          } = this.form;
          const payLoad = {
            _id,
            carName,
            carRegistrationDate,
            carMilage,
            carDescription,
            email,
            mobileNo
          };
          updateCar(payLoad, (error, response) => {
            if (!error) {
              this.$message('Car Updated')
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
      const {
        _id,
        carName = '',
        carRegistrationDate = '',
        carMilage = 0,
        carDescription = ''
      } = this.form;
      const payLoad = {
        _id,
        carName,
        carRegistrationDate,
        carMilage,
        carDescription
      };
      updateCar(payLoad, (error, response) => {
        if (!error) {
          this.$message('Car Updated')
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

