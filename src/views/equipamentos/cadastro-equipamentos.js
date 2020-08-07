import React from 'react'

import Card from '../../components/card'
import FormGroup from '../../components/form-group'

import { withRouter } from 'react-router-dom'
import * as messages from '../../components/toastr'

import EquipamentoService from "../../app/service/equipamentoService";

class CadastroEquipamentos extends React.Component {

    state = {
        id: null,
        name: '',
        atualizando: false
    }

    constructor(){
        super();
        this.service = new EquipamentoService();
    }

    componentDidMount(){
        const params = this.props.match.params
       
        if(params.id){
            this.service
                .obterPorId(params.id)
                .then(response => {
                    this.setState( {...response.data, atualizando: true} )
                })
                .catch(erros => {
                    messages.mensagemErro(erros.response.data)
                })
        }
    }

    submit = () => {
        const { name } = this.state;
        const equipment = { name };

        try{
            this.service.validar(equipment)
        }catch(erro){
            const mensagens = erro.mensagens;
            mensagens.forEach(msg => messages.mensagemErro(msg));
            return false;
        }     

        this.service
            .salvar(equipment)
            .then(response => {
                this.props.history.push('/consulta-equipamentos')
                messages.mensagemSucesso('Equipamento cadastrado com sucesso!')
            }).catch(error => {
                messages.mensagemErro(error.response.data)
            })
    }

    atualizar = () => {
        const { name, id } = this.state;

        const equipment = { name, id };
        
        this.service
            .atualizar(equipment)
            .then(response => {
                this.props.history.push('/consulta-equipamentos')
                messages.mensagemSucesso('Equipamento atualizado com sucesso!')
            }).catch(error => {
                messages.mensagemErro(error.response.data)
            })
    }

    handleChange = (event) => {
        const value = event.target.value;
        const name = event.target.name;

        this.setState({ [name] : value })
    }

    render(){
        return (
            <Card title={ this.state.atualizando ? 'Atualização de Equipamento'  : 'Cadastro de Equipamento' }>
                <div className="row">
                    <div className="col-md-12">
                        <FormGroup id="inputName" label="Name: *" >
                            <input id="inputName" type="text"
                                   className="form-control" 
                                   name="name"
                                   value={this.state.name}
                                   onChange={this.handleChange}  />
                        </FormGroup>
                    </div>
                </div>
                <div className="row">
                     <div className="col-md-6" >
                        { this.state.atualizando ? 
                            (
                                <button onClick={this.atualizar} 
                                        className="btn btn-success">
                                        <i className="pi pi-refresh"></i> Atualizar
                                </button>
                            ) : (
                                <button onClick={this.submit} 
                                        className="btn btn-success">
                                        <i className="pi pi-save"></i> Salvar
                                </button>
                            )
                        }
                        <button onClick={e => this.props.history.push('/consulta-equipamentos')}
                                className="btn btn-danger">
                                <i className="pi pi-times"></i>Cancelar
                        </button>
                    </div>
                </div>
            </Card>
        )
    }
}

export default withRouter(CadastroEquipamentos);