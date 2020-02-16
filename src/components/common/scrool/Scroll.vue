<template>
    <div ref="wrapper">
        <div class="content">
           <slot></slot>
        </div>
        
    </div>
</template>
<script>
import BScroll from "better-scroll"
export default {
    name:"Scroll",
    props: {
        //是否监听滚动距离
        probeType: {
         type:Number,
         default: 0
        },
        //是否上拉加载
        pullUpLoad:{
         type: Boolean,
         default:false,
        }
    },
    data() {
        return {
            scroll:null
        }
    },
    mounted() {
        //创建BScroll对象
        this.scroll = new BScroll(this.$refs.wrapper,{
        // 点击事件有效
        click: true,
        //监听距离是否有效
        probeType: this.probeType,
        //上拉加载是否有效
        pullUpLoad: this.pullUpLoad,
        // 
        })
        
        
        //监听滚动的位置函数
        if (this.probeType === 2 || this.probeType === 3) {
             this.scroll.on('scroll',(position)=>{
            // console.log(position);
            this.$emit('scroll',position)
           } )
        }
        

        //监听scroll滚动到底部上拉加载
       if (this.pullUpLoad) {
           this.scroll.on('pullingUp',() =>{
            // console.log('到底部上拉加载');
              this.$emit('pullingUp')
            
        })
       }


        //监听上拉加载事件函数
        

    },
    methods: {
        //回到顶部的方法
        scrollTo(x, y, time=400){
        // 内部回到顶部回调函数

         this.scroll && this.scroll.scrollTo(x, y, time);
         
         
        },

        //取消默认加载一次方法
        finishPullup(){
        this.scroll.finishPullUp()
        },

        //解决滚动bug重新计算距离
        refresh(){
           this.scroll && this.scroll.refresh();
        },
        //记录点击home位置
        getScrollY(){
             return this.scroll ? this.scroll.y : 0;
        }
    },
}
</script>

<style scoped>

</style>