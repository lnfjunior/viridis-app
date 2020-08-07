import React from 'react'

import Card from '../../components/card'
import FormGroup from '../../components/form-group'
import SelectMenu from '../../components/selectMenu'

import { withRouter } from 'react-router-dom'
import * as messages from '../../components/toastr'

import OrdensService from '../../app/service/ordensService'
import EquipamentoService from '../../app/service/equipamentoService'

class CadastroOrdens extends React.Component {

    state = {
        id: null,
        equipment: '',
        scheduledDate: '',
        equipments: [],
        atualizando: false,
        order: {
            id: null,
            equipment: {
                id: null
            },
            scheduledDate: ''
        }
    }

    constructor(){
        super();
        this.service = new OrdensService();
        this.equipamentoService = new EquipamentoService()
        setTimeout( () => {
            this.state.equipments = this.fetchData();
        }, 500)
    }

    componentDidMount(){
        const params = this.props.match.params

        if(params.id){
            this.service
                .obterPorId(params.id)
                .then(response => {
                    this.setState({id: params.id} )
                    this.setState({equipment: JSON.stringify(response.data.equipment.id)})
                    this.setState({...response.data, atualizando: true} )
                })
                .catch(erros => {
                    messages.mensagemErro(erros.response.data)
                })
        }
    }

    async fetchData() {
        await this.equipamentoService
            .consultar()
            .then( resposta => {
                const lista = resposta.data;
                const tempArray = [];
                lista.forEach((element) => {
                    tempArray.push({ label: `${element.name}`, value: element.id });
                });
                this.setState({ equipments: tempArray })
                return tempArray;
            }).catch( error => {
                console.log(error)
            })
    }

    submit = () => {
        const { equipment, scheduledDate } = this.state;
        this.state.order.equipment.id = parseInt(equipment)
        this.state.order.scheduledDate = scheduledDate

        this.service
            .salvar(this.state.order)
            .then(response => {
                this.props.history.push('/consulta-ordens')
                messages.mensagemSucesso('Ordem cadastrada com sucesso!')
            }).catch(error => {
            messages.mensagemErro(error.response.data)
        })
    }

    atualizar = () => {
        const params = this.props.match.params
        const { equipment, scheduledDate } = this.state;

        this.state.order.id = params.id
        this.state.order.equipment.id = parseInt(equipment)
        this.state.order.scheduledDate = scheduledDate

        this.service
            .atualizar(this.state.order)
            .then(response => {
                this.props.history.push('/consulta-ordens')
                messages.mensagemSucesso('Ordem atualizada com sucesso!')
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
            <Card title={ this.state.atualizando ? 'Atualização de Ordem'  : 'Cadastro de Ordem' }>
                <div className="row">
                    <div className="col-md-12">
                        <FormGroup id="inputEquipment" label="Equipamento: *">
                            <SelectMenu id="inputEquipment"
                                        value={this.state.equipment}
                                        onChange={this.handleChange}
                                        lista={this.state.equipments}
                                        name="equipment"
                                        className="form-control" />
                        </FormGroup>
                    </div>
                </div>
                <div className="row">
                    <div className="col-md-12">
                        <FormGroup id="inputScheduledDate" label="Data: *" >
                            <input id="inputScheduledDate" type="text"
                                   className="form-control"
                                   name="scheduledDate"
                                   placeholder="dd-mm-yyyy hh:mm"
                                   value={this.state.scheduledDate}
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
                        <button onClick={e => this.props.history.push('/consulta-ordens')}
                                className="btn btn-danger">
                            <i className="pi pi-times"></i>Cancelar
                        </button>
                    </div>
                </div>
            </Card>
        )
    }
}

export default withRouter(CadastroOrdens);