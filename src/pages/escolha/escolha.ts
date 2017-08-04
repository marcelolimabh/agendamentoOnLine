import { Component } from '@angular/core'
import { NavParams, NavController } from 'ionic-angular'
import { Carro } from '../../domain/carro/carro';
import { Acessorio } from '../../domain/carro/acessorio';
import { CadastroPage } from '../cadastro/cadastro';



@Component({
    templateUrl: 'escolha.html'
})
export class EscolhaPage {

    public carro: Carro;

    public acessorios: Acessorio[];


    private _precoTotal: number;

    constructor(public navParams: NavParams, public navCtrl: NavController) {
        this.carro = this.navParams.get('carroSelecionado');
        this.acessorios = [
            new Acessorio('Freio',800),
            new Acessorio('Ar-condicionado',1000),
            new Acessorio('MP3 Player',500)
        ];

        this._precoTotal = this.carro.preco;

    }

    get precoTotal(){

        return this._precoTotal;
    }


    atualizaTotal(ligado: boolean, acessorio: Acessorio){
           
        ligado ? this._precoTotal += acessorio.preco : this._precoTotal -= acessorio.preco;
    }

    avancaNoAgendamento(){
      this.navCtrl.push(CadastroPage, {
            carro: this.carro, 
            precoTotal: this._precoTotal
        });
    }


}