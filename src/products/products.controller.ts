import { AuthGuard } from '../auth/auth.guard';
import createProductDto from './dto/create-product.dto';
import { Product } from './entities/product.entity';
import { ProductsService } from './products.service';
import { Body, Controller, Delete, Get, Param, Post, UseGuards } from '@nestjs/common';


@UseGuards(AuthGuard)
@Controller('products')
export class ProductsController {
    constructor(private readonly productsService: ProductsService) {}


    @Get()
    GetAllProducts():Promise<Product[]> {
        return this.productsService.getAll();
    }

    @Post()
    PostNewProduct(@Body() newProduct: createProductDto): Promise<Product> {
        return this.productsService.postProduct(newProduct);
    }

    @Delete('/:id')
    deleteProduct(@Param('id') id:number) {
        return this.productsService.deleteProduct(id);
    }
}
