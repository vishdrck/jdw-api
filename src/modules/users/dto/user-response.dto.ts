import { ApiProperty } from '@nestjs/swagger';

export class UserResponseDTO {
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
}
