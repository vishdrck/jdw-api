import { ApiProperty } from '@nestjs/swagger';

export class LoginResponseDTO {
  @ApiProperty({ example: '62df343d323232' })
  userID: string;

  @ApiProperty({ example: 'John' })
  firstName: string;

  @ApiProperty({ example: 'Doe' })
  lastName: string;

  @ApiProperty({ example: 'john@example.com' })
  email: string;

  @ApiProperty({ example: '881236687V' })
  nic: string;

  @ApiProperty({ example: 'male' })
  gender: string;

  @ApiProperty({ example: 'Colombo' })
  address: string;

  @ApiProperty({ example: 'jwt-string' })
  access_token: string;
}
