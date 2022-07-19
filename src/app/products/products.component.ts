import { Component, OnInit } from '@angular/core';
import { Product } from '../model/product';
import { ProductService } from '../services/product.service';

@Component({
  selector: 'app-products',
  templateUrl: './products.component.html',
  styleUrls: ['./products.component.css']
})
export class ProductsComponent implements OnInit {

  public products! : Array<Product>;
  public errorMessage!: string;

  constructor(private ps : ProductService) { }

  ngOnInit(): void {
    this.handleGetAllProducts();
  }

  handleGetAllProducts() {
    this.ps.getAllProducts().subscribe({
      next : (data) => {
      this.products = data;
    },
    error : (err) => {
      this.errorMessage = err;
    }
      }
    );
  }

  removeProduct(p : Product) {
    this.ps.deleteProduct(p.id).subscribe({
      next : (data) => {
        if (data)
          this.products.splice(this.products.indexOf(p), 1);
      },
      error : (err) => {
        this.errorMessage = err;
      }
    });
  }

  handleTogglePromo(p : Product) {
    let old : boolean = p.promotion;
    this.ps.togglePromo(p.id).subscribe({
      next: (data) => {
        if (data) {
          p.promotion= !old;
        }
      },
      error: (err) => {
        this.errorMessage = err;
      }
    });
  }

}
