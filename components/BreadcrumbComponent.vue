<script lang="ts" setup>
const route = useRoute()
</script>
<template>
  <div class="custom-breadcrumb">
    {{ route.path }}
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