import User from "./user";
import Carts from "./carts";

class CartsAndUsers {
    constructor(cart, user) {
        this.cart = new Carts(cart);
        this.user = new User(user);        
    }
}

export default CartsAndUsers;