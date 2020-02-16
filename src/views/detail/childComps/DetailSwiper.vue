<template>
    <div >
        <swiper class="detail-swiper">
           <swiper-item v-for="(item, index) in topImagess" :key="index" class="swiper-item">
          <img :src="item"  />
        
          
      </swiper-item>
        </swiper>
    </div>
</template>

<script>
import {Swiper, SwiperItem} from 'components/common/swiper'
export default {
    name:"DetailSwiper",
    props:{
       topImagess:{
           type:Array,
           default(){
               return[]
           }
       }
    },
    components:{
        Swiper,
        SwiperItem

    },
    data () {
        return {
            
        }
    },
    created() {
        
    },
}
</script>

<style  scoped>
.detail-swiper {
  height: 300px;
  overflow: hidden;
}
</style>