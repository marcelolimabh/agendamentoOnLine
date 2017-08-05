import { Injectable } from '@angular/core';
import { Agendamento } from '../agendamento/agendamento';

import { Storage } from '@ionic/storage'

@Injectable()
export class AgendamentoDao{

    constructor(private _storage: Storage){

    }

    private _getKey(agendamento: Agendamento){
        return agendamento.email + agendamento.data.substring(0,10);
    }

    salva(agendamento){
        let key = this._getKey(agendamento);
       return  this._storage.set(key, agendamento);
    }

}