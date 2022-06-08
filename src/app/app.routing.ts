import { NgModule } from "@angular/core";
import { Routes, RouterModule } from '@angular/router';


import { CadastrarClientesComponent } from "./cadastrar-clientes/cadastrar-clientes.component";
import { ConsultarClientesComponent } from './consultar-clientes/consultar-clientes.component';
import { EditarClientesComponent } from './editar-clientes/editar-clientes.component';

//mapeamento das rotas dos componentes
const routes: Routes = [
    { path : 'cadastrar-clientes', 
              component: CadastrarClientesComponent },
    { path : 'consultar-clientes', 
              component: ConsultarClientesComponent },
    { path : 'editar-clientes/:idCliente', 
              component: EditarClientesComponent },
];

//registrando as rotas mapeadas
@NgModule({
    imports: [RouterModule.forRoot(routes)],
    exports: [RouterModule]
})

//exportando este modulo de configuração
export class AppRoutingModule { }
