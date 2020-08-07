import React from 'react'

import Card from '../../components/card'
import OrdensTable from './ordensTable'

import { withRouter } from 'react-router-dom'

import * as messages from '../../components/toastr'

import {Dialog} from 'primereact/dialog';
import {Button} from 'primereact/button';
import OrdensService from "../../app/service/ordensService";



class ConsultaOrdens extends React.Component {

    state = {
        showConfirmDialog: false,
        orderDelete: {},
        orders : []
    }

    constructor(){
        super();
        this.service = new OrdensService();
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
                this.setState({ orders: lista })
            }).catch( error => {
                console.log(error)
            })
    }

    editar = (id) => {
        this.props.history.push(`/cadastro-ordens/${id}`)
    }

    abrirConfirmacao = (order) => {
        this.setState({ showConfirmDialog : true, orderDelete: order  })
    }

    cancelarDelecao = () => {
        this.setState({ showConfirmDialog : false, orderDelete: {}  })
    }

    deletar = () => {
        this.service
            .deletar(this.state.orderDelete.id)
            .then(response => {
                const orders = this.state.orders;
                const index = orders.indexOf(this.state.orderDelete)
                orders.splice(index, 1);
                this.setState( { orders: orders, showConfirmDialog: false } )
                messages.mensagemSucesso('Ordem deletada com sucesso!')
            }).catch(error => {
                messages.mensagemErro('Ocorreu um erro ao tentar deletar a Ordem')
            })
    }

    preparaFormularioCadastro = () => {
        this.props.history.push('/cadastro-ordens')
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
            <Card title="Consulta Ordens">
                <div className="row">
                    <div className="col-md-12">
                        <div className="bs-component">
                            <OrdensTable orders={this.state.orders}
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

export default withRouter(ConsultaOrdens);