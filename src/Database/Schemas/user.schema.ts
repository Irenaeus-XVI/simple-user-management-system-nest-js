import { MongooseModule, Prop, Schema, SchemaFactory } from "@nestjs/mongoose";


@Schema({ timestamps: true })
export class User {

    @Prop({
        type: String,
        required: true,
        trim: true
    })
    userName: string


    @Prop({
        type: String,
        required: true,
        unique: true,
        trim: true
    })
    email: string


    @Prop({
        type: String,
        required: true,
        trim: true
    })
    password: string


    @Prop({
        type: String,
        enum: ['user', 'admin'],
        default: 'user'
    })
    role: string
}


const userSchema = SchemaFactory.createForClass(User)//NOTE - Convert TsClass To Mongoose Schema
export const userRegisterSchema = MongooseModule.forFeature([{ name: User.name, schema: userSchema }])