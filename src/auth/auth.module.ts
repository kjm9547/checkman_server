import { UserModule } from 'src/user/user.module';
import { AuthService } from './auth.service';
import { forwardRef, Module } from '@nestjs/common';
import { JwtModule } from '@nestjs/jwt';
import { PrismaService } from 'src/prisma.service';
import { AuthController } from './auth.controller';

@Module({
  imports: [
    forwardRef(() => UserModule),
    JwtModule.register({
      secret: process.env.JWT_SECRET,
      signOptions: { expiresIn: '1h' },
    }),
  ],
  providers: [AuthService, PrismaService],
  exports: [AuthService],
  controllers: [AuthController],
})
export class AuthModule {}
