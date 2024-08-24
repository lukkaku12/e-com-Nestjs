import { Order } from "src/common/orders/entities/order.entity";
import { Column, Entity, JoinTable, ManyToMany, PrimaryGeneratedColumn } from "typeorm";

@Entity()
export class Product {
@PrimaryGeneratedColumn()
id:number;

@Column()
name:string;

@Column('decimal')
price:number;

@Column()
description:string;

@ManyToMany(() => Order)
@JoinTable()
orders: Order[]

}