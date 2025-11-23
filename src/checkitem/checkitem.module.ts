import { Module } from '@nestjs/common';
import { CheckitemService } from './checkitem.service';
import { CheckitemController } from './checkitem.controller';
import { PrismaService } from 'src/prisma.service';

@Module({
  controllers: [CheckitemController],
  providers: [CheckitemService, PrismaService],
})
export class CheckitemModule {}
