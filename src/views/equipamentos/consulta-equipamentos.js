import React from 'react'

import Card from '../../components/card'
import EquipamentosTable from './equipamentosTable'

import { withRouter } from 'react-router-dom'

import * as messages from '../../components/toastr'

import {Dialog} from 'primereact/dialog';
import {Button} from 'primereact/button';
import EquipamentoService from "../../app/service/equipamentoService";



class ConsultaEquipamentos extends React.Component {

    state = {
        showConfirmDialog: false,
        equipmentDelete: {},
        equipments : []
    }

    constructor(){
        super();
        this.service = new EquipamentoService();
        this.buscar()
    }

    buscar = () => {
        this.service
            .consultar()
            .then( resposta => {
                const lista = resposta.data;
                if(lista.length < 1){
                    messages.mensagemAlert("Nenhum resultado encontrado.");
                }
                this.setState({ equipments: lista })
            }).catch( error => {
                console.log(error)
            })
    }

    editar = (id) => {
        this.props.history.push(`/cadastro-equipamentos/${id}`)
    }

    abrirConfirmacao = (equipment) => {
        this.setState({ showConfirmDialog : true, equipmentDelete: equipment  })
    }

    cancelarDelecao = () => {
        this.setState({ showConfirmDialog : false, equipmentDelete: {}  })
    }

    deletar = () => {
        this.service
            .deletar(this.state.equipmentDelete.id)
            .then(response => {
                const equipments = this.state.equipments;
                const index = equipments.indexOf(this.state.equipmentDelete)
                equipments.splice(index, 1);
                this.setState( { equipments: equipments, showConfirmDialog: false } )
                messages.mensagemSucesso('Equipamento deletado com sucesso!')
            }).catch(error => {
                messages.mensagemErro('Ocorreu um erro ao tentar deletar o Equipamento')
            })
    }

    preparaFormularioCadastro = () => {
        this.props.history.push('/cadastro-equipamentos')
    }

    render(){
        const confirmDialogFooter = (
            <div>
                <Button label="Confirmar" icon="pi pi-check" onClick={this.deletar} />
                <Button label="Cancelar" icon="pi pi-times" onClick={this.cancelarDelecao} 
                        className="p-button-secondary" />
            </div>
        );

        return (
            <Card title="Consulta Equipamentos">
                <div className="row">
                    <div className="col-md-12">
                        <div className="bs-component">
                            <EquipamentosTable equipments={this.state.equipments}
                                              deleteAction={this.abrirConfirmacao}
                                              editAction={this.editar} />
                        </div>
                    </div>  
                </div> 
                <div>
                    <Dialog header="Confirmação" 
                            visible={this.state.showConfirmDialog} 
                            style={{width: '50vw'}}
                            footer={confirmDialogFooter} 
                            modal={true} 
                            onHide={() => this.setState({showConfirmDialog: false})}>
                        Confirma a exclusão deste Equipamento?
                    </Dialog>
                </div>           
            </Card>

        )
    }
}

export default withRouter(ConsultaEquipamentos);