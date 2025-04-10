/* eslint-disable prettier/prettier */
import { PartialType } from '@nestjs/mapped-types';
import { CreateProductDto } from './create-product.dto';
import { IsOptional, IsString, IsNumber } from 'class-validator';

export class UpdateProductDto extends PartialType(CreateProductDto) {
        @IsString()
        @IsOptional()
        name: string;
    
        @IsString()
        @IsOptional()
        description: string;
    
        @IsNumber()
        @IsOptional()
        price: number;
    
        @IsNumber()
        @IsOptional()
        quantity: number;
}
