import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { DeleteResult, Repository } from 'typeorm';
import { ProductSize } from './entities/productSize.entity';
import { IProductSize } from './interface/productSize.interface';
import { ProductSizeDto } from './dto/productSize.dto';
import { IResponse } from 'src/shared/interfaces/response.interface';
@Injectable()
export class ProductSizeRepository {
  constructor(
    @InjectRepository(ProductSize)
    private productSizeRepository: Repository<ProductSize>,
  ) {}
  async create(body: IProductSize): Promise<ProductSize> {
    return await this.productSizeRepository.save(body);
  }
  async findAll(): Promise<ProductSize[]> {
    return await this.productSizeRepository.find();
  }
  async findOne(id: any): Promise<ProductSize[]> {
    return await this.productSizeRepository.find({
      where: { productId: id },
      relations: ['productId', 'sizeId'],
    });
  }
}
