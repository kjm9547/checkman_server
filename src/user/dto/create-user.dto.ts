import { IsEmail, IsOptional, IsString } from 'class-validator';
export class CreateUserDto {
  //@IsOptional() : 해당 필드가 "없어도" 유효성 검사에서 에러를 발생시키지 않도록 허용하는 데코레이터예요.
  @IsEmail()
  email: string;

  @IsString()
  pw: string;

  @IsString()
  @IsOptional()
  nickName: string;

  @IsString()
  @IsOptional()
  type: string;

  @IsString()
  @IsOptional()
  imgUrl: string;
}
