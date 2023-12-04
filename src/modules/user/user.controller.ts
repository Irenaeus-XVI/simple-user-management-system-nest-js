import { Body, Controller, Delete, Get, Param, Post, Put, Req, UseGuards } from '@nestjs/common';
import { AuthGuard } from '../../guard/auth/auth.guard';
import { UserService } from './user.service';
import { addUserDto } from './dto/addUser.dto';
import { updateUserDto } from './dto/updateUser.dto';

@Controller('user')
export class UserController {

    constructor(
        private readonly userService: UserService
    ) { }


    @Get('profile')
    @UseGuards(AuthGuard)
    getProfile(@Req() request: Request) {
        // Return the authenticated user's profile
        return request['user'];
    }
    @Post('addUser')
    @UseGuards(AuthGuard)
    addUser(@Body() body: addUserDto) {
        return this.userService.addUser(body)

    }



    @Put('updateUser/:id')
    @UseGuards(AuthGuard)
    updateUser(@Param('id') userId: string, @Body() body: any) {
        return this.userService.updateUser(userId, body)
    }


    @Delete('deleteUser/:id')
    @UseGuards(AuthGuard)
    deleteUser(@Param('id') userId: string,) {
        return this.userService.deleteUser(userId)
    }
}
