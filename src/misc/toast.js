import Vue from 'vue'
import toastr from 'toastr'

/*
 * 定制Toast
 *
 */
toastr.options.positionClass = 'toast-top-center'
toastr.options.preventDuplicates = true

const showToast = function (msg, type) {
  switch (type) {
    case 'success':
      toastr.success(msg)
      break
    case 'error':
      toastr.error(msg)
      break
    case 'warning':
      toastr.warning(msg)
      break
    case 'info':
      toastr.info(msg)
      break
    default:
      toastr.success(msg)
  }
}

Vue.prototype.showToast = showToast

export default showToast
