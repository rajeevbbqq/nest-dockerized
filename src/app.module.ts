import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { DatabaseModule } from './providers/database/database.module';
import { PostModule } from './modules/post/post.module';

@Module({
  imports: [ConfigModule.forRoot(), DatabaseModule, PostModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
