import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from './users/entities/user.entity';
import { UsersModule } from './users/users.module';
import { ProductsModule } from './products/products.module';
import { Order } from './orders/entities/order.entity';
import { Product } from './products/entities/product.entity';
import { AuthModule } from './auth/auth.module';
import { CommonModule } from './common/common.module';


@Module({
  imports: [
    TypeOrmModule.forRoot({
      type: 'mysql',
      host: 'localhost',
      port: 3306,
      username: 'root',
      password: '',
      database: 'nestPractice',
      entities: [User, Order, Product],
      synchronize: false,  // Sólo en desarrollo, para sincronizar las entidades automáticamente
    }),
    UsersModule,
    ProductsModule,
    AuthModule,
    CommonModule
  ],
  
})
export class AppModule {}
