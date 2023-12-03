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


}