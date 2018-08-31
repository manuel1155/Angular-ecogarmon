import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, FormArray , Validators } from '@angular/forms';
import { AngularFirestore } from 'angularfire2/firestore';
import { UsuarioService } from '../servicios/usuario.service';
import { UsuarioInterface } from '../Models/usuarioInterface';
import { Router } from "@angular/router";

@Component({
  selector: 'app-add-usuario',
  templateUrl: './add-usuario.component.html',
  styleUrls: ['./add-usuario.component.css']
})
export class AddUsuarioComponent implements OnInit {
  
  today: number = Date.now();

  contar: number = 0 ;
  loading = false;
  success = false;

  myForm: FormGroup; 

  usuario: UsuarioInterface = {
    nombre:'',
    telefono: '',
    emails:[],
    fecha_reg: ''
  }

  constructor(private router: Router, private usuarioService : UsuarioService, private fb: FormBuilder, private afs: AngularFirestore ) { }

  ngOnInit() {
    this.myForm = this.fb.group({
      fecha: '',
      hora: '',
      nombre: ['', [
        Validators.required,
        Validators.pattern('^[a-zA-Z ]*$')
      ]],
      telefono: ['', [
        Validators.required,
        Validators.pattern('^[0-9 ]*$'),
        Validators.minLength(10),
      ]],
      contador: '',
      correos: this.fb.array([])
    })

    this.addCorreo();
  }

  onGuardarUsuario() {
    const today2 = Date.now();

    this.usuario.fecha_reg = today2;
    this.usuario.nombre = this.myForm.get('nombre').value;
    this.usuario.telefono = this.myForm.get('telefono').value;
    for(let i=0;i<this.correoForms.length;i++){
      this.usuario.emails.push(this.correoForms.controls[i].value);
    }
    this.usuarioService.addUsuario(this.usuario);

    this.usuario=null;
    this.correoForms.reset;
    this.router.navigate(['']);
  }



  get correoForms() {
    return this.myForm.get('correos') as FormArray
  }

  addCorreo() {

    const correo = this.fb.group({ 
      email: ['', [
        Validators.required,
        Validators.email
      ]],
    })

    this.correoForms.push(correo);
    this.contar = this.correoForms.length;
    return false;
  }

  deleteCorreo(i) {
    this.correoForms.removeAt(i);
    this.contar = this.correoForms.length;
  }

  get email() {
    return this.myForm.get('correos');
  }

  get nombre() {
    return this.myForm.get('nombre');
  }

  get telefono() {
    return this.myForm.get('telefono');
  }
}
