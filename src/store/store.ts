import axios from "axios"
import { MoonIcon } from '@heroicons/vue/24/solid'
import { reactive, ref, } from 'vue'
import data from '../data.json'

const DarkIcon = MoonIcon

const component = ref('LightIcon')

localStorage.theme = ''

// const changeTheme = () => {
//     checkColorMode()
//     if (localStorage.theme === 'dark' || (!('theme' in localStorage) && window.matchMedia('(prefers-color-scheme: dark)').matches)) {
//         document.documentElement.classList.add('dark')
//         document.documentElement.setAttribute('style', 'background: #202C37;')
//         console.log(localStorage.theme)
//         console.log(document.documentElement)
//     } else {
//         document.documentElement.classList.remove('dark')
//         console.log(localStorage.theme)
//     }
// }

const changeTheme = () => {
    if (localStorage.theme === 'dark' || (!('theme' in localStorage) && window.matchMedia('(prefers-color-scheme: dark)').matches)) {
        localStorage.theme = 'light'
        document.documentElement.classList.remove('dark')
        document.documentElement.removeAttribute('style')
        component.value = 'LightIcon'
    } else {
        localStorage.theme = 'dark'
        document.documentElement.classList.add('dark')
        document.documentElement.setAttribute('style', 'background: #202C37;')
        component.value = 'DarkIcon'
    }
}

const localData =  reactive({
    value: data
})

const Data = reactive({
    value: []
})

const searchTerm = ref('')

const region = ref('')

const fullName = ref('')

const code = ref('')

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
//         response.value = res.data.data
//     })
//     return response.value
// }

const fetchDetails = async () => {
    const response = ref([])
    try {
        await axios
        .get(`https://restcountries.com/v3.1/name/${fullName.value}?fullText=true`)
        .then((res) => {
            response.value = res.data
        })
        return response.value
    }
    finally {
        ''
    }
}

const searchData = async () => {
    const response = ref([])
    try {
        await axios
        .get(`https://restcountries.com/v3.1/name/${searchTerm.value}`)
        .then((res) => {
            response.value = res.data
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
        })
        return response.value
    }
    finally {
        ''
    }
}

const fetchBorders = async () => {
    const response = ref([])
    try {
        await axios
        .get(`https://restcountries.com/v3.1/alpha/${code.value}`)
        .then((res) => {
            response.value = res.data
        })
        return response.value
    }
    finally {
        ''
    }
}

export {
    searchTerm,
    region,
    fullName,
    live,
    loading,
    localData,
    Data,
    code,
    DarkIcon,
    component,
    fetchBorders,
    fetchData,
    fetchDetails,
    searchData,
    filterRegion,
    changeTheme
}