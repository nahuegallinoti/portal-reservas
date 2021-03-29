import { Cabana } from './cabana.model';
import { Cliente } from './cliente';
import { Estado } from './estado';

export class Reserva {
  id: number;
  cabana?: Cabana;
  cliente?: Cliente;
  estado: Estado;
  cantOcupantes: number;
  codigoReserva: number;
  disabled: boolean;
  fechaCreacion: Date;
  fechaDesde: Date;
  fechaHasta: Date;
  montoSenia: number;
  montoTotal: number;
  realizoCheckIn: boolean;
  realizoCheckOut: boolean;
}
