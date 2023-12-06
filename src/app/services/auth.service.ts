import { Injectable } from '@angular/core';
import {
  Auth,
  createUserWithEmailAndPassword,
  GoogleAuthProvider,
  onAuthStateChanged,
  sendPasswordResetEmail,
  signInWithEmailAndPassword,
  signInWithPopup,
  signOut,
  sendEmailVerification,
  User
} from "@angular/fire/auth";
import { SharedService } from './share.service';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor(private auth: Auth, private sharedService: SharedService ) { }

  getuser()
  {
    return this.auth.currentUser;
  }

  register(email: string, pass: string){
    return createUserWithEmailAndPassword(this.auth, email, pass)
      .then((userCredential) => {
        // Después de una exitosa autenticación, obtén los datos del usuario
        const userData = this.obtenerDatosUsuario(userCredential.user);
        // Almacena los datos del usuario en el servicio compartido
        this.sharedService.setUserData(userData);
        return userCredential;
      });
  }

  loginwithcredentials(user:string, pass:string){
    return signInWithEmailAndPassword(this.auth, user, pass)
      .then((userCredential) => {
        // Después de una exitosa autenticación, obtén los datos del usuario
        const userData = this.obtenerDatosUsuario(userCredential.user);
        // Almacena los datos del usuario en el servicio compartido
        this.sharedService.setUserData(userData);
        return userCredential;
      });
  }

  loginwithgoogle()
  {
    return signInWithPopup(this.auth, new GoogleAuthProvider())
      .then((userCredential) => {
        // Después de una exitosa autenticación, obtén los datos del usuario
        const userData = this.obtenerDatosUsuario(userCredential.user);
        // Almacena los datos del usuario en el servicio compartido
        this.sharedService.setUserData(userData);
        return userCredential;
      });
  }

  async logOut(){
    return signOut(this.auth);
  }

  private obtenerDatosUsuario(user: User | null): any {
    // Aquí puedes obtener y devolver los datos que necesitas del usuario
    if (user) {
      return {
        uid: user.uid,
        email: user.email,
        // Otros campos del usuario...
      };
    } else {
      return {};
    }
  }
  


}
