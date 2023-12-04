import { Body, Controller, Delete, Get, Param, Post, Put, Req, UseGuards } from '@nestjs/common';
import { AuthGuard } from '../../guard/auth/auth.guard';
import { UserService } from './user.service';
import { addUserDto } from './dto/addUser.dto';
import { Roles } from '../../guard/roles/roles.decorator';
import { Role } from '../../guard/roles/role.enum';
import { RolesGuard } from '../../guard/roles/roles.guard';
import { updateUserDto } from './dto/updateUser.dto';

@Controller('user')
export class UserController {

    constructor(
        private readonly userService: UserService
    ) { }


    @Get('profile')
    @UseGuards(AuthGuard, RolesGuard)
    @Roles(Role.Admin, Role.User)
    getProfile(@Req() request: Request) {
        // Return the authenticated user's profile
        return request['user'];
    }
    @Post('addUser')
    @UseGuards(AuthGuard, RolesGuard)
    @Roles(Role.Admin)
    addUser(@Body() body: addUserDto) {
        return this.userService.addUser(body)

    }



    @Put('updateUser/:id')
    @UseGuards(AuthGuard, RolesGuard)
    @Roles(Role.Admin)
    updateUser(@Param('id') userId: string, @Body() body: updateUserDto) {
        return this.userService.updateUser(userId, body)
    }


    @Delete('deleteUser/:id')
    @UseGuards(AuthGuard, RolesGuard)
    @Roles(Role.Admin)
    deleteUser(@Param('id') userId: string,) {
        return this.userService.deleteUser(userId)
    }
}
