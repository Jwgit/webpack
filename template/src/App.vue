<template>

    <pagoda-layout
      logo=""
      title=""
      :side-menu="sideMenu"
      :top-menu="topMenu"
      :side-menu-props="{
        'background-color': '#001529',
        'text-color': '#fff',
        'active-text-color': '#409eff'
      }"
      :side-menu-default-active="$route.path"
      @tabs-change="handleTabsChange"
      @select-side-menu="handleSelectSideMenu"
      @select-top-menu="handleSelectTopMenu"
    >
    <div slot="header-left" class="logo"><h3>百果园ERP</h3></div>
      <div slot="header-right">大佬</div>
      <router-view/>
    </pagoda-layout>

</template>
<style>
body {
  font-family: "Avenir", Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  color: #2c3e50;
  margin: 0;
  padding: 0;
}
.logo{
  background-color: #002140;
  text-align: center;
  color: #fff;
}
.logo h3 {
  margin: 0;
}
.el-breadcrumb {
  margin-bottom: 20px;
}
</style>
<script>
/* eslint-disable */
export default {
  name: "App",
  data() {
    return {
      sideMenu: [
        {
          icon: "el-icon-tickets",
          label: "请购单管理",
          subMenu: [
            {
              label: "请购单列表",
              url: "purchaseList"
            }
          ]
        }
      ],
      topMenu: [
        {
          label: "处理中心",
          url: "http://localhost:8080/#/layout"
        },
        {
          label: "我的工作台",
          url: "xxx"
        },
        {
          label: "消息中心",
          disabled: true,
          url: "xxx"
        }
      ]
    };
  },

  methods: {
    handleTabsChange(data) {
      console.log(data);
      const {url} = data
      this.$router.push({name: url})
    },
    handleSelectSideMenu(data) {
      console.log(data);

    },
    handleSelectTopMenu(data) {
      console.log(data);
    }
  }
};
/* eslint-disable */
</script>
