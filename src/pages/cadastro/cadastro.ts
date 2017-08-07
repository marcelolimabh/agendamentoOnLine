import { Component } from '@angular/core';
import { NavController, NavParams, AlertController, Alert } from 'ionic-angular';
import { Http } from '@angular/http';
import { HomePage } from '../home/home';
import { Agendamento } from '../../domain/agendamento/agendamento';

import { AgendamentoService } from '../../domain/agendamento/agendamento-service';



@Component({
  selector: 'page-cadastro',
  templateUrl: 'cadastro.html'
})
export class CadastroPage {

  public agendamento: Agendamento;
  private _alerta: Alert;


  constructor(public navCtrl: NavController,
    public navParams: NavParams,
    private _http: Http,
    private _service: AgendamentoService,
    private _alertCtrl: AlertController) {
    this.agendamento = new Agendamento();
    this.agendamento.carro = navParams.get('carro');
    this.agendamento.valor = navParams.get('precoTotal');
    this._alerta = this._alertCtrl.create({
      title: 'Aviso',
      buttons: [{ text: 'OK', handler: () => this.navCtrl.setRoot(HomePage) }]
    });


  }

  agenda() {

    if (!this.agendamento.nome || !this.agendamento.endereco || !this.agendamento.email || !this.agendamento.data) {
      this._alertCtrl.create({
        title: 'Preenchimento Obrigatório',
        subTitle: 'Você deve preencher todas as informações',
        buttons: [{ text: 'Fechar' }]
      }).present();
      return;
    }


    this._service.agenda(this.agendamento)
      .then(confirmado => {
        confirmado ? this._alerta.setSubTitle('Agendamento realizado com sucesso!') : this._alerta.setSubTitle('Não foi possível realizar o agendamento do veículo. Tente mais tarde!');
        this._alerta.present();
      })
       .catch(err => {
        this._alerta.setSubTitle(err.message);
        this._alerta.present(); 
      });

  }




  /**
   * o IonViewDidLoad carrega ao iniciar o componente e 
   * joga as informações contidas nele no cache caso vc saia da pagina e volte depois para ele o ionic busca as infoormacoes contidas no cache.
   * 
   * já o ngOnInit() ele carrega as informaçoes ao iniciar o componente, porem toda vez que vc sai e volta parar a apgina ele carrega novamente as informaçoes
   

  ionViewDidLoad() {
     console.log('ionViewDidLoad CadastroPage');
   }
    */





}