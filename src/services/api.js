import axios from 'axios'

 const SERVER = 'http://10.0.0.105:80/api'
//const SERVER = 'http://localhost:80/api'

const httpClient = axios.create({
    baseURL: SERVER
})

class ApiService {

    constructor(apiurl) {
        this.apiurl = apiurl;

    }

    post(url, objeto) {
        const requestUrl = `${this.apiurl}${url}`
        return httpClient.post(requestUrl, objeto);
    }

    put(url, objeto) {
        const requestUrl = `${this.apiurl}${url}`
        return httpClient.put(requestUrl, objeto);
    }

    delete(url) {
        const requestUrl = `${this.apiurl}${url}`
        return httpClient.delete(requestUrl);
    }

    get(url) {
        const requestUrl = `${this.apiurl}${url}`
        return httpClient.get(requestUrl);
    }
}

export {SERVER, ApiService};