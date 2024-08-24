import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Order } from './entities/order.entity';
import { OrdersController } from './orders.controller';
import { OrdersService } from './orders.service';
import { Product } from '../products/entities/product.entity';
import { User } from '../users/entities/user.entity';

@Module({
    imports:[TypeOrmModule.forFeature([Order, User, Product])],
    controllers: [OrdersController],
    providers: [OrdersService]  // added service provider for the Order entity
})
export class OrdersModule {}
