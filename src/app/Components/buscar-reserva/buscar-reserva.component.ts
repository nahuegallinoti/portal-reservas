import { Component, OnInit } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { MatDialog, MatDialogRef } from '@angular/material/dialog';
import { Subscription } from 'rxjs';
import { SolicitudReserva } from 'src/app/Models/solicitudReserva';
import { SolicitudReservaService } from 'src/app/Services/solicitud-reserva.service';
import { UIService } from 'src/app/Shared/ui.service';
import { DetalleReservaComponent } from '../detalle-reserva/detalle-reserva.component';

@Component({
  selector: 'app-buscar-reserva',
  templateUrl: './buscar-reserva.component.html',
  styleUrls: ['./buscar-reserva.component.scss']
})
export class BuscarReservaComponent implements OnInit {

  reservaForm = this._formBuilder.group({
    codigoReserva: []
  });

  isLoading: boolean = false;
  solicitudesReserva: SolicitudReserva[] = [];
  solicitudesReservaSubscription: Subscription;
  reserva: SolicitudReserva;

  constructor(private _formBuilder: FormBuilder,
    public dialogRef: MatDialogRef<BuscarReservaComponent>,
    private _solicitudReserva: SolicitudReservaService,    
    private dialog: MatDialog
  ) { }

  ngOnInit(): void {
    this.solicitudesReservaSubscription = this._solicitudReserva.solicitudReservaChanged.subscribe(
      (reservas) => {
        this.solicitudesReserva = reservas;
      }
    )

    this._solicitudReserva.obtenerReservas();
  }

  buscarReserva(): void {

    this.isLoading = true;
    this.reserva = this.solicitudesReserva.find(reservas => reservas.id.toString() === this.reservaForm.value.codigoReserva);
    this.isLoading = false;

    const dialogRef = this.dialog.open(DetalleReservaComponent, {
      width: "30vw",
      height: "18vw",
      data: {
        solicitudReserva: this.reserva,
      }
    });


    dialogRef.afterClosed().subscribe(() => {
      console.log('The dialog was closed');
    });

  }

}
