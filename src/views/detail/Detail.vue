<template>
  <div id="detail">
    <detail-navbar class="detail-nav" @titleClick="titleClick" ref="nav"></detail-navbar>
    <scroll class="content" ref="scroll" :probe-type="3"
            @scroll="contentScroll">
      <detail-swiper :top-imagess="topImages"></detail-swiper>
      <detail-base-info :goods="goods"></detail-base-info>
      <detail-shop-info :shop="shop"></detail-shop-info>
      <detail-goods-info :detailInfo="detailInfo" @detailImageLoad="detailImageLoad"></detail-goods-info>
      <detail-param-info ref="param" :paramInfo="paramInfo"></detail-param-info>
      <detail-comment-info ref="comment" :commentInfo="commentInfo"></detail-comment-info>
      <goods-list ref="recommend" :goods="recommends"></goods-list>
    </scroll>
    <!-- @addToCart="addToCart" -->
     <detail-bottom-bar @addToCart="addToCart"></detail-bottom-bar>
     <back-top  class="back-top" @click.native="backtop" v-show="ishowbacktop">
      <img src="~assets/img/common/top.png" alt="">
    </back-top>
   
  </div>
</template>

<script>
import DetailNavbar from "./childComps/DetailNavbar";
import DetailSwiper from "./childComps/DetailSwiper";
import DetailBaseInfo from "./childComps/DetailBaseInfo";
import DetailShopInfo from "./childComps/DetailShopInfo";
import DetailGoodsInfo from "./childComps/DetailGoodsInfo";
import DetailParamInfo from "./childComps/DetailParamInfo";
import DetailCommentInfo from "./childComps/DetailCommentInfo";
import DetailBottomBar from './childComps/DetailBottomBar';
import BackTop from 'components/content/backTop/BackTop'

import Scroll from "components/common/scrool/Scroll";
import GoodsList from "components/content/goods/GoodsList";

import { getDetail, getRecommend,Goods,GoodsParam,Shop} from "network/detail";
import { debounce } from "common/utils";

import {itemListenerMixin} from "common/mixin";
import {BACK_POSITION} from "common/const";

export default {
  name: "Detail",
  components: {
    DetailNavbar,
    DetailSwiper,
    DetailBaseInfo,
    DetailShopInfo,
    Scroll,
    DetailGoodsInfo,
    DetailParamInfo,
    DetailCommentInfo,
    GoodsList,
    DetailBottomBar,
    BackTop
  },
  data() {
    return {
      iid: "",
      topImages: [], //顶部轮播图
      goods: {},
      shop: {},
      detailInfo: {},
      paramInfo: {},
      commentInfo: {},
      recommends: [],
      themeTopYs: [0, 1000, 2000, 3000],
      getThemeTopY: null,
      currentIndex: 0,
      ishowbacktop: false,

    };
  },
  //混入函数
  mixins: [itemListenerMixin],
  created() {
    this.iid = this.$route.params.iid;
    //获取商品详情 
    getDetail(this.iid).then(res => {
      const data = res.result;
      //赋值轮播信息
      this.topImages = data.itemInfo.topImages;

      //获取商品信息
      this.goods = new Goods(
        data.itemInfo,
        data.columns,
        data.shopInfo.services
      );

      //获取店铺信息
      this.shop = new Shop(data.shopInfo);
      //console.log(this.shop);

      //获取商品详细信息
      this.detailInfo = data.detailInfo;
      //console.log(this.detailInfo);

      //获取店铺商品信息
      this.paramInfo = new GoodsParam(
        data.itemParams.info,
        data.itemParams.rule
      );

      //获取评论信息
      if (data.rate.cRate !== 0) {
        this.commentInfo = data.rate.list[0];
      }
    }),
      //获取推荐信息
      getRecommend().then(res => {
        //  console.log(res);
        this.recommends = res.data.list;
      });

       //给getThemeTopY 赋值
        this.getThemeTopY = debounce(() => {
        this.themeTopYs = [];
        this.themeTopYs.push(0);
        this.themeTopYs.push(this.$refs.param.$el.offsetTop)
        this.themeTopYs.push(this.$refs.comment.$el.offsetTop)
        this.themeTopYs.push(this.$refs.recommend.$el.offsetTop)
        //添加一个最大值
        this.themeTopYs.push(Number.MAX_SAFE_INTEGER);

       
        // console.log(this.themeTopYs);
      }, 100)
    
    
    
  },
  mounted() {
    
  },
  updated() {
    //  this.themeTopYs = [];
    //   this.themeTopYs.push(0);
    //   this.themeTopYs.push(this.$refs.param.$el.offsetTop);
    //   this.themeTopYs.push(this.$refs.comment.$el.offsetTop);
    //   this.themeTopYs.push(this.$refs.recommend.$el.offsetTop);
     
    //   console.log(this.themeTopYs);
  },
  //销毁函数取消监听
  destoyed() {
    this.$bus.$off("itemImgLoad", this.itemImgListener);
  },
  methods: {
    //检测图片加载完成
    detailImageLoad() {
      this.$refs.scroll.refresh();
    //调用节流函数
      this.getThemeTopY();
    },
    //点击图标跳转相应内容
    titleClick(index) {
      this.$refs.scroll.scrollTo(0, -this.themeTopYs[index], 200);
    },
     backtop(){
    this.$refs.scroll.scrollTo(0,0,900)
    },

    //滚动内容跳转对应图标
    contentScroll(position){
      //1.获取y值
      const positionY = -position.y;
      let length = this.themeTopYs.length;
      for(let i = 0; i < length - 1; i++){
        if(this.currentIndex !== i && (positionY >= this.themeTopYs[i] && positionY < this.themeTopYs[i + 1])){
          this.currentIndex = i;
          this.$refs.nav.currentIndex = this.currentIndex;
        }
      }
     this.ishowbacktop = (-position.y) > 700

    },
    //添加购物车
    addToCart(){
       //1.获取购物车所需要的信息
      const product = {};
      product.image = this.topImages[0];
      product.title = this.goods.title;
      product.desc = this.goods.desc;
      product.price = this.goods.realPrice;
      product.iid = this.iid;
      this.$store.dispatch('addCart',product).then((res)=>{
       this.$toast.show(res, 2000);
        
      })
       
    }
  }
};
</script>

<style  scoped>
#detail {
  height: 100vh;
  position: relative;
  z-index: 9;
  background-color: #fff;
}

.content {
  position: absolute;
  top: 44px;
  bottom: 60px;
}
.detail-nav {
  position: relative;
  z-index: 9;
  background: #fff;
}

.back-top {
  position: fixed;
  right: 10px;
  bottom: 65px;
}
</style>