import { ApiProperty } from '@nestjs/swagger';

import { IsString } from 'class-validator';

export class RefreshTokenDto {
  @ApiProperty({
    type: 'string',
    description: 'The refresh token.',
    example:
      'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MiwiZW1haWwiOiJqb2huLmRvZUBleGFtcGxlLmNvbSIsInVzZXJOYW1lIjoiam9obm55IiwiZXhwIjoxNjcxNzc2NjUzLCJ0eXBlIjoicmVmcmVzaCIsImlhdCI6MTY3MTY5MDI1M30.AjDKx7DbIey8WuJnFMvVhPBJxu4DkisS_J6UWHUy82Y',
  })
  @IsString()
  refreshToken: string;
}
