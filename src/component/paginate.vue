<template lang="html">
  <div class="paginate">
    <!-- 上一页 -->
    <button class="btn-xsmall paginate__btn" @click="goPrev"
    :disabled="current<=1">上一页</button>
    <!-- 首页 -->
    <button class="btn-xsmall paginate__btn" @click="go(1)"
    v-show="pagePos.fromStart>=3">1</button>
    <button class="btn-xsmall paginate__btn"
    v-show="pagePos.fromStart>=3">...</button>
    <!-- 分页按钮 -->
    <button class="btn-xsmall paginate__btn" v-for="page in pages"
    @click="go(page)" :class="{'paginate__btn--active': page==current }">{{page}}</button>
    <!-- 尾页 -->
    <button class="btn-xsmall paginate__btn"
    v-show="pagePos.fromEnd>=3">...</button>
    <button class="btn-xsmall paginate__btn" @click="go(totalPage)"
    v-show="pagePos.fromEnd>=3">{{ totalPage }}</button>
    <!-- 下一页 -->
    <button class="btn-xsmall paginate__btn" @click="goNext"
    :disabled="current>=totalPage">下一页</button>
  </div>
</template>

<script>
export default {
  name: 'paginate',
  props: {
    currentPage: Number,
    totalPage: Number
  },
  data () {
    return {
      pages: [],
      pagePos: {
        fromStart: null,
        fromEnd: null
      },
      current: this.currentPage
    }
  },
  watch: {
    totalPage: function () {
      console.log(this.totalPage)
      this.pages = this.paginationCalc(this.current, this.totalPage)
      this.pagePos = this.pagePostionCalc(this.current, this.totalPage)
    }
  },
  methods: {
    /**
     * 页面切换，点击对应的页面数
     * @param page
     */
    go (pageIndex) {
      this.current = pageIndex
      this.pages = this.paginationCalc(this.current, this.totalPage)
      this.pagePos = this.pagePostionCalc(this.current, this.totalPage)
      this.$emit('paginate', { page: this.current })
    },
    goPrev () {
      this.current = this.current - 1
      this.go(this.current)
    },
    goNext () {
      this.current = this.current + 1
      this.go(this.current)
    },
    /**
     * 根据给出的当前的页面数，计算出当前应该显示的分页
     * 默认显示当前页面的前后两页；不足5页时，显示正常页数
     * @param currentPage
     * @param totalPage
     * @returns {Array}
     */
    paginationCalc (currentPage = 1, totalPage = 1) {
      let pages = []
      const current = currentPage
      let total = totalPage
      if (total <= 5) {
        while (total >= 1) {
          pages.unshift(total)
          total = total - 1
        }
      } else if (current >= 3) {
        if (total - current >= 2) {
          pages = pages.concat([current - 2, current - 1, current, current + 1, current + 2])
        }
        if (total - current === 1) {
          pages = pages.concat([current - 3, current - 2, current - 1, current, current + 1])
        }
        if (total - current === 0) {
          pages = pages.concat([current - 4, current - 3, current - 2, current - 1, current])
        }
      } else {
        pages = [1, 2, 3, 4, 5]
      }
      return pages
    },
    /**
     * 计算当前页据第一页和最后一页的距离
     *
     * @param currentPage
     * @param totalCount
     * @return {Object}
     */
    pagePostionCalc (currentPage = 1, totalPage = 1) {
      return {
        fromStart: currentPage - 1,
        fromEnd: totalPage - currentPage
      }
    }
  }
}
</script>

<style lang="scss">
.paginate {
  padding: 0;
  border: 1px solid #e6e6e6;
  border-radius: 5px;
  margin: 1rem auto;
  text-align: center;
  &__btn{
    float: none;
    border: 1px solid #999;
    border: 0 rgba(0, 0, 0, 0);
    padding: .2rem .3rem;
    color: #2E4057;
    background-color: transparent;
    font-size: 14px;
    &:disabled {
      color: rgba(46, 64, 87, 0.4);
    	pointer-events: none;
    }
    &--active {
      color: #fff;
      background-color: #ffa800;
    }
    &:first-of-type {
      float: left;
      padding-left: .4rem;
      &:before {
        content: '\00ab    ';
      }
    }
    &:last-of-type {
      float: right;
      padding-right: .4rem;
      &:after {
        content: '  \00bb';
      }
    }
  }
}
</style>
