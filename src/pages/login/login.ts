import { Component } from '@angular/core';
import { NavController, NavParams, AlertController } from 'ionic-angular';
import { HomePage } from '../home/home';
import { UsuarioService } from '../../domain/usuario/usuario-service'

@Component({
  selector: 'page-login',
  templateUrl: 'login.html'
})
export class LoginPage {

  public email: string;

  public senha: string;


  constructor(public navCtrl: NavController, 
    public navParams: NavParams,
      private _service: UsuarioService,
     private _alertCtrl: AlertController) {}

 
  efetuaLogin(){
    this._service.efetuaLogin(this.email,this.senha)
    .then(()=>{
        this.navCtrl.setRoot(HomePage);
    }).catch(() =>{

      this._alertCtrl.create({
        title: 'Falha Login',
        subTitle: 'Usuário ou senha inválidos. Favor verificar.',
        buttons: [{text: 'Fechar'}]

      }).present();
    });
    

  }

}
