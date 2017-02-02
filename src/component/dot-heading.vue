<template lang="html">
  <div class="dot-heading">
    <div class="left">
      <div class="dot-heading__dot" :class="'dot-heading__dot--'+module"></div>
      <div class="dot-heading__heading">{{ heading }}</div>
    </div>
    <slot class="right"></slot>
  </div>
</template>

<script>
export default {
  name: 'dot-heading',
  props: {
    heading: {
      type: String,
      required: true
    },
    module: {
      type: String,
      required: true
    }
  }
}
</script>

<style lang="scss">
@import "../style/_variable.scss";
.dot-heading {
  display: flex;
  align-items: center;
  justify-content: space-between;
  line-height: .6rem;
  margin-top: -.2rem;
  padding: .25rem .2rem;
  border-bottom: 1px solid $border-color;
  .left {
    display: flex;
    align-items: center;
  }
  &__dot {
    display: inline-block;
    width: .6rem;
    height: .6rem;
    border-radius: 50%;
    background-color: hotpink;
    &--campaign {
      background-color: $yellow;
    }
    &--trade {
      background-color: $orange;
    }
    &--verification {
      background-color: $blue;
    }
    &--queue {
      background-color: $red;
    }
    &--booking {
      background-color: $purple;
    }
    &--review {
      background-color: $green;
    }
    &--dashboard {
      background-image: url('./image/icon-queue-heading.png');
      background-size: cover;
      background-color: transparent;
      border-radius: 0;
    }
    &--setting {
      background-image: url('./image/icon-setting-heading.png');
      background-size: cover;
      background-color: transparent;
      border-radius: 0;
    }
  }
  &__heading {
    display: inline-block;
    margin-left: .15rem;
    font-size: 18px;
  }
}
</style>
