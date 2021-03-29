import { Component, Inject, OnInit } from '@angular/core';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Reserva } from 'src/app/Models/reserva.model';

export interface DialogDataSolicitudReserva {
  solicitudReserva: Reserva;
}

@Component({
  selector: 'app-detalle-reserva',
  templateUrl: './detalle-reserva.component.html',
  styleUrls: ['./detalle-reserva.component.scss']
})


export class DetalleReservaComponent implements OnInit {

  solicitudReserva: Reserva;

  constructor(@Inject(MAT_DIALOG_DATA) public data: DialogDataSolicitudReserva) { }

  ngOnInit(): void {

    if (this.data?.solicitudReserva != null) {
      this.solicitudReserva = this.data.solicitudReserva;

    }

  }
}
