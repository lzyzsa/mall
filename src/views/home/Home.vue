 <template>
  <div id="home">
    <nav-bar class="home-nav">
      <div slot="center">购物街</div>
    </nav-bar>

     <tab-control 
     :titles="['流行','新款','精选']" 
     @tabClick="tabClick"
     ref="tabControl1"
     class="tab-control" v-show="isTabFixed">
     </tab-control>
    <!-- ref 可以拿到组键里的对象  :probe-type="3"是否监听实时位置传参  pull-upload是否上拉加载-->
    <scroll class="content" 
    ref="scroll" 
    :probe-type="3" 
    @scroll="contentScroll"
    :pull-up-load="true"
    @pullingUp="loadmore">

     <home-swiper :banners="banners" @swiperimagelaod="swiperimagelaod"></home-swiper>
     <recommend-view :recommends="recommends"></recommend-view>
     <feature-view></feature-view>
     <tab-control 
     :titles="['流行','新款','精选']" 
     @tabClick="tabClick"
     ref="tabControl2"
    ></tab-control>
     <good-list :goods="showGoods"></good-list>
    
    </scroll>
   <!-- @click.native监听组件 -->
      <back-top  class="back-top" @click.native="backtop" v-show="ishowbacktop">
      <img src="~assets/img/common/top.png" alt="">
    </back-top>
   
  </div>
</template>

<script>
import HomeSwiper from './childComps/homeSwiper';
import RecommendView from './childComps/RecommendView'
import FeatureView from './childComps/FeatureView'

import NavBar from 'components/common/navbar/NavBar'
import TabControl from 'components/content/tabControl/TabControl';
import GoodList from 'components/content/goods/GoodsList';
import Scroll from 'components/common/scrool/Scroll'
import BackTop from 'components/content/backTop/BackTop'

import  {getHomeMultidata,getHomeGoods} from 'network/home'
import {itemListenerMixin} from 'common/mixin';

export default {
  components:{
     NavBar,
     HomeSwiper,
     RecommendView,
     FeatureView,
     TabControl,
     GoodList,
     Scroll,
     BackTop
  },
  data() {
    return {
      banners:[],
      recommends: [],
      goods:{
        'pop':{page: 0, list:[]},
        'new':{page: 0, list:[]},
        'sell':{page: 0, list:[]},
      },
      currentType: 'pop',
      ishowbacktop: false,
      taboffsettop: 0,
      isTabFixed:false,
      saveY: 0,
    }
  },
   mixins:[itemListenerMixin],
   computed:{ 
    showGoods(){
      return this.goods[this.currentType].list;
    }
  },
  created () {
    //1.请求多个数据
    this.getHomeMultidata();
     //2.请求商品数据
    this.getHomeGoods('pop');
    this.getHomeGoods('new');
    this.getHomeGoods('sell');

  },
  mounted() {
 //监听图片加载完成事件
    // const refresh = debounce(this.$refs.scroll.refresh, 50)
    // this.$bus.$on('itemImageLoad',()=>{
    //   //  console.log('图片加载完成');
    //    //调用refresh
    //    this.$refs.scroll.refresh()
    // })

    //获取tabControl的offsetTop值
    //所有组件都有一个属性 $el 用于获取组件内的元素
    
  },
   activated(){
    this.$refs.scroll.refresh()
    this.$refs.scroll.scrollTo( 0, this.saveY, 0)
   
    // console.log(this.saveY);
  },
  
  deactivated () {
    this.saveY = this.$refs.scroll.getScrollY()
    // console.log(this.saveY);
    //取消监听
    this.$bus.$off('itemImgLoad', this.itemImgListener)
    
  },
 

  methods: {
    //流行 切换
    tabClick(index){
        // console.log(index);
      //    switch(index){
      //   case 0:
      //     this.currentType = 'pop';
      //     break;
      //   case 1:
      //     this.currentType = 'new';
      //     break;
      //   case 2:
      //     this.currentType = 'sell';
      //     break;
      // }
        if (index==0) {
             this.currentType ='pop'
               }
          else if (index==1){
             this.currentType ='new'
          }
          else if (index==2) {
           this.currentType ='sell'
          }
          this.$refs.tabControl1.currentIndex = index
          this.$refs.tabControl2.currentIndex = index
    },

    //回到顶部事件
    backtop(){
    this.$refs.scroll.scrollTo(0,0,900)
    },

    //监听位置消失图标
    contentScroll(posiyion){
    //回到顶部
     this.ishowbacktop = (-posiyion.y) > 700
     //吸顶效果
     this.isTabFixed = (-posiyion.y) > this.taboffsettop  

    },

     //切换不同种类数据进行上拉加载
    loadmore(){
        //判断给谁加载
        this.getHomeGoods(this.currentType)
    },

    swiperimagelaod(){
      // 获取滚动距离
      this.taboffsettop = this.$refs.tabControl2.$el.offsetTop
    // console.log(this.taboffsettop);

    },
        
    //1.请求多个数据
    getHomeMultidata(){
      getHomeMultidata().then(
      res =>{
        this.banners = res.data.banner.list
        this.recommends = res.data.recommend.list
      }
    )

    },
     //2.请求商品数据
    getHomeGoods(type){
       const page = this.goods[type].page + 1;
       getHomeGoods(type, page).then(res =>{
        // console.log(res);
        this.goods[type].list.push(...res.data.list);
        this.goods[type].page += 1;

        //上拉多次加载 默认一次
        this.$refs.scroll.finishPullup()
        
      })

    }
  },

 
 
  
}



</script>

<style  scoped>
#home {
  /* padding-top: 44px; */
  height: 100vh;
  position: relative;
}
.home-nav {
  background-color: var(--color-tint);
  color: #fff;
  /* position: fixed;
  left: 0;
  right: 0;
  top: 0;
  z-index: 9; */
}
.tab-control {
  position: relative;
  z-index: 9;
}
.content{
    overflow: hidden;
    position: absolute;
    top: 44px;
    bottom: 49px;
    left: 0;
    right: 0;
}
/* 粘性定位 */
/* .tabcontrol {
  position: sticky;
  top: 44px;
} */
.tab-control{
  position: relative;
  z-index: 9

}


.back-top {
    position: fixed;
    right: 10px;
    bottom: 60px;
  }
</style> 