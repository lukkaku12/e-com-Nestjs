import { Order } from "src/common/orders/entities/order.entity";
import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from "typeorm";


@Entity()
export class User {
@PrimaryGeneratedColumn()
id:number;

@Column({ nullable: false, default: 'Anonymous' })
name:string;

@Column({ nullable: false })
password:string;

@Column({default:"user"})
role:string;

@OneToMany(() => Order, (order) => order.user)
orders: Order[]
}