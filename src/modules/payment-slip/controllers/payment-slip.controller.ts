import {
  Body,
  Controller,
  Delete,
  Get,
  NotFoundException,
  Param,
  Post,
  UnprocessableEntityException,
} from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { Types } from 'mongoose';
import { ApiDocGenerator } from 'src/modules/common/decorators/api-doc-generator.decorator';
import { PAYMENT_TYPES } from 'src/modules/payment/constants/enum';
import { CreatePaymentRequestDto } from 'src/modules/payment/dto/create-payment-request.dto';
import {
  IPayment,
  IPaymentHistory,
} from 'src/modules/payment/models/payment.model';
import { PaymentService } from 'src/modules/payment/services/payment.service';
import { UsersService } from 'src/modules/users/services/users.service';
import { CreatePaymentSlipRequestDto } from '../dto/create-payment-slip-request.dto';
import { IPaymentSlip } from '../models/payment-slip.model';
import { PaymentSlipService } from '../services/payment-slip.service';

@ApiTags('payment-slips')
@Controller('payment-slip')
export class PaymentSlipController {
  constructor(
    private readonly paymentSlipService: PaymentSlipService,
    private readonly paymentService: PaymentService,
    private readonly userService: UsersService,
  ) {}

  @ApiDocGenerator({
    summary: 'Create a payment',
    unauthorizedResponseDescription: 'Invalid Credentials',
    forbiddenResponseDescription: 'Account Blocked',
    successResponseDTO: CreatePaymentSlipRequestDto,
    useDTOValidations: true,
  })
  @Post()
  async createPaymentSlip(@Body() requestBody: CreatePaymentSlipRequestDto) {
    if (!requestBody)
      throw new UnprocessableEntityException('Valid data required');

    if (requestBody?.paymentType === PAYMENT_TYPES.COURSE_FEE) {
      if (requestBody?.enrollmentId)
        throw new UnprocessableEntityException('Enrollment ID required');
      const foundPayment = await this.paymentService.findDocument({
        enrollmentId: requestBody.enrollmentId,
        paymentType: requestBody.paymentType,
      });
      if (foundPayment) new NotFoundException('Not found payment');
      const newPaymentHistory = foundPayment.paymentHistory;
      newPaymentHistory.push({
        paidDate: requestBody.paidDate,
        paidAmount: requestBody.amount,
      });
      const updatePayment: IPayment = {
        ...foundPayment,
        paymentHistory: newPaymentHistory,
      };
      const updatedPayment = await this.paymentService.updateDocument(
        updatePayment,
      );
      if (!updatedPayment)
        throw new UnprocessableEntityException('Payment not updated');
    }

    const newPaymentSlip: IPaymentSlip = {
      ...requestBody,
    };

    const paymentSlipOnDatabase = await this.paymentSlipService.addDocument(
      newPaymentSlip,
    );

    const foundUser = await this.userService.findById(requestBody?.userId);
    if (!foundUser) throw new NotFoundException('User not found');

    if (paymentSlipOnDatabase) {
      return {
        message: 'Payment slip added successfully',
        data: { paymentSlipOnDatabase, foundUser },
      };
    } else {
      return {
        success: false,
        message: 'Something went wrong',
      };
    }
  }

  @ApiDocGenerator({
    summary: 'Get single payment slip',
    unauthorizedResponseDescription: 'Invalid Credentials',
    forbiddenResponseDescription: 'Account Blocked',
    successResponseDTO: CreatePaymentSlipRequestDto,
    useDTOValidations: true,
  })
  @Get(':id')
  async getSinglePayment(@Param(':id') id: string) {
    const foundPaymentSlip = await this.paymentSlipService.findById(
      new Types.ObjectId(id),
    );

    if (!foundPaymentSlip)
      throw new NotFoundException('Payment slip not found');

    const foundUser = await this.userService.findById(
      new Types.ObjectId(foundPaymentSlip.userId.toString()),
    );

    if (!foundUser) throw new NotFoundException('User not found');

    return {
      data: foundPaymentSlip,
    };
  }

  @ApiDocGenerator({
    summary: 'Delete given Payment',
    unauthorizedResponseDescription: 'Invalid Credentials',
    forbiddenResponseDescription: 'Account Blocked',
    successResponseDTO: CreatePaymentSlipRequestDto,
    useDTOValidations: true,
  })
  @Delete(':id')
  async deletePayment(@Param(':id') id: string) {
    const foundPaymentSlip = await this.paymentSlipService.findById(
      new Types.ObjectId(id),
    );
    if (!foundPaymentSlip)
      throw new UnprocessableEntityException('Valid data required');

    foundPaymentSlip.isDeleted = true;

    const paymentSlipOnDatabase = await this.paymentSlipService.addDocument(
      foundPaymentSlip,
    );

    if (paymentSlipOnDatabase) {
      return {
        message: 'Payment slip deleted successfully',
        data: paymentSlipOnDatabase,
      };
    } else {
      return {
        success: false,
        message: 'Something went wrong',
      };
    }
  }
}
