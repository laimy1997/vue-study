## 1.制作首页APP组件

#### 1.顶部，使用的是 Mint-UI 中的 Header 组件 

```
<mt-header fixed title="shop" id="title">  
    <mt-button icon="back" slot="left" @click="goto" v-show="this.$route.path!=='/home'">		返回
    </mt-button>
</mt-header>
```

注意要提高header的层级

#### 2.底部，使用的是 MUI 的Table.html

1.例子的图标和所需要的图标不同，需要导入扩展图标的 css 样式，拷贝到项目中，使用对应的图标

```
import  './lib/mui/css/icons-extra.css'
```

2.改造 tabbar 为 router-link，点击 tabbar 中的路由链接，展示对应的路由组件
3.设置路由高亮

```
linkActiveClass: 'mui-active'
```

#### 3.中间内容，放置router-view，将路由在主模板上渲染

```
<transition name="my" mode="out-in">  
	<router-view></router-view>
</transition>
```





## 2.Home页面

#### 1.轮播图

使用的是mint ui的轮播图组件，并通过axios获取数据，在使用使用v-for 循环渲染 每个 item 项目

```
<mt-swipe :auto="4000">  
    <mt-swipe-item v-for="(item ,i) in banner" :key="item.id">    
        <img :src="item.img" alt="">  
    </mt-swipe-item>
</mt-swipe>
```

#### 2.导航

使用mui的9宫格组件进行布局，导入相应的图片，添加 router-link，点击其中的路由链接，展示对应的路由组件，完成home页面导航的制作



## 3.新闻咨询板块的制作

#### 1.新闻列表页面

1.使用mui中的mui-table-view组件进行静态布局
2.使用axios获取数据并渲染真实数据

```
<ul class="mui-table-view">    
	<li class="mui-table-view-cell mui-media" v-for="(item,i) in newslist":key="item.id"> 
        <router-link :to="'/home/newslist/newsmore/'+item.id">            
            <img class="mui-media-object mui-pull-left" :src="item.img_url">            
            <div class="mui-media-body">                
                <h3>{{item.title}}</h3>                
                <p class="mui-ellipsis">                    
                    <span>发表时间:{{item.add_time | dataFormat('YYYY-MM-D')}}</span>                        	<span>点击次数:{{item.click}}</span>                 
                </p>            
            </div>        
        </router-link>    
	</li>
</ul>
```

3.实现新闻列表点击跳转到新闻详情，把列表中的每一项改造为 router-link，同时，在跳转的时候应该提供唯一的id,并在route.js中添加id

```
<router-link :to="'/home/newslist/newsmore/'+item.id"></router-link>
```

```
{ path:'/home/newslist/newsmore/:id',component:NewsMore}
```

#### 2.新闻详情页面

1.创建新闻详情的组件页面 NewsMore.vue，在路由模块中，将新闻详情的路由地址和组件页面对应起来
2.获取对应的id，实现新闻详情的页面布局和数据渲染

```
id:this.$route.params.id
```

#### 3.单独封装一个 comment.vue 评论子组件

1.先创建一个单独的 comment.vue 组件模板，在需要使用comment 组件的页面中 ，先手动导入 comment 组件，注册为自己的子组件

```
import comment from './comment.vue'
```

在父组件中，使用 comments 属性，将刚才导入 comment 组件 ，注册为自己的子组件，将注册子组件时候的，注册名称，以标签形式，在页面中引用即可

```
<comment :id="id"></comment>
```

2.实现点击加载更多功能，给加载更多按钮，绑定点击事件，点击加载更多 ，让 pageIndex++，然后重新调用 this.getComments() 方法，获取最新一页的数据

```
getMore(){   
	this.pageindex++;   this.getComments();
}
```

```
<mt-button type='danger' size="large" plain @click="getMore">加载更多</mt-button>
```

3.实现发表评论功能，为发表评论绑定一个事件，进行非空校验，给文本框做双向数据绑定，通过axios发送一个请求，把评论内容提交给服务器，当评论成功后，重新调用getComments()，实现发表评论的功能。

#### 4.时间格式化

使用过滤器将时间格式化

```
import moment from 'moment';
Vue.filter('dataFormat',function(data,pramas){    
	return moment(data).format(pramas);
})
```

```
<span>发表时间:{{item.add_time | dataFormat('YYYY-MM-D')}}</span>    
```



## 4.图片分享板块的制作

#### 1.头部选项卡的区域滚动

1.使用mui的区域滚动组件和mint ui的头部选项卡组件

```
<div class="mui-scroll-wrapper mui-slider-indicator mui-segmented-control mui-segmented-control-inverted">  
    <div class="mui-scroll">
        <mt-navbar v-model="active">      
            <mt-tab-item v-for="item in categorys" :key="item.id" :id="item.id">						{{item.title}}
            </mt-tab-item>    
        </mt-navbar>  
    </div>
</div>
```

2.初始化区域滚动

```
mui(".mui-scroll-wrapper").scroll({  
	deceleration: 0.0005 //flick 减速系数，系数越大，滚动速度越慢，滚动距离越小，默认值0.0006
});
```

3.移除严格模式（网址）

[babel-plugin-transform-remove-strict-mode](https://github.com/genify/babel-plugin-transform-remove-strict-mode)

4.兼容问题，和 App.vue 中的 `router-link` 身上的类名 `mui-tab-item` 存在兼容性问题，导致tab栏失效，可以把`mui-tab-item`改名为`mui-tab-item1`，并复制相关的类样式，来解决这个问题。

#### 2.渲染选显卡的图片

1.完成静态的图片，摘要和标题的静态布局

2.通过axios获取数据，从后台接口中返回的分类数据，不包含“全部”分类，需要前端程序员向 message 数组中，使用 unshift 方法手动添加对象： { title:”全部”, id:0 }

```
getCategory() {  
	this.$axios.get("/api/getimgcategory").then(res => {      
		if (res.data.status === 0) {      
            this.categorys = res.data.message;      
            this.categorys.unshift({id:0,title:'全部'});
		}  
	});
}
```

#### 3.懒加载

```
<img v-lazy="data.img_url" :alt="data.title"/>
```

#### 4.图文详情

1.给图片传id，通过id渲染对应的页面

```
{ path:'/home/piclist/picInfo/:id',component:imgInfo}
```

2.图片预览功能，[vue-preview](https://github.com/LS1231/vue-preview)，一个Vue集成PhotoSwipe图片预览插件



## 5.商品购买板块的制作

#### 1.商品列表

1.先完成静态页面，在通过axios获取数据，进行渲染

2.加载更多，和评论的加载更多类似

```
getmore() {  
    this.pageindex++;  
    this.getPeoducts();
}
```

#### 2.商品详情

1.使用mui的类似组件进行布局，并通过对应的id请求相应的数据

#### 3.图文介绍

1.使用mui的类似组件进行布局，并通过对应的id请求相应的数据

#### 4.商品评论

1.调用之前封装的comment.vue，手动导入 comment 组件，注册为自己的子组件