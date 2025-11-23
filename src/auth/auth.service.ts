import { BadRequestException, forwardRef, Inject } from '@nestjs/common';
import { UserService } from '../user/user.service';
import { randomBytes, scrypt as _scrypt } from 'crypto';
import { promisify } from 'util';
import { CreateUserDto } from '../user/dto/create-user.dto';
import { User } from '@prisma/client';

const scrypt = promisify(_scrypt);
export class AuthService {
  constructor(
    @Inject(forwardRef(() => UserService)) private userService: UserService,
  ) {}
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
    return user;
  }
}
