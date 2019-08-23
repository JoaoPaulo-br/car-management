<template>
  <div class="app-container">
    <el-table
      :data="tableData"
      style="width: 100%">
      <el-table-column
        prop="name"
        label="Name"
        width="180">
      </el-table-column>
      <el-table-column
        prop="email"
        label="Email"
        width="180">
      </el-table-column>
      <el-table-column
        prop="mobileNo"
        label="Mobile No."
        width="180">
      </el-table-column>
      <el-table-column
        label="Operations">
        <template slot-scope="scope">
          <el-button
            size="mini"
            @click="handleMakeAdmin(scope.$index, scope.row)">Make Admin</el-button>
          <el-button
            size="mini"
            @click="handleEditUser(scope.$index, scope.row)">Edit</el-button>
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
import { getRegularUserList } from '../../api/regular-user'
import { deleteUser, makeUserToAdmin } from '../../api/user'

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
      getRegularUserList((error, response) => {
        if (!error) {
          if (response['data']['success']) {
            this.tableData = response['data']['data']
          }
        }
      })
    },
    handleMakeAdmin(index, { _id: id }) {
      makeUserToAdmin(id, (error, response) => {
        if (!error) {
          this.tableData = this.tableData.filter(user => user._id !== id)
          this.$message('Admin created')
        }
      })
    },
    handleDelete(index, { _id: id }) {
      deleteUser(id, (error, response) => {
        if (!error) {
          this.tableData = this.tableData.filter(user => user._id !== id)
          this.$message('User deleted')
        }
      })
    },
    handleEditUser(index, { _id: id }) {
      this.$router.push({ path: `/update-user/${id}` })
    }
  }
}
</script>
