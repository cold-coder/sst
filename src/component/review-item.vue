<template lang="html">
  <div class="review-item">
    <div class="review-item__header">
      <div class="review-item__header--left user">
        <img :src="review.photo | loadImg('small')" :alt="review.cust_name" class="user__avatar avatar--round avatar--sm">
        <div class="user__info">
          <div class="user__info--name">{{ review.cust_name }}</div>
          <div class="user__info--status"
          :class="{
            'text-green': review.status_code === 1 || review.status_code === 3,
            'text-red': review.status_code === 0,
            'text-gray': review.status_code === 2 }">
           {{ review.status_code | reviewStatusFilter }}
         </div>
        </div>
      </div>
      <div class="review-item__header--right score">
        <div class="score__number text-red">{{ review.star }} 分</div>
        <div class="score__date">{{ review.created_time | formatDate }}</div>
      </div>
    </div>
    <div class="review-item__body">
      <!-- 评论内容 -->
      <span class="review-item__body-content">
        {{ review.content }}
      </span>
      <!-- 评论图片 -->
      <div class="review-item__body-image clearfix" v-show="review.images">
        <img v-for="i in review.images.split(',')" :src="i | loadImg('small')">
      </div>
      <!-- 回复内容 -->
      <div class="review-item__body-reply reply" v-if="review.reply">
        <div class="reply__content">回复 {{review.reply}}</div>
        <div class="reply__date" v-if="review.reply_time">{{review.reply_time | formatDate}}</div>
      </div>
      <!-- 评论框 -->
      <div class="review-item__body-reply-box reply-box" v-show="isReplyBoxShow">
        <div class="reply-box__text">
            回复内容： {{replyContent}}
        </div>
        <textarea v-model="replyContent" class="pure-u-lg-2-3 pure-u-md-3-5 pure-u-1"></textarea>
      </div>
    </div>
    <!-- 待审核 -->
    <div class="review-item__buttons" v-show="review.status_code === 0">
      <button class="review-item__buttons-button review-item__buttons-button--approve btn" @click="approve">通过</button>
      <button class="review-item__buttons-button review-item__buttons-button--reply btn" @click="reply">通过并回复</button>
      <button class="review-item__buttons-button review-item__buttons-button--reject btn text-red" @click="reject">屏蔽</button>
    </div>
    <!-- 已审核 -->
    <div class="review-item__buttons" v-show="review.status_code === 1">
      <button class="review-item__buttons-button review-item__buttons-button--approve btn" disabled>通过</button>
      <button class="review-item__buttons-button review-item__buttons-button--reply btn" @click="reply">通过并回复</button>
      <button class="review-item__buttons-button review-item__buttons-button--reject btn text-red" @click="reject">屏蔽</button>
    </div>
    <!-- 审核拒绝 -->
    <div class="review-item__buttons" v-show="review.status_code === 2">
      <button class="review-item__buttons-button review-item__buttons-button--approve btn" @click="approve">通过</button>
        <!-- 之前有回复 -->
        <button v-show="review.reply" class="review-item__buttons-button review-item__buttons-button--reply btn" disabled>通过并回复</button>
        <!-- 之前无回复 -->
        <button v-show="!review.reply" class="review-item__buttons-button review-item__buttons-button--reply btn" @click="reply">通过并回复</button>
      <button class="review-item__buttons-button review-item__buttons-button--reject btn text-red" disabled>屏蔽</button>
    </div>
    <!-- 通过并回复 -->
    <div class="review-item__buttons" v-show="review.status_code === 3">
      <button class="review-item__buttons-button review-item__buttons-button--approve btn" disabled>通过</button>
      <button class="review-item__buttons-button review-item__buttons-button--reply btn" disabled>通过并回复</button>
      <button class="review-item__buttons-button review-item__buttons-button--reject btn text-red" @click="reject">屏蔽</button>
    </div>
  </div>
</template>

<script>
import api from 'api'
export default {
  name: 'review-item',
  props: {
    review: Object
  },
  data () {
    return {
      isReplyBoxShow: false,
      replyContent: ''
    }
  },
  methods: {
    reply () {
      if (!this.isReplyBoxShow) {
        this.isReplyBoxShow = true
        return
      }
      if (this.replyContent === '') {
        this.showToast('回复内容不可为空', 'warning')
        return
      }
      this.$http.post(api.VERIFY_COMMENT, {
        comment_id: this.review.id,
        status_code: 3, // 已回复
        reply: this.replyContent
      }).then(res => {
        this.review.status_code = 3
        this.review.reply = this.replyContent
        this.replyContent = ''
        this.isReplyBoxShow = false
        this.showToast('回复成功', 'success')
      })
    },
    approve () {
      let statusCode
      // 对于已经有回复的点评，直接将状态变为已回复
      if (this.review.reply) {
        statusCode = 3 // 通过并已回复
      } else {
        statusCode = 1 // 通过
      }
      this.verify(this.review.id, statusCode).then(res => {
        this.review.status_code = statusCode
        this.showToast('操作成功')
      })
    },
    reject () {
      this.verify(this.review.id, 2).then(res => {
        this.review.status_code = 2 // 屏蔽
        this.showToast('操作成功')
      })
    },
    verify (reviewId, statusCode) {
      return this.$http.post(api.VERIFY_COMMENT, {
        comment_id: reviewId,
        status_code: statusCode
      })
    }
  }
}
</script>

<style lang="scss">
@import "../style/_variable.scss";
.review-item {
  border: 1px solid $border-color;
  margin-top: .2rem;
  border-radius: 2px;
  &__header {
    display: flex;
    justify-content: space-between;
    padding: .15rem;
    font-size: 16px;
    .user {
      display: flex;
      justify-content: flex-start;
      align-items: center;
      &__info {
        display: flex;
        flex-direction: column;
        padding: .1rem;
      }
    }
    .score {
      display: flex;
      flex-direction: column;
      align-items: flex-end;
      justify-content: center;
      &__number {

      }
      &__date {

      }
    }
  }
  &__body {
    padding: 0 .2rem;
    &-content {
      font-size: 16px;
    }
    &-image {
      margin-top: .1rem;
      img {
        width: 1.5rem;
        height: 1.5rem;
        margin-left: .1rem;
        border-radius: 5px;
        &:first-of-type {
          margin-left: 0;
        }
      }
    }
    &-reply {
      display: flex;
      justify-content: space-between;
      border-top: 1px solid $border-color;
      margin-top: .2rem;
      padding: .15rem 0;
    }
    .reply {
      &__content {
        color: #AF3C00;
        font-size: 16px;
      }
      &__date {
        opacity: .8;
      }
    }
    .reply-box {
      margin-top: .2rem;
      &__text {
        font-size: 16px;
      }
      textarea {
        margin-top: .2rem;
        height: 60px;
      }
    }
  }
  &__buttons {
    font-size: 0;
    margin-top: .2rem;
    border-top: 1px solid $border-color;
   &-button {
     width: 33.333%;
     font-size: 16px;
     border-left: 1px solid $border-color;
     background-color: #F4F4F4;
     &:first-of-type {
       border-left: none;
     }
     &--approve {

     }
     &--reply {

     }
     &--reject {

     }
   }
  }
}
</style>
