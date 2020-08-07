import React from 'react'

import { AuthContext } from '../main/provedorAutenticacao'

class Home extends React.Component{

    render(){
        return (
            <div className="jumbotron">
                <h1 className="display-3">Bem vindo!</h1>
                <p className="lead">Esse é seu sistema Viridis.</p>
                <p className="lead">
                    <a className="btn btn-primary btn-lg" 
                    href="#/cadastro-usuarios" 
                    role="button"><i className="pi pi-users"></i>  
                     Cadastrar Usuário
                    </a>
                    <a className="btn btn-danger btn-lg" 
                    href="#/cadastro-equipamentos"
                    role="button">
                     Cadastrar Equipamento
                    </a>
                    <a className="btn btn-danger btn-lg"
                       href="#/cadastro-ordens"
                       role="button">
                        Cadastrar Ordens
                    </a>
                </p>
            </div>
        )
    }
}

Home.contextType = AuthContext;

export default Home