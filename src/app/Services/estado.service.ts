import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/firestore';
import { Subject, Subscription } from 'rxjs';
import { Estado } from '../Models/estado';
import { UIService } from '../Shared/ui.service';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class EstadoService {

  private estados: Estado[] = [];
  private firestoreSubscription: Subscription;
  estadosChanged = new Subject<Estado[]>();

  constructor(
    private firestore: AngularFirestore,
    private uiService: UIService
  ) { }

  buscarEstados() {
    this.uiService.loadingStateChanged.next(true);
    this.firestoreSubscription = this.firestore
      .collection('estados')
      .snapshotChanges()
      .pipe(
        map((docArray) => {
          return docArray.map((doc: any) => {
            const estado = doc.payload.doc.data();
            const id = doc.payload.doc.id;

            estado.id = id;
            estado.descripcion = estado.descripcion;
            estado.color = estado.color;

            return estado;
          });
        })
      )
      .subscribe(
        (estados: Estado[]) => {
          this.estados = estados;
          this.estadosChanged.next([...this.estados]);
          this.uiService.loadingStateChanged.next(false);
        },
        (error) => {
          this.uiService.showSnackBar(
            'Hubo un error al intentar obtener los estados, por favor intente de nuevo',
            null,
            3000
          );
          this.uiService.loadingStateChanged.next(false);
        }
      );
  }

}
