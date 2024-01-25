<template>
  <div class="page-heading">
    <h5>{{ title }}</h5>
    <BreadcrumbComponent />
  </div>
</template>

<script lang="ts" setup>
defineProps({
  title: String,
});
</script>