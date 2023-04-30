<script setup lang="ts">
import PageHeader from './components/PageHeader.vue';
import PageContent from './components/PageContent.vue';
import PageDetails from './components/PageDetails.vue';
import { ref } from 'vue';

const component = ref('PageContent')

const components: any = {
  PageContent,
  PageDetails
}
</script>

<template>
  <header>
    <PageHeader />
  </header>

  <main>
    <component :is="components[component]" @change="(e: string) => component = e" />
  </main>
</template>

<style scoped>
</style>