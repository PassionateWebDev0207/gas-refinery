<template>
  <div class="tiktok-detail">
    <div class="tiktok-client">
      <el-image class="tiktok-icon" fit="cover" :src="client.tiktokCover">
        <div slot="error" class="image-error">
          <i class="el-icon-picture" />
        </div>
        <div slot="placeholer" class="image-loading">
          <i class="el-icon-loading" />
        </div>
      </el-image>
      <el-form class="tiktok-info" label-width="150px" label-position="left">
        <el-form-item label="TikTok ID:">
          <span>{{ client.tiktokId }}</span>
        </el-form-item>
        <el-form-item label="TikTok Title:">
          <span>{{ detail.tiktokName }}</span>
        </el-form-item>
        <el-form-item label="Created:">
          <span>{{ $moment(Number(detail.tiktokDate)).format('DD MMM YYY hh:mm:ss a') }}</span>
        </el-form-item>
        <el-form-item label="Song:">
          <span>{{ detail.tiktokSongName }}</span>
        </el-form-item>
        <el-form-item label="Creator:">
          <nuxt-link :to="`/dashboard/clients/${client.tiktokUsername}?id_type=username`">
            {{ client.name }}
          </nuxt-link>
        </el-form-item>
        <el-form-item label="Meta Data Updated:">
          <span>{{ $moment(Number(client.tiktokMetaUpdate)).format('DD MMM YYYY hh:mm:ss a') }}</span>
        </el-form-item>
      </el-form>
    </div>
    <div class="charts">
      <div>
        <highcharts :options="views" />
      </div>
      <div>
        <highcharts :options="likes" />
      </div>
      <div>
        <highcharts :options="shares" />
      </div>
      <div>
        <highcharts :options="comments" />
      </div>
    </div>
  </div>
</template>

<script>
export default {
  props: {
    detail: {
      type: Object,
      default: () => null
    },
    meta: {
      type: Array,
      default: () => null
    },
    client: {
      type: Object,
      default: () => null
    }
  },
  data () {
    return {
      metaData: [],
      likes: {
        chart: {
          type: 'areaspline',
          height: 2 / 3 * 100 + '%'
        },
        title: {
          text: 'Likes'
        },
        xAxis: {
          categories: [],
          title: {
            text: ''
          }
        },
        yAxis: {
          title: {
            text: ''
          }
        },
        legend: {
          layout: 'vertical',
          floating: true
        },
        tooltip: {
          crosshairs: true,
          shared: true
        },
        credits: {
          enabled: false
        },
        series: [
          {
            name: '',
            data: []
          }
        ]
      },
      views: {
        chart: {
          type: 'areaspline',
          height: 2 / 3 * 100 + '%'
        },
        title: {
          text: 'Views'
        },
        xAxis: {
          categories: [],
          title: {
            text: ''
          }
        },
        yAxis: {
          title: {
            text: ''
          }
        },
        legend: {
          layout: 'vertical',
          floating: true
        },
        tooltip: {
          crosshairs: true,
          shared: true
        },
        credits: {
          enabled: false
        },
        series: [
          {
            name: '',
            data: []
          }
        ]
      },
      shares: {
        chart: {
          type: 'areaspline',
          height: 2 / 3 * 100 + '%'
        },
        title: {
          text: 'Shares'
        },
        xAxis: {
          categories: [],
          title: {
            text: ''
          }
        },
        yAxis: {
          title: {
            text: ''
          }
        },
        legend: {
          layout: 'vertical',
          floating: true
        },
        tooltip: {
          crosshairs: true,
          shared: true
        },
        credits: {
          enabled: false
        },
        series: [
          {
            name: '',
            data: []
          }
        ]
      },
      comments: {
        chart: {
          type: 'areaspline',
          height: 2 / 3 * 100 + '%'
        },
        title: {
          text: 'Comments'
        },
        xAxis: {
          categories: [],
          title: {
            text: ''
          }
        },
        yAxis: {
          title: {
            text: ''
          }
        },
        legend: {
          layout: 'vertical',
          floating: true
        },
        tooltip: {
          crosshairs: true,
          shared: true
        },
        credits: {
          enabled: false
        },
        series: [
          {
            name: '',
            data: []
          }
        ]
      }
    }
  },
  mounted () {
    // dump the metaData and sort array items by date
    this.clearBuf(this.metaData.length)
    this.meta.forEach((item) => { this.metaData.unshift(item) })
    this.metaData.sort((a, b) => (Number(a.date) <= Number(b.date) ? 1 : -1))
    // make data for likes and followers
    this.clearBuf(this.likes.xAxis.categories)
    this.clearBuf(this.views.xAxis.categories)
    this.clearBuf(this.shares.xAxis.categories)
    this.clearBuf(this.comments.xAxis.categories)
    this.clearBuf(this.likes.series[0].data)
    this.clearBuf(this.views.series[0].data)
    this.clearBuf(this.shares.series[0].data)
    this.clearBuf(this.comments.series[0].data)
    this.metaData.forEach((item, index) => {
      this.likes.xAxis.categories.unshift(this.$moment(Number(item.date)).format('DD MMM YYYY'))
      this.views.xAxis.categories.unshift(this.$moment(Number(item.date)).format('DD MMM YYYY'))
      this.shares.xAxis.categories.unshift(this.$moment(Number(item.date)).format('DD MMM YYYY'))
      this.comments.xAxis.categories.unshift(this.$moment(Number(item.date)).format('DD MMM YYYY'))
      this.likes.series[0].data.unshift(item.diggs)
      this.views.series[0].data.unshift(item.views)
      this.shares.series[0].data.unshift(item.shares)
      this.comments.series[0].data.unshift(item.comments)
    })
  },
  methods: {
    clearBuf (buffer) {
      while (buffer.length > 0) { buffer.shift() }
    }
  }
}
</script>

<style lang="scss">
.tiktok-detail {
  .tiktok-client {
    .tiktok-info {
      margin-left: 40px;
      display: flex;
      flex-direction: column;
      justify-content: center;
      align-content: center;
      .el-form-item {
        margin: 0;
        &__label, &__content {
          display: block;
          white-space: nowrap;
          line-height: 30px;
        }
      }
    }
  }
  .charts {
    rect.highcharts-point {
      fill: transparent;
    }
  }
}
</style>

<style lang="scss" scoped>
.tiktok-detail {
  width: 100%;
  height: 100%;
  padding: 15px;
  .tiktok-client {
    display: flex;
    margin-bottom: 30px;
    .tiktok-icon {
      display: flex;
      justify-content: center;
      align-items: center;
      width: 220px;
      min-width: 220px;
      height: 220px;
      min-height: 220px;
      border-radius: 50%;
      border: 5px solid white;
      background-color: grey;
      box-shadow: 0 0 12px 0 rgba(0, 0, 0, 0.1);
    }
    .tiktok-info {
      .el-form-item {
        margin: 0;
      }
    }
  }
  .charts {
    display: flex;
    flex-wrap: wrap;
    > div {
      width: 50%;
      > div {
        width: 100%;
      }
    }
  }
}
</style>
