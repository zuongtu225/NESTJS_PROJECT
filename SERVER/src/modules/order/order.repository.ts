import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { DeleteResult, Repository, UpdateResult } from 'typeorm';
import { IOrder, IidCommon } from './interface/order.interface';
import { Order } from './entities/order.entity';
@Injectable()
export class OrderRepository {
  constructor(
    @InjectRepository(Order)
    private orderRepository: Repository<Order>,
  ) {}
  async create(body: IOrder): Promise<Order> {
    return await this.orderRepository.save(body);
  }
  async findAll(): Promise<Order[]> {
    return await this.orderRepository.find();
  }
  async getDetailOrder(id: number): Promise<Order> {
    return await this.orderRepository.findOneBy({ id });
  }
  async updateOrder(idCommon: IidCommon, body: any): Promise<UpdateResult> {
    return await this.orderRepository.update(idCommon, body);
  }
}
