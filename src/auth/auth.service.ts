import {
  BadRequestException,
  forwardRef,
  Inject,
  UnauthorizedException,
} from '@nestjs/common';
import { UserService } from '../user/user.service';
import { randomBytes, scrypt as _scrypt } from 'crypto';
import { promisify } from 'util';
import { CreateUserDto } from '../user/dto/create-user.dto';
import { User } from '@prisma/client';
import { JwtService } from '@nestjs/jwt';
import { PrismaService } from 'src/prisma.service';

const scrypt = promisify(_scrypt);
export class AuthService {
  constructor(
    @Inject(forwardRef(() => UserService)) private userService: UserService,
    private jwtService: JwtService,
    private prisma: PrismaService,
  ) {}
  // 🔥 Access Token 생성
  generateAccessToken(userId: number) {
    return this.jwtService.sign({ userId }, { expiresIn: '1h' });
  }

  // 🔥 Refresh Token 생성
  generateRefreshToken(userId: number) {
    return this.jwtService.sign({ userId }, { expiresIn: '7d' });
  }
  async signup(createUserDto: CreateUserDto): Promise<User> {
    const users = await this.userService.findOne(createUserDto.email);

    if (users) {
      throw new BadRequestException('email in use');
    }
    // rainbow table attack 방지 및 pw hashing
    // TODO 토큰 auth 방식 로직 추가 필요
    const salt = randomBytes(8).toString('hex');

    const hash = (await scrypt(createUserDto.pw, salt, 32)) as Buffer;

    const result = salt + '.' + hash.toString('hex');

    const encryptUserObj = { ...createUserDto, pw: result };
    try {
      const user = await this.userService.create(encryptUserObj);
      return user;
    } catch (err) {
      throw new BadRequestException('server Err');
    }
  }

  async signin(createUserDto: CreateUserDto) {
    const user = await this.userService.findOne(createUserDto.email);
    if (!user) {
      throw new BadRequestException('not found user');
    }
    const [salt, storedHash] = user.pw.split('.');
    const hash = (await scrypt(createUserDto.pw, salt, 32)) as Buffer;
    if (storedHash !== hash.toString('hex')) {
      throw new BadRequestException('bad password');
    }
    const accessToken = this.generateAccessToken(user.id);
    const refreshToken = this.generateRefreshToken(user.id);
    await this.prisma.user.update({
      where: { id: user.id },
      data: { refreshToken },
    });
    return { accessToken, refreshToken, user };
  }

  // 🔥 Refresh Token 검증 → 토큰 재발급
  async refreshTokens(userId: number, refreshToken: string) {
    const user = await this.prisma.user.findUnique({ where: { id: userId } });

    if (!user || user.refreshToken !== refreshToken) {
      throw new UnauthorizedException('refresh 토큰 불일치');
    }

    // 새로운 토큰 생성
    const newAccessToken = this.generateAccessToken(user.id);
    const newRefreshToken = this.generateRefreshToken(user.id);

    // Refresh Token 갱신 (실무 필수!)
    await this.prisma.user.update({
      where: { id: user.id },
      data: { refreshToken: newRefreshToken },
    });

    return {
      accessToken: newAccessToken,
      refreshToken: newRefreshToken,
    };
  }
}
