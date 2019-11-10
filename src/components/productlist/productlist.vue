<template>
  <div>
    <ul class="product">
      <router-link :to="'/home/productInfo/'+item.id" class="product_info" v-for="item in productList" :key="item.id">
        <div class="product_pic">
          <a href="#">
            <img :src="item.img_url" alt />
          </a>
        </div>
        <div class="product_name">{{item.title}}</div>
        <div class="product_price">
          <span class="now">{{item.sell_price}}</span>
          <span class="before">{{item.market_price}}</span>
        </div>
        <div class="product_num">
          <span>热卖中</span>
          <span>剩余数量:{{item.stock_quantity}}</span>
        </div>
      </router-link>
    </ul>
    <mt-button type="danger" size="large" @click="getmore">加载更多</mt-button>
  </div>
</template>

<script>
export default {
  name: "productlist",
  data() {
    return {
      pageindex: 1,
        productList: []
    };
  },
  created() {
    this.getPeoducts();
  },
  methods: {
    getPeoducts() {
      this.$axios.get(`/api/getgoods?pageindex=${this.pageindex}`).then(res => {
        console.log(res);
        if (res.data.status === 0) {
          this.productList = this.productList.concat(res.data.message);
        }
      });
    },
    getmore() {
      this.pageindex++;
      this.getPeoducts();
    }
  }
};
</script>

<style lang="less" scoped>
ul {
  padding: 0;
  margin: 0;
  list-style: none;
  overflow: hidden;
  margin-bottom: 20px;
}
.product_info {
  width: 46%;
  float: left;
  margin-left: 3%;
  margin-top: 15px;
  padding: 10px 10px 0 10px;
  box-shadow: 0px 0px 8px 0px #aaa;
  background-color: #fff;
  .product_pic {
    width: 100%;
    min-height: 100%;
    background: #eee;
    img {
      display: block;
      width: 100%;
    }
  }
  .product_name {
    padding: 5px 0;
    font-size: 16px;
    font-weight: 600;
    overflow: hidden;
    white-space: nowrap;
    text-overflow: ellipsis;
  }
  .product_price {
    background: #eee;
    margin: 0 -10px;
    padding: 5px 10px;
    .now {
      color: red;
      font-weight: bolder;
      font-size: 14px;
    }
    .before {
      color: #999;
      text-decoration: line-through;
      font-size: 12px;
    }
  }
  .product_num {
    font-size: 12px;
    display: flex;
    background: #eee;
    margin: 0 -10px;
    padding: 5px 10px;
    color: #333;
    justify-content: space-between;
  }
}
</style>