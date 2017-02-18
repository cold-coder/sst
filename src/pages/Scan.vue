<template lang="html">
  <div id="scan">
    <headerX></headerX>
    <div class="scan" v-show="!isScan">
      <div class="scan__result">
        <div class="scan__header">
          扫码结果
        </div>
        <div class="scan__detail" v-show="result">
          <!-- 卡券 -->
          <div v-if="type === 'coupon'">
            <div class="scan__item">
              <label class="scan__key">礼券编号：</label>
              <div class="scan__value">{{result.code}}</div>
            </div>
            <div class="scan__item">
              <label class="scan__key">状态：</label>
              <div class="scan__value" v-bind="result.coupon_info"></div>
            </div>
            <div class="scan__item">
              <label class="scan__key">名称：</label>
              <div class="scan__value">{{}}</div>
            </div>
            <div class="scan__item">
              <label class="scan__key">礼券类型：</label>
              <div class="scan__value">{{}}</div>
            </div>
          </div>
          <!-- 活动 -->
          <div v-if="type === 'activity'">
            <div class="scan__item">
              <label class="scan__key">编号：</label>
              <div class="scan__value">{{}}</div>
            </div>
            <div class="scan__item">
              <label class="scan__key">状态：</label>
              <div class="scan__value">{{}}</div>
            </div>
            <div class="scan__item">
              <label class="scan__key">活动名称：</label>
              <div class="scan__value">{{}}</div>
            </div>
            <div class="scan__item">
              <label class="scan__key">会员名称：</label>
              <div class="scan__value">{{}}</div>
            </div>
            <div class="scan__item">
              <label class="scan__key">会员手机：</label>
              <div class="scan__value">{{}}</div>
            </div>
            <div class="scan__item">
              <label class="scan__key">报名人数：</label>
              <div class="scan__value">{{}}</div>
            </div>
          </div>
          <!-- 编号无法识别 -->
          <div v-if="type === 'error'">
            <div class="scan__item">
              <label class="scan__key">编号：</label>
              <div class="scan__value">{{result.code}}</div>
            </div>
            <div class="scan__item">
              <label class="scan__key">状态：</label>
              <div class="scan__value scan__value--error">编号无法识别</div>
            </div>
          </div>
        </div>
        <div class="scan__split"></div>
        <div class="scan__foot">
          <span class="scan__cancel" @click="scan()">取消</span>
          <span class="scan__confirm" @click="confirm()" v-show="isShowConfirm()">{{getConfirmText()}}</span>
        </div>
      </div>
    </div>
  </div>

</template>

<script>
import HeaderX from '../component/header.vue'
import verificationMixin from './mixin/verification.js'
import campaignMixin from './mixin/campaign.js'
export default {
  name: 'scan',
  components: {
    HeaderX
  },
  mixins: [verificationMixin, campaignMixin],
  data () {
    return {
      isScan: true,
      result: false,
      type: 'error',
      showAlert: false,
      alertMsg: ''
    }
  },
  mounted () {
    this.scan()
  },
  methods: {
    scan: function () {
      const self = this
      if (window.smartApp && window.smartApp.scanBarCode) {
        window.smartApp.scanBarCode({
          success: function (res) {
            self.query(res.result)
          },
          cancel: function () {
            self.$router.push('/dashboard')
          }
        })
      } else {
        // 本地测试用
        // this.query('141585'); // 测试会员手机
        this.query('937s62257e') // 测试核销编号
        // this.query('jxBE29BsRA-Af7iRIPetCw') // 测试活动签到码 13440
        // this.query('...') // invalid code
      }
    },
    query: function (code) {
      // 先查签到码，再查礼券
      this.getCheckinInfoByCode(code).then(res => {
        if (res) {
          // debugger
          this.result = res
          this.type = 'activity'
          this.result.code = code
          this.isScan = false
          throw 'is activity chekin code'
        } else {
          return this.getCouponInfoByCode(code)
        }
      }).then(res => {
        if (res) {
          this.result = res
          this.type = 'coupon'
          this.isScan = false
          throw 'is coupon code'
        }
        return
      }).then(() => {
        // 出错的码
        this.type = 'error'
        throw 'invalid code'
      }).catch((result) => {
        this.result = {
          code: code
        }
        console.log(result)
      })
    },
    isShowConfirm: function () {
      var isShow = false
      // if (this.result && this.type !== 'error') {
      //   if (this.type === 'coupon') {
      //     if (this.result.coupon_info.coupon_info.status === NOT_USE) {
      //       isShow = true;
      //     }
      //   } else if (this.type === 'activity') {
      //     // 已确认
      //     if (this.result.status === 1) {
      //       isShow = true;
      //     }
      //   }
      // }
      return isShow
    },
    getConfirmText: function () {
      var text = ''
      if (this.type === 'coupon') {
        text = '核销'
      } else if (this.type === 'activity') {
        text = '签到'
      }
      return text
    },
    confirm: function () {
      if (this.type === 'coupon') {
        // this.useCoupon(this.result.coupon_info.coupon_info.code);
      } else if (this.type === 'activity') {
        // this.chekcin(this.result);
      }
    }
  }
}
</script>

<style lang="scss">
.scan {
    width: 8rem;
    margin: 0 auto;
    position: relative;
    top: 2.3rem;
    padding: 1.5rem 0.5rem 0.75rem;
    background: url("image/top-icon.png") center 0 no-repeat #fff;
    background-size: 1.44rem 1.14rem;
    overflow: hidden;
    &:after,
    &:before {
        content: '';
        position: absolute;
    }
    &:before {
        top: -.2rem;
        width: 0.4rem;
        height: 0.4rem;
        background-color: #e8ecf0;
        border-radius: 50%;
        left: -.2rem;
        box-shadow: 8rem 0 #e8ecf0;
    }
    &:after {
        // bottom: 0;
        // width: 100%;
        // height: 50px;
        // background: linear-gradient(#ffffff 50%, rgba(255, 255, 255, 0) 0) 0 0, radial-gradient(circle closest-side, #FFFFFF 53%, rgba(255, 255, 255, 0) 0) 0 0, radial-gradient(circle closest-side, #FFFFFF 50%, rgba(255, 255, 255, 0) 0) 55px 0 #48B;
        // background-size: 110px 200px;
        // background-repeat: repeat-x;
    }
    &__header {
        text-align: center;
        padding-bottom: 0.6rem;
        border-bottom: 1px dashed #e2e2e2;
        font-size: 18px;
    }
    &__detail {
        padding: 0.9rem 0;
    }
    &__item {
        font-size: 0;
        height: 0.64rem;
        line-height: 0.64rem;
        text-align: justify;
        &:after {
            content: '';
            display: inline-block;
            width: 100%;
        }
        &--strong {
            font-weight: bold;
        }
    }
    &__key,
    &__value {
        font-size: 14px;
        height: 100%;
        display: inline-block;
        vertical-align: top;
    }
    &__value {
        text-align: right;
        overflow: hidden;
        text-overflow: ellipsis;
        white-space: nowrap;
        &--error {
            color: #f00;
        }
    }
    &__foot {
        padding-top: 0.6rem;
        width: 5.3rem;
        margin: 0 auto;
        font-size: 0;
        text-align: center;
    }
    &__split {
        position: relative;
        border-bottom: 1px dashed #e2e2e2;
        &:after,
        &:before {
            content: '';
            position: absolute;
            top: -.2rem;
            width: 0.4rem;
            height: 0.4rem;
            background-color: #e8ecf0;
            border-radius: 50%;
        }
        &:before {
            left: -.7rem;
        }
        &:after {
            right: -.7rem;
        }
    }
    &__cancel,
    &__confirm {
        display: inline-block;
        width: 2.4rem;
        height: 0.9rem;
        line-height: 0.9rem;
        text-align: center;
        font-size: 18px;
    }
    &__cancel {
        background-color: #eaeaea;
    }
    &__confirm {
        margin-left: 0.3rem;
        color: #fff;
        background-color: #ffa800;
    }
}
</style>
