import {
  Controller,
  Post,
  UploadedFile,
  UseInterceptors,
} from '@nestjs/common';
import { FileInterceptor } from '@nestjs/platform-express';
import { ImgUploadService } from './img-upload.service';
import { ApiBody, ApiConsumes, ApiOperation } from '@nestjs/swagger';

@Controller('upload')
export class ImgUploadController {
  constructor(private readonly uploadService: ImgUploadService) {
    console.log(process.env);
  }

  @Post('image')
  @UseInterceptors(FileInterceptor('file'))
  @ApiOperation({ summary: '이미지 파일 S3 업로드' })
  @ApiConsumes('multipart/form-data') // swagger가 파일 업로드 지원하도록 설정
  @ApiBody({
    schema: {
      type: 'object',
      properties: {
        file: {
          type: 'string',
          format: 'binary', // 파일 업로드 input 생성
        },
      },
    },
  })
  async uploadFile(@UploadedFile() file: Express.Multer.File) {
    return this.uploadService.uploadToS3(file);
  }
}
