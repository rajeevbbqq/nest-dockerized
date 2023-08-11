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
import {
  ApiBearerAuth,
  ApiCreatedResponse,
  ApiNotFoundResponse,
  ApiOkResponse,
  ApiQuery,
  ApiTags,
  ApiUnauthorizedResponse,
  ApiUnprocessableEntityResponse,
} from '@nestjs/swagger';
import { Response } from 'express';
import { Paginate, PaginateQuery } from 'nestjs-paginate';
import { BearerGuard } from '../auth/bearer.guard';
import { CreatePostDTO } from './dtos/create-post.dto';
import { PostService } from './post.service';

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
  @ApiOkResponse({ description: 'Post deleted' })
  @ApiNotFoundResponse({ description: 'Invalid Post Id' })
  @ApiUnauthorizedResponse({ description: 'Check Authroization bearer token' })
  async deletePost(@Param('id') id: number, @Res() res: Response) {
    const { status, message } = await this.postService.deletePost(id);
    return res.status(status).json({ message });
  }

  @Get()
  @ApiQuery({ name: 'filter.title' })
  @ApiQuery({ name: 'page' })
  @ApiQuery({ name: 'limit' })
  @ApiOkResponse({ description: 'Posts found' })
  @ApiUnauthorizedResponse({ description: 'Check Authroization bearer token' })
  @ApiQuery({ name: 'sortBy', enum: ['id:DESC', 'id:ASC'] })
  async findAllPosts(@Paginate() query: PaginateQuery, @Res() res: Response) {
    const { status, message, data } = await this.postService.findAll(query);
    return res.status(status).json({ message, data });
  }
}
