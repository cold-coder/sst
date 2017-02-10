<template lang="html">
  <div class="tab">
    <div class="tab__buttons">
      <span class="tab__buttons-button" v-for="(t, i) in tabs" @click="show(i+1)" :class="{ 'tab__buttons-button--active': currTab === i+1 }">{{t}}</span>
    </div>
    <div class="tab__body">
      <slot name="tab1" v-if="currTab === 1"></slot>
      <slot name="tab2" v-if="currTab === 2"></slot>
    </div>
  </div>
</template>

<script>
export default {
  name: 'tab',
  props: {
    tabs: Array
  },
  data () {
    return {
      currTab: 1
    }
  },
  methods: {
    show (i) {
      this.currTab = i
    }
  }
}
</script>

<style lang="scss">
@import "../style/_variable.scss";
.tab {
  margin: .1rem 0;
  font-size: 16px;
  &__buttons {
    display: table;
    width: 100%;
    border: 1px solid $border-color;
    border-bottom: none;
    &-button {
      display: table-cell;
      background-color: #EEE;
      text-align: center;
      padding: .2rem;
      &--active {
        background-color: #FFF;
      }
    }
  }
  &__body {
    border: 1px solid $border-color;
    border-top: none;
  }
}
</style>
