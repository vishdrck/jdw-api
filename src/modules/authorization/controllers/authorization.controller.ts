import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  UnauthorizedException,
  NotFoundException,
} from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { ApiTags } from '@nestjs/swagger';
import { request } from 'http';
import Mail from 'nodemailer/lib/mailer';
import {
  EMAIL_TYPES,
  RESPONSE_MESSAGES,
} from 'src/modules/common/constants/enums';
import { ApiDocGenerator } from 'src/modules/common/decorators/api-doc-generator.decorator';
import { EmailService } from 'src/modules/common/services/email.service';
import {
  ACCOUNT_STATES,
  GENDER_TYPES,
  USER_TYPES,
} from 'src/modules/users/constants/enums';
import { IUser } from 'src/modules/users/models/user.model';
import { UsersService } from 'src/modules/users/services/users.service';
import { ForgotPasswordRequestDTO } from '../dto/forgot-password-request.dto';
import { LoginRequestDTO } from '../dto/login-reqquest.dto';
import { LoginResponseDTO } from '../dto/login-response.dto';
import { SelfRegisterDTO } from '../dto/self-register.dto';
import { AccessCredentialsService } from '../services/access_credential.service';
import { AuthService } from '../services/auth.service';

// import { AuthorizationService } from '../services/access_credential.service';

@ApiTags('auth')
@Controller('auth')
export class AuthorizationController {
  constructor(
    private accessCredentialsService: AccessCredentialsService,
    private userService: UsersService,
    private authService: AuthService,
    private config: ConfigService,
    private emailService: EmailService,
  ) {}

  @ApiDocGenerator({
    summary: 'Login and Authorize',
    unauthorizedResponseDescription: 'Invalid Credentials',
    forbiddenResponseDescription: 'Account Blocked',
    successResponseDTO: LoginResponseDTO,
    useDTOValidations: true,
  })
  @Post('login')
  async loginUser(@Body() requestBody: LoginRequestDTO) {
    const foundUser = await this.userService.findDocument({
      email: requestBody?.email,
      isDeleted: false,
    });

    if (!foundUser)
      throw new UnauthorizedException(RESPONSE_MESSAGES.INVALID_CREDENTIALS);

    const foundCredentials = await this.accessCredentialsService.loginUser(
      foundUser?._id,
      requestBody?.password,
    );

    if (!foundCredentials)
      throw new UnauthorizedException(RESPONSE_MESSAGES.INVALID_CREDENTIALS);

    const { access_token } = await this.authService.getTokens(foundUser);

    return {
      data: {
        ...foundUser,
        access_token,
      },
    };
  }

  @ApiDocGenerator({
    summary: 'Self Register',
    unprocessableEntityResponseDescription: 'Invalid registration details',
    forbiddenResponseDescription: 'Account Blocked',
    successResponseDTO: LoginResponseDTO,
    useDTOValidations: true,
  })
  @Post('register')
  async selfRegister(@Body() requestBody: SelfRegisterDTO) {
    const existUser = await this.userService.findDocument({
      email: requestBody?.email,
      isDeleted: false,
    });

    if (existUser) {
      return {
        message: 'An user with given email is already exist.',
      };
    }

    if (requestBody?.gender?.toLocaleLowerCase() === 'male') {
      requestBody.gender = GENDER_TYPES.MALE;
    } else if (requestBody?.gender?.toLocaleLowerCase() === 'female') {
      requestBody.gender = GENDER_TYPES.FEMALE;
    } else {
      requestBody.gender = GENDER_TYPES.NOT_SPECIFIED;
    }

    const newUser: IUser = {
      ...requestBody,
      userType: USER_TYPES.LEARNER,
      accountStatus: ACCOUNT_STATES.NEW,
    };

    const userOnDatabase = await this.userService.addDocument(newUser);
    if (userOnDatabase) {
      return {
        message: 'User registered successfully',
      };
    } else {
      return {
        success: false,
        message: 'Something went wrong. Try again lator',
      };
    }
  }

  @ApiDocGenerator({
    summary: 'Forogt Password',
    unprocessableEntityResponseDescription: 'Invalid registration details',
    forbiddenResponseDescription: 'Account Blocked',
    successResponseDTO: LoginResponseDTO,
    useDTOValidations: true,
  })
  @Post('forgot-password')
  async forgotPassword(@Body() requestBody: ForgotPasswordRequestDTO) {
    const foundUser = await this.userService.findDocument({
      email: requestBody.email,
    });

    if (!foundUser) throw new NotFoundException('User not found');

    const mailOptions: Mail.Options = {
      to: foundUser.email,
    };

    this.emailService.sendEmail(
      mailOptions,
      EMAIL_TYPES.FORGOT_PASSWORD,
      'google.com',
    );
  }
}
