import { HttpStatus, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { PostEntity } from 'src/entities/post.entity';
import { Repository } from 'typeorm';
import { CreatePostDTO } from './dtos/create-post.dto';

@Injectable()
export class PostService {
  constructor(
    @InjectRepository(PostEntity)
    private postRepo: Repository<PostEntity>,
  ) {}

  async create(inputs: CreatePostDTO) {
    try {
      const post = this.postRepo.create(inputs);
      const data = await this.postRepo.save({
        ...post,
        status: inputs.isPublished,
      });

      return { message: 'Post created', data, status: HttpStatus.OK };
    } catch (error) {
      return { message: error.toString(), status: HttpStatus.BAD_REQUEST };
    }
  }

  findAll(): Promise<PostEntity[]> {
    return this.postRepo.find();
  }
}
