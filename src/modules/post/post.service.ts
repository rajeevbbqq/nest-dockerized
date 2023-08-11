import { HttpStatus, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import {
  FilterOperator,
  FilterSuffix,
  PaginateQuery,
  paginate,
} from 'nestjs-paginate';
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

      return { message: 'Post created', data, status: HttpStatus.CREATED };
    } catch (error) {
      return { message: error.toString(), status: HttpStatus.BAD_REQUEST };
    }
  }

  async findOne(postId: number) {
    try {
      const post = await this.postRepo.findOne({ where: { id: postId } });

      if (post) {
        return { message: 'Post fetched', data: post, status: HttpStatus.OK };
      } else {
        return {
          message: 'Invalid Post Id',
          status: HttpStatus.NOT_FOUND,
        };
      }
    } catch (error) {
      return { message: error.toString(), status: HttpStatus.BAD_REQUEST };
    }
  }

  async updatePost(postId: number, inputs: CreatePostDTO) {
    try {
      const post = await this.postRepo.exist({ where: { id: postId } });

      if (post) {
        await this.postRepo.update(
          { id: postId },
          {
            status: inputs.isPublished,
            description: inputs.description,
            title: inputs.title,
          },
        );
        return { message: 'Post updated', status: HttpStatus.OK };
      } else {
        return {
          message: 'Invalid Post Id',
          status: HttpStatus.NOT_FOUND,
        };
      }
    } catch (error) {
      return { message: error.toString(), status: HttpStatus.BAD_REQUEST };
    }
  }

  async deletePost(postId: number) {
    try {
      const post = await this.postRepo.exist({ where: { id: postId } });

      if (post) {
        await this.postRepo.delete({ id: postId });
        return { message: 'Post deleted', status: HttpStatus.OK };
      } else {
        return {
          message: 'Invalid Post Id',
          status: HttpStatus.NOT_FOUND,
        };
      }
    } catch (error) {
      return { message: error.toString(), status: HttpStatus.BAD_REQUEST };
    }
  }

  async findAll(query: PaginateQuery) {
    try {
      const posts = await paginate(query, this.postRepo, {
        sortableColumns: ['id', 'title', 'description'],
        nullSort: 'last',
        defaultSortBy: [['id', 'DESC']],
        searchableColumns: ['title', 'id'],
        filterableColumns: {
          title: true,
        },
      });

      console.log(posts);

      if (posts.data.length > 0) {
        return { message: 'Posts found', data: posts, status: HttpStatus.OK };
      } else {
        return {
          message: 'No Posts found',
          status: HttpStatus.NOT_FOUND,
        };
      }
    } catch (error) {
      return { message: error.toString(), status: HttpStatus.BAD_REQUEST };
    }
  }
}
