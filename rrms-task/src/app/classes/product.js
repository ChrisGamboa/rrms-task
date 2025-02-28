class Product {
    constructor(props){
        this.id = props.id;
        this.name = props.name;
        this.price = props.price;
        this.category = props.category;
        this.description = props.description;
        this.stock = props.stock;
        this.rating = props.rating.rate;
        this.rating_count = props.rating.count;
        this.image_url = props.image_url;
        this.sku = props.sku;
    }
}

export default Product;