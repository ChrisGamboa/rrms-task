class User {
    constructor(props) {
        console.log("Raw user data:", props);
        this.id = props.id;
        this.firstname = props.firstname;
        this.lastname = props.lastname;
        this.email = props.email;
        this.username = props.username;
        this.address = props.address;
        this.city = props.city;
        this.state = props.state;
        this.zipcode = props.zipcode;
        this.country = props.country;
        this.phone = props.phone;
    }
}

export default User;