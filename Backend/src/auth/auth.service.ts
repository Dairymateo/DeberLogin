/* eslint-disable @typescript-eslint/require-await */
/* eslint-disable prettier/prettier */
/* eslint-disable @typescript-eslint/no-unsafe-call */
/* eslint-disable @typescript-eslint/no-unsafe-member-access */
/* eslint-disable @typescript-eslint/no-unsafe-assignment */
/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable prettier/prettier */
import { BadRequestException, Injectable, UnauthorizedException } from '@nestjs/common';
import { SignupDto } from './dto/signup.dto';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { User } from './schemas/user.schema';
import * as bcrypt from 'bcrypt';
import { LoginDto } from './dto/login.dto';
import { JwtService } from '@nestjs/jwt';



@Injectable()
export class AuthService {

  constructor(@InjectModel(User.name) private userModel: Model<User>, private jwtService: JwtService,) { }

  async signUp(signupData: SignupDto){

    const {email, password, name} = signupData;

    const emailInUse = await this.userModel.findOne({ 
      email, 
    });
    if (emailInUse) {
      throw new BadRequestException('Email already in use');
    }
    
    const hashedPassword = await bcrypt.hash(password, 10);


    await this.userModel.create({
      name,
      email,
      password: hashedPassword,
    })

  }


  async login(credentials: LoginDto) {
    const {email, password} = credentials;

    const user = await this.userModel.findOne({ 
      email, 
    });
    if (!user) {
      throw new UnauthorizedException("Invalid credentials");
    }

    const passwordMatch = await bcrypt.compare(password, user.password);

    if (!passwordMatch) {
      throw new BadRequestException("Invalid credentials");
    }



    return this.generateUserToken(user._id);


  }


  async generateUserToken(userId) {
    const accessToken = this.jwtService.sign({userId}, {expiresIn: '1h'});


    return {accessToken};
  } 
}