import { BadRequestException, CanActivate, ExecutionContext, HttpException, Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { InjectModel } from '@nestjs/mongoose';
import { dbMethods } from '../../Database/DbMethods';
import { User } from '../../Database/Schemas/user.schema';
import { Model } from 'mongoose';

@Injectable()
export class AuthGuard implements CanActivate {
  constructor(
    private jwt: JwtService,
    private DbMethod: dbMethods,
    @InjectModel(User.name) private userModel: Model<User>,

  ) { }
  async canActivate(
    context: ExecutionContext,
  ): Promise<boolean> {
    const request = context.switchToHttp().getRequest()
    const { authorization } = request.headers
    if (!authorization?.startsWith('nest__')) {
      throw new BadRequestException('In-Valid Bearer Key')
    }
    const token = authorization.split('nest__')[1]
    if (!token) {
      throw new BadRequestException('In-Valid Token')
    }

    try {
      const decoded = this.jwt.verify(token, {
        secret: 'simple-user-management-system-nest-js'
      })

      if (!decoded?.id) {
        throw new BadRequestException('In-Valid Token')
      }


      const user = await this.DbMethod.findOneDocuments(this.userModel, { _id: decoded.id })

      return request['user'] = user
    } catch (error) {
      throw new HttpException(error.message, 400)
    }
  }
}
