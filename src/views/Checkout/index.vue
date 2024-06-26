<script setup>
import {
  checkoutGetCheckInfoService,
  createOrderService
} from '@/apis/checkout.js'
import { ref } from 'vue'
import { ElMessage } from 'element-plus'
import { useRouter } from 'vue-router'
import { useCartStore } from '@/stores/cartStore.js'
import {
  addressAddAddressService,
  addressChangeAddressService,
  addressDelAddressService
} from '@/apis/address.js'

const router = useRouter()

const checkInfo = ref({}) // 订单对象
const curAddress = ref({}) // 地址对象
const cartStore = useCartStore()

const getCheckInfo = async () => {
  const res = await checkoutGetCheckInfoService()
  checkInfo.value = res.data.result
  // 适配默认地址，在地址列表中筛选出isDefault === 0那一项
  curAddress.value = checkInfo.value.userAddresses.find(
    (item) => item.isDefault === 0
  )
}
getCheckInfo()

// 控制弹窗打开
const showDialog = ref(false)
const addFlag = ref(false)

// 切换地址
const activeAddress = ref({})
const switchAddress = (item) => {
  activeAddress.value = item
}
const confirm = () => {
  curAddress.value = activeAddress.value
  showDialog.value = false
  activeAddress.value = {}
}

// 添加地址表单校验规则
const formRef = ref(null)
const rules = {
  receiver: [{ required: true, message: '姓名不能为空', trigger: 'blur' }],
  contact: [
    { required: true, message: '联系方式不能为空', trigger: 'blur' },
    {
      pattern: /^(?:(?:\+|00)86)?1[3-9]\d{9}$/,
      message: '请输入正确的手机号',
      trigger: 'blur'
    }
  ],
  provinceCode: [
    { required: true, message: '省份编码不能为空', trigger: 'blur' }
  ],
  cityCode: [{ required: true, message: '城市编码不能为空', trigger: 'blur' }],
  countyCode: [
    { required: true, message: '地区编码不能为空', trigger: 'blur' }
  ],
  address: [{ required: true, message: '详细地址不能为空', trigger: 'blur' }],
  postalCode: [
    { required: true, message: '邮政编码不能为空', trigger: 'blur' }
  ],
  addressTags: [
    { required: true, message: '邮政编码不能为空', trigger: 'blur' }
  ],
  isDefault: [
    { required: true, message: '请选择是否为默认地址', trigger: 'change' }
  ],
  fullLocation: [
    { required: true, message: '完整地址不能为空', trigger: 'blur' }
  ]
}
// 添加地址
const addressForm = ref({
  receiver: '',
  contact: '',
  provinceCode: '',
  cityCode: '',
  countyCode: '',
  address: '',
  postalCode: '',
  addressTags: '',
  isDefault: 0,
  fullLocation: ''
})

// 添加地址和修改地址共用一套表单，判断是添加还是修改
const isEdit = ref(true)
const addressId = ref(undefined)
const toggleFlags = (mode, id) => {
  addFlag.value = true
  isEdit.value = mode

  // 修改地址的数据回显
  if (!isEdit.value) {
    addressId.value = id
    addressForm.value = checkInfo.value.userAddresses.find(
      (item) => item.id === id
    )
  }
}

// 添加/修改地址
const confirmAddress = async () => {
  // 添加地址
  if (isEdit.value) {
    await formRef.value.validate()
    await addressAddAddressService(addressForm.value)
    ElMessage.success('地址添加成功')
    await getCheckInfo()
    addFlag.value = false
  } else {
    // 修改地址
    await formRef.value.validate()
    await addressChangeAddressService(addressForm.value, addressId.value)
    ElMessage.success('地址修改成功')
    await getCheckInfo()
    addFlag.value = false
  }
}

// 删除地址
const delAddress = async (id) => {
  await addressDelAddressService(id)
  ElMessage.success('删除地址成功')
  // 获取最新地址列表
  await getCheckInfo()
}

// 提交订单
const createOrder = async () => {
  const res = await createOrderService({
    deliveryTimeType: 1,
    payType: 1,
    payChannel: 1,
    buyerMessage: '',
    goods: checkInfo.value.goods.map((item) => {
      return {
        skuId: item.skuId,
        count: item.count
      }
    }),
    addressId: curAddress.value.id
  })
  const orderId = res.data.result.id
  await router.replace({
    path: `/pay/${orderId}`
  })
  cartStore.clearCart()
  ElMessage.success('提交订单成功')
}
</script>

<template>
  <div class="xtx-pay-checkout-page">
    <div class="container">
      <div class="wrapper">
        <!-- 收货地址 -->
        <h3 class="box-title">收货地址</h3>
        <div class="box-body">
          <div class="address">
            <div class="text">
              <div v-if="!curAddress" class="none">
                您需要先添加收货地址才可提交订单。
              </div>
              <ul v-else>
                <li>
                  <span>收<i />货<i />人：</span>{{ curAddress.receiver }}
                </li>
                <li><span>联系方式：</span>{{ curAddress.contact }}</li>
                <li>
                  <span>收货地址：</span>{{ curAddress.fullLocation }}
                  {{ curAddress.address }}
                </li>
              </ul>
            </div>
            <div class="action">
              <el-button size="large" @click="showDialog = true">
                切换地址
              </el-button>
              <el-button size="large" @click="toggleFlags(true)">
                添加地址
              </el-button>
            </div>
          </div>
        </div>
        <!-- 商品信息 -->
        <h3 class="box-title">商品信息</h3>
        <div class="box-body">
          <table class="goods">
            <thead>
              <tr>
                <th width="520">商品信息</th>
                <th width="170">单价</th>
                <th width="170">数量</th>
                <th width="170">小计</th>
                <th width="170">实付</th>
              </tr>
            </thead>
            <tbody>
              <tr v-for="i in checkInfo.goods" :key="i.id">
                <td>
                  <a class="info" href="javascript:">
                    <img :src="i.picture" alt="" />
                    <div class="right">
                      <p>{{ i.name }}</p>
                      <p>{{ i.attrsText }}</p>
                    </div>
                  </a>
                </td>
                <td>&yen;{{ i.price }}</td>
                <td>{{ i.price }}</td>
                <td>&yen;{{ i.totalPrice }}</td>
                <td>&yen;{{ i.totalPayPrice }}</td>
              </tr>
            </tbody>
          </table>
        </div>
        <!-- 配送时间 -->
        <h3 class="box-title">配送时间</h3>
        <div class="box-body">
          <a class="my-btn active" href="javascript:"
            >不限送货时间：周一至周日</a
          >
          <a class="my-btn" href="javascript:">工作日送货：周一至周五</a>
          <a class="my-btn" href="javascript:">双休日、假日送货：周六至周日</a>
        </div>
        <!-- 支付方式 -->
        <h3 class="box-title">支付方式</h3>
        <div class="box-body">
          <a class="my-btn active" href="javascript:">在线支付</a>
          <a class="my-btn" href="javascript:">货到付款</a>
          <span style="color: #999">货到付款需付5元手续费</span>
        </div>
        <!-- 金额明细 -->
        <h3 class="box-title">金额明细</h3>
        <div class="box-body">
          <div class="total">
            <dl>
              <dt>商品件数：</dt>
              <dd>{{ checkInfo.summary?.goodsCount }}件</dd>
            </dl>
            <dl>
              <dt>商品总价：</dt>
              <dd>¥{{ checkInfo.summary?.totalPrice.toFixed(2) }}</dd>
            </dl>
            <dl>
              <dt>运<i></i>费：</dt>
              <dd>¥{{ checkInfo.summary?.postFee.toFixed(2) }}</dd>
            </dl>
            <dl>
              <dt>应付总额：</dt>
              <dd class="price">
                {{ checkInfo.summary?.totalPayPrice.toFixed(2) }}
              </dd>
            </dl>
          </div>
        </div>
        <!-- 提交订单 -->
        <div class="submit">
          <el-button size="large" type="primary" @click="createOrder">
            提交订单
          </el-button>
        </div>
      </div>
    </div>
  </div>
  <!-- 切换地址 -->
  <el-dialog v-model="showDialog" center title="切换收货地址" width="30%">
    <div class="addressWrapper">
      <div
        v-for="item in checkInfo.userAddresses"
        :key="item.id"
        :class="{ active: activeAddress.id === item.id }"
        class="text item"
        @click="switchAddress(item)"
      >
        <ul>
          <li>
            <span>收<i />货<i />人：</span>{{ item.receiver }}
          </li>
          <li><span>联系方式：</span>{{ item.contact }}</li>
          <li><span>收货地址：</span>{{ item.fullLocation + item.address }}</li>
        </ul>
        <el-popconfirm
          cancel-button-text="取消"
          confirm-button-text="确定"
          title="确认要删除地址吗？"
          @confirm="delAddress(item.id)"
        >
          <template #reference>
            <span class="delAddress">×</span>
          </template>
        </el-popconfirm>
        <el-button
          plain
          size="small"
          type="primary"
          @click="toggleFlags(false, item.id)"
        >
          修改地址
        </el-button>
      </div>
    </div>
    <template #footer>
      <span class="dialog-footer">
        <el-button @click="showDialog = false">取消</el-button>
        <el-button type="primary" @click="confirm">确定</el-button>
      </span>
    </template>
  </el-dialog>
  <!-- 添加/修改地址 -->
  <el-dialog v-model="addFlag" center title="添加收货地址" width="50%">
    <div class="form">
      <el-form
        ref="formRef"
        :model="addressForm"
        :rules="rules"
        label-position="right"
        label-width="auto"
        style="max-width: 500px"
      >
        <el-form-item label="姓名" prop="receiver">
          <el-input v-model="addressForm.receiver"></el-input>
        </el-form-item>
        <el-form-item label="联系方式" prop="contact">
          <el-input v-model="addressForm.contact"></el-input>
        </el-form-item>
        <el-form-item label="省份编码" prop="provinceCode">
          <el-input v-model="addressForm.provinceCode"></el-input>
        </el-form-item>
        <el-form-item label="城市编码" prop="cityCode">
          <el-input v-model="addressForm.cityCode"></el-input>
        </el-form-item>
        <el-form-item label="地区编码" prop="countyCode">
          <el-input v-model="addressForm.countyCode"></el-input>
        </el-form-item>
        <el-form-item label="详细地址" prop="address">
          <el-input v-model="addressForm.address"></el-input>
        </el-form-item>
        <el-form-item label="邮政编码" prop="postalCode">
          <el-input v-model="addressForm.postalCode"></el-input>
        </el-form-item>
        <el-form-item label="地址标签" prop="addressTags">
          <el-input
            v-model="addressForm.addressTags"
            placeholder="家,学校,公司……"
          ></el-input>
        </el-form-item>
        <el-form-item label="收货地址是否默认" prop="isDefault">
          <el-radio-group v-model="addressForm.isDefault" class="ml-4">
            <el-radio :value="0" size="large">是</el-radio>
            <el-radio :value="1" size="large">否</el-radio>
          </el-radio-group>
        </el-form-item>
        <el-form-item label="完整地址" prop="fullLocation">
          <el-input v-model="addressForm.fullLocation"></el-input>
        </el-form-item>
      </el-form>
    </div>
    <template #footer>
      <span class="dialog-footer">
        <el-button @click="addFlag = false">取消</el-button>
        <el-button type="primary" @click="confirmAddress()">
          {{ isEdit ? '添加' : '修改' }}
        </el-button>
      </span>
    </template>
  </el-dialog>
</template>

<style lang="scss" scoped>
.xtx-pay-checkout-page {
  margin-top: 20px;

  .wrapper {
    background: #fff;
    padding: 0 20px;

    .box-title {
      font-size: 16px;
      font-weight: normal;
      padding-left: 10px;
      line-height: 70px;
      border-bottom: 1px solid #f5f5f5;
    }

    .box-body {
      padding: 20px 0;
    }
  }
}

.address {
  border: 1px solid #f5f5f5;
  display: flex;
  align-items: center;

  .text {
    flex: 1;
    min-height: 90px;
    display: flex;
    align-items: center;

    .none {
      line-height: 90px;
      color: #999;
      text-align: center;
      width: 100%;
    }

    > ul {
      flex: 1;
      padding: 20px;

      li {
        line-height: 30px;

        span {
          color: #999;
          margin-right: 5px;

          > i {
            width: 0.5em;
            display: inline-block;
          }
        }
      }
    }

    > a {
      color: $xtxColor;
      width: 160px;
      text-align: center;
      height: 90px;
      line-height: 90px;
      border-right: 1px solid #f5f5f5;
    }
  }

  .action {
    width: 420px;
    text-align: center;

    .btn {
      width: 140px;
      height: 46px;
      line-height: 44px;
      font-size: 14px;

      &:first-child {
        margin-right: 10px;
      }
    }
  }
}

.goods {
  width: 100%;
  border-collapse: collapse;
  border-spacing: 0;

  .info {
    display: flex;
    text-align: left;

    img {
      width: 70px;
      height: 70px;
      margin-right: 20px;
    }

    .right {
      line-height: 24px;

      p {
        &:last-child {
          color: #999;
        }
      }
    }
  }

  tr {
    th {
      background: #f5f5f5;
      font-weight: normal;
    }

    td,
    th {
      text-align: center;
      padding: 20px;
      border-bottom: 1px solid #f5f5f5;

      &:first-child {
        border-left: 1px solid #f5f5f5;
      }

      &:last-child {
        border-right: 1px solid #f5f5f5;
      }
    }
  }
}

.my-btn {
  width: 228px;
  height: 50px;
  border: 1px solid #e4e4e4;
  text-align: center;
  line-height: 48px;
  margin-right: 25px;
  color: #666666;
  display: inline-block;

  &.active,
  &:hover {
    border-color: $xtxColor;
  }
}

.total {
  dl {
    display: flex;
    justify-content: flex-end;
    line-height: 50px;

    dt {
      i {
        display: inline-block;
        width: 2em;
      }
    }

    dd {
      width: 240px;
      text-align: right;
      padding-right: 70px;

      &.price {
        font-size: 20px;
        color: $priceColor;
      }
    }
  }
}

.submit {
  text-align: right;
  padding: 60px;
  border-top: 1px solid #f5f5f5;
}

.addressWrapper {
  max-height: 500px;
  overflow-y: auto;

  .text {
    position: relative;

    .delAddress {
      position: absolute;
      top: 50%;
      right: 20px;
      transform: translateY(-50%);
    }

    .el-button {
      position: absolute;
      top: 50%;
      transform: translateY(-50%);
      right: 40px;
    }
  }
}

.text {
  flex: 1;
  min-height: 90px;
  display: flex;
  align-items: center;

  &.item {
    border: 1px solid #f5f5f5;
    margin-bottom: 10px;
    cursor: pointer;

    &.active,
    &:hover {
      border-color: $xtxColor;
      background: lighten($xtxColor, 50%);
    }

    > ul {
      padding: 10px;
      font-size: 14px;
      line-height: 30px;
    }
  }
}

.form {
  width: 500px;
  height: 100%;
  margin: 0 auto;
}
</style>
