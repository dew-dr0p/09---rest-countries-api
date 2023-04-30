import axios from "axios"
import { reactive, ref, } from 'vue'
import data from '../data.json'

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
            console.log(response.value)
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

const fetchBorders = async () => {
    const response = ref([])
    try {
        await axios
        .get(`https://restcountries.com/v3.1/alpha/${code.value}`)
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

export {
    searchTerm,
    region,
    fullName,
    live,
    loading,
    localData,
    Data,
    code,
    fetchBorders,
    fetchData,
    fetchDetails,
    searchData,
    filterRegion
}