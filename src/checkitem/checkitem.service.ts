import { Injectable } from '@nestjs/common';
import { CreateCheckitemDto } from './dto/create-checkitem.dto';
import { UpdateCheckitemDto } from './dto/update-checkitem.dto';
import { PrismaService } from 'src/prisma.service';

@Injectable()
export class CheckitemService {
  constructor(private prisma: PrismaService) {}
  create(createCheckitemDto: CreateCheckitemDto, userId: number) {
    console.log('userId는 토큰 발행전 임시로 번 고정으로 생성됩니다.', userId);
    return this.prisma.checkItem.create({
      data: {
        period: createCheckitemDto.period,
        target_period: createCheckitemDto.target_period,
        title: createCheckitemDto.title,
        imgUrl: createCheckitemDto.imgUrl,
        userId: userId,
        start: createCheckitemDto.start,
        end: createCheckitemDto.end,
      },
    });
  }

  findAll(userId: number) {
    return this.prisma.checkItem.findMany({ where: { userId } });
  }

  findOne(id: number) {
    return `This action returns a #${id} checkitem`;
  }

  update(id: number, updateCheckitemDto: UpdateCheckitemDto) {
    return `This action updates a #${id} checkitem`;
  }

  remove(id: number) {
    return `This action removes a #${id} checkitem`;
  }
}
