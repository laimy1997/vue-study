<template>
  <div>
    cart
  </div>
</template>

<script>
export default {
  name:'cart',
  data(){
    return{
      id:[87,88,89],
      cartList:[]
    }
  },
  created(){
    this.getCarts();
  },
  methods: {
    getCarts(){
      this.$axios.get(`/api/goods/getshopcarlist/87,88,89`).then(res=>{
        console.log(res);
      })
    }
  },
}
</script>

<style lang="">
  
</style>