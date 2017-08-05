import { Http } from '@angular/http';
import { Injectable } from '@angular/core';
import { Agendamento } from '../agendamento/agendamento';

import { AgendamentoDao } from '../../domain/agendamento/agendamento-dao';


const URL: string = 'https://aluracar.herokuapp.com/';

@Injectable()
export class AgendamentoService {



    constructor(private _http: Http, private _dao: AgendamentoDao) { }


    agenda(agendamento: Agendamento) {


        //Metodo de gravacao da api do cliente é GET deveria ser post , o fornecedor já está arrumando para ser post na proxima versao.

        let api = `${URL}salvarpedido?carro=${agendamento.carro.nome}&nome=${agendamento.nome}&preco=${agendamento.valor}&endereco=${agendamento.endereco}&email=${agendamento.email}&dataAgendamento=${agendamento.data}`;

        return this._http.get(api)
            .toPromise()
            .then(() => agendamento.confirmado = true, err => console.log(err))
            .then(() => {
                this._dao.salva(agendamento);
            })
            .then(() => agendamento.confirmado);

    }

}