import { ApiProperty } from '@nestjs/swagger';
import { IsBoolean, IsDefined, IsString, Length } from 'class-validator';

export class CreatePostDTO {
  @ApiProperty({ default: 'A nice post title' })
  @IsDefined()
  @IsString()
  @Length(1, 255)
  readonly title: string;

  @ApiProperty({ default: 'A nice post description' })
  @IsDefined()
  @IsString()
  @Length(1, 1000)
  readonly description: string;

  @ApiProperty()
  @IsDefined()
  @IsBoolean()
  readonly isPublished: boolean;
}
