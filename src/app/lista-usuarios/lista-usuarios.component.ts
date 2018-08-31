import { Component, OnInit } from '@angular/core';
import { UsuarioService } from '../servicios/usuario.service';
import { UsuarioInterface } from '../Models/usuarioInterface';

import { Injectable } from '@angular/core';


@Component({
  selector: 'app-lista-usuarios',
  templateUrl: './lista-usuarios.component.html',
  styleUrls: ['./lista-usuarios.component.css']
})

@Injectable()
export class ListaUsuariosComponent implements OnInit {

  usuarios : UsuarioInterface[];

  constructor(private usuarioService: UsuarioService) { 

  }

  ngOnInit() {
    this.usuarioService.getUsuarios().subscribe(usuarios => {
      this.usuarios = usuarios;
    });
  } 

  eliminarUsuario(event, usuario: UsuarioInterface) {
    this.usuarioService.eliminarUsuario(usuario);
  }

}
