import { Body, Controller, Get, HttpStatus, Post, Res } from '@nestjs/common';
import { Response } from 'express';
import { PostService } from './post.service';
import { CreatePostDTO } from './dtos/create-post.dto';

@Controller('posts')
export class PostController {
  constructor(private readonly postService: PostService) {}

  @Post()
  async createPost(@Res() res: Response, @Body() inputs: CreatePostDTO) {
    const { status, data, message } = await this.postService.create(inputs);
    return res.status(status).json({ message, data });
  }

  @Get()
  findAllPosts() {
    return this.postService.findAll();
  }
}
