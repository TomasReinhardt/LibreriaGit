import { Product } from 'src/app/models/product';

export class Item {
    constructor(
        public product: Product,
        public cant: number
    ){}
}

