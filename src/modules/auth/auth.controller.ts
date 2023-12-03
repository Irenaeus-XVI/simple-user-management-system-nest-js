import { Body, Controller, Get, Post } from "@nestjs/common";
import { AuthService } from "./auth.service";
import { signUpDto } from "./dto/signUpDto.dto";
import { signInDto } from "./dto/signInDto.dto";

@Controller('auth')
export class AuthController {
    constructor(private readonly _AuthService: AuthService) { }


    @Post("signUp")
    signUp(@Body() body: signUpDto) {
        console.log(body);
    }


    @Post("signIn")
    signIn(@Body() body: signInDto) {
        console.log(body);
    }
}