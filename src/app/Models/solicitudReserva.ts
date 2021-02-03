import { Cliente } from "./cliente";
import { Estado } from "./estado";

export class SolicitudReserva {
    id: number;
    fechaDesde: Date;
    fechaHasta: Date;
    cantidadPersonas: number;
    cliente: Cliente;
    estado: Estado;
  }

  