<template>
  <div class="app-container">
    <el-table
      :data="tableData"
      style="width: 100%">
      <el-table-column
        prop="carName"
        label="Name"
        width="180">
      </el-table-column>
      <el-table-column
        prop="carRegistrationDate"
        label="Registraton Date"
        width="180">
      </el-table-column>
      <el-table-column
        prop="carMilage"
        label="Milage"
        width="180">
      </el-table-column>
      <el-table-column
        label="Operations">
        <template slot-scope="scope">
          <el-button
            size="mini"
            @click="handleEdit(scope.$index, scope.row)">Edit</el-button>
          <el-button
            size="mini"
            type="primary"
            @click="handleAlert(scope.$index, scope.row)">Alert</el-button>
          <el-button
            size="mini"
            type="danger"
            @click="handleDelete(scope.$index, scope.row)">Delete</el-button>
        </template>
      </el-table-column>
    </el-table>
  </div>
</template>

<script>
import { getCarsList, deleteCar } from '../../api/car'
import { alertCar } from '../../api/alert'

export default {
  filters: {
    statusFilter(status) {
      const statusMap = {
        published: 'success',
        draft: 'gray',
        deleted: 'danger'
      }
      return statusMap[status]
    }
  },
  data() {
    return {
      tableData: this.tableData
    }
  },
  created() {
    this.fetchData()
  },
  methods: {
    fetchData() {
      getCarsList((error, response) => {
        if (!error) {
          if (response['data']['success']) {
            this.tableData = response['data']['data'].map(car => {
              const currentDatetime = new Date(car.carRegistrationDate)
              const formattedDate = currentDatetime.getDate() + '/' + (currentDatetime.getMonth() + 1) + '/' + currentDatetime.getFullYear()
              car.carRegistrationDate = formattedDate
              return car
            })
          }
        }
      })
    },
    handleEdit(index, row) {
      this.$router.push({ path: `/update-car/${row._id}` })
    },
    handleDelete(index, { _id: id }) {
      deleteCar(id, (error, response) => {
        if (!error) {
          this.$message('Car deleted')
          this.tableData = this.tableData.filter(car => car._id !== id)
        }
      })
    },
    handleAlert(index, { email }) {
      alertCar({ email }, (error, response) => {
        if (!error) {
          this.$message('Alert on the way!!!');
        } else {
          this.$message('Something went wrong!!')
        }
      })
    }
  }
}
</script>
