import { Component, Inject, OnInit } from '@angular/core';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';
import { SolicitudReserva } from 'src/app/Models/solicitudReserva';

export interface DialogDataSolicitudReserva {
  solicitudReserva: SolicitudReserva;
}

@Component({
  selector: 'app-detalle-reserva',
  templateUrl: './detalle-reserva.component.html',
  styleUrls: ['./detalle-reserva.component.scss']
})


export class DetalleReservaComponent implements OnInit {

  solicitudReserva: SolicitudReserva;

  constructor(@Inject(MAT_DIALOG_DATA) public data: DialogDataSolicitudReserva) { }

  ngOnInit(): void {

    if (this.data?.solicitudReserva != null) {
      this.solicitudReserva = this.data.solicitudReserva;

    }

  }
}
