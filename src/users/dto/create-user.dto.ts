export class CreateUserDto{
    UserName:string;
    Email:string;
    Password:string;
    Roles?:string[];
    ConnectedPersonId?:string;
}