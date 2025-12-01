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
    console.log('CheckitemController - create - userId:', userId);
    return this.checkitemService.create(createCheckitemDto, userId);
  }

  @UseGuards(AuthGuard('jwt'))
  @Get()
  findAll(@Req() req) {
    const userId = req.user.userId;
    return this.checkitemService.findAll(userId);
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.checkitemService.findOne(+id);
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
