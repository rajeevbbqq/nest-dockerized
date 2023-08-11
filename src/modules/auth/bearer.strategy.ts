import { Injectable, UnauthorizedException } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { Strategy } from 'passport-http-bearer';

import * as jwt from 'jsonwebtoken';

@Injectable()
export class BearerStrategy extends PassportStrategy(Strategy) {
  constructor() {
    super();
  }

  async validate(accessToken: string): Promise<boolean> {
    try {
      jwt.verify(accessToken, process.env.JWT_SECRET);
      return true;
    } catch (error) {
      throw new UnauthorizedException();
    }
  }
}
