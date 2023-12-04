import { MongooseModule, Prop, Schema, SchemaFactory } from "@nestjs/mongoose";
import * as bcrypt from 'bcrypt';

@Schema({ timestamps: true })
export class User {
    @Prop({
        type: String,
        required: true,
        trim: true
    })
    userName: string;

    @Prop({
        type: String,
        required: true,
        unique: true,
        trim: true
    })
    email: string;

    @Prop({
        type: String,
        required: true,
        trim: true
    })
    password: string;

    @Prop({
        type: String,
        enum: ['user', 'admin'],
        default: 'user'
    })
    role: string;
}
const userSchema = SchemaFactory.createForClass(User);

userSchema.pre('save', async function (next) {
    const user: any = this;
    if (user.isModified('password')) user.password = await bcrypt.hash(user.password, 8);
    next();
});

userSchema.pre('findOneAndUpdate', async function (next) {
    const user: any = this;
    if (user._update.password) user._update.password = await bcrypt.hash(user._update.password, 8);
    next();
});

export const userRegisterSchema = MongooseModule.forFeature([{ name: User.name, schema: userSchema }]);
