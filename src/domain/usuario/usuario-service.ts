import { Http } from '@angular/http';
import { Injectable } from '@angular/core';

import { Usuario } from './usuario';

const URL = 'https://aluracar.herokuapp.com/login';
@Injectable()
export class UsuarioService{

    private _usuarioLogado: Usuario;

    constructor(private _http: Http){


    }

    efetuaLogin(email: string, senha: string){

        let api = `${URL}/?email=${email}&senha=${senha}`;

        return this._http.get(api).map(res => res.json().usuario)
        .toPromise()
        .then(dado => {
             let usuario =new Usuario(dado.nome, dado.dataNascimento, dado.email, dado.telefone)
             this._usuarioLogado = usuario;
             return usuario;
        });


    }

    obterUsuarioLogado(){
        return this._usuarioLogado;
    }


}