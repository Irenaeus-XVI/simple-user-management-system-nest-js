import { Body, Controller, Get, HttpCode, Post } from "@nestjs/common";
import { AuthService } from "./auth.service";
import { signUpDto } from "./dto/signUpDto.dto";
import { signInDto } from "./dto/signInDto.dto";
import { retry } from "rxjs";

@Controller('auth')
export class AuthController {
    constructor(private readonly _AuthService: AuthService) { }


    @Post("signUp")
    signUp(@Body() body: signUpDto) {
        return this._AuthService.handleSignUp(body)
    }


    @Post("signIn")
    @HttpCode(200)
    signIn(@Body() body: signInDto) {
        return this._AuthService.handleLogIn(body)

    }
}