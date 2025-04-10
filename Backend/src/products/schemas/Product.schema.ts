/* eslint-disable prettier/prettier */
import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";

@Schema()

export class Product {
    @Prop({ required: true, unique: true })
    name: string;
    @Prop({ required: true, unique: true })
    description: string;
    @Prop({ required: true })
    price: number;
    @Prop({ required: true })
    quantity: number;

}


export const ProductSchema = SchemaFactory.createForClass(Product);