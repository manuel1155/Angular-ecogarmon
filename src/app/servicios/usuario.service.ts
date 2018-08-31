import { Injectable } from '@angular/core';
import { AngularFirestore, AngularFirestoreCollection, AngularFirestoreDocument } from 'angularfire2/firestore';
import { UsuarioInterface } from '../Models/usuarioInterface';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class UsuarioService {

  usuariosCollection: AngularFirestoreCollection<UsuarioInterface>;
  usuarios: Observable<UsuarioInterface[]>;
  usuario: Observable<UsuarioInterface>;
  usuariosDoc: AngularFirestoreDocument<UsuarioInterface>

  constructor(public afs: AngularFirestore) { 
    //this.usuarios = afs.collection('usuarios').valueChanges();
    this.usuariosCollection = afs.collection<UsuarioInterface>('usuarios');
    this.usuarios = this.usuariosCollection.snapshotChanges().pipe(
      map(actions => actions.map(a => {
        const data = a.payload.doc.data() as UsuarioInterface;
        const id = a.payload.doc.id;
        return { id, ...data };
      }))
    );
  }

  getUsuarios(){
    return this.usuarios;
  }

  addUsuario(usuario: UsuarioInterface){
    this.usuariosCollection.add(usuario);
  }

  eliminarUsuario(usuario: UsuarioInterface){
    this.usuariosDoc = this.afs.doc(`usuarios/${usuario.id}`);
    this.usuariosDoc.delete();
  }

  actualizarUsuario(usuario: UsuarioInterface,id :string){
    this.usuariosDoc = this.afs.doc(`usuarios/${id}`);
    this.usuariosDoc.update(usuario);
  }

  getUsuario(id: string){
    this.usuariosDoc = this.afs.doc(`usuarios/${id}`);
    this.usuario = this.usuariosDoc.valueChanges();
    return this.usuario;
  }

}
