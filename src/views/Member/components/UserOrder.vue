<script setup>
// tab列表
import { orderGetOrderList } from '@/apis/order.js'
import { ref, watch } from 'vue'

const tabTypes = [
  { name: 'all', label: '全部订单' },
  { name: 'unpay', label: '待付款' },
  { name: 'deliver', label: '待发货' },
  { name: 'receive', label: '待收货' },
  { name: 'comment', label: '待评价' },
  { name: 'complete', label: '已完成' },
  { name: 'cancel', label: '已取消' }
]
const formatPayState = (payState) => {
  const stateMap = {
    1: '待付款',
    2: '待发货',
    3: '待收货',
    4: '待评价',
    5: '已完成',
    6: '已取消'
  }
  return stateMap[payState]
}
// 获取订单列表
const orderList = ref([])
const total = ref(0) // 订单总数
const params = ref({ orderState: 0, page: 1, pageSize: 2 })
const getOrderList = async () => {
  const res = await orderGetOrderList(params.value)
  orderList.value = res.data.result.items
  total.value = res.data.result.counts
}
getOrderList()

// tab栏切换
const tabChange = (type) => {
  params.value.orderState = type.index
  getOrderList()
}

// 分页器切换
const pageChange = (page) => {
  params.value.page = page
  getOrderList()
}

watch(orderList, (newValue) => {
  console.log(newValue)
})
</script>

<template>
  <div class="order-container">
    <el-tabs @tab-click="tabChange">
      <!-- tab切换 -->
      <el-tab-pane
        v-for="item in tabTypes"
        :key="item.name"
        :label="item.label"
      />
      <el-skeleton :loading="orderList.length === 0">
        <template #template>
          <div
            style="
              width: 100%;
              height: 500px;
              display: flex;
              justify-content: center;
              align-items: center;
            "
          >
            <div class="loader"></div>
          </div>
        </template>
        <template #default>
          <div class="main-container">
            <div>
              <!-- 订单列表 -->
              <div
                v-for="order in orderList"
                :key="order.id"
                class="order-item"
              >
                <div class="head">
                  <span>下单时间：{{ order.createTime }}</span>
                  <span>订单编号：{{ order.id }}</span>
                  <!-- 未付款，倒计时时间还有 -->
                  <span v-if="order.orderState === 1" class="down-time">
                    <i class="iconfont icon-down-time"></i>
                    <b>付款截止: {{ order.countdown }}</b>
                  </span>
                </div>
                <div class="body">
                  <div class="column goods">
                    <ul>
                      <li v-for="item in order.skus" :key="item.id">
                        <a class="image" href="javascript:">
                          <img :src="item.image" alt="" />
                        </a>
                        <div class="info">
                          <p class="name ellipsis-2">
                            {{ item.name }}
                          </p>
                          <p class="attr ellipsis">
                            <span>{{ item.attrsText }}</span>
                          </p>
                        </div>
                        <div class="price">¥{{ item.realPay?.toFixed(2) }}</div>
                        <div class="count">x{{ item.quantity }}</div>
                      </li>
                    </ul>
                  </div>
                  <div class="column state">
                    <p>{{ formatPayState(order.orderState) }}</p>
                    <p v-if="order.orderState === 3">
                      <a class="green" href="javascript:">查看物流</a>
                    </p>
                    <p v-if="order.orderState === 4">
                      <a class="green" href="javascript:">评价商品</a>
                    </p>
                    <p v-if="order.orderState === 5">
                      <a class="green" href="javascript:">查看评价</a>
                    </p>
                  </div>
                  <div class="column amount">
                    <p class="red">¥{{ order.payMoney?.toFixed(2) }}</p>
                    <p>（含运费：¥{{ order.postFee?.toFixed(2) }}）</p>
                    <p>在线支付</p>
                  </div>
                  <div class="column action">
                    <el-button
                      v-if="order.orderState === 1"
                      size="small"
                      type="primary"
                    >
                      立即付款
                    </el-button>
                    <el-button
                      v-if="order.orderState === 3"
                      size="small"
                      type="primary"
                    >
                      确认收货
                    </el-button>
                    <p><a href="javascript:">查看详情</a></p>
                    <p v-if="[2, 3, 4, 5].includes(order.orderState)">
                      <a href="javascript:">再次购买</a>
                    </p>
                    <p v-if="[4, 5].includes(order.orderState)">
                      <a href="javascript:">申请售后</a>
                    </p>
                    <p v-if="order.orderState === 1">
                      <a href="javascript:">取消订单</a>
                    </p>
                  </div>
                </div>
              </div>
              <!-- 分页 -->
              <div class="pagination-container">
                <el-pagination
                  :page-size="params.pageSize"
                  :total="total"
                  background
                  layout="prev, pager, next"
                  @current-change="pageChange"
                />
              </div>
            </div>
          </div>
        </template>
      </el-skeleton>
    </el-tabs>
  </div>
</template>

<style lang="scss" scoped>
.order-container {
  padding: 10px 20px;

  .pagination-container {
    display: flex;
    justify-content: center;
  }

  .main-container {
    min-height: 500px;

    .holder-container {
      min-height: 500px;
      display: flex;
      justify-content: center;
      align-items: center;
    }
  }
}

.order-item {
  margin-bottom: 20px;
  border: 1px solid #f5f5f5;

  .head {
    height: 50px;
    line-height: 50px;
    background: #f5f5f5;
    padding: 0 20px;
    overflow: hidden;

    span {
      margin-right: 20px;

      &.down-time {
        margin-right: 0;
        float: right;

        i {
          vertical-align: middle;
          margin-right: 3px;
        }

        b {
          vertical-align: middle;
          font-weight: normal;
        }
      }
    }

    .del {
      margin-right: 0;
      float: right;
      color: #999;
    }
  }

  .body {
    display: flex;
    align-items: stretch;

    .column {
      border-left: 1px solid #f5f5f5;
      text-align: center;
      padding: 20px;

      > p {
        padding-top: 10px;
      }

      &:first-child {
        border-left: none;
      }

      &.goods {
        flex: 1;
        padding: 0;
        align-self: center;

        ul {
          li {
            border-bottom: 1px solid #f5f5f5;
            padding: 10px;
            display: flex;

            &:last-child {
              border-bottom: none;
            }

            .image {
              width: 70px;
              height: 70px;
              border: 1px solid #f5f5f5;
            }

            .info {
              width: 220px;
              text-align: left;
              padding: 0 10px;

              p {
                margin-bottom: 5px;

                &.name {
                  height: 38px;
                }

                &.attr {
                  color: #999;
                  font-size: 12px;

                  span {
                    margin-right: 5px;
                  }
                }
              }
            }

            .price {
              width: 100px;
            }

            .count {
              width: 80px;
            }
          }
        }
      }

      &.state {
        width: 120px;

        .green {
          color: $xtxColor;
        }
      }

      &.amount {
        width: 200px;

        .red {
          color: $priceColor;
        }
      }

      &.action {
        width: 140px;

        a {
          display: block;

          &:hover {
            color: $xtxColor;
          }
        }
      }
    }
  }
}
</style>
