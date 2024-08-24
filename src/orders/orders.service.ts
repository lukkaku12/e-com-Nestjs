import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { In, Repository } from 'typeorm';
import { Order } from './entities/order.entity';
import { User } from '../users/entities/user.entity';
import { Product } from '../products/entities/product.entity';
import { CreateOrderDto } from './dto/create-order.dto';

@Injectable()
export class OrdersService {
  constructor(
    @InjectRepository(Order) private ordersRepository: Repository<Order>,
    @InjectRepository(User) private usersRepository: Repository<User>,
    @InjectRepository(Product) private productsRepository: Repository<Product>,
  ) {}

  async createOrder(createOrderDto: CreateOrderDto): Promise<Order> {
    const { userId, products, totalPrice } = createOrderDto;

    // Obtener el usuario
    const user = await this.usersRepository.findOne({ where: { id: userId } });
    if (!user) {
      throw new Error('User not found');
    }

    // Obtener los productos
    const orderProducts = await this.productsRepository.findBy({
      id: In(products),
    });
    if (orderProducts.length !== products.length) {
      throw new Error('One or more products not found');
    }

    // Crear el pedido

    const test = {
        user, // Esto está bien porque TypeORM sabe que es una relación
        products: orderProducts, // Esto también está bien por lo mismo
        totalPrice,
      }
    const order = this.ordersRepository.create(test);

    // Guardar el pedido
    return this.ordersRepository.save(order);
  }
}