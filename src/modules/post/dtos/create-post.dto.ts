import { IsBoolean, IsDefined, IsString, Length } from 'class-validator';

export class CreatePostDTO {
  @IsDefined()
  @IsString()
  @Length(1, 255)
  title: string;

  @IsDefined()
  @IsString()
  @Length(1, 1000)
  description: string;

  @IsDefined()
  @IsBoolean()
  isPublished: boolean;
}
