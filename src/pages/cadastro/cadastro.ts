import { Component } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';

// importou o tipo Carro para tiparmos a propriedade carro que guarda um objeto do tipo Carro
import { Carro } from '../../domain/carro/carro';

@Component({
  selector: 'page-cadastro',
  templateUrl: 'cadastro.html'
})
export class CadastroPage {

  public carro: Carro;
  public precoTotal: number;

  constructor(public navCtrl: NavController, public navParams: NavParams) {

    this.carro = navParams.get('carro');
    this.precoTotal = navParams.get('precoTotal');

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