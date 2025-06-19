import { Component, OnInit } from '@angular/core';
import { ProductService } from './product.service';
import { NgClass, NgFor } from '@angular/common';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-products',
  imports: [NgFor, NgClass, FormsModule],
  templateUrl: './products.component.html',
  styleUrl: './products.component.scss',
})
export class ProductsComponent implements OnInit {
  products: any[] = [];
  viewModal: boolean = false;
  newProduct = {
    category: '',
    description: '',
    img: '',
    price: 0,
    title: '',
  };

  constructor(private productservice: ProductService) {}

  ngOnInit() {
    this.productservice.getAllProducts().subscribe((data) => {
      this.products = data;
    });
  }

  onSubmit() {
    this.productservice.addProducts(this.newProduct).subscribe({
      next: (res) => {
        console.log('succes');
        this.products.push(res);
        this.viewModal = false;
        this.newProduct = {
          category: '',
          description: '',
          img: '',
          price: 0,
          title: '',
        };
      },
      error: () => {
        console.log('Error');
      },
    });
  }

  onView() {
    this.viewModal = !this.viewModal;
  }
}
