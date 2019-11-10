<template>
  <div>
    <!-- 商品图文介绍 -->
    <div class="mui-content-padded">
      <div class="mui-media-body">
        <h3>{{productDesc.title}}</h3>
      </div>
      <p v-html="productDesc.content"></p>
    </div>
  </div>
</template>

<script>
export default {
  name: "productdesc",
  data() {
      return {
          id:this.$route.params.id,
          productDesc:{}
      }
  },
  created() {
    this.getDesc();
  },
  methods: {
    getDesc() {
      this.$axios.get(`/api/goods/getdesc/${this.id}`).then(res => {
        // console.log(res);
        if(res.data.status===0){
            this.productDesc=res.data.message[0];
        }
      });
    }
  }
};
</script>

<style lang="less" scoped>
.mui-media-body{
    padding:10px 0;
    h3{
        color:#09c;
        font-size: 18px;
    }
    
}
.mui-content-padded{
    p{
        font-size:16px;
    }
    .gomeImgLoad{
        display:block;
        width:100%;
    }
}

</style>