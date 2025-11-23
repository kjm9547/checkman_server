import { Injectable } from '@nestjs/common';
import { CreateCheckitemDto } from './dto/create-checkitem.dto';
import { UpdateCheckitemDto } from './dto/update-checkitem.dto';
import { PrismaService } from 'src/prisma.service';

@Injectable()
export class CheckitemService {
  constructor(private prisma: PrismaService) {}
  create(createCheckitemDto: CreateCheckitemDto) {
    console.log('userId는 토큰 발행전 임시로 1번 고정으로 생성됩니다.');
    return this.prisma.checkItem.create({
      data: {
        period: createCheckitemDto.period,
        target_period: createCheckitemDto.target_period,
        title: createCheckitemDto.title,
        imgUrl: createCheckitemDto.imgUrl,
        userId: 1,
      },
    });
  }

  findAll(id: number) {
    return this.prisma.checkItem.findMany({ where: { id } });
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
