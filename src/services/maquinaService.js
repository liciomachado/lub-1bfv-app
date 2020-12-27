import {ApiService} from './api'

class MaquinaService extends ApiService {

    constructor() {
        super('/maquina')
    }

    findbyid(credenciais) {
        return this.get(`/findbyid/${credenciais}`)
    }

}

export default MaquinaService;