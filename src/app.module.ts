import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { AuthModule } from './modules/auth/auth.module';
import { MongooseModule } from '@nestjs/mongoose';
import { UserModule } from './modules/user/user.module';

@Module({
  imports: [MongooseModule.forRoot('mongodb://127.0.0.1/simple-user-management-system-nest-js'), AuthModule, UserModule],

  controllers: [AppController],
  providers: [AppService],
})
export class AppModule { }
