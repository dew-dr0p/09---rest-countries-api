<script setup lang="ts">
import { MagnifyingGlassIcon } from '@heroicons/vue/24/outline'
import axios from 'axios'
import { ReactiveEffect, onMounted, reactive, ref } from 'vue';
import data from '../data.json'

const localData =  reactive({
    value: data
})

const Data = reactive({
    value: []
})

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
//     const response = ref({})
//     axios
//     .get('https://restcountries.com/v3.1/all')
//     .then((res) => {
//         response.value =  res.data
//     })
//     return response.value
// }

onMounted(async () => {
    try {
        Data.value = await fetchData()
    }
    catch(e) {
        live.value = false
        console.log(e)
    }
    finally {
        loading.value = false
    }
    console.log(Data.value[1])
    console.log(Data.value[0].flags.png)
    console.log(Data.value[0].name.official)
    console.log(Data.value[0].capital[0])
})

// const liveFetch = async () => {
//     const liveData = reactive({
//         value: await fetchData()
//     })
//     console.log(liveData.value)
//     return liveData.value
// }

// Data.value = liveFetch()

// console.log(Data.value)

</script>

<template>
    <div class="w-full h-full bg-light-background p-10">
        <form action="" class="m-5 bg-light-elements flex items-center shadow-md rounded-lg border-none p-0 max-w-lg">.
            <i class="pl-7"><MagnifyingGlassIcon class="w-7 text-light-input" /></i>
            <input type="search" placeholder="Search for a country..." class="p-5 m-0 w-full bg-transparent placeholder:text-light-input" style="background-image: transparent url();">
        </form>
        <div v-if="loading" class="h-[75vh] flex">
            <p class="m-auto">Loading...</p>
        </div>
        <div class="grid grid-cols-1 gap-20 mt-10 md:grid-cols-2 xl:grid-cols-3">
            <div v-for="local in Data.value" :key="local.flag" class="bg-light-elements flex flex-col w-80 m-auto shadow-md rounded-lg border-none max-w-xs">
                <img :src="local.flags.png" :alt="local.flags.alt" class="rounded-t-lg">
                <div class="p-10 pl-7 font-bold">
                    <h3 class="text-2xl mb-4">{{ local.name.official }}</h3>
                    <h5 class="mb-1">Population: <span class="font-normal">{{ local.population.toLocaleString() }}</span></h5>
                    <h5 class="mb-1">Region: <span class="font-normal">{{ local.region }}</span></h5>
                    <h5 class="mb-2">Capital: <span class="font-normal">{{ local.capital }}</span></h5>
                </div>
            </div>
        </div>
        <div v-if="!live" class="grid grid-cols-1 gap-20 mt-10 md:grid-cols-2 xl:grid-cols-3">
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