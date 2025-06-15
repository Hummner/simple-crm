export class User {
    firstname: string;
    lastname: string;
    birthDate: number;
    street: string;
    zipcode: number;
    city: string;
    email:string;

    constructor(obj?: any) {
        this.firstname = obj ? obj.firstname : "";
        this.lastname = obj ? obj.lastname : "";
        this.birthDate = obj ? obj.birthDate : "";
        this.street = obj ? obj.street : "";
        this.zipcode = obj ? obj.zipcode : "";
        this.city = obj ? obj.city : "";
        this.email = obj ? obj.email : "";
    }

    toJson() {
        return {
            firstname: this.firstname,
            lastname: this.lastname,
            birthDate: this.birthDate,
            street: this.street,
            zipcode: this.zipcode,
            city: this.city,
            email: this.email
        }
    }

}