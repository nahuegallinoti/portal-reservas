import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { MatDialogRef } from '@angular/material/dialog';
import { Subscription } from 'rxjs';
import { Cliente } from 'src/app/Models/cliente';
import { Estado } from 'src/app/Models/estado';
import { EmailService } from 'src/app/Services/email.service';
import { EstadoService } from 'src/app/Services/estado.service';
import { SolicitudReservaService } from 'src/app/Services/solicitud-reserva.service';
import * as moment from 'moment';
import { CabanaService } from 'src/app/Services/cabana.service';
import { Cabana } from 'src/app/Models/cabana.model';
import { Reserva } from 'src/app/Models/reserva.model';

@Component({
  selector: 'app-formulario',
  templateUrl: './formulario.component.html',
  styleUrls: ['./formulario.component.scss']
})
export class FormularioComponent implements OnInit {

  datosPersonalesForm: FormGroup;
  estados: Estado[];
  estadosSubscription: Subscription;
  cabanasSubscription: Subscription;
  cabanas: Cabana[] = [];


  constructor(private _formBuilder: FormBuilder,
    public dialogRef: MatDialogRef<FormularioComponent>,
    private _solicitudReserva: SolicitudReservaService,
    private _estado: EstadoService,
    private _email: EmailService,
    private _cabana: CabanaService,

  ) { }

  ngOnInit(): void {
    this.datosPersonalesForm = this._formBuilder.group({
      nombre: [],
      apellidos: [],
      telefono: [],
      email: [],
      fechaDesde: [],
      fechaHasta: [],
      cantidadPersonas: [1],
      total: [0],
      nroDocumento: []
    });

    this.cabanasSubscription = this._cabana.cabanasChanged.subscribe(
      (cabanas) => {
        this.cabanas = cabanas;
      }
    );


    this.estadosSubscription = this._estado.estadosChanged.subscribe(
      (estados) => {
        this.estados = estados;
      }
    );

    this._cabana.obtenerCabanias();
    this._estado.buscarEstados();


  }

  calcularSubTotal() {
    const fechaDesde = moment(this.datosPersonalesForm.value.fechaDesde);
    const fechaHasta = moment(this.datosPersonalesForm.value.fechaHasta);

    const cantOcupantes = this.datosPersonalesForm.value.cantidadPersonas;

    const cantDias = fechaHasta.diff(fechaDesde, 'days') + 1;

    const cabanasFilt = this.cabanas.filter(x => x.capacidad >= cantOcupantes);

    cabanasFilt.sort(function (a, b) {
      return a.capacidad - b.capacidad;
    });

    if (cabanasFilt.length == 0) {
      return;
    }

    let cabanaSelected = cabanasFilt[0];

    //TODO aqui se deberia sumar la tarifa fija segun epoca del año en ves de 1500
    const total = 1500 * cantOcupantes * cantDias + cabanaSelected.precioDia;

    this.datosPersonalesForm.controls.total.setValue(total);

  }

  cancelarRegistro(): void {
    this.dialogRef.close();
  }

  guardarRegistro(): void {
    let solicitudReserva = new Reserva();
    solicitudReserva.cliente = new Cliente();
    solicitudReserva.estado = new Estado();

    solicitudReserva.cliente.nombre = this.datosPersonalesForm.value.nombre;
    solicitudReserva.cliente.apellidos = this.datosPersonalesForm.value.apellidos;
    solicitudReserva.cliente.telefono = this.datosPersonalesForm.value.telefono;
    solicitudReserva.cliente.email = this.datosPersonalesForm.value.email;
    solicitudReserva.cliente.dni = this.datosPersonalesForm.value.nroDocumento;
    solicitudReserva.cantOcupantes = this.datosPersonalesForm.value.cantidadPersonas;
    solicitudReserva.fechaDesde = new Date(this.datosPersonalesForm.value.fechaDesde);
    solicitudReserva.fechaDesde.setDate(solicitudReserva.fechaDesde.getDate() + 1);
    solicitudReserva.fechaHasta = new Date(this.datosPersonalesForm.value.fechaHasta);
    solicitudReserva.fechaHasta.setDate(solicitudReserva.fechaHasta.getDate() + 1);
    solicitudReserva.codigoReserva = Math.round(Math.random() * (1000 - 12) + 123);
    solicitudReserva.estado = this.estados.find(e => e.descripcion.toLowerCase() == "pendiente de aprobacion");
    solicitudReserva.montoTotal = this.datosPersonalesForm.value.total;
    solicitudReserva.disabled = true;
    solicitudReserva.fechaCreacion = new Date();
    solicitudReserva.montoSenia = 0;
    solicitudReserva.realizoCheckIn = false;
    solicitudReserva.realizoCheckOut = false;

    this._solicitudReserva.guardarSolicitudReserva(solicitudReserva);
    this._email.enviarEmailRegistroSolicitud(solicitudReserva.codigoReserva, solicitudReserva.cliente.email);
    this.dialogRef.close();

  }

}
