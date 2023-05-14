<script setup lang="ts">
import { MagnifyingGlassIcon } from '@heroicons/vue/24/outline'
import { onMounted, watch } from 'vue'
import { 
    fetchData, 
    searchData, 
    filterRegion, 
    searchTerm,
    region,
    fullName,
    live,
    loading,
    localData,
    Data 
} from '@/store/store'

const emit = defineEmits<{
    (event: 'change', value: string): void
}>()

watch(searchTerm, async () => {
    try{
        Data.value = await searchData()
        setTimeout(() => {
            loading.value = false
        }, 4000);
    }
    catch(e) {
        console.log(e)
    }
})

watch(region, async () => {
    try {
        Data.value = await filterRegion()
        setTimeout(() => {
            loading.value = false
        }, 4000);
    }
    catch(e) {
        console.log(e)
    }
})

onMounted(async () => {
    try {
        Data.value = await fetchData()
        setTimeout(() => {
            loading.value = false
        }, 4000);
    }
    catch(e) {
        live.value = false
        console.log(e)
    }
    finally {
        loading.value = false
    }
})
</script>

<template>
    <div class="w-full h-full bg-light-background dark:bg-dark-background dark:text-dark-text p-14 pt-5">
        <div class="flex flex-col md:flex-row w-full justify-between">
            <form action="" class="my-5 bg-light-elements dark:bg-dark-elements flex items-center shadow-md rounded-lg border-none p-0 max-w-lg">.
                <i class="pl-7"><MagnifyingGlassIcon class="w-7 text-light-input dark:text-dark-text" /></i>
                <input type="search" placeholder="Search for a country..." v-model="searchTerm" class="p-5 m-0 w-full bg-transparent placeholder:text-light-input dark:placeholder:text-dark-text" style="background-image: transparent url();">
            </form>
            <select name="Filter" v-model="region" class="shadow-md rounded-lg border-none py-5 px-5 my-5 outline-none cursor-pointer bg-light-elements dark:bg-dark-elements">
                <option value="" disabled selected>Filter by Region</option>
                <option value="Africa">Africa</option>
                <option value="America">America</option>
                <option value="Asia">Asia</option>
                <option value="Europe">Europe</option>
                <option value="Oceania">Oceania</option>
            </select>
        </div>
        <div v-if="loading" class="h-[70vh] flex">
            <p class="m-auto">Loading...</p>
        </div>
        <div class="grid grid-cols-1 gap-20 mt-10 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
            <div v-for="local in Data.value" :key="local['flag']" class="bg-light-elements dark:bg-dark-elements flex flex-col m-auto shadow-md rounded-lg border-none max-w-xs cursor-pointer" @click="() => { emit('change', 'PageDetails'), fullName = local['name']['common'] }">
                <img :src="local['flags']['png']" :alt="local['flags']['alt']" class="rounded-t-lg">
                <div class="p-10 pl-7 font-bold">
                    <h3 class="text-2xl mb-4">{{ local['name']['common'] }}</h3>
                    <h5 class="mb-1">Population: <span class="font-normal">{{ (local['population'] as any).toLocaleString() }}</span></h5>
                    <h5 class="mb-1">Region: <span class="font-normal">{{ local['region'] }}</span></h5>
                    <h5 class="mb-2">Capital: <span v-for="capital in local['capital']" :key="capital" class="font-normal">{{ capital }}</span></h5>
                </div>
            </div>
        </div>
        <div v-if="!live" class="grid grid-cols-1 gap-20 mt-10 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
            <div v-for="local in localData.value" :key="local.alpha2Code" class="bg-light-elements dark:bg-dark-elements flex flex-col w-80 m-auto shadow-md rounded-lg border-none max-w-xs cursor-pointer" @click="() => { emit('change', 'PageDetails'), fullName = local.name}">
                <img :src="local.flags.png" alt="" class="rounded-t-lg">
                <div class="p-10 pl-7 font-bold">
                    <h3 class="text-2xl mb-4">{{ local.name }}</h3>
                    <h5 class="mb-1">Population: <span class="font-normal">{{ local.population.toLocaleString() }}</span></h5>
                    <h5 class="mb-1">Region: <span class="font-normal">{{ local.region }}</span></h5>
                    <h5 class="mb-2">Capital: <span class="font-normal">{{ local.capital }}</span></h5>
                </div>
            </div>
        </div>
    </div>
</template>