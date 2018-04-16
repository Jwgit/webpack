<template>
  <div>
    <el-breadcrumb separator-class="el-icon-arrow-right">
      <el-breadcrumb-item>请购单管理</el-breadcrumb-item>
      <el-breadcrumb-item>{{$route.meta.title}}</el-breadcrumb-item>
    </el-breadcrumb>
    <el-row v-if="$route.name === 'purchaseEdit' || $route.name === 'purchaseAdd'">
      <el-button type="success" @click="save(10)">保存</el-button>
      <el-button @click="$router.go(-1)">取消</el-button>
      <el-button type="primary" @click="save(20)">提交</el-button>
    </el-row>
    <el-row v-else> <el-button @click="$router.go(-1)">返回</el-button></el-row>
    <table class="table-content">
      <tr>
        <td>请购单号码</td>
        <td>{{mainOrderData.orderCode}}</td>
        <td>数据来源</td>
        <td>{{mainOrderData.dataSource}}</td>
        <td>到货机构</td>
        <td>{{mainOrderData.arrivalOrg}}</td>
      </tr>
      <tr>
        <td>到货机构代码</td>
        <td>{{mainOrderData.arrivalOrgCode}}</td>
        <td>应到货日期</td>
        <td>{{mainOrderData.arrivalTime}}</td>
        <td>录入人</td>
        <td>{{mainOrderData.createdBy}}</td>
      </tr>
      <tr>
        <td>录入时间</td>
        <td>{{mainOrderData.createdAt}}</td>
        <td>审核人</td>
        <td>{{mainOrderData.lastModifiedBy}}</td>
        <td>审核时间</td>
        <td>{{mainOrderData.lastModifiedAt}}</td>
      </tr>
      <tr>
        <td>状态</td>
        <td>{{mainOrderData.approvalStatus}}</td>
      </tr>
    </table>
    <el-tabs type="card">
      <el-tab-pane label="商品明细">
        <pagoda-erp-table
          service="order"
          model="tb_req_goods"
          editable
          :edit-item-props="editItemProps"
          :pagination="false"
          :head-selection="false"
          :table-filter-data="filterForm"
          :edit-item-input="editItemInput"
          :grid-custom-btns="gridCustomBtns"
          :grid-btns="gridBtns"
          size="mini"
          ref="erpTable"
        ></pagoda-erp-table>
      </el-tab-pane>
    </el-tabs>
  </div>
</template>
<script>
export default {
  data () {
    return {
      obj: [{
        label: '请购单号码',
        value: '12'
      }],
      gridCustomBtns: {
        add: {
          text: '',
          props: {
            icon: 'el-icon-plus'
          },
          onClick: this.handleAdd
        },
        del: {
          text: '',
          props: {
            icon: 'el-icon-minus'
          },
          onClick: (e, btnSelf, selection) => {
            const delRowsIndexs = selection.map(({$index}) => $index)
            delRowsIndexs.length > 0 && this.$refs.erpTable.delRows(delRowsIndexs)
          }
        }
      },
      filterForm: {
        reqOrderId: this.$route.query.id
      },
      mainOrderData: {},
      editItemInput: {
        goodsName: this.changeGoodsNameCallback,
        reqPurchaseNum: this.changeReqPurchaseNumCallback
      },
      editItemProps: {
        goodsName: {
          labelKey: 'name',
          valueKey: 'name',
          params: {
            resourceTagCode: 'purchaseGoods'
          },
          remote: 'key',
          url: '/order/tb_req_orderService/goods/list'
        }
      }
    }
  },
  computed: {
    gridBtns () {
      return this.$route.name === 'purchaseDetail' ? [] : ['add', 'del']
    }
  },
  created () {
    console.log(this.$route)
    const {id} = this.$route.query
    this.$http.post('/order/tb_req_orderService/getById', {id: id}).then(res => {
      console.log(res)
      if (res.data.resultCode === 0) {
        this.mainOrderData = Object.assign({}, res.data.data)
      }
    })
  },
  methods: {
    handleAdd () {
      this.$refs.erpTable.newRows()
    },
    changeGoodsNameCallback (value, option, rowData) {
      console.log(value, option, rowData)
      rowData.goodsCode = option.code
      rowData.unit = 10
      rowData.spec = 10
      rowData.level = 10
    },
    changeReqPurchaseNumCallback (val, rowData) {
      console.log(val, rowData)
      rowData.reqPurchaseAmount = val * 10
    },
    save (status) {
      const {id} = this.$route.query
      console.log(this.$refs.erpTable.getTableData())
      let goodsData = this.$refs.erpTable.getTableData().data || []
      let data = {id, tb_req_goodsDTOList: goodsData, approvalStatus: status}
      this.$http.post('/order/tb_req_orderService/updateorderdetails', data).then(res => {
        console.log(res)
        if (res.data.resultCode === 0) {
          this.$message.success('成功')
          // eslint-disable-next-line
          const {tb_req_goodsDTOList, ...rest} = res.data.data
          console.log(rest)
          this.mainOrderData = Object.assign({}, this.mainOrderData, rest)
        }
      })
    }
  }
}
</script>

<style>
table.table-content {
  width: 100%;
  border-collapse:collapse;
  margin: 10px 0;
  table-layout: fixed;
  font-size: 14px;
}
.table-content td {
  padding: 6px;
  border: 1px solid #ccc;
  text-align: center;
}
.table-content td:nth-child(odd) {
  background-color: #eef1f7;
}
</style>
