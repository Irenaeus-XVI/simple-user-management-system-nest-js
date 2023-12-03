import { IsEnum, IsNotEmpty, IsOptional, IsString, IsStrongPassword } from "class-validator"

export class signInDto {

    @IsNotEmpty()
    @IsString()
    email: string

    @IsNotEmpty()
    @IsString()
    @IsStrongPassword()
    password: string


}