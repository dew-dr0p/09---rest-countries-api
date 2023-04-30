<script setup lang="ts">
import { MagnifyingGlassIcon } from '@heroicons/vue/24/outline'
import axios from 'axios'
import { onMounted, reactive, ref, watch } from 'vue'
import data from '../data.json'

const localData =  reactive({
    value: data
})

const Data = reactive({
    value: []
})

const searchTerm = ref('')

const region = ref('')

const live = ref(true)

const loading = ref(true)

const fetchData = async () => {
    const response = ref([])
    try {
        await axios
        .get('https://restcountries.com/v3.1/all')
        .then((res) => {
            response.value =  res.data
        })
        return response.value
    }
    finally {
        ''
    }
}

// const fetchData = () => {
//     const response = ref([])
//     axios
//     .get('https://restcountries.com/v3.1/all')
//     .then((res) => {
//         response.value =  res.data
//         console.log(response.value)
//     })
//     return response.value
// }

const searchData = async () => {
    const response = ref([])
    try {
        await axios
        .get(`https://restcountries.com/v3.1/name/${searchTerm.value}`)
        .then((res) => {
            response.value = res.data
            console.log(response.value)
        })
        return response.value
    }
    finally {
        ''
    }
}

const filterRegion = async () => {
    const response = ref([])
    try {
        await axios
        .get(`https://restcountries.com/v3.1/region/${region.value}`)
        .then((res) => {
            response.value = res.data
            console.log(response.value)
        })
        return response.value
    }
    finally {
        ''
    }
}

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
    <div class="w-full h-full bg-light-background p-10">
        <div class="flex w-full justify-between">
            <form action="" class="my-5 bg-light-elements flex items-center shadow-md rounded-lg border-none p-0 max-w-lg">.
                <i class="pl-7"><MagnifyingGlassIcon class="w-7 text-light-input" /></i>
                <input type="search" placeholder="Search for a country..." v-model="searchTerm" class="p-5 m-0 w-full bg-transparent placeholder:text-light-input" style="background-image: transparent url();">
            </form>
            <select name="Filter" v-model="region" class="shadow-md rounded-lg border-none px-5 my-5">
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
            <div v-for="local in Data.value" :key="local['flag']" class="bg-light-elements flex flex-col m-auto shadow-md rounded-lg border-none max-w-xs">
                <img :src="local['flags']['png']" :alt="local['flags']['alt']" class="rounded-t-lg">
                <div class="p-10 pl-7 font-bold">
                    <h3 class="text-2xl mb-4">{{ local['name']['official'] }}</h3>
                    <h5 class="mb-1">Population: <span class="font-normal">{{ (local['population'] as any).toLocaleString() }}</span></h5>
                    <h5 class="mb-1">Region: <span class="font-normal">{{ local['region'] }}</span></h5>
                    <h5 class="mb-2">Capital: <span class="font-normal">{{ local['capital'] }}</span></h5>
                </div>
            </div>
        </div>
        <div v-if="!live" class="grid grid-cols-1 gap-20 mt-10 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
            <div v-for="local in localData.value" :key="local.alpha2Code" class="bg-light-elements flex flex-col w-80 m-auto shadow-md rounded-lg border-none max-w-xs">
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