/* eslint-disable prettier/prettier */
import { Injectable } from "@nestjs/common";

@Injectable()

export class dbMethods {
    async createDocument(model: any, data: object) {
        const document = await model.create(data)
        return document
    }


    async findOneDocuments(model: any, condition: object) {
        const document = await model.findOne(condition)
        return document
    }

    async updateById(model: any, userId: string, data: any) {
        const document = await model.findByIdAndUpdate(userId, data, { new: true })
        return document
    } 

    async removeById(model: any, userId: string) {
        const document = await model.findByIdAndDelete(userId)
        return document
    }
}