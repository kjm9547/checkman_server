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
  Query,
} from '@nestjs/common';
import { CheckitemService } from './checkitem.service';
import { CreateCheckitemDto } from './dto/create-checkitem.dto';
import { UpdateCheckitemDto } from './dto/update-checkitem.dto';
import { AuthGuard } from '@nestjs/passport';
@Controller('checkitem')
export class CheckitemController {
  constructor(private readonly checkitemService: CheckitemService) {}
  @UseGuards(AuthGuard('jwt'))
  @Post()
  create(@Req() req, @Body() createCheckitemDto: CreateCheckitemDto) {
    const userId = req.user.userId;
    return this.checkitemService.create(createCheckitemDto, userId);
  }

  // 특정 기간내 체크 리스트 조회 api
  // 마지막 요일에서 며
  // a~b 기간 사이의 모든 데이터 전달
  // 유저 아이디와 기간을 통해 조회하고
  // 시작일로부터 오늘을 계산해서 그시기
  @UseGuards(AuthGuard('jwt'))
  @Get()
  findCheckListWithDuration(
    @Req() req,
    @Query('start') start: string,
    @Query('end') end: string,
  ) {
    console.log('start, end', req, start, end);
    const userId = req.user.userId;
    return this.checkitemService.findAll(userId);
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    console.log('???');
    return this.checkitemService.findOne(+id);
  }

  @UseGuards(AuthGuard('jwt'))
  @Get()
  findAll(@Req() req) {
    console.log('???11111');
    const userId = req.user.userId;
    return this.checkitemService.findAll(userId);
  }
  @Patch(':id')
  update(
    @Param('id') id: string,
    @Body() updateCheckitemDto: UpdateCheckitemDto,
  ) {
    return this.checkitemService.update(+id, updateCheckitemDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.checkitemService.remove(+id);
  }
}
