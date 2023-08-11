import {
  Body,
  Controller,
  Get,
  Param,
  Post,
  Res,
  UseGuards,
} from '@nestjs/common';
import { Response } from 'express';
import { BearerGuard } from '../auth/bearer.guard';
import { CreatePostDTO } from './dtos/create-post.dto';
import { PostService } from './post.service';
import {
  ApiBearerAuth,
  ApiOkResponse,
  ApiUnauthorizedResponse,
  ApiUnprocessableEntityResponse,
  ApiTags,
  ApiCreatedResponse,
  ApiNotFoundResponse,
} from '@nestjs/swagger';

@UseGuards(BearerGuard)
@ApiBearerAuth()
@ApiTags('posts')
@Controller('posts')
export class PostController {
  constructor(private readonly postService: PostService) {}

  @Post()
  @ApiCreatedResponse({ description: 'Post created' })
  @ApiUnprocessableEntityResponse({ description: 'Invalid inputs' })
  @ApiUnauthorizedResponse({ description: 'Check Authroization bearer token' })
  async createPost(@Res() res: Response, @Body() inputs: CreatePostDTO) {
    const { status, data, message } = await this.postService.create(inputs);
    return res.status(status).json({ message, data });
  }

  @Get('/:id')
  @ApiOkResponse({ description: 'Post fetched' })
  @ApiNotFoundResponse({ description: 'Invalid Post Id' })
  @ApiUnauthorizedResponse({ description: 'Check Authroization bearer token' })
  async findPost(@Param('id') id: number, @Res() res: Response) {
    const { status, data, message } = await this.postService.findOne(id);
    return res.status(status).json({ message, data });
  }

  @Get()
  findAllPosts() {
    return this.postService.findAll();
  }
}
