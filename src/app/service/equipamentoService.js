import ApiService from '../apiservice'

export default class EquipamentoService extends ApiService {

    constructor(){
        super('/api/equipment')
    }

    obterPorId(id){
        return this.get(`/${id}`);
    }

    validar(equipament){
        const erros = [];

        if(!equipament.name){
            erros.push("Informe o Name.")
        }
    }

    salvar(equipament){
        return this.post('/', equipament);
    }

    atualizar(equipament){
        return this.put(`/${equipament.id}`, equipament);
    }

    consultar(){
        return this.get('/');
    }

    deletar(id){
        return this.delete(`/${id}`)
    }
}