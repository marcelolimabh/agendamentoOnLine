import { Component } from '@angular/core';
import { NavController, NavParams, AlertController } from 'ionic-angular';
import { AgendamentoDao } from '../../domain/agendamento/agendamento-dao';

import { Agendamento } from '../../domain/agendamento/agendamento';
import { AgendamentoService } from '../../domain/agendamento/agendamento-service';

@Component({
  selector: 'page-agendamentos',
  templateUrl: 'agendamentos.html'
})
export class AgendamentosPage {

  public agendamentos: Agendamento[];
  constructor(public navCtrl: NavController,
    public navParams: NavParams,
    private _dao: AgendamentoDao,
    private _service: AgendamentoService,
    private _alertCtrl: AlertController
  ) {
    this._dao.listaTodos().then(agendamentos => this.agendamentos = agendamentos);
  }


  reenvia(agendamento) {

    this._service.reagenda(agendamento)
      .then(confirmado => {

        confirmado ?
          this._alertCtrl.create({
            title: 'Envio',
            subTitle: 'Reenvio de agendamento realizado com sucesso!',
            buttons: [{ text: 'Ok' }]

          }).present()
          :
          this._alertCtrl.create({
            title: 'Envio',
            subTitle: 'Não foi possivel realizar o agendamento. Tente mais tarde.',
            buttons: [{ text: 'Ok' }]
          }).present();

      });
  }

}
