<script setup>
import { useUserStore } from '@/stores/userStore.js'
import { useRouter } from 'vue-router'

const userStore = useUserStore()
const router = useRouter()
// 点击退出登录
const confirm = () => {
  userStore.removeUser()
  router.push({ path: '/login' })
}
</script>

<template>
  <nav class="app-topnav">
    <div class="container">
      <ul>
        <!--多模板渲染，区分登录状态和非登录状态-->
        <!--登录-->
        <template v-if="userStore.userInfo.token">
          <li>
            <a href="javascript:">
              <i class="iconfont icon-user"></i>
              {{ userStore.userInfo.nickname }}
            </a>
          </li>
          <li>
            <el-popconfirm
              cancel-button-text="取消"
              confirm-button-text="确认"
              title="确认退出吗?"
              @confirm="confirm"
            >
              <template #reference>
                <a href="javascript:">退出登录</a>
              </template>
            </el-popconfirm>
          </li>
          <li><a href="javascript:">我的订单</a></li>
          <li><router-link to="/member">会员中心</router-link></li>
        </template>
        <!--非登录-->
        <template v-else>
          <li>
            <a href="javascript:" @click="$router.push('/login')">请先登录</a>
          </li>
          <li><a href="javascript:">帮助中心</a></li>
          <li><a href="javascript:">关于我们</a></li>
        </template>
      </ul>
    </div>
  </nav>
</template>

<style lang="scss" scoped>
.app-topnav {
  background: #333;
  ul {
    display: flex;
    height: 53px;
    justify-content: flex-end;
    align-items: center;
    li {
      a {
        padding: 0 15px;
        color: #cdcdcd;
        line-height: 1;
        display: inline-block;

        i {
          font-size: 14px;
          margin-right: 2px;
        }

        &:hover {
          color: $xtxColor;
        }
      }

      ~ li {
        a {
          border-left: 2px solid #666;
        }
      }
    }
  }
}
</style>
