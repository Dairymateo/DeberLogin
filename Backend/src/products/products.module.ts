/* eslint-disable prettier/prettier */
import { Module } from '@nestjs/common';
import { ProductsService } from './products.service';
import { ProductsController } from './products.controller';

import { MongooseModule } from '@nestjs/mongoose/dist/mongoose.module';
import { Product, ProductSchema } from './schemas/Product.schema';



@Module({
  imports: [MongooseModule.forFeature([{name: Product.name, schema: ProductSchema}])],
  controllers: [ProductsController],
  providers: [ProductsService],
})
export class ProductsModule {}
