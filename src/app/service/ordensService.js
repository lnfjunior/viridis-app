import ApiService from '../apiservice'
import EquipamentoService from "./equipamentoService";

export default class OrdensService extends ApiService {

    constructor(){
        super('/api/maintenance-order')
        this.equipamentoService = new EquipamentoService()
    }

    obterPorId(id){
        return this.get(`/${id}`);
    }

    salvar(order){
        return this.post('/', order);
    }

    atualizar(order){
        return this.put(`/${order.id}`, order);
    }

    consultar(){
        return this.get('/');
    }

    deletar(id){
        return this.delete(`/${id}`)
    }

    obterListaMeses(){
        return  [
            { label: 'Selecione...', value: '' },
            { label: 'Janeiro', value: 1 },
            { label: 'Fevereiro', value: 2 },
            { label: 'Março', value: 3 },
            { label: 'Abril', value: 4 },
            { label: 'Maio', value: 5 },
            { label: 'Junho', value: 6 },
            { label: 'Julho', value: 7 },
            { label: 'Agosto', value: 8 },
            { label: 'Setembro', value: 9 },
            { label: 'Outubro', value: 10 },
            { label: 'Novembro', value: 11 },
            { label: 'Dezembro', value: 12 },
        ]
    }

    obterListaEquipamentos(){
        this.equipamentoService.consultar()
            .then( resposta => {
                let lista = []
                resposta.data.forEach((equipment => {
                    const label = equipment.name
                    const value = equipment.id
                    const obj = {label, value}
                    lista.push(obj)
                }))
                console.log(lista)
                return lista;
            }).catch( error => {
            console.log(error)
        })
    }
}