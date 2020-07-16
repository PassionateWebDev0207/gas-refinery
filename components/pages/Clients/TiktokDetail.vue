<template>
  <div class="tiktok-detail">
    <div class="tiktok-client">
      <el-image class="tiktok-icon" :lazy="false" fit="cover" :src="detail.tiktokCover">
        <div slot="error" class="image-error">
          <i class="el-icon-picture" />
        </div>
        <div slot="placeholer" class="image-loading">
          <i class="el-icon-loading" />
        </div>
      </el-image>
      <el-form class="tiktok-info" label-width="100px" label-position="left">
        <el-form-item label="TikTok ID:">
          <span>{{ detail.tiktokId }}</span>
        </el-form-item>
        <el-form-item label="Username:">
          <span>{{ detail.tiktokUsername }}</span>
        </el-form-item>
        <el-form-item label="Signature:">
          <span>{{ detail.tiktokSignature }}</span>
        </el-form-item>
        <el-form-item label="URL:">
          <span>{{ detail.tikokURL }}</span>
        </el-form-item>
        <el-form-item label="Last Updated:">
          <span>{{ $moment(Number(detail.tiktokMetaUpdate)).format('DD MMM YYYY hh:mm:ss a') }}</span>
        </el-form-item>
        <el-form-item label="Followers:">
          <span>{{ detail.tiktokFollowers }}</span>
        </el-form-item>
        <el-form-item label="Likes:">
          <span>{{ detail.tiktokLikes }}</span>
        </el-form-item>
      </el-form>
    </div>
    <div class="charts">
      <el-row>
        <el-col :xs="24" :sm="12">
          <highcharts v-if="followers !== null" :options="followers" />
        </el-col>
        <el-col :xs="24" :sm="12">
          <highcharts v-if="likes !== null" :options="likes" />
        </el-col>
      </el-row>
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
      default: () => []
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
      followers: {
        chart: {
          type: 'areaspline',
          height: 2 / 3 * 100 + '%'
        },
        title: {
          text: 'Followers'
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
    this.clearBuf(this.metaData)
    this.meta.forEach((item) => { this.metaData.unshift(item) })
    this.metaData.sort((a, b) => (Number(a.date) <= Number(b.date) ? 1 : -1))
    // set the chart title
    this.likes.title.text = 'Likes'
    this.followers.title.text = 'Followers'
    // make data for likes and followers
    this.clearBuf(this.likes.xAxis.categories)
    this.clearBuf(this.followers.xAxis.categories)
    this.clearBuf(this.likes.series[0].data)
    this.clearBuf(this.followers.series[0].data)
    this.metaData.forEach((item, index) => {
      this.likes.xAxis.categories.unshift(this.$moment(Number(item.date)).format('DD MMM YYYY'))
      this.likes.series[0].data.unshift(item.heart)
      this.followers.xAxis.categories.unshift(this.$moment(Number(item.date)).format('DD MMM YYYY'))
      this.followers.series[0].data.unshift(item.fans)
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
    .el-form {
      &-item {
        &__label, &__content {
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
      margin-left: 40px;
      .el-form-item {
        margin: 0;
      }
    }
  }
  .charts {
    width: 100%;
  }
}
</style>
