import { Module } from '@nestjs/common';
import { UserController } from './user.controller';
import { userRegisterSchema } from '../../Database/Schemas/user.schema';
import { JwtService } from '@nestjs/jwt';
import { dbMethods } from '../../Database/DbMethods';
import { UserService } from './user.service';

@Module({
    imports: [userRegisterSchema],
    controllers: [UserController],
    providers: [JwtService,dbMethods,UserService]
})
export class UserModule { }
