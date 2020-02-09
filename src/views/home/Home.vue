 <template>
  <div id="home">
    <nav-bar class="home-nav">
      <div slot="center">购物街</div>
    </nav-bar>
    <home-swiper :banners="banners"></home-swiper>
    <recommend-view :recommends="recommends"></recommend-view>
    <feature-view></feature-view>
    <tab-control :titles="['流行','新款','精选']" class="tabcontrol" @tabClick="tabClick"></tab-control>
    <good-list :goods="showGoods"></good-list>
  </div>
</template>

<script>
import HomeSwiper from './childComps/homeSwiper';
import RecommendView from './childComps/RecommendView'
import FeatureView from './childComps/FeatureView'

import NavBar from 'components/common/navbar/NavBar'
import TabControl from 'components/content/tabControl/TabControl';
import GoodList from 'components/content/goods/GoodsList';

import  {getHomeMultidata,getHomeGoods} from 'network/home'

export default {
  components:{
     NavBar,
     HomeSwiper,
     RecommendView,
     FeatureView,
     TabControl,
     GoodList
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
      currentType:'pop'
    }
  },
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
console.log(this.goods.pop.list);

  },

  methods: {

    tabClick(index){
        console.log(index);
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
        
      })

    }

   

    
  },

 
 
  
}



</script>

<style  scoped>
#home {
  padding-top: 44px;
  /* height: 100vh; */
  /* position: relative; */
}
.home-nav {
  background-color: var(--color-tint);
  color: #fff;
  position: fixed;
  left: 0;
  right: 0;
  top: 0;
  z-index: 9;
}
.tab-control {
  position: relative;
  z-index: 9;
}
/* .content{
    overflow: hidden;
    position: absolute;
    top: 44px;
    bottom: 49px;
    left: 0;
    right: 0;
} */
.tabcontrol {
  position: sticky;
  top: 44px;
}
</style> 