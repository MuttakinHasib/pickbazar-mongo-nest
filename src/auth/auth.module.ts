import { MiddlewareConsumer, Module, NestModule } from '@nestjs/common';
import { AuthService } from './auth.service';
import { AuthController } from './auth.controller';
import { JwtStrategy } from './passport/jwt.strategy';
import { MongooseModule } from '@nestjs/mongoose';
import { User, UserSchema } from 'src/users/schema/user.schema';
import { EmailVerificationSchema } from './schemas/emailVerification.schema';
import { ForgottenPasswordSchema } from './schemas/forgotPassword.schema';
import { ConsentRegistrySchema } from './schemas/consentregistry.schema';
import { JWTService } from './jwt.service';
import { UsersService } from 'src/users/users.service';
import { LoggerMiddleware } from 'src/common/middlewares/logger.middlware';
import { Profile, ProfileSchema } from 'src/users/schema/profile.schema';
import { PassportModule } from '@nestjs/passport';
import { JwtModule } from '@nestjs/jwt';
import config from 'src/config';
import { HttpModule } from '@nestjs/axios';
import { UsersModule } from 'src/users/users.module';
import { Otp, OtpSchema } from './schemas/otp.schema';

@Module({
  imports: [
    MongooseModule.forFeature([
      { name: 'EmailVerification', schema: EmailVerificationSchema },
      { name: 'ForgottenPassword', schema: ForgottenPasswordSchema },
      { name: 'ConsentRegistry', schema: ConsentRegistrySchema },
      { name: Otp.name, schema: OtpSchema },
    ]),
    UsersModule,
    HttpModule,
    PassportModule,
    JwtModule.register({
      secret: config.jwt.secretOrKey,
      signOptions: { expiresIn: config.jwt.expiresIn },
    }),
  ],
  controllers: [AuthController],
  providers: [AuthService, UsersService, JWTService, JwtStrategy],
})
export class AuthModule implements NestModule {
  public configure(consumer: MiddlewareConsumer) {
    consumer
      .apply(LoggerMiddleware)
      // .exclude(
      //   { path: 'example', method: RequestMethod.GET },
      // )
      .forRoutes(AuthController);
  }
}
