import { Module } from '@nestjs/common';
import { ProductsService } from './products.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Product } from './entities/product.entity';
import { ProductsController } from './products.controller';

@Module({
  imports:[
    TypeOrmModule.forFeature([Product])
  ],
  providers: [ProductsService],
  controllers: [ProductsController]
})
export class ProductsModule {}
