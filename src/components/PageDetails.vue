<script setup lang="ts">
import { ArrowLongLeftIcon } from '@heroicons/vue/24/solid'
import { Data, fetchDetails, code, fetchBorders, fullName, localData } from '@/store/store'
import { onMounted, ref } from 'vue';

const emit = defineEmits<{
    (event: 'change', value: string): void
}>()

let data = Data.value

let local = localData.value

const currencies = ref([])

const languages = ref([])

const nativeName = ref([])

const borderCountries = ref([])

const mount = async () => {
    currencies.value = []
    
    languages.value = []
    
    nativeName.value = []
    
    borderCountries.value = []
    
    data = await fetchDetails()
    Object.keys(data[0]['currencies']).forEach((e) => {
        currencies.value.push(data[0]['currencies'][e]['name'])
    })
    Object.keys(data[0]['languages']).forEach((e) => {
        languages.value.push(data[0]['languages'][e])
    })
    Object.keys(data[0]['name']['nativeName']).forEach((e) => {
        nativeName.value.push(data[0]['name']['nativeName'][e]['common'])
    })
    Object.keys(data[0]['borders']).forEach(async (e) => {
        code.value = data[0]['borders'][e]
        const borders = await fetchBorders()
        borderCountries.value.push(borders[0]['name']['common'])
    })
}

onMounted(() => mount())
</script>

<template>
    <div class="w-full h-full bg-light-background p-10 md:p-14">
        <button class="my-5 bg-light-elements flex flex-row items-center shadow-md rounded-lg border-none text-lg p-5 px-10" @click="emit('change', 'PageContent')">
            <ArrowLongLeftIcon class="w-12 pr-5" />Back
        </button>
        <div class="grid lg:grid-cols-2 gap-20 mt-20">
            <img :src="data[0]['flags']['png']" :alt="data[0]['flags']['alt']" class="w-full">
            <div class="font-bold">
                <h1 class="text-4xl my-10">{{ data[0]['name']['common'] }}</h1>
                <div class="grid xl:grid-cols-2 gap-5 text-lg">
                    <div>
                        <p class="mb-3">Native Name: <span>{{ nativeName.join(', ') }}</span></p>
                        <p>Population: <span>{{ (data[0]['population'] as any).toLocaleString() }}</span></p>
                        <p>Region: <span>{{ data[0]['region'] }}</span></p>
                        <p>Sub Region: <span>{{ data[0]['subregion'] }}</span></p>
                        <p>Capital: <span>{{ data[0]['capital'][0] }}</span></p>
                    </div>
                    <div>
                        <p>Top Level Domain: <span>{{ data[0]['tld'][0] }}</span></p>
                        <p>Currencies: <span> {{ currencies.join(', ') }} </span></p>
                        <p>Languages: <span>{{ languages.join(', ') }}</span></p>
                    </div>
                </div>
                <div class="mt-10 text-lg">
                    <p class="flex flex-wrap items-center">Border Countries: <span v-for="border in borderCountries" :key="border" class="p-2 px-7 m-5 mx-2 shadow rounded-lg bg-light-elements cursor-pointer" @click="(() => {fullName = border, mount()})">{{ border }}</span></p>
                </div>
            </div>
        </div>
        <!-- <div v-if="false" class="grid lg:grid-cols-2 gap-20 mt-20">
            <img :src="fullName" alt="" class="w-full">
            <div class="font-bold">
                <h1 class="text-4xl my-10">{{ (local as any)['fullName']['name']['common'] }}</h1>
                <div class="grid xl:grid-cols-2 gap-5 text-lg">
                    <div>
                        <p class="mb-3">Native Name: <span>{{ nativeName.join(', ') }}</span></p>
                        <p>Population: <span>{{ (data[0]['population'] as any).toLocaleString() }}</span></p>
                        <p>Region: <span>{{ data[0]['region'] }}</span></p>
                        <p>Sub Region: <span>{{ data[0]['subregion'] }}</span></p>
                        <p>Capital: <span>{{ data[0]['capital'][0] }}</span></p>
                    </div>
                    <div>
                        <p>Top Level Domain: <span>{{ data[0]['tld'][0] }}</span></p>
                        <p>Currencies: <span> {{ currencies.join(', ') }} </span></p>
                        <p>Languages: <span>{{ languages.join(', ') }}</span></p>
                    </div>
                </div>
                <div class="mt-10 text-lg">
                    <p class="flex flex-wrap items-center">Border Countries: <span v-for="border in borderCountries" :key="border" class="p-2 px-7 m-5 mx-2 shadow rounded-lg bg-light-elements cursor-pointer" @click="(() => {fullName = border, mount()})">{{ border }}</span></p>
                </div>
            </div>
        </div> -->
    </div>
</template>

<style scoped>
span {
    font-weight: 400;
}
p {
    margin-bottom: 0.75rem;
}
</style>