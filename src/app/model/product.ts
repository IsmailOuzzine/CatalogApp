import { Category } from "./categories";

export interface Product {
    id : any;
    name : string;
    price : number;
    stock : number;
    promotion : boolean;
    infos : string;
    category : Category;
}