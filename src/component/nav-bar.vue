<template lang="html">
  <div class="nav-bar">
    <ul class="nav-bar__bar">
      <router-link v-for="(item, index) in barItems" :to="item.link"
      class="nav-bar__bar-item" :class="{ 'nav-bar__bar-item--active': index===active}">
        <div :class="item.icon"></div>
        <h5 v-text="item.name"></h5>
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
          icon: "activity"
        },
        {
          name: "核销信息",
          link: "/business/verification",
          icon: "activity"
        },
        {
          name: "排队信息",
          link: "/business/queue",
          icon: "activity"
        },
        {
          name: "预订信息",
          link: "/business/booking",
          icon: "activity"
        },
        {
          name: "点评信息",
          link: "/business/review",
          icon: "activity"
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
    &-item {
      flex: 1;
      text-align: center;
      text-decoration: none;
      color: #777;
      font-weight: bold;
      div {
        height: 50px;
        background-position: center 90%;
        background-size: 30%;
        background-repeat: no-repeat;
      }
      div.activity {
        background-image: url('image/icon-activity.png');
      }
      h5 {
        margin: .2rem 0;
      }
      &--active {
        border-bottom: 2px solid hotpink;
      }
    }
  }
}
</style>
