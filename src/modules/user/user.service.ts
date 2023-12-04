import { BadRequestException, ConflictException, Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { User } from "../../Database/Schemas/user.schema";
import { Model } from "mongoose";
import { dbMethods } from "../../Database/DbMethods";
import { addUserDto } from './dto/addUser.dto';
import { updateUserDto } from './dto/updateUser.dto';
@Injectable()
export class UserService {

    constructor(
        @InjectModel(User.name) private userModel: Model<User>,
        private readonly DbMethods: dbMethods,
    ) { }


    
    async addUser(data: addUserDto) {
        const { email } = data
        const isExist = await this.DbMethods.findOneDocuments(this.userModel, { email })

        if (isExist) {
            throw new ConflictException('email is already exist')
        }

        const user = await this.DbMethods.createDocument(this.userModel, data)
        return {
            message: 'success',
            user
        }
    }


    async updateUser(userId: string, data: updateUserDto) {


        const user = await this.DbMethods.findOneDocuments(this.userModel, { _id: userId });
        if (!user) {
            throw new NotFoundException('User not found');
        }

        const updatedUser = await this.DbMethods.updateById(this.userModel, userId, data)
        if (!updatedUser) {
            throw new BadRequestException('Error during user update')
        }

        return {
            message: 'User profile updated successfully',
            updatedUser,
        };
    }


    async deleteUser(userId: string) {

        // Find the user by ID
        const user = await this.DbMethods.findOneDocuments(this.userModel, { _id: userId });

        if (!user) {
            throw new NotFoundException('User not found');
        }

        // Delete the user
        await this.DbMethods.removeById(this.userModel, userId)

        return {
            message: 'User deleted successfully',
        };

    }
}
