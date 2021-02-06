import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/firestore';
import { Subject, Subscription } from 'rxjs';
import { map } from 'rxjs/operators';
import { SolicitudReserva } from '../Models/solicitudReserva';
import { UIService } from '../Shared/ui.service';
import firebase from "firebase/app";
import "firebase/functions";

@Injectable({
  providedIn: 'root'
})
export class SolicitudReservaService {

  private solicitudesReserva: SolicitudReserva[] = [];
  private firestoreSubscription: Subscription;
  solicitudReservaChanged = new Subject<SolicitudReserva[]>();

  
  constructor(private firestore: AngularFirestore,
    private uiService: UIService
  ) { }

  guardarSolicitudReserva(solicitud: SolicitudReserva) {

    solicitud.cliente = Object.assign(
      {},
      solicitud.cliente
    );

    const solicitudParse = Object.assign({}, solicitud);

    this.firestore
      .collection('solicitudReserva')
      .add(solicitudParse)
      .then(
        (response) =>
        {
          this.uiService.showSnackBar('Se envió un email a su dirección de correo electrónico con los datos de la solicitud', null, 3000);
          
        }
      )
      .catch(
        (error) =>
          this.uiService.showSnackBar(
            'Ocurrió un error al intentar guardar la solicitud: ' + error,
            null,
            3000
          )
      );

  }

  obtenerReservas() {
    this.uiService.loadingStateChanged.next(true);
    this.firestoreSubscription = this.firestore
      .collection('solicitudReserva')
      .snapshotChanges()
      .pipe(
        map((docArray) => {
          return docArray.map((doc: any) => {
            const reserva = doc.payload.doc.data();
            const id = doc.payload.doc.id;
            
            reserva.id = id;
            reserva.fechaDesde = reserva.fechaDesde;
            reserva.fechaHasta = reserva.fechaHasta;
            reserva.cantidadPersonas = reserva.cantidadPersonas;
            reserva.cliente = reserva.cliente;
            reserva.estado = reserva.estado;

            return reserva;
          });
        })
      )
      .subscribe(
        (reservas: SolicitudReserva[]) => {
          this.solicitudesReserva = reservas;
          this.solicitudReservaChanged.next([...this.solicitudesReserva]);
          this.uiService.loadingStateChanged.next(false);
        },
        (error) => {
          this.uiService.showSnackBar(
            'Hubo un error al intentar obtener la reserva, por favor intente de nuevo',
            null,
            3000
          );
          this.uiService.loadingStateChanged.next(false);
        }
      );
  }

}

