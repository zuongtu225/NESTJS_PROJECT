import { BadRequestException, Injectable } from '@nestjs/common';
import { IResponse } from 'src/shared/interfaces/response.interface';
import { ProductRepository } from './product.repository';
import { ProductDto } from './dto/product.dto';
import { IProduct } from './interface/Product.interface';
@Injectable()
export class ProductService {
  constructor(private readonly productRepository: ProductRepository) {}
  async createProductService(body: ProductDto): Promise<any> {
    const response = await this.productRepository.create(body);
    if (response) {
      return {
        success: true,
        message: 'Tạo Product thành công',
        data: response,
      };
    }
    throw new BadRequestException('Tạo Product thất bại');
  }
  async getAllProductService(): Promise<ProductDto[]> {
    return await this.productRepository.findAll();
  }
  async getDetailProduct(id: number): Promise<IProduct | IResponse> {
    const response = await this.productRepository.findOne(id);
    if (response == null) {
      return {
        data: null,
        success: false,
        message: 'Id Product không đúng',
      };
    }
    return response;
  }
  async updateProductService(id: number, body: IProduct): Promise<IResponse> {
    const response = await this.productRepository.updateProduct(id, body);
    if (response.affected == 1) {
      return {
        data: null,
        success: true,
        message: 'Cập nhật thành công',
      };
    }
    return {
      data: null,
      success: false,
      message: 'Id Product không đúng',
    };
  }

  async deleteSizeService(id: number): Promise<IResponse> {
    const response = await this.productRepository.deleteSize(id);
    if (response.affected == 1) {
      return {
        data: null,
        success: true,
        message: 'Xoá thành công',
      };
    }
    return {
      data: null,
      success: false,
      message: 'Id product không đúng',
    };
  }
}
