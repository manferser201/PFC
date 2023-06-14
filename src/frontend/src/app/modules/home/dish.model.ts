export class Dish {
    constructor(
        public photo: string,
        public name: string,
        public ingredients: string,
        public price: number,
        public num_dishes: number,
        public description: string
    ) { }
}