import { Test, TestingModule } from '@nestjs/testing';
import { INestApplication } from '@nestjs/common';
import * as request from 'supertest';
import { AppModule } from './../src/app.module';

describe('Testing Post Module', () => {
  let app: INestApplication;
  let postId: number = 0;
  let token: string =
    'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyIjoibWFyc19kZXYiLCJpYXQiOjE2OTE3ODMxODAsImV4cCI6MTcyMzMxOTE4MH0.H0oDr2URlf4gIY7L064l4l5hjEZJVdNZCockfHvH7Fc';

  beforeEach(async () => {
    const moduleFixture: TestingModule = await Test.createTestingModule({
      imports: [AppModule],
    }).compile();

    app = moduleFixture.createNestApplication();
    await app.init();
  });

  it('Create a new Post', () => {
    return request(app.getHttpServer())
      .post('/posts')
      .set({ Authorization: `Bearer ${token}` })
      .send({
        title: 'A title',
        description: 'A detailed description about post',
        isPublished: true,
      })
      .expect((response) => {
        postId = response.body.data.id;
        expect(response.status).toBe(201);
      });
  });

  it('Retrieves a collection of Posts when correct Headers are passed', () => {
    return request(app.getHttpServer())
      .get('/posts')
      .set({ Authorization: `Bearer ${token}` })
      .expect((response) => {
        expect(response.body.data.data.length).toBeGreaterThan(0);
      });
  });

  it('Retrieves a Posts using correct Post Id', () => {
    return request(app.getHttpServer())
      .get(`/posts/${postId}`)
      .set({ Authorization: `Bearer ${token}` })
      .expect(200);
  });

  it('Throws 404 (Not found) as status code when an incorrect Post Id passed', () => {
    return request(app.getHttpServer())
      .get('/posts/0')
      .set({ Authorization: `Bearer ${token}` })
      .expect(404);
  });

  it('Throws Unauthorized when wrong Headers are passed', () => {
    return request(app.getHttpServer()).get('/posts').expect(401);
  });

  it('Update Post title, description, status using Post Id', () => {
    return request(app.getHttpServer())
      .put(`/posts/${postId}`)
      .set({ Authorization: `Bearer ${token}` })
      .send({
        title: 'Modified title',
        description: 'A modified detailed description about post',
        isPublished: false,
      })
      .expect(200);
  });

  it('Delete Post using Post Id', () => {
    return request(app.getHttpServer())
      .delete(`/posts/${postId}`)
      .set({ Authorization: `Bearer ${token}` })
      .expect(200);
  });

  it('Throw 404 (Not found) as status code whene tried to delete Post with an invalid Post Id', () => {
    return request(app.getHttpServer())
      .delete(`/posts/${postId}`)
      .set({ Authorization: `Bearer ${token}` })
      .expect(404);
  });
});
