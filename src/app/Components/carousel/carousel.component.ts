import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { BuscarReservaComponent } from '../buscar-reserva/buscar-reserva.component';
import { FormularioComponent } from '../formulario/formulario.component';

@Component({
  selector: 'app-carousel',
  templateUrl: './carousel.component.html',
  styleUrls: ['./carousel.component.scss']
})
export class CarouselComponent implements OnInit {

  constructor(private dialog: MatDialog
    ) { }

  ngOnInit(): void {
  }

  openDialogEnviarDatos(): void 
  { 
    const dialogRef = this.dialog.open(FormularioComponent, {
      width: "35vw",
      height: "30vw",

    });


    dialogRef.afterClosed().subscribe(() => {
      console.log('The dialog was closed');
    });

  }

  openDialogBuscarReserva(): void 
  { 
    const dialogRef = this.dialog.open(BuscarReservaComponent, {
      width: "25vw",
      height: "15vw",

    });


    dialogRef.afterClosed().subscribe(() => {
      console.log('The dialog was closed');
    });

  }
}
