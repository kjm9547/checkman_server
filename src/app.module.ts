import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { UserModule } from './user/user.module';
import { AuthModule } from './auth/auth.module';
import { ImgUploadController } from './img-upload/img-upload.controller';
import { ImgUploadService } from './img-upload/img-upload.service';
import { ConfigModule } from '@nestjs/config';
import { CheckitemModule } from './checkitem/checkitem.module';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
    }),
    UserModule,
    CheckitemModule,
  ],
  controllers: [AppController, ImgUploadController],
  providers: [AppService, ImgUploadService],
})
export class AppModule {}
