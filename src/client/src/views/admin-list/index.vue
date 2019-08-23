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
            type="danger"
            @click="handleMakeAdminToUser(scope.$index, scope.row)">Make User</el-button>
        </template>
      </el-table-column>
    </el-table>
  </div>
</template>

<script>
import { getAdminUserList } from '../../api/admin-user'
import { makeAdminToUser } from '../../api/user'

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
      getAdminUserList((error, response) => {
        if (!error) {
          if (response['data']['success']) {
            this.tableData = response['data']['data']
          }
        } else {
        }
      })
    },
    handleEdit(index, row) { },
    handleMakeAdminToUser(index, { _id: id }) {
      makeAdminToUser(id, (error, response) => {
        if (!error) {
          this.tableData = this.tableData.filter(user => user._id !== id)
          this.$message('User created')
        }
      })
    }
  }
}
</script>
