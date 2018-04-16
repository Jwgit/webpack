<template>
  <div>
    <el-breadcrumb separator-class="el-icon-arrow-right">
      <el-breadcrumb-item>请购单管理</el-breadcrumb-item>
      <el-breadcrumb-item>请购单列表</el-breadcrumb-item>
    </el-breadcrumb>
    <pagoda-form-group :form-data="formData"  @submit="submit" inline label-width="100px"></pagoda-form-group>
     <pagoda-erp-table
    service="order"
    model="tb_req_order"
    :table-filter-data="filterForm"
    :edit-column-config="editColumnConfig"
    :grid-custom-btns="gridCustomBtns"
    :edit-item-props="editItemProps"
    :grid-btns="['add']"
    @create="handleAdd"
    ref="erpTable"
  ></pagoda-erp-table>

  <el-dialog title="新增请购单" :visible.sync="dialogFormVisible" :before-close="beforeClose">
  <pagoda-form-group :form-data="dialogForm" label-width="100px" ref="dialogFormRef" @submit="addOrder" :btn-config="btnConfig"></pagoda-form-group>

</el-dialog>
  </div>

</template>

<script>
export default {
  data () {
    const vm = this
    return {
      editColumnConfig: {
        label: '操作',
        width: '280',
        fixed: 'right',
        setBtnGroup (row) {
          let detailBtn = {
            type: 'info',
            text: '详情',
            onClick: () => {
              console.log(row.data)
              vm.$router.push({name: 'purchaseDetail', query: {id: row.data.id}})
            }
          }
          return [detailBtn]
        }
      },
      gridCustomBtns: {
        add: {
          onClick: this.handleAdd
        }
      },
      editItemProps: {
        arrivalOrg: {
          labelKey: 'dataName',
          valueKey: 'dataName',
          params: {
            resourceTagCode: 'arriveOrg'
          },
          remote: 'city',
          url: '/order/tb_req_orderService/dc/list'
        }
      },
      formData: [
        {
          label: '请购单号码',
          type: 'input',
          key: 'orderCode'
        },
        {
          label: '到货机构',
          type: 'bdc-select',
          key: 'arrivalOrgCode',
          props: {
            labelKey: 'dataName',
            valueKey: 'data',
            params: {
              resourceTagCode: 'arriveOrg'
            },
            remote: 'city',
            url: '/order/tb_req_orderService/dc/list'
          }
        },
        {
          label: '审核时间',
          type: 'date-picker',
          key: 'time'
        },
        {
          label: '录入人',
          type: 'input',
          key: 'createdBy'
        },
        {
          label: '录入时间',
          type: 'date-picker',
          key: 'createdAt'
        },
        {
          label: '审核人',
          type: 'input',
          key: 'lastModifiedBy'
        },
        {
          label: '状态',
          type: 'select',
          key: 'approvalStatus',
          options: [
            {
              value: '10',
              label: '未提交'
            },
            {
              value: '20',
              label: '待处理'
            },
            {
              value: '30',
              label: '已处理'
            }
          ]
        }
      ],
      filterForm: {

      },
      // 弹框
      dialogFormVisible: false,
      dialogForm: [
        {
          label: '到货机构',
          validate: {
            required: true,
            msg: '该字段为必填字段'
          },
          type: 'bdc-select',
          key: 'arrivalOrgCode',
          props: {
            labelKey: 'dataName',
            valueKey: 'data',
            params: {
              resourceTagCode: 'arriveOrg'
            },
            remote: 'city',
            url: '/order/tb_req_orderService/dc/list'
          },
          on: {
            input (val, option) {
              vm.changeArrivalOrg(val, option)
            }
          }
        },
        {
          label: '到货时间',
          type: 'date-picker',
          validate: {
            required: true,
            msg: '该字段为必填字段'
          },
          props: {
            format: 'yyyy-MM-dd',
            'value-format': 'yyyy-MM-dd'
          },
          key: 'arrivalTime'
        }
      ],
      btnConfig: [
        {
          text: '确认',
          type: 'primary'
        },
        {
          text: '取消',
          type: 'danger',
          validate: false,
          onClick: () => {
            this.beforeClose()
          }
        }
      ],
      orderData: {}
    }
  },
  created () {
    console.log(this.$route)
  },
  methods: {
    submit (data) {
      console.log(data)
      this.filterForm = Object.assign({}, data)
    },
    handleAdd () {
      console.log(this.$refs.erpTable)
      this.dialogFormVisible = true
      // this.$refs.erpTable.$API
      //   .create({ entities: [{ arrivalOrg: '12' }] })
      //   .then(res => {
      //     console.log(res)
      //   })
    },
    changeArrivalOrg (val, option) {
      console.log(option)
      this.orderData = {arrivalOrg: option.dataName}
    },
    // 新增请购单表头信息，跳转编辑明细
    addOrder (data, btnConfig) {
      console.log(data, btnConfig)
      // btnConfig.props.loading = true
      let entity = Object.assign({}, data, this.orderData, {orderCode: 'o' + new Date().getTime(), dataSource: '100', approvalStatus: 10})
      this.$refs.erpTable.$API
        .create({ entities: [entity] })
        .then(res => {
          // btnConfig.props.loading = false
          if (res.resultCode === 0) {
            const id = res.data[0].id
            this.$router.push({name: 'purchaseAdd', query: {id}})
          }
          console.log(res)
        })
    },
    // 关闭弹窗清空表单
    beforeClose () {
      this.$refs.dialogFormRef.reset()
      this.dialogFormVisible = false
      this.orderData = {}
    }
  }
}
</script>

<style>

</style>
