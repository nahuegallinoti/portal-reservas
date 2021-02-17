import { Injectable } from '@angular/core';
import axios from 'axios';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class EmailService {

  constructor() { }

  enviarEmailRegistroSolicitud(codigoReserva) {

    axios.post(environment.functionMailSolicitudReserva,
      {
        destinatario: "nahuegallinoti@gmail.com",
        html: `<p>Su solicitud de reserva se registró correctamente.</p>
        <p>Puede consultar el estado de su reserva presionando sobre el link</p> 
        <a href="https://portal-reservas.web.app/">Portal de Reservas</a>         
        <h3>Ingresando el código de reserva: ` + codigoReserva + `</h3>`
      })
      .then(function (response) {
        console.log(response);
      })
      .catch(function (error) {
        console.log(error);
      });

  }

}
