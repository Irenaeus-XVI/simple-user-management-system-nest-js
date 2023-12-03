import { Module } from "@nestjs/common";
import { AuthController } from "./auth.controller";
import { AuthService } from "./auth.service";
import { userRegisterSchema } from "../../Database/Schemas/user.schema";
import { dbMethods } from "../../Database/DbMethods";
import { JwtService } from "@nestjs/jwt";

@Module({
    imports: [userRegisterSchema],
    controllers: [AuthController],
    providers: [AuthService, dbMethods, JwtService]
})

export class AuthModule { }