import { BadRequestException, ConflictException, Injectable } from "@nestjs/common";
import { signUpDto } from "./dto/signUpDto.dto";
import { InjectModel } from "@nestjs/mongoose";
import { User } from "../../Database/Schemas/user.schema";
import { Model } from "mongoose";
import { dbMethods } from "../../Database/DbMethods";
import * as bcrypt from 'bcrypt';
import { signInDto } from "./dto/signInDto.dto";
import { JwtService } from '@nestjs/jwt';
@Injectable()

export class AuthService {
    constructor(
        @InjectModel(User.name) private userModel: Model<User>,
        private readonly DbMethods: dbMethods,
        private jwt: JwtService
    ) { }



    async handleSignUp(data: signUpDto) {
        const { userName, email, password, role } = data
        const isExist = await this.DbMethods.findOneDocuments(this.userModel, { email })

        if (isExist) {
            throw new ConflictException('email is already exist')
        }

        const hash = bcrypt.hashSync(password, 8)
        const user = await this.DbMethods.createDocument(this.userModel, { userName, email, password: hash, role })
        return {
            message: 'success',
            user
        }
    }


    async handleLogIn(data: signInDto): Promise<object> {

        const { email, password } = data
        const isExist = await this.DbMethods.findOneDocuments(this.userModel, { email })

        if (!isExist) {
            throw new BadRequestException('You Have To Register First')
        }
        const match = await bcrypt.compare(password, isExist['password'])
        if (!match) {
            throw new BadRequestException('Wrong Password')
        }


        const token = this.jwt.sign({
            id: isExist._id,
            email: isExist.email,
            role: isExist.role
        }, {
            secret: 'simple-user-management-system-nest-js'
        })
        return {
            message: 'success',
            token
        }
    }
}