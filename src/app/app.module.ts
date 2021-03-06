import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { CarouselComponent } from './Components/carousel/carousel.component';
import { FormularioComponent } from './Components/formulario/formulario.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MaterialModule } from './material.module';
import { UIService } from './Shared/ui.service';

// Firebase
import { AngularFireModule } from '@angular/fire';
import { environment } from '../environments/environment';
import { AngularFirestoreModule } from '@angular/fire/firestore';
import { MenuComponent } from './Components/menu/menu.component';
import { BuscarReservaComponent } from './Components/buscar-reserva/buscar-reserva.component';
import { DetalleReservaComponent } from './Components/detalle-reserva/detalle-reserva.component';

@NgModule({
  declarations: [
    AppComponent,
    CarouselComponent,
    FormularioComponent,
    MenuComponent,
    BuscarReservaComponent,
    DetalleReservaComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    NgbModule,
    FormsModule,
    ReactiveFormsModule,
    MaterialModule,
    AngularFireModule.initializeApp(environment.firebase),
    AngularFirestoreModule
  ],
  providers: [UIService],
  bootstrap: [AppComponent]
})
export class AppModule { }
