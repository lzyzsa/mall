<template>
  <div>
    <swiper v-if="banners.length">
      <swiper-item v-for="(item, index) in banners" :key="index">
        <a :href="item.link">
          <img :src="item.image" alt @load="imgload"/>
        </a>
      </swiper-item>
    </swiper>
  </div>
</template>
<script>
import { Swiper, SwiperItem } from "components/common/swiper";
export default {
  data() {
    return {
      isLoad: false,
    }
  },
  props: {
    banners: {
      type: Array,
      default() {
        return [];
      }
    }
  },
  components: {
    Swiper,
    SwiperItem
  },
  methods: {
    imgload(){
      if (!this.isLoad) {
         this.$emit('swiperimagelaod')
         this.isLoad = true
      }
     
    }
  },
};
</script>

<style  scoped>
</style>