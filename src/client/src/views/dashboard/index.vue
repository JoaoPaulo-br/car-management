<template>
  <div class="dashboard-container">
    <div class="dashboard-text">Welcome To Car Service Alert</div>
  </div>
</template>

<script>
import { isAuthenticate } from '../../utils/authenticate'

export default {
  name: 'Dashboard',
  created() {
    if (!isAuthenticate()) {
      this.$router.push({ path: `/login` })
    }
  }
}
</script>

<style lang="scss" scoped>
.dashboard {
  &-container {
    margin: 30px;
  }
  &-text {
    font-size: 30px;
    line-height: 46px;
  }
}
</style>
