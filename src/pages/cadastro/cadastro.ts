import { Component } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';
import { Http } from '@angular/http';

// importou o tipo Carro para tiparmos a propriedade carro que guarda um objeto do tipo Carro
import { Carro } from '../../domain/carro/carro';

@Component({
  selector: 'page-cadastro',
  templateUrl: 'cadastro.html'
})
export class CadastroPage {

  public carro: Carro;
  public precoTotal: number;

  public nome: string;
  public endereco: string;
  public email: string;
  public data: string = new Date().toISOString();

  constructor(public navCtrl: NavController, 
              public navParams: NavParams,
              private _http: Http) {

    this.carro = navParams.get('carro');
    this.precoTotal = navParams.get('precoTotal');

  }

  agenda(){

    //Metodo de gravacao da api do cliente é GET deveria ser post , o fornecedor já está arrumando para ser post na proxima versao.
    

    let api = `https://aluracar.herokuapp.com/salvarpedido?carro=${this.carro.nome}&nome=${this.nome}&preco=${this.precoTotal}&endereco=${this.endereco}&email=${this.email}&dataAgendamento=${this.data}`;
     this._http.get(api)
            .toPromise()
            .then(() => alert('Sucesso'))
            .catch(erro => alert('Falha'));
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