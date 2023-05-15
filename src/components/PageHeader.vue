<script setup lang="ts">
import { MoonIcon } from '@heroicons/vue/24/outline'
import { DarkIcon, changeTheme, component } from '@/store/store';

const LightIcon = MoonIcon

const components: any = {
  LightIcon,
  DarkIcon
}
</script>

<template>
    <div class="grid grid-cols-2 px-5 py-7 md:py-10 shadow-md items-center dark:bg-dark-elements dark:text-dark-text">
        <h3 class="font-bold text-lg md:text-2xl">Where in the world?</h3>
        <p class="justify-self-end flex flex-row items-center text-sm md:text-lg cursor-pointer" @click="changeTheme()">
            <component :is="components[component]" class="w-5 pr-1" /> {{component === 'LightIcon' ? 'Dark' : 'Light'}} Mode</p>
    </div>
</template>