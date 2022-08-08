import { Component, OnInit } from '@angular/core';
import { UUID } from 'angular2-uuid';
import { Observable, of } from 'rxjs';
import { Category } from '../model/categories';
import { CategoriesService } from '../services/categories.service';

@Component({
  selector: 'app-categories',
  templateUrl: './categories.component.html',
  styleUrls: ['./categories.component.css']
})
export class CategoriesComponent implements OnInit {
  public categories! : Array<Category>;
  public errorMessage! : string;
  public selectedCategory : Category = {id:'', name:'', description:'', promotion:false};

  constructor(private cs : CategoriesService) { }

  ngOnInit(): void {
    this.handleGetAllCategories();
  }

  loggin(something : any) {
    console.log(something);
  }


  handleGetAllCategories() {
    this.cs.getAllFromAPI().subscribe({
      next : (data) => {
        console.log(data);
        this.categories = data;
      },
      error : (err) => this.errorMessage = err
    });
  }

  handleDeleteCategory(c : Category) {
    let conf = confirm(`Are you sure to delete this category : ${c.id} ?`);
    if (!conf) { return ; }
    console.log('delete category where id = ' + c.id);
    this.cs.deleteCategory(c.id).subscribe({
      next : (data) => {
        if (data.result == true) {
          this.categories.splice(this.categories.indexOf(c), 1);
        }
        else throw new Error(data.message);
      },
      error : (err) => {
        this.errorMessage = err;
      }
    });
  }

  handleAddCategory(name : string, description : string) {
    name.trim(); description.trim();
    if(!name || !description) { return ; }

    let categ : Category = {
      id : UUID.UUID(),
      name : name,
      description : description,
      promotion : false
    };
    
    this.cs.addCategory(categ).subscribe({
      next : (data) => {
        if(data.result) {
          this.categories.push(categ);
          console.log(data.message);
        }
        else throw new Error(data.err)
      },
      error : (err) => this.errorMessage = err
    });
  }

  showModify(categ : Category) : Observable<Category> {
    this.selectedCategory = categ;
    return of(this.selectedCategory);
  }

  handleAlterCategory(categ : Category) {
    categ.name.trim(); categ.description.trim();
    if(!categ.name || !categ.description) { return ; }
    
    this.cs.updateCategory(categ).subscribe({
      next : (data) => {
        if(data.result == true) {
          console.log(data.message);
          this.categories.find((element) => {
            if (element.id == categ.id) {
              element.name = categ.name;
              element.description = categ.description;
              element.promotion = categ.promotion;
              console.log('altered at angular::');
            }
          })
        }
        else throw new Error(data.message)
      },
      error : (err) => this.errorMessage = err
    });
    return of(true);
  }
}
