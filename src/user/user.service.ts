import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { PrismaService } from 'src/prisma.service';
@Injectable()
export class UserService {
  constructor(private prisma: PrismaService) {}
  create(createUserDto: CreateUserDto) {
    return this.prisma.user.create({
      data: {
        email: createUserDto.email,
        pw: createUserDto.pw,
        nickName: createUserDto.nickName,
        imgUrl: createUserDto.imgUrl || '',
        type: createUserDto.type || 'checkman',
      },
    });
  }

  findAll() {
    return `This action returns all user`;
  }

  async findOne(email: string) {
    const user = await this.prisma.user.findFirst({ where: { email } });
    return user;
  }
  async findUserById(userId: number) {
    return this.prisma.user.findUnique({
      where: { id: userId },
    });
  }

  update(id: number, updateUserDto: UpdateUserDto) {
    return `This action updates a #${id} user`;
  }

  remove(id: number) {
    return `This action removes a #${id} user`;
  }
}
