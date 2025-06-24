import { Component, HostListener, inject, OnInit } from '@angular/core';
import { ProductService } from './product.service';
import { AsyncPipe, NgClass } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { RouterLink } from '@angular/router';
import { ButtonModule } from 'primeng/button';
import { ToolbarModule } from 'primeng/toolbar';
import { AvatarModule } from 'primeng/avatar';

@Component({
  selector: 'app-products',
  imports: [
    FormsModule,
    RouterLink,
    AsyncPipe,
    ButtonModule,
    ToolbarModule,
    AvatarModule,
    NgClass,
  ],
  templateUrl: './products.component.html',
  styleUrl: './products.component.scss',
})
export class ProductsComponent implements OnInit {
  showEditModal: boolean = false;
  viewModal: boolean = false;
  editableProduct: any = {};
  isSticky = false;
  items: any;

  private productservice: ProductService = inject(ProductService);

  products$ = this.productservice.products$;
  loading$ = this.productservice.loading$;

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

  @HostListener('window:scroll', [])
  onWindowScroll() {
    this.isSticky = window.scrollY > 200;
  }
}
