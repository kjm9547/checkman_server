import { IsNumber, IsOptional, IsString } from 'class-validator';
export class CreateCheckitemDto {
  @IsString()
  title: string;

  @IsString()
  period: string;
  @IsString()
  target_period: string;

  @IsString()
  @IsOptional()
  imgUrl: string;

  @IsString()
  start: string;

  @IsString()
  end: string;
}
