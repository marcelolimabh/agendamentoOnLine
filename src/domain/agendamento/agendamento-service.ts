import { Http } from '@angular/http';
import { Injectable } from '@angular/core';
import { Agendamento } from '../agendamento/agendamento';

import { AgendamentoDao } from '../../domain/agendamento/agendamento-dao';


const URL: string = 'https://aluracar.herokuapp.com/';

@Injectable()
export class AgendamentoService {



    constructor(private _http: Http, private _dao: AgendamentoDao) { }

    private _montaUri(agendamento){
           return  `${URL}salvarpedido?carro=${agendamento.carro.nome}&nome=${agendamento.nome}&preco=${agendamento.valor}&endereco=${agendamento.endereco}&email=${agendamento.email}&dataAgendamento=${agendamento.data}`;

    }


    agenda(agendamento: Agendamento) {


        //Metodo de gravacao da api do cliente é GET deveria ser post , o fornecedor já está arrumando para ser post na proxima versao.

        let api = this._montaUri(agendamento);

        return this._dao
            .ehAgendamentoDuplicado(agendamento)
            .then(duplicado => {
                if(duplicado) throw new Error('Este agendamento já foi realizado. Verifique');
                return this._http.get(api).toPromise()
                      .then(() => agendamento.confirmado = true, err => console.log(err))
                      .then(() => this._dao.salva(agendamento))
                      .then(() => agendamento.confirmado);
            });

    }

    reagenda(agendamento: Agendamento){
        let api = this._montaUri(agendamento);
        return this._http.get(api).toPromise()
        .then(()=> agendamento.confirmado = true, err => console.log(err))
        .then(() => this._dao.salva(agendamento))
        .then(()=> agendamento.confirmado); 
    }

}