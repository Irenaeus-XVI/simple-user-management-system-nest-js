import { Body, Controller, Delete, Get, Post, Put, Req, UseGuards } from '@nestjs/common';
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



    @Put('updateUser')
    @UseGuards(AuthGuard)
    updateUser(@Req() request: updateUserDto, @Body() body: any) {
        const userId = request['user']._id
        return this.userService.updateUser(userId, body)

    }


    @Delete('deleteUser')
    @UseGuards(AuthGuard)
    deleteUser(@Req() request: updateUserDto) {
        const userId = request['user']._id
        return this.userService.deleteUser(userId)

    }
}
