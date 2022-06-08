import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { HttpClient } from '@angular/common/http';
import { ActivatedRoute } from '@angular/router';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-editar-clientes',
  templateUrl: './editar-clientes.component.html',
  styleUrls: ['./editar-clientes.component.css']
})
export class EditarClientesComponent implements OnInit {

  //atributos
  mensagem_sucesso: string = '';
  mensagem_erro: string = '';

  constructor(
    //inicializando por injeção de dependência
    private httpClient: HttpClient,
    private activatedRoute: ActivatedRoute
    ) { }

  //criando o modelo do formulário
  formEdicao = new FormGroup({
    // id clienete oculto
    idCliente : new FormControl('',[]),

    //campo para preenchimento do nomeFantasia
    nome: new FormControl('', [
      Validators.required, //campo obrigatório
      Validators.minLength(10), //mínimo de caracteres
      Validators.maxLength(150), //máximo de caracteres
    ]),

    //campo para preenchimento do razaoSocial
    email: new FormControl('', [
      Validators.required, //campo obrigatório
      Validators.minLength(10), //mínimo de caracteres
      Validators.maxLength(150), //máximo de caracteres
    ]),

    //campo para preenchimento do cnpj
    cpf: new FormControl('', [
      Validators.required,
      Validators.maxLength(60), //máximo de caracteres
    ]),
    dataNascimento: new FormControl('', [
      Validators.required
    ])


  });


  ngOnInit(): void {
    const idCliente = this.activatedRoute.snapshot.paramMap.get('idCliente');
    //consultar a empresa na API atraves do ID
      this.httpClient.get(environment.apiUrl + "/clientes/" + idCliente)
      .subscribe(
    (data:any) => {
      //populando o formulário
        data.dataNascimento = data.dataNascimento.split('T')[0];
        this.formEdicao.patchValue(data);
        }  
      )
  }

  //função para acessar os campos do formulário na página HTML
  get form(): any {
    return this.formEdicao.controls;
  }

 //função para limpar as mensagens
 limparMensagens(): void {
  this.mensagem_sucesso = '';
  this.mensagem_erro = '';
}

onSubmit() : void{
    this.limparMensagens();
    //fazendo a requisição para a API..
    this.httpClient.put(environment.apiUrl + "/Clientes", this.formEdicao.value)
    .subscribe(
    (data:any) => { //retorno de sucesso 2xx
      //exibir mensagem de sucesso na página
      this.mensagem_sucesso = data.mensagem;
      this.formEdicao.reset();
    },
    e => { //retorno de erro 4xx ou 5xx
        //verificar o tipo do erro obtido
        switch(e.status) { //código do erro
        case 400:
          this.mensagem_erro = 'Ocorreram erros de validação nos dados enviados.';
        break;
        case 422:
        this.mensagem_erro = e.error.message;
        break;
        case 500:
          this.mensagem_erro = "Erro! Entre em contato com o suporte.";
        break;
      }
    }
  )  
}



}
