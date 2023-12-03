import { IsEnum, IsNotEmpty, IsOptional, IsString, IsStrongPassword } from "class-validator";

export class updateUserDto {
    @IsOptional()
    @IsString()
    userName: string;

    @IsOptional()
    @IsString()
    @IsStrongPassword()
    password: string;

    @IsOptional()
    @IsEnum(['user', 'admin'])
    role: string;
}
