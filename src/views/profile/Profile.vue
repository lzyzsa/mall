<template>
  <div id="profile">
  我的
  </div>

</template>

<script>


export default {
  name: 'Profile',
  data() { 
    return {
       
    }
  },
 
  
 }
</script>

<style scoped>
#profile{
  /* padding-top: 44px; */
  height: 100vh;
  position: relative;
  background-color: #f2f2f2;
}
.profile-nav{
  background-color: var(--color-tint);
  color: #fff;
/* 
  position: fixed;
  left: 0;
  right: 0;
  top: 0;
  z-index: 9; */
}
  .account {
    display: flex;
  }

  .account-item {
    width: 100%;
    background-color: #fff;
    margin-right: 1px;
    text-align: center;
  }

  .account-item:last-of-type {
    margin-right: 0;
  }

  .account-item {
    color: #666;
    font-size: 13px;
    padding: 18px;
  }

  .account-item .balance {
    font-size: 24px;
    font-weight: 700;
    color: #ff5f3e;
  }

  .account-info {
    margin-top: 6px;
  }

  .order-list, .service-list {
    margin-top: 12px ;
    
  }
  .order-list, .more-list {
    margin-top: 12px;
  }

</style>