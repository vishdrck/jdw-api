import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { spawn } from 'child_process';
import { PaymentService } from '../services/payment.service';

@ApiTags('payments')
@Controller('payment')
export class PaymentController {
  constructor(private readonly paymentService: PaymentService) {}

  @Post()
  createPayment() {
    
  }
}
