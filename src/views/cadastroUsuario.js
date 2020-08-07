import React from 'react'

import { withRouter } from 'react-router-dom'
import Card from '../components/card'
import FormGroup from '../components/form-group'

import UsuarioService from '../app/service/usuarioService'
import { mensagemSucesso, mensagemErro } from '../components/toastr'

class CadastroUsuario extends React.Component{

    state = {
        login : '',
        password: '',
        admin : true
    }

    constructor(){
        super();
        this.service = new UsuarioService();
    }

    cadastrar = () => {

        const {login, password, admin } = this.state
        const user = {login, password, admin }

        try{
            this.service.validar(user);
        }catch(erro){
            const msgs = erro.mensagens;
            msgs.forEach(msg => mensagemErro(msg));
            return false;
        }

        this.service.salvar(user)
            .then( response => {
                mensagemSucesso('Usuário cadastrado com sucesso! Faça o login para acessar o sistema.')
                this.props.history.push('/login')
            }).catch(error => {
                mensagemErro(error.response.data)
            })
    }

    cancelar = () => {
        this.props.history.push('/login')
    }

    render(){
        return (
            <Card title="Cadastro de Usuário">
                <div className="row">
                    <div className="col-lg-12">
                        <div className="bs-component">
                            <FormGroup label="Login: *" htmlFor="inputLogin">
                                <input type="text" 
                                       id="inputLogin"
                                       className="form-control"
                                       name="login"
                                       onChange={e => this.setState({login: e.target.value})} />
                            </FormGroup>
                            <FormGroup label="Password: *" htmlFor="inputPassword">
                                <input type="password" 
                                       id="inputPassword"
                                       className="form-control"
                                       name="password"
                                       onChange={e => this.setState({password: e.target.value})} />
                            </FormGroup>
                            <button onClick={this.cadastrar} type="button" className="btn btn-success">
                                <i className="pi pi-save"></i> Salvar
                            </button>
                            <button onClick={this.cancelar} type="button" className="btn btn-danger">
                                <i className="pi pi-times"></i> Cancelar
                            </button>
                        </div>
                    </div>
                </div>
            </Card>
        )
    }
}

export default withRouter(CadastroUsuario)