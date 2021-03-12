import axios from 'axios'

    const SERVER = 'http://ec2-18-222-47-81.us-east-2.compute.amazonaws.com:8080/api'
    //const SERVER = 'http://10.0.0.106:8080/api'
    //const SERVER = 'https://lub1bfv.herokuapp.com/api'
    //const SERVER = 'http://172.20.10.2:80/api'

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