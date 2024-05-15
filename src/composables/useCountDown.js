// 倒计时函数
import { computed, onUnmounted, ref } from 'vue'
import dayjs from 'dayjs'

export const useCountDown = () => {
  let timer = null
  // 1. 响应式数据
  const time = ref(0)
  // 格式化时间：xx分xx秒
  const formatTime = computed(() => {
    return dayjs.unix(time.value).format('mm分ss秒')
  })
  // 2. 开启倒计时的函数
  const start = (currentTime) => {
    // 核心逻辑：每隔一秒减一
    time.value = currentTime
    timer = setInterval(() => {
      time.value--
    }, 1000)
  }
  // 组件销毁时，清楚定时器
  onUnmounted(() => {
    timer && clearInterval(timer)
  })

  return {
    formatTime,
    start
  }
}
