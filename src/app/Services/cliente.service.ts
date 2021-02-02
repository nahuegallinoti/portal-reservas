import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/firestore';
import { Cliente } from '../Models/cliente';
import { UIService } from '../Shared/ui.service';

@Injectable({
  providedIn: 'root'
})
export class ClienteService {

  constructor(private firestore: AngularFirestore,
              private uiService: UIService
  ) { }

  guardarCliente(cliente: Cliente) {
    const clienteParse =  Object.assign({}, cliente);

    this.firestore
      .collection('clientes')
      .add(clienteParse)
      .then(
        (response) =>
        this.uiService.showSnackBar(
          'Se registraron sus datos con éxito',
          null,
          3000
        )
      )
      .catch(
        (error) =>
        this.uiService.showSnackBar(
          'Ocurrió un error al intentar guardar los datos: ' + error,
          null,
          3000
        )
      );

  }
}
