import { Component, inject } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { ProductService } from '../products/product.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-addproduct',
  imports: [FormsModule],
  templateUrl: './addproduct.component.html',
  styleUrl: './addproduct.component.scss',
})
export class AddproductComponent {
  private productservice: ProductService = inject(ProductService);
  private router: Router = inject(Router);

  newProduct = {
    category: '',
    description: '',
    img: '',
    price: 0,
    title: '',
  };

  onSubmit() {
    this.productservice.addProducts(this.newProduct).subscribe({
      next: (res: any) => {
        this.productservice.addProductToList(res);
        this.newProduct = {
          category: '',
          description: '',
          img: '',
          price: 0,
          title: '',
        };
      },
      error: () => {
        console.log('error');
      },
    });

    this.router.navigate(['/']);
  }
}
