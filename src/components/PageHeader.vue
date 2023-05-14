<script setup lang="ts">
import { ref } from 'vue';
import { MoonIcon } from '@heroicons/vue/24/outline'
// import { DarkIcon, toggleLightMode, toggleDarkMode } from '@/store/store';
import { DarkIcon, changeTheme } from '@/store/store';

const LightIcon = MoonIcon

const component = ref('LightIcon')

const components: any = {
  LightIcon,
  DarkIcon
}
</script>

<template>
    <div class="grid grid-cols-2 px-5 py-7 md:py-10 shadow-md items-center dark:bg-dark-elements dark:text-dark-text">
        <h3 class="font-bold text-lg md:text-2xl">Where in the world?</h3>
        <p class="justify-self-end flex flex-row items-center text-sm md:text-lg cursor-pointer" @click="changeTheme()">
            <component :is="components[component]" class="w-5 pr-1" /> Dark Mode</p>
    </div>
</template>