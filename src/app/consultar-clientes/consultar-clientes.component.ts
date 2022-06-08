import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';



@Component({
  selector: 'app-consultar-clientes',
  templateUrl: './consultar-clientes.component.html',
  styleUrls: ['./consultar-clientes.component.css']
})
export class ConsultarClientesComponent implements OnInit {

  //atributo
  clientes: any[] = []; //array vazio!

  mensagem_sucesso: string = '';
  mensagem_erro: string = '';


  constructor(
    private httpClient: HttpClient
  ) { }


  ngOnInit(): void {
    this.httpClient.get(environment.apiUrl + "/Clientes")
      .subscribe( //capturando o retorno
        data => {
         //armazenar o retorno da API no componente
         this.clientes = data as any[];          

        }
      )

  }

  //função para limpar as mensagens
 limparMensagens(): void {
  this.mensagem_sucesso = '';
  this.mensagem_erro = '';
}

excluircliente(idCliente: string) : void {
  if(window.confirm('Deseja realmente excluir o funcionário?')) {
    this.limparMensagens();
    this.httpClient.delete(environment.apiUrl + "/clientes/" + idCliente)
      .subscribe(
      (data:any) => {
        this.mensagem_sucesso = data.mensagem;
        this.ngOnInit();
      },
      e => {
        //verificar o tipo do erro obtido
        switch(e.status) { //código do erro
          case 422:
            this.mensagem_erro = e.error.mensagem;
            break;
          case 500:
            this.mensagem_erro = "Erro! Entre  em contato com o suporte.";
            break;
        }
      }
    )
  }
}

}
