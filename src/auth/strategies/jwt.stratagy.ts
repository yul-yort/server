import { Injectable } from "@nestjs/common";
import { ConfigService } from "@nestjs/config";
import { PassportStrategy } from "@nestjs/passport";
import {ExtractJwt, Strategy} from 'passport-jwt'
import { UserModel } from "../user.model";

// за что отвечает декоратор Injectable
@Injectable()
export class JwtStratage extends PassportStrategy(Strategy) {
  constructor(private readonly configService: ConfigService){
    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      ignoreExpiration: true,
      secretOrKey: configService.get('JWT_SECRET')
    })
  }

  async validate({email}: Pick<UserModel, 'email'>) {
    return email;
  }
}