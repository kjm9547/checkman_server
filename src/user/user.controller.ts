import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  UseGuards,
  Req,
} from '@nestjs/common';
import { UserService } from './user.service';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { AuthService } from '../auth/auth.service';
import { JwtAuthGuard } from 'src/jwt.strategy/jwt-auth.guard';

@Controller('user')
export class UserController {
  constructor(
    private userService: UserService,
    private authService: AuthService,
  ) {}

  @Post('/signup')
  async create(@Body() createUserDto: CreateUserDto) {
    const user = await this.authService.signup(createUserDto);
    return user;
  }

  @Post('/signin')
  async signin(@Body() createUserDto: CreateUserDto) {
    console.log('오나요 여기? inin');

    const user = await this.authService.signin(createUserDto);
    return user;
  }

  @Post('refresh')
  refresh(@Body() body: { userId: number; refreshToken: string }) {
    return this.authService.refreshTokens(body.userId, body.refreshToken);
  }

  @Get()
  findAll() {
    return this.userService.findAll();
  }
  @UseGuards(JwtAuthGuard)
  @Get('me')
  async getMyInfo(@Req() req) {
    return this.userService.findUserById(req.user.userId);
  }

  @Get(':id')
  async findOne(@Param('id') email: string) {
    return this.userService.findOne(email);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateUserDto: UpdateUserDto) {
    return this.userService.update(+id, updateUserDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.userService.remove(+id);
  }
}
