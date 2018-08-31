import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { environment } from '../environments/environment';
import { AngularFirestoreModule } from 'angularfire2/firestore';
import { AngularFireModule } from 'angularfire2';
import { ReactiveFormsModule } from '@angular/forms';
import { FormsModule } from '@angular/forms';

import { UsuarioService } from './servicios/usuario.service';
import { RouterModule, Routes } from '@angular/router';

import { AppComponent } from './app.component';
import { ListaUsuariosComponent } from './lista-usuarios/lista-usuarios.component';
import { AddUsuarioComponent } from './add-usuario/add-usuario.component';
import { HeaderComponent } from './header/header.component';
import { EditUsuarioComponent } from './edit-usuario/edit-usuario.component';

const appRoutes: Routes = [
  { path: 'usuarios/alta', component: AddUsuarioComponent },
  { path: 'hero/:id',      component: HeaderComponent },
  { path: 'user/:id/editar', component:EditUsuarioComponent, pathMatch: 'full'}
];

@NgModule({
  declarations: [
    AppComponent,
    ListaUsuariosComponent,
    AddUsuarioComponent,
    HeaderComponent,
    EditUsuarioComponent
  ],
  imports: [
    BrowserModule,
    AngularFireModule.initializeApp(environment.firebaseConfig,'Ecogarmon'),
    AngularFirestoreModule,
    ReactiveFormsModule,
    FormsModule,
    RouterModule.forRoot(
      appRoutes,
      { enableTracing: false,
        onSameUrlNavigation: 'reload' } // <-- debugging purposes only
    )
    // other imports here
  ],
  providers: [UsuarioService],
  bootstrap: [AppComponent]
})
export class AppModule { }
