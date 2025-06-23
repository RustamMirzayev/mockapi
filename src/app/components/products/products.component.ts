import { Component, inject, OnInit } from '@angular/core';
import { ProductService } from './product.service';
import { AsyncPipe, NgFor } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { RouterLink } from '@angular/router';
import { ButtonModule } from 'primeng/button';
import { ToolbarModule } from 'primeng/toolbar';
import { AvatarModule } from 'primeng/avatar';

@Component({
  selector: 'app-products',
  imports: [
    NgFor,
    FormsModule,
    RouterLink,
    AsyncPipe,
    ButtonModule,
    ToolbarModule,
    AvatarModule
  ],
  templateUrl: './products.component.html',
  styleUrl: './products.component.scss',
})
export class ProductsComponent implements OnInit {
  showEditModal: boolean = false;
  viewModal: boolean = false;
  editableProduct: any = {};
  private productservice: ProductService = inject(ProductService);

  products$ = this.productservice.products$;
  items: any;

  ngOnInit() {
    this.productservice.getAllProducts();
  }

  onView() {
    this.viewModal = !this.viewModal;
  }

  onShowModal() {
    this.showEditModal = !this.showEditModal;
  }

  openEditModal(product: any) {
    this.editableProduct = { ...product };
    this.showEditModal = !this.showEditModal;
  }

  saveChanges() {
    this.productservice
      .updateproduct(this.editableProduct.id, this.editableProduct)
      .subscribe((updated) => {
        this.showEditModal = !this.showEditModal;
        this.productservice.updateLocalProduct(updated);
      });
  }

  onDelete(productId: number) {
    this.productservice.deleteProduct(productId).subscribe(() => {
      this.productservice.removeProductFromList(productId);
    });
  }
}
