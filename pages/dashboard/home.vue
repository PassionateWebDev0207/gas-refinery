<template>
  <div class="home">
    <h1>Home</h1>
    <div class="total-results">
      <h2>Total Assets: 99999</h2>
      <h2>Total Clients: 55555</h2>
    </div>
    <div class="stats">
      <h3>Stats Overview:</h3>
      <div class="stats-charts">
        <el-row>
          <el-col :xs="24" :sm="12">
            <div class="chart">
              <client-only>
                <highcharts :options="followers" />
              </client-only>
            </div>
          </el-col>
          <el-col :xs="24" :sm="12">
            <div class="chart">
              <client-only>
                <highcharts :options="views" />
              </client-only>
            </div>
          </el-col>
          <el-col :xs="24" :sm="12">
            <div class="chart">
              <client-only>
                <highcharts :options="likes" />
              </client-only>
            </div>
          </el-col>
          <el-col :xs="24" :sm="12">
            <div class="chart">
              <client-only>
                <highcharts :options="shares" />
              </client-only>
            </div>
          </el-col>
        </el-row>
      </div>
    </div>
  </div>
</template>

<script>
import * as data from '@/assets/data'

export default {
  data () {
    return {
      followers: data.totalFollowers,
      views: data.totalViews,
      likes: data.totalLikes,
      shares: data.totalShares
    }
  }
}
</script>

<style lang="scss">
.home {
  rect.highcharts-point {
    fill: transparent;
  }
}
</style>

<style lang="scss" scoped>
@import '../../assets/scss/variables.scss';

.home {
  padding: 20px;
  h1 {
    margin: 0;
    font-size: 24px;
  }
  .total-results {
    display: flex;
    align-items: center;
    margin: 20px 0;
    padding: 0 20px;
    overflow-x: auto;
    h2 {
      font-size: 20px;
      font-weight: normal;
      margin: 0;
      margin-right: 40px;
    }
  }
  .stats {
    position: relative;
    padding-top: 15px;
    h3 {
      position: absolute;
      top: 5px;
      left: 20px;
      margin: 0;
      font-size: 18px;
      font-weight: normal;
      background-color: white;
    }
    .stats-charts {
      width: 100%;
      padding: 10px;
      height: calc(100vh - 227px);
      border-radius: 5px;
      border: 1px solid #EBEEF5;
      .el-row {
        height: calc(100vh - 247px);
        overflow: auto;
      }
      .chart {
        padding: 20px;
        display: flex;
        flex-direction: column;
        justify-content: center;
        align-items: center;
        > div {
          width: 100% !important;
          .highcharts-point {
            fill: transparent;
          }
        }
      }
    }
  }
}
</style>
