import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { DeleteResult, Repository, UpdateResult } from 'typeorm';
import { IBrand } from './interface/brand.interface';
import { Brand } from './entities/brand.entity';
@Injectable()
export class BrandRepository {
  constructor(
    @InjectRepository(Brand)
    private brandRepository: Repository<Brand>,
  ) {}
  async create(body: IBrand): Promise<IBrand> {
    return await this.brandRepository.save(body);
  }
  async findAll(): Promise<IBrand[]> {
    const response = await this.brandRepository.find();
    return response;
  }
  async findOne(id: number): Promise<IBrand> {
    const response = await this.brandRepository.findOneBy({ id });
    return response;
  }
  async updateBrand(id: number, body: IBrand): Promise<UpdateResult> {
    const response = await this.brandRepository.update(id, body);
    return response;
  }
  async deleteBrand(id: number): Promise<DeleteResult> {
    const response = await this.brandRepository.delete(id);
    return response;
  }
}
