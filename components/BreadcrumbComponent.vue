<script lang="ts" setup>
const route = useRoute()
</script>
<template>
  <div class="custom-breadcrumb">
    <!-- <span v-for="(item, index) in route.path.split('/')" :key="index"> -->
    <!-- <NuxtLink :to="route.path.split('/')[index]">{{ item }}</NuxtLink> <i v-if="index !== 0 && index !== route.path.split('/').length"> / </i> </span> -->
    <!-- <p class="small bre">
      <NuxtLink to="/">Главная</NuxtLink> -
      <NuxtLink to="/dashboard">Личный кабинет</NuxtLink> -
      <NuxtLink to="/dashboard/cashes">Кассы</NuxtLink>
    </p> -->
  </div>
</template>

<style lang="scss" scoped>
.custom-breadcrumb {
  a {
    text-decoration: none;
  }
}
</style>