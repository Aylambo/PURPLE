import { httpService } from './http.service.js'


var location = window.location.search;
const searchParams = new URLSearchParams(location);
const searchTxt = searchParams.get('searchTxt')
// const data = require('../data/convos.json')
// let gConvos = data.convo

// const STOR

// const axios = require('axios');

// - // for Deverlop without backend
// const STORAGE_KEY = 'convo'

export const convoService = {
    query,
    getById,
    save,
    remove,
    getEmptyConvo
}

// const BASE_URL = process.env.NODE_ENV === 'production' ? '/api/' : 'http://localhost:3030/api/convo'


function query(filterBy) {
    
    var queryStr = (!filterBy) ? '' : `searchTxt=${searchTxt || filterBy.searchTxt}&type=${filterBy.type}&sortBy=${filterBy.sortBy}`
    // console.log('filter service:', filterBy);

    return httpService.get(`convo?${queryStr}`, queryStr)
    // console.log('filterBy in FE service:', filterBy);
    // return httpService.get(`convo`, filterBy)

    // return storageService.query(STORAGE_KEY).then(convos => {
    //     if (!convos || !convos.length) convos = gConvos
    //     return convos
    // })

    // return axios.get(`${BASE_URL}`).then((res=>res.data))
}

function getById(convoId) {
    // console.log(convoId)
    return httpService.get(`convo/${convoId}`)
    // return storageService.get(STORAGE_KEY, convoId)
    // return axios.get(`${BASE_URL}/${convoId}`).then((res => res.data))
}
function remove(convoId) {
    return httpService.delete(`convo/${convoId}`)
    // return storageService.remove(STORAGE_KEY, convoId)
    // return axios.delete(`${BASE_URL}/${convoId}`).then((res => res.data))
}
async function save(convo) {
    console.log('service convo:', convo);
    if (convo._id) {
        return await httpService.put(`convo/${convo._id}`, convo)
        // return storageService.put(STORAGE_KEY, convo)
        // return axios.put(`${BASE_URL}`, convo).then(res => res.data)
    } else {
  console.log('service convo:', convo);

        return await httpService.post(`convo`, convo)
        // return storageService.post(STORAGE_KEY, convo)
        // return axios.post(`${BASE_URL}`, convo).then(res => res.data)
    }
}

function getEmptyConvo() {
    return {
        name: '',
        type: '',
        imgUrls: [],
        price: '',
        summary: '',
        capacity: '',
        amenities: [],
        // TODO: get from user service
        host: {
            _id: '',
            fullname: '',
            imgUrl: '',
        },
        loc: {
            address: '',
            lat: '',
            lng: ''
        }
    }
}






