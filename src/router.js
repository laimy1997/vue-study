// 导入路由依赖包
import VueRouter from 'vue-router'
import Vue from 'vue'

// 安装路由模块
Vue.use(VueRouter)

// 导入对应的模板
import Home from './components/tabbar/home.vue'
import Member from './components/tabbar/member.vue'
import Cart from './components/tabbar/cart.vue'
import Search from './components/tabbar/search.vue'
import NewList from './components/news/newslist.vue'
import NewsMore from './components/news/newsmore.vue'
import imgList from './components/piclist/piclist.vue'
import imgInfo from './components/piclist/picInfo.vue'
import productList from './components/productlist/productlist.vue'
import productInfo from './components/productlist/productInfo.vue'
import productDesc from './components/productlist/productdesc.vue'
import productComment from './components/productlist/productcomment.vue'
// 创建路由对象,并将路由对象导出
export default new VueRouter({
  // 配置路由规则
  routes: [
    { path: '/home', component: Home },
    { path: '/member', component: Member },
    { path: '/cart', component: Cart },
    { path: '/search', component: Search },
    // 重定向
    { path: '/', redirect: '/home' },
    // 新闻列表
    { path: '/home/newslist', component: NewList },
    { path:'/home/newslist/newsmore/:id',component:NewsMore},
    // 图片列表
    { path:'/home/piclist',component:imgList},
    { path:'/home/piclist/picInfo/:id',component:imgInfo},
    //商品列表
    { path:'/home/productlist',component:productList},
    { path:'/home/productInfo/:id',component:productInfo},
    { path:'/home/productdesc/:id',component:productDesc},
    { path:'/home/productcomment/:id',component:productComment}
  ],
  // 高亮显示
  linkActiveClass: 'mui-active'
})