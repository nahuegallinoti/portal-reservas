import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { MatDialogRef } from '@angular/material/dialog';
import { Subscription } from 'rxjs';
import { Cliente } from 'src/app/Models/cliente';
import { Estado } from 'src/app/Models/estado';
import { SolicitudReserva } from 'src/app/Models/solicitudReserva';
import { EstadoService } from 'src/app/Services/estado.service';
import { SolicitudReservaService } from 'src/app/Services/solicitud-reserva.service';

@Component({
  selector: 'app-formulario',
  templateUrl: './formulario.component.html',
  styleUrls: ['./formulario.component.scss']
})
export class FormularioComponent implements OnInit {

  datosPersonalesForm: FormGroup;
  estados: Estado[];
  estadosSubscription: Subscription;


  constructor(private _formBuilder: FormBuilder,
    public dialogRef: MatDialogRef<FormularioComponent>,
    private _solicitudReserva: SolicitudReservaService,
    private _estado: EstadoService
    ) { }

  ngOnInit(): void {
    this.datosPersonalesForm = this._formBuilder.group({
      nombre: [],
      apellidos: [],
      telefono: [],
      email: [],
      fechaDesde: [],
      fechaHasta: [],
      cantidadPersonas: [],

    });

    this.estadosSubscription = this._estado.estadosChanged.subscribe(
      (estados) => {
        this.estados = estados;
      }
    );

    this._estado.buscarEstados();


  }

  cancelarRegistro(): void {
    this.dialogRef.close();
  }

  guardarRegistro(): void {
    let solicitudReserva = new SolicitudReserva();
    solicitudReserva.cliente = new Cliente();
    solicitudReserva.estado = new Estado();

    solicitudReserva.cliente.nombre = this.datosPersonalesForm.value.nombre;
    solicitudReserva.cliente.apellidos = this.datosPersonalesForm.value.apellidos;
    solicitudReserva.cliente.telefono = this.datosPersonalesForm.value.telefono;
    solicitudReserva.cliente.email = this.datosPersonalesForm.value.email;
    solicitudReserva.cantidadPersonas = this.datosPersonalesForm.value.cantidadPersonas;
    solicitudReserva.fechaDesde = this.datosPersonalesForm.value.fechaDesde;
    solicitudReserva.fechaHasta = this.datosPersonalesForm.value.fechaHasta;
    
    solicitudReserva.estado = this.estados.find(e => e.descripcion.toLowerCase() == "pendiente aprobacion");

    this._solicitudReserva.guardarSolicitudReserva(solicitudReserva);
    this.dialogRef.close();

  }

}
