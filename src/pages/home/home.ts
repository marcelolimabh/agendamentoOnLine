import { Component, OnInit } from '@angular/core';
import { NavController, LoadingController, AlertController } from 'ionic-angular';
import { Http } from '@angular/http';
import { EscolhaPage } from '../escolha/escolha';

@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage implements OnInit {


  public carros;

  constructor(public navCtrl: NavController, private _http: Http, private loadCtrl: LoadingController, private _alertCtrl: AlertController) {




  }

  ngOnInit(): void {
    let loader = this.loadCtrl.create({
      content: 'Buscando novos carros...'
    });
    loader.present();
    this._http
      .get('https://aluracar.herokuapp.com')
      .map(res => res.json())
      .toPromise().then(carros => {
        this.carros = carros;
        loader.dismiss();
      })
      .catch(err => {
        loader.dismiss();
        console.log(err);
        this._alertCtrl.create({
          title: 'Falha na Conexão!',
          subTitle: 'Ocorreu um problema ao tentar conectar no servidor. Favor tentar mais tarde!',
          buttons: [{ text: 'Fechar' }]
        }).present();
      });

  }

  seleciona(carro){
    this.navCtrl.push(EscolhaPage, {carroSelecionado: carro});
    console.log(carro.nome);
  }

}
