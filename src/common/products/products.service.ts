import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Product } from './entities/product.entity';
import { DeleteResult, Repository } from 'typeorm';

@Injectable()
export class ProductsService {
    constructor(@InjectRepository(Product)
    private productsRepository: Repository<Product>) {}

    async getAll() {
        return await this.productsRepository.find()
    }

    async getById(id: number) {
        return await this.productsRepository.findBy({id})
    }

    async postProduct(product: Partial<Product>): Promise<Product>{
        const newProduct = this.productsRepository.create(product);
        return await this.productsRepository.save(newProduct)
    }

    async deleteProduct(id: number):Promise<DeleteResult> {
        return await this.productsRepository.delete(id);
    }

    


}
