import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Put,
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

  @Put('/:id')
  @ApiOkResponse({ description: 'Post updated' })
  @ApiUnprocessableEntityResponse({ description: 'Invalid inputs' })
  @ApiNotFoundResponse({ description: 'Invalid Post Id' })
  @ApiUnauthorizedResponse({ description: 'Check Authroization bearer token' })
  async updatePost(
    @Param('id') id: number,
    @Res() res: Response,
    @Body() inputs: CreatePostDTO,
  ) {
    const { status, message } = await this.postService.updatePost(id, inputs);
    return res.status(status).json({ message });
  }

  @Delete('/:id')
  @ApiOkResponse({ description: 'Post updated' })
  @ApiNotFoundResponse({ description: 'Invalid Post Id' })
  @ApiUnauthorizedResponse({ description: 'Check Authroization bearer token' })
  async deletePost(@Param('id') id: number, @Res() res: Response) {
    const { status, message } = await this.postService.deletePost(id);
    return res.status(status).json({ message });
  }

  @Get()
  findAllPosts() {
    return this.postService.findAll();
  }
}
