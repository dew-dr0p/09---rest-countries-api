<script setup lang="ts">
import { ArrowLongLeftIcon } from '@heroicons/vue/24/solid'
import { Data, fetchDetails, code, fetchBorders } from '@/store/store'
import { onMounted, ref } from 'vue';

const emit = defineEmits<{
    (event: 'change', value: string): void
}>()

const currencies = ref([])

const languages = ref([])

const nativeName = ref([])

const borderCountries = ref([])

onMounted(async () => {
    Data.value = await fetchDetails()
    console.log(Data.value)
    Object.keys(Data.value[0]['currencies']).forEach((e) => {
        currencies.value.push(Data.value[0]['currencies'][e]['name'])
        console.log(currencies.value)
    })
    Object.keys(Data.value[0]['languages']).forEach((e) => {
        languages.value.push(Data.value[0]['languages'][e])
        console.log(languages.value)
    })
    Object.keys(Data.value[0]['name']['nativeName']).forEach((e) => {
        nativeName.value.push(Data.value[0]['name']['nativeName'][e]['common'])
        console.log(nativeName.value)
    })
    Object.keys(Data.value[0]['borders']).forEach(async (e) => {
        code.value = Data.value[0]['borders'][e]
        console.log(code.value)
        const borders = await fetchBorders()
        borderCountries.value.push(borders[0]['name']['common'])
        console.log(borderCountries.value)
    })
})
</script>

<template>
    <div class="w-full h-full bg-light-background p-10 md:p-14">
        <button class="my-5 bg-light-elements flex flex-row items-center shadow-md rounded-lg border-none text-lg p-5 px-10" @click="emit('change', 'PageContent')">
            <ArrowLongLeftIcon class="w-12 pr-5" />Back
        </button>
        <div class="grid lg:grid-cols-2 gap-20 mt-20">
            <img :src="Data.value[0]['flags']['png']" :alt="Data.value[0]['flags']['alt']" class="w-full">
            <div class="font-bold">
                <h1 class="text-4xl my-10">{{ Data.value[0]['name']['common'] }}</h1>
                <div class="grid xl:grid-cols-2 gap-5 text-lg">
                    <div>
                        <p class="mb-3">Native Name: <span>{{ nativeName.toString() }}</span></p>
                        <p>Population: <span>{{ (Data.value[0]['population'] as any).toLocaleString() }}</span></p>
                        <p>Region: <span>{{ Data.value[0]['region'] }}</span></p>
                        <p>Sub Region: <span>{{ Data.value[0]['subregion'] }}</span></p>
                        <p>Capital: <span>{{ Data.value[0]['capital'][0] }}</span></p>
                    </div>
                    <div>
                        <p>Top Level Domain: <span>{{ Data.value[0]['tld'][0] }}</span></p>
                        <p>Currencies: <span> {{ currencies.toString() }} </span></p>
                        <p>Languages: <span>{{ languages.toString() }}</span></p>
                    </div>
                </div>
                <div class="mt-10 text-lg">
                    <p class="flex flex-wrap items-center">Border Countries: <span v-for="border in borderCountries" :key="border" class="p-2 px-7 m-5 mx-2 shadow rounded-lg bg-light-elements">{{ border }}</span></p>
                </div>
            </div>
        </div>
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