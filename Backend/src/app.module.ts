/* eslint-disable prettier/prettier */
/* eslint-disable @typescript-eslint/no-unsafe-call */
/* eslint-disable @typescript-eslint/no-unsafe-assignment */
/* eslint-disable @typescript-eslint/no-unsafe-member-access */
/* eslint-disable @typescript-eslint/require-await */
/* eslint-disable prettier/prettier */
import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { AuthModule } from './auth/auth.module';
import { MongooseModule } from '@nestjs/mongoose';
import { JwtModule } from '@nestjs/jwt';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { ProductsModule } from './products/products.module';
import config from './config/config';

@Module({
  imports: [
      ConfigModule.forRoot({
        isGlobal: true,
        cache: true,
        load: [config],

      }),
      JwtModule.registerAsync({
        imports: [ConfigModule], 
        useFactory: async (config) => ({
          secret: config.get('jwt.secret'),
        }),
        global: true,
        inject: [ConfigService],
      }),
      MongooseModule.forRootAsync({
        imports: [ConfigModule],
        useFactory: async (config) => ({
          uri: config.get('database.connectionString'),
        }),
        inject: [ConfigService],
      }),
      AuthModule,
      ProductsModule,
    ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
//