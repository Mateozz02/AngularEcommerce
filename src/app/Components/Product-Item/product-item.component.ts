import { Component, EventEmitter, Input, Output, signal } from "@angular/core";
import { Product } from "../../Models/products.model";
import { FormsModule, NgModel } from "@angular/forms";

@Component({
    standalone : true,
    selector : 'product-item',
    imports : [FormsModule],
    templateUrl : './product-item.component.html',
    styles : `
           .card {
  background-color: #fff;
  border-radius: 12px;
  box-shadow: 0 4px 8px rgba(0,0,0,0.1);
  padding: 1rem;
  transition: transform 0.2s, box-shadow 0.2s;
  display: flex;
  flex-direction: column;
  align-items: center;
  text-align: center;
}

.card:hover {
  transform: translateY(-4px);
  box-shadow: 0 8px 16px rgba(0,0,0,0.15);
}

.card img {
  width: 100%;
  max-width: 150px;
  height: auto;
  object-fit: contain;
  margin-bottom: 1rem;
}

.card h3 {
  font-size: 1.1rem;
  margin: 0.5rem 0;
  color: #333;
}

.card p {
  font-size: 0.95rem;
  margin: 0.25rem 0;
  color: #666;
}

.actions {
  margin-top: 0.75rem;
  display: flex;
  gap: 0.5rem;
}

button {
  padding: 0.4rem 0.8rem;
  border: none;
  border-radius: 8px;
  cursor: pointer;
  font-weight: 500;
  transition: background-color 0.2s, transform 0.2s;
}

button:hover {
  transform: translateY(-2px);
}

button:nth-child(1) { background-color: #e74c3c; color: #fff; } /* Eliminar */
button:nth-child(2) { background-color: #3498db; color: #fff; } /* Editar */
button:nth-child(3) { background-color: #2ecc71; color: #fff; } /* Guardar */
`,
})
export class ProductItem {
    @Input({required : true}) product! : Product;
    @Output() onDelete = new EventEmitter<number>();
    @Output() onUpdate = new EventEmitter<Product>();


    editMode = signal(false);
    editedTitle = signal('');

  toggleEdit() {
    this.editMode.set(!this.editMode());
    this.editedTitle.set(this.product.title);
  }

  save() {
    // Emitimos el objeto actualizado
    this.onUpdate.emit({ ...this.product, title: this.editedTitle() });
    // Cerramos modo edición
    this.editMode.set(false);
  }

  delete() {
    this.onDelete.emit(this.product.id);
  }

  // Método auxiliar para bind del input
  onInput(event: Event) {
    const value = (event.target as HTMLInputElement).value;
    this.editedTitle.set(value);
  }

}