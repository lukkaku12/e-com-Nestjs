import { User } from "src/users/entities/user.entity";
import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from "typeorm";

@Entity()
export class Order {
@PrimaryGeneratedColumn()
id:number;


@Column('decimal')
totalPrice:number;

@ManyToOne(() => User, (user) => user.orders)
user:User

//ya esta conectado con products

}