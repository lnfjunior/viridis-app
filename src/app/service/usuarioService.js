import ApiService from '../apiservice'

import ErroValidacao from '../exception/ErroValidacao'

class UsuarioService extends ApiService {

    constructor(){
        super('/api/users')
    }

    autenticar(credenciais){
        return this.post('/auth', credenciais)
    }

    obterSaldoPorUsuario(id){
        return this.get(`/${id}/saldo`);
    }

    salvar(user){
        return this.post('/', user);
    }

    validar(user){
        const erros = []

        if(!user.login){
            erros.push('O campo Login é obrigatório.')
        }

        if(!user.password){
            erros.push('Digite o password.')
        }

        if(erros && erros.length > 0){
            throw new ErroValidacao(erros);
        }
    }

}

export default UsuarioService;