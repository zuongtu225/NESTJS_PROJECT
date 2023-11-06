import { PaymentService } from './payment.service';
import * as dotenv from 'dotenv';
import { IPayment } from './interface/payment.interface';
import { LoggingInterceptor } from 'src/shared/interceptor/logging.interceptor';
import {
  Controller,
  Body,
  ClassSerializerInterceptor,
  UseInterceptors,
  UseGuards,
  Post,
  Put,
  Param,
  Delete,
  Get,
} from '@nestjs/common';
import { IResponse } from 'src/shared/interfaces/response.interface';
import { AuthenGuard } from 'src/shared/guards/authen.guard';
import { CurrentUser } from '../user/decorator/currentUser.decorator';
import { Payment } from './entities/payment.entity';
import { AuthorGuard } from 'src/shared/guards/author.guard';

dotenv.config();
const init = process.env.API_URL;
@Controller(`${init}/payments`)
@UseInterceptors(ClassSerializerInterceptor)
@UseInterceptors(LoggingInterceptor)
@UseGuards(AuthorGuard)
@UseGuards(AuthenGuard)
export class PaymentController {
  constructor(private readonly paymentService: PaymentService) {}
  @Post()
  async createPayment(@Body() body: IPayment): Promise<IResponse | Payment> {
    return await this.paymentService.createPaymentService(body);
  }
  @Get()
  async getAllPayment(): Promise<IPayment[]> {
    return await this.paymentService.getAllPaymentService();
  }
  @Put('/:id')
  async updatePayment(
    @Param('id') id: number,
    @Body() body,
  ): Promise<IResponse> {
    return await this.paymentService.updatePaymentService(id, body);
  }
  @Delete('/:id')
  async deletePayment(@Param('id') id: number): Promise<IResponse> {
    return await this.paymentService.deletePayment(id);
  }
}
