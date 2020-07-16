<template>
  <div class="statistics">
    <div class="statistics-header">
      <el-date-picker
        v-model="settings.date"
        type="daterange"
        start-placeholder="Start date"
        end-placeholder="End date"
      />
      <el-select v-model="settings.viewBy" placeholder="-- Choose View Mode --">
        <el-option v-for="item in viewModes" :key="item" :label="item" :value="item" />
      </el-select>
      <el-button type="success" icon="el-icon-finished">
        Apply
      </el-button>
    </div>
    <div class="statistics-content">
      <el-row>
        <el-col :md="24" :lg="12">
          <div>
            <client-only>
              <highcharts :options="reachedOptions" />
            </client-only>
          </div>
        </el-col>
        <el-col :md="24" :lg="12">
          <div>
            <client-only>
              <highcharts :options="signedOptions" />
            </client-only>
          </div>
        </el-col>
      </el-row>
    </div>
  </div>
</template>

<script>
import * as data from '@/assets/data'

export default {
  data () {
    return {
      settings: {
        date: '',
        viewBy: 'Month'
      },
      viewModes: [
        'Day',
        'Week',
        'Month',
        'Year'
      ],
      reachedOptions: {
        title: {
          text: ''
        },
        labels: {
          items: [{
            html: 'Total Clients',
            style: {
              left: '80px',
              top: '0px',
              color: 'black'
            }
          }]
        },
        xAxis: {
          categories: []
        },
        yAxis: {
          min: 0,
          title: {
            text: 'Clients'
          }
        },
        plotOptions: {
          column: {
            dataLabels: {
              enabled: true
            }
          }
        },
        series: []
      },
      signedOptions: {
        title: {
          text: ''
        },
        labels: {
          items: [{
            html: 'Total Signed Clients',
            style: {
              left: '70px',
              top: '0x',
              color: 'black'
            }
          }]
        },
        xAxis: {
          categories: []
        },
        yAxis: {
          title: {
            text: 'Clients'
          }
        },
        plotOptions: {
          column: {
            dataLabels: {
              enabled: true
            }
          }
        },
        series: []
      }
    }
  },
  mounted () {
    // Reached out clients
    this.reachedOptions.title.text = data.statistics.data.clients.title
    this.reachedOptions.xAxis.categories = data.statistics.data.xaxis
    data.statistics.data.clients.data.forEach((item, index) => {
      this.reachedOptions.series.push({ ...item, color: data.statistics.data.colors[index] })
    })
    this.reachedOptions.series.push({
      type: 'spline',
      name: 'Average',
      data: data.statistics.data.clients.avgData,
      color: '#f7a35c',
      marker: {
        lineWidth: 2,
        lineColor: '#f7a35c',
        fillColor: 'white'
      }
    })
    this.reachedOptions.series.push({
      type: 'pie',
      name: 'Total Clients',
      data: data.statistics.data.clients.pieData,
      center: [100, 80],
      size: 150,
      showInLegend: false,
      dataLabels: {
        enabled: false
      }
    })

    // Signed Clients
    this.signedOptions.title.text = data.statistics.data.signedClients.title
    this.signedOptions.xAxis.categories = data.statistics.data.xaxis
    data.statistics.data.signedClients.data.forEach((item, index) => {
      this.signedOptions.series.push({ ...item, color: data.statistics.data.colors[index] })
    })
    this.signedOptions.series.push({
      type: 'spline',
      name: 'Average',
      data: data.statistics.data.signedClients.avgData,
      color: '#f7a35c',
      marker: {
        lineWidth: 2,
        lineColor: '#f7a35c',
        fillColor: 'white'
      }
    })
    this.signedOptions.series.push({
      type: 'pie',
      name: 'Total Signed Clients',
      data: data.statistics.data.signedClients.pieData,
      center: [100, 80],
      size: 150,
      showInLegend: false,
      dataLabels: {
        enabled: false
      }
    })
  }
}
</script>

<style lang="scss">
.statistics {
  &-content {
    .el-row {
      min-height: 100%;
      .el-col {
        height: calc(100vh - 300px);
        > div {
          width: 100%;
          height: 100%;
          > div {
            width: 100%;
            height: 100%;
          }
        }
      }
    }
  }
}
</style>

<style lang="scss" scoped>
.statistics {
  height: 100%;
  &-header {
    margin-bottom: 20px;
    display: flex;
    > div {
      margin-right: 20px;
    }
  }
  &-content {
    height: calc(100% - 60px);
    overflow: auto;
    .el-row {
      .el-col {
        padding: 3px;
        > div {
          box-shadow: 0 0 3px rgba(black, 0.3);
        }
      }
    }
  }
}
</style>
