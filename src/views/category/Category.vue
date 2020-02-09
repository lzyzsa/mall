<template>
  <div class="category">
   分类
  </div>
</template>

<script>
export default {
  name: 'Category',
  data() { 
    return {
    }
  },
 
 
}
</script>

<style scoped>
.category{
  height: 100vh;
}
 .nav-bar {
    background-color: var(--color-tint);
    font-weight: 700;
    color: #fff;

    
  }
.message-pass{
  white-space: nowrap;
  width: 375px;
}
.content{
    overflow: hidden;
    position: absolute;
    top: 44px;
    bottom: 49px;
    left: 0;
    right: 0;

    display: flex;
}
.tab-content{
  height: 100%;
  flex: 1;
}
</style>