import { ApiProperty } from '@nestjs/swagger';

export class ConflictExceptionSwagger {
  @ApiProperty()
  statusCode: number;

  @ApiProperty()
  options: string[];

  @ApiProperty()
  message: string;

  @ApiProperty()
  error: string;
}