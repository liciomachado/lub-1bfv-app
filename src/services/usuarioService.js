import {ApiService} from './api'

class UsuarioService extends ApiService {

    constructor() {
        super('/usuario')
    }

    autentica(credenciais) {
        return this.post('/auth', credenciais)
    }

    novo(credenciais) {
        return this.post('/save', credenciais)
    }
}

export default UsuarioService;