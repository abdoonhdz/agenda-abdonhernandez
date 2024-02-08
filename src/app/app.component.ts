import { Component, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterOutlet } from '@angular/router';
import { Agenda } from './model/agenda.model';
import { FormControl, ReactiveFormsModule, Validators } from '@angular/forms';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [CommonModule, RouterOutlet, ReactiveFormsModule], 
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent {
  title = 'agenda-telefono';

  mostrarModal: boolean = false;
  cerrarModal() {
    this.mostrarModal = false;
  }
  anadirContacto() {
    this.mostrarModal = true;
  }

  contactos = signal<Agenda[]>([]);
  nombre = signal('');
  telefono = signal('');

  borrarContacto(id: number) {
    this.contactos.update((contactos) => contactos.filter((contacto) => contacto.id !== id));
  }

  borrarAgenda() {
    this.contactos.set([]);
  }
  
  agregarContacto() {
    if (this.nombre() !== '' && this.telefono() !== '') {
      this.contactos.set([
        ...this.contactos(),
        {
          id: this.contactos().length,
          nombre: this.nombre(),
          telefono: this.telefono()
        }
      ]);
      this.nombre.set('');
      this.telefono.set('');
      this.cerrarModal();
    }
  }

  nombreContacto(e: Event) {
    this.nombre.set((e.target as HTMLInputElement).value);
  }

  telefonoContacto(e: Event) {
    const input = (e.target as HTMLInputElement).value;
    const soloNumeros = /^\d+$/;
  
    if (soloNumeros.test(input)) {
      this.telefono.set(input);
    }    
  }

  telefonoControl = new FormControl('',{
    nonNullable: true,
    validators: [
      Validators.minLength(9)
    ]
  })

  nombreControl = new FormControl('', 
  {
   nonNullable: true,
   validators: [
    Validators.minLength(5)
   ] 
  });

}
