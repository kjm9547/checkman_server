import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
} from '@nestjs/common';
import { CheckitemService } from './checkitem.service';
import { CreateCheckitemDto } from './dto/create-checkitem.dto';
import { UpdateCheckitemDto } from './dto/update-checkitem.dto';

@Controller('checkitem')
export class CheckitemController {
  constructor(private readonly checkitemService: CheckitemService) {}

  @Post()
  create(@Body() createCheckitemDto: CreateCheckitemDto) {
    return this.checkitemService.create(createCheckitemDto);
  }

  @Get()
  findAll() {
    return this.checkitemService.findAll(1);
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
