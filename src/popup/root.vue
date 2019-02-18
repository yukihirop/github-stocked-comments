<template>
  <div class="container">
    <img class="header-image" src="../assets/img/gsc_header.png"/>
    <table class="table">
      <tbody>
        <tr>
          <th scope="row">
            <i class="fas fa-info-circle"></i>
            <span class="table-label-version">version</span>
          </th>
          <td><span class="content">{{ version }}</span></td>
        </tr>
        <tr>
          <th scope="row">
            <i class="fas fa-bug"></i>
            <span class="table-label-bug-report">
              <a href="https://github.com/yukihirop/github-stocked-comments/issues/new" target="_blank" ref="noopener noreferrer">bug report</a>
            </span>
          </th>
          <td></td>
        </tr>
      </tbody>
    </table>
  </div>
</template>

<script>

export default {
  name: 'Root',
  data(){
    return {
      version: "1.0.0"
    }
  }
}
</script>

<style scoped="true">

.container {
  padding: 10px;
}

.header-image {
  width: 300px;
}

table.table {
  margin-bottom: 0px;
}

.content {
  float: right;
  margin: 0px 5px 0px 0px;
}

.table-label{
  margin-left: 10px;
}

.table-label-bug-report,
.table-label-version {
  margin-left: 5px;
}

.radio-inline {
  margin: 0px 0px 0px 10px;
}

.per-page {
  width: 50px;
}
</style>


