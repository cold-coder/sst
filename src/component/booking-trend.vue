<template lang='html'>
  <div class='booking'>
    <div class="booking__header">
      <div class="booking__header-title">
        预订增长趋势
      </div>
      <div class="booking__header-buttons button-group">
        <button class="btn button-group__button" @click="refreshChart('week')" :class="{ 'button-group__button--active': type === 'week'}">本周</button>
        <button class="btn button-group__button" @click="refreshChart('month')" :class="{ 'button-group__button--active': type === 'month'}">本月</button>
      </div>
    </div>
    <trend-chart :chart-data='chartData' :options='options'></trend-chart>
  </div>
</template>

<script>
import TrendChart from './chart/TrendChart'
import { computeTrendingPeriod, filterTrendingData, paddingTrendingLabel } from './chart/util.js'
import api from 'api'
export default {
  name: 'booking-trend',
  components: {
    TrendChart
  },
  data () {
    return {
      type: 'week',
      dsConfig: {
        fill: false,
        lineTension: 0.1,
        backgroundColor: '#C754F3',
        borderColor: '#C754F3',
        borderCapStyle: 'butt',
        borderDash: [],
        borderDashOffset: 0.0,
        borderJoinStyle: 'miter',
        pointBorderColor: '#C754F3',
        pointBackgroundColor: '#fff',
        pointBorderWidth: 5,
        pointHoverRadius: 5,
        pointHoverBorderWidth: 2,
        pointRadius: 1,
        pointHitRadius: 10
      },
      chartData: {
        labels: [],
        datasets: []
      },
      options: {
        title: {
          display: false
        },
        legend: {
          display: false
        },
        scales: {
          yAxes: [{
            ticks: {
              beginAtZero: true,
              // setpSize: 1,
              fixedStepSize: 1
            }
          }]
        },
        padding: 10,
        maintainAspectRatio: false
      }
    }
  },
  mounted () {
    this.refreshChart('week')
  },
  methods: {
    query (type) {
      const period = computeTrendingPeriod(type)
      const starttime = period.starttime.valueOf() / 1000
      const endtime = period.endtime.valueOf() / 1000
      this.$http.post(api.BOOK_REPORT, {
        shop_id: JSON.parse(window.sessionStorage.getItem('sst-userInfo')).shop_id,
        time_horizon: {
          time_begin: starttime,
          time_end: endtime
        }
      }).then(res => {
        const newDs = []
        newDs[0] = Object.assign({}, this.dsConfig, {
          data: [...filterTrendingData(res.list)]
        })
        this.chartData = Object.assign({}, this.chartData, {
          labels: paddingTrendingLabel(type),
          datasets: newDs
        })
      })
    },
    refreshChart (type) {
      this.type = type
      this.query(this.type)
    }
  }
}
</script>

<style lang='scss'>
@import "../style/_variable.scss";
.booking {
  background-color: #FFF;
  margin: .1rem 0;
  padding: .2rem;
  border: 1px solid $border-color;
  &__header {
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding: .1rem 0 .3rem 0;
    &-title {
      font-size: 16px;
      padding-left: .8rem;
      background: url('./image/icon-trend-book.png') no-repeat;
      background-size: .5rem;
      background-position: 10px center;
    }
    .button-group {
      &__button {
        padding: 0.08rem .3rem;
        font-size: 12px;
        &--active {
          background-color: #C754F3;
          color: #FFF;
        }
      }
    }
  }
}
</style>
