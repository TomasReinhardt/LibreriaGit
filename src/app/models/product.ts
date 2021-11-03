export class Product {
    constructor(
        public _id: string,
        public name: string,
        public category: string,
        public marca: string,
        public price: number,
        public stock: boolean,
        public discount: number,
        public description: string,
        public image: string,
    ){}
}