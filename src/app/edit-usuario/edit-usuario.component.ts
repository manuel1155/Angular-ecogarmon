import { ActivatedRoute,Router } from "@angular/router";
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, FormArray , Validators } from '@angular/forms';
import { AngularFirestore } from 'angularfire2/firestore';
import { UsuarioService } from '../servicios/usuario.service';
import { UsuarioInterface } from '../Models/usuarioInterface';

@Component({
  selector: 'app-edit-usuario',
  templateUrl: './edit-usuario.component.html',
  styleUrls: ['./edit-usuario.component.css']
})
export class EditUsuarioComponent implements OnInit {

  param: string;
  fecha_ref: any;

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


  constructor(private router: Router,private routeActive: ActivatedRoute,private usuarioService : UsuarioService, private fb: FormBuilder, private afs: AngularFirestore) { 

  }

  ngOnInit() {
    
    this.myForm = this.fb.group({
      fecha: '',
      hora: '',
      nombre: [this.usuario.nombre, [
        Validators.required,
        Validators.pattern('^[a-zA-Z ]*$')
      ]],
      telefono: [this.usuario.telefono, [
        Validators.required,
        Validators.pattern('^[0-9 ]*$'),
        Validators.minLength(10),
      ]],
      contador: '',
      correos: this.fb.array([])
    });

    this.param=this.routeActive.snapshot.params["id"];
    this.usuarioService.getUsuario(this.param).subscribe(usuario => {
      this.usuario = usuario;
      this.fecha_ref = new Date(this.usuario.fecha_reg);
      for (let i =0;i<this.usuario.emails.length;i++){
        this.addCorreo();
        this.correoForms.controls[i].setValue(this.usuario.emails[i]);
      }
    });
  }

  onActualizarUsuario() {
    const today2 = Date.now();

    this.usuario.fecha_reg = today2;
    this.usuario.nombre = this.myForm.get('nombre').value;
    this.usuario.telefono = this.myForm.get('telefono').value;
    this.usuario.emails = [];

    for(let i=0;i<this.correoForms.length;i++){
      this.usuario.emails.push(this.correoForms.controls[i].value);
      
    }

    for(let i=0;i<this.correoForms.length;i++){
      this.correoForms.removeAt(i);
    }
    
    this.usuarioService.actualizarUsuario(this.usuario,this.param);
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
