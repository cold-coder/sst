<template lang="html">
  <div class="nav-bar">
    <ul class="nav-bar__bar">
      <router-link v-for="(item, index) in barItems" :to="item.link"
      class="nav-bar__bar-item"
      :class="[ 'nav-bar__bar-item--'+item.icon, { 'nav-bar__bar-item--active': index===active }]">
        <div class="icon"></div>
        <h5 v-text="item.name"></h5>
        <div class="indicator" v-show="index===active"></div>
      </router-link>
    </ul>
  </div>
</template>

<script>
export default {
  name: 'nav-bar',
  props: ['active'],
  data() {
    return {
      barItems: [
        {
          name: "活动信息",
          link: "/business/campaign",
          icon: "activity"
        },
        {
          name: "交易信息",
          link: "/business/trade",
          icon: "trade"
        },
        {
          name: "核销信息",
          link: "/business/verification",
          icon: "verification"
        },
        {
          name: "排队信息",
          link: "/business/queue",
          icon: "queue"
        },
        {
          name: "预订信息",
          link: "/business/booking",
          icon: "booking"
        },
        {
          name: "点评信息",
          link: "/business/review",
          icon: "review"
        }
      ]
    }
  },
  methods: {

  }
}
</script>

<style lang="scss">
@import "../stylesheets/_variable.scss";
.nav-bar {
  width: 100%;
  background-color: #FFF;
  border-top: 1px solid $border-color;
  border-bottom: 1px solid $border-color;
  &__bar {
    display: flex;
    justify-content: center;
    align-items: center;
    margin: 0 auto;
    padding: 0;
    max-width: 1000px;
    &-item {
      flex: 1;
      text-align: center;
      text-decoration: none;
      color: #777;
      font-weight: bold;
      position: relative;
      .icon {
        height: 50px;
        background-position: center 90%;
        background-size: .8rem;
        background-repeat: no-repeat;
      }
      .indicator {
        position: absolute;
        bottom: 0;
        width: 100%;
        height: 3px;
        border-bottom-width: 4px;
        border-bottom-style: solid;
      }
      &--activity {
        .icon {
          background-image: url('image/icon-activity.png');
        }
        .indicator {
          border-bottom-color: $yellow;
        }
      }
      &--trade {
        .icon {
          background-image: url('image/icon-trade.png');
        }
        .indicator {
          border-bottom-color: $orange;
        }
      }
      &--verification {
        .icon {
          background-image: url('image/icon-verification.png');
        }
        .indicator {
          border-bottom-color: $blue;
        }
      }
      &--queue {
        .icon {
          background-image: url('image/icon-queue.png');
        }
        .indicator {
          border-bottom-color: $red;
        }
      }
      &--booking {
        .icon {
          background-image: url('image/icon-booking.png');
        }
        .indicator {
          border-bottom-color: $purple;
        }
      }
      &--review {
        .icon {
          background-image: url('image/icon-review.png');
        }
        .indicator {
          border-bottom-color: $green;
        }
      }
      h5 {
        margin: .2rem 0;
      }
    }
  }
}
</style>
