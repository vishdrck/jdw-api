import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  UnprocessableEntityException,
  NotFoundException,
  Put,
} from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { Types } from 'mongoose';
import { ApiDocGenerator } from 'src/modules/common/decorators/api-doc-generator.decorator';
import { CreateResponseDto } from 'src/modules/course/dto/create-response-course.dto';
import { CourseService } from 'src/modules/course/services/course.service';
import { EnrollmentService } from 'src/modules/enrollment/services/enrollment.service';
import { InstituteService } from 'src/modules/institute/services/institute.service';
import { PAYMENT_STATUS, PAYMENT_TYPES } from '../constants/enum';
import { CreatePaymentRequestDto } from '../dto/create-payment-request.dto';
import { CreatePaymentResponseDto } from '../dto/create-payment-response.dto';
import { GetPaymentResponseDTO } from '../dto/get-payment-response.dto';
import { UpdatePaymentDto } from '../dto/update-payment.dto';
import { IPayment } from '../models/payment.model';
import { PaymentService } from '../services/payment.service';

@ApiTags('payments')
@Controller('payment')
export class PaymentController {
  constructor(
    private readonly enrollmentService: EnrollmentService,
    private readonly paymentService: PaymentService,
    private readonly instituteService: InstituteService,
    private readonly courseService: CourseService,
  ) {}

  @ApiDocGenerator({
    summary: 'Create a payment',
    unauthorizedResponseDescription: 'Invalid Credentials',
    forbiddenResponseDescription: 'Account Blocked',
    successResponseDTO: CreatePaymentResponseDto,
    useDTOValidations: true,
  })
  @Post()
  async createPayment(@Body() requestBody: CreatePaymentRequestDto) {
    if (!requestBody)
      throw new UnprocessableEntityException('Valid data required');
    let totalFee = 0;
    if (requestBody.paymentType === PAYMENT_TYPES.REGISTRATION_FEE) {
      totalFee = (await this.instituteService.findDocument()).registrationFee;
    } else {
      const courseId = (
        await this.enrollmentService.findById(
          new Types.ObjectId(requestBody.enrollmentId),
        )
      ).courseId;
      totalFee = (
        await this.courseService.findById(
          new Types.ObjectId(courseId.toString()),
        )
      ).courseFee;
    }

    if (totalFee > 0) {
      let sum = 0;
      requestBody.paymentHistory.forEach((item) => {
        sum += item.paidAmount;
      });

      if (sum === totalFee) {
        requestBody.status = PAYMENT_STATUS.COMPLETED;
      }
    }

    const newPayment: IPayment = {
      ...requestBody,
      totalAmount: totalFee,
    };

    const paymentOnDatabase = await this.paymentService.addDocument(newPayment);

    if (paymentOnDatabase) {
      return {
        message: 'Payment added successfully',
        data: paymentOnDatabase,
      };
    } else {
      return {
        success: false,
        message: 'Something went wrong',
      };
    }
  }

  @ApiDocGenerator({
    summary: 'Update given payment',
    unauthorizedResponseDescription: 'Invalid Credentials',
    forbiddenResponseDescription: 'Account Blocked',
    successResponseDTO: CreatePaymentResponseDto,
    useDTOValidations: true,
  })
  @Put(':id')
  async update(
    @Param(':id') id: string,
    @Body() requestBody: UpdatePaymentDto,
  ) {
    const foundPayment = await this.paymentService.findById(
      new Types.ObjectId(id),
    );

    if (!foundPayment) throw new NotFoundException('Payment not found');

    const updatePayment: IPayment = {
      ...foundPayment,
      ...requestBody,
    };

    const paymentOnDatabase = await this.paymentService.updateDocument(
      updatePayment,
    );

    if (paymentOnDatabase) {
      return {
        message: 'Payment updated successfully',
        data: paymentOnDatabase,
      };
    } else {
      return {
        success: false,
        message: 'Something went wrong',
      };
    }
  }

  @ApiDocGenerator({
    summary: 'Get single payment',
    unauthorizedResponseDescription: 'Invalid Credentials',
    forbiddenResponseDescription: 'Account Blocked',
    successResponseDTO: GetPaymentResponseDTO,
    useDTOValidations: true,
  })
  @Get(':id')
  async getSinglePayment(@Param(':id') id: string) {
    const foundPayment = await this.paymentService.findById(
      new Types.ObjectId(id),
    );

    if (!foundPayment) throw new NotFoundException('Payment not found');

    return {
      data: foundPayment,
    };
  }

  @ApiDocGenerator({
    summary: 'Delete given Payment',
    unauthorizedResponseDescription: 'Invalid Credentials',
    forbiddenResponseDescription: 'Account Blocked',
    successResponseDTO: CreateResponseDto,
    useDTOValidations: true,
  })
  @Delete(':id')
  async deletePayment(@Param(':id') id: string) {
    const foundPayment = await this.paymentService.findById(
      new Types.ObjectId(id),
    );
    if (!foundPayment)
      throw new UnprocessableEntityException('Valid data required');

    foundPayment.isDeleted = true;

    const paymentOnDatabase = await this.paymentService.addDocument(
      foundPayment,
    );

    if (paymentOnDatabase) {
      return {
        message: 'Payment deleted successfully',
        data: paymentOnDatabase,
      };
    } else {
      return {
        success: false,
        message: 'Something went wrong',
      };
    }
  }
}
