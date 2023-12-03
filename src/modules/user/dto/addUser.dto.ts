import { IsEnum, IsNotEmpty, IsOptional, IsString, IsStrongPassword } from "class-validator"

export class addUserDto {
    @IsNotEmpty()
    @IsString()
    userName: string
    
    @IsNotEmpty()
    @IsString()
    email: string
    
    @IsNotEmpty()
    @IsString()
    @IsStrongPassword()
    password: string
    
    @IsEnum(['user', 'admin'])
    @IsOptional()
    role: string
}