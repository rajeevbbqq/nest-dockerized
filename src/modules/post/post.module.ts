import { Module } from '@nestjs/common';
import { PostController } from './post.controller';
import { PostService } from './post.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { PostEntity } from 'src/entities/post.entity';

@Module({
  imports: [TypeOrmModule.forFeature([PostEntity])],
  exports: [TypeOrmModule],
  controllers: [PostController],
  providers: [PostService],
})
export class PostModule {}