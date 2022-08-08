import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validator, Validators } from '@angular/forms';
import { Category } from '../model/categories';
import { Product } from '../model/product';
import { ProductService } from '../services/product.service';

@Component({
  selector: 'app-products',
  templateUrl: './products.component.html',
  styleUrls: ['./products.component.css']
})
export class ProductsComponent implements OnInit {

  public products! : Array<Product>;
  public allProducts! : Array<Product>;
  public categories! : Category[];
  public errorMessage!: string;
  public searchFormGroup! : FormGroup;
  public AddFormGroup! : FormGroup;
  public updateFormGroup! : FormGroup;
  public selectedProduct : Product = {
    id : '', name : '', price : 0, stock : 0, infos : '', category : {
      id:'', 
      name:'', 
      description:'', 
      promotion:false
    },
    promotion : false
  };

  constructor(private ps : ProductService, private fb : FormBuilder) { }

  ngOnInit(): void {
    this.searchFormGroup = this.fb.group({
      keyword : this.fb.control("")
    });
    this.AddFormGroup = this.fb.group({
      name : ["", Validators.required],
      price : ["", Validators.required],
      stock : ["", Validators.required],
      promotion : [""],
      infos : ["", Validators.required],
      category : ["", Validators.required],
    });
    this.updateFormGroup = this.fb.group({
      name : ["", Validators.required],
      price : ["", Validators.required],
      stock : ["", Validators.required],
      promotion : [""],
      infos : ["", Validators.required],
    });
    this.handleGetAllProducts();
    this.getCategories();
  }

  getCategories() {
    this.ps.getCategories().subscribe({
      next : data => {
        console.log('Get all categories success ! ');
        this.categories = data as Category[];
      },
      error : err => {
        this.errorMessage = err;
        console.log(err);
      }
    })
  }

  handleAddProduct()  {
    let product = this.AddFormGroup.value as Product;
    this.ps.createProduct(product).subscribe({
      next : data => {
        if (data.result) {
          product.id = data.id;
          this.products.push(product);
          console.log(data.message);
        }
        else console.error(data.message);
      },
      error : err => {
        this.errorMessage = err;
        console.error(err);
      }
    })
    return ;
  }

  handleUpdateProduct()  {
    let product = this.updateFormGroup.value as Product;
    product.id = this.selectedProduct.id;
    product.category = this.selectedProduct.category;
    this.ps.updateProduct(product).subscribe({
      next : data => {
        if (data.result) {
          let index = this.products.findIndex(p => p.id == product.id);
          if (index != -1) this.products[index] = product;
          console.log(data.message);
        }
        else console.error(data.message);
      },
      error : err => {
        this.errorMessage = err;
        console.error(err);
      }
    })
    return ;
  }

  handleGetAllProducts() {
    this.ps.getAllProducts().subscribe({
      next : (data) => {
        this.allProducts = data;
        this.products = this.allProducts;
        console.log(this.products);
      },
      error : (err) => {
        this.errorMessage = err;
      }
    });
  }

  removeProduct(p : Product) {
    if (confirm(`Are you sure to delete ${p.name} ?`) == false) { return ; }
    this.ps.deleteProduct(p.id).subscribe({
      next : (data) => {
        if (data.result)
          this.allProducts.splice(this.allProducts.indexOf(p), 1);
          this.products = this.allProducts;
      },
      error : (err) => {
        this.errorMessage = err;
      }
    });
  }

  handleTogglePromo(p : Product) {
    const conf = confirm('Are you sure ?');
    if (!conf) { return ; }
    let old : boolean = p.promotion;
    p.promotion = !old;
    this.ps.updateProduct(p).subscribe({
      next: (data) => {
        if (!data.result) {
          console.log(data.message);
          p.promotion = old;
        }
      },
      error: (err) => {
        this.errorMessage = err;
        p.promotion = old;
      }
    });
  }

  showModify(p : Product) {
    this.selectedProduct = p;
    this.updateFormGroup.patchValue({
      name : this.selectedProduct.name,
      price : this.selectedProduct.price,
      stock : this.selectedProduct.stock,
      promotion : this.selectedProduct.promotion,
      infos : this.selectedProduct.infos,
    });
  }
  
  handleSearchForm() {
    this.products = this.allProducts.filter(p => p.name.includes((this.searchFormGroup.value.keyword)));
  }
}
