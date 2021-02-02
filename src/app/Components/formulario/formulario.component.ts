import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { MatDialogRef } from '@angular/material/dialog';
import { Cliente } from 'src/app/Models/cliente';
import { ClienteService } from 'src/app/Services/cliente.service';

@Component({
  selector: 'app-formulario',
  templateUrl: './formulario.component.html',
  styleUrls: ['./formulario.component.scss']
})
export class FormularioComponent implements OnInit {

  datosPersonalesForm: FormGroup;

  constructor(private _formBuilder: FormBuilder,
    public dialogRef: MatDialogRef<FormularioComponent>,
    private _clienteService: ClienteService

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

  }

  cancelarRegistro(): void {
    this.dialogRef.close();
  }

  guardarRegistro(): void {
    let cliente = new Cliente();
    
    cliente.nombre = this.datosPersonalesForm.value.nombre;
    cliente.apellidos = this.datosPersonalesForm.value.apellidos;
    cliente.telefono = this.datosPersonalesForm.value.telefono;
    cliente.email = this.datosPersonalesForm.value.email;
    cliente.cantidadPersonas = this.datosPersonalesForm.value.cantidadPersonas;
    cliente.fechaDesde = this.datosPersonalesForm.value.fechaDesde;
    cliente.fechaHasta = this.datosPersonalesForm.value.fechaHasta;
    
    this._clienteService.guardarCliente(cliente);
    this.dialogRef.close();

  }

}
