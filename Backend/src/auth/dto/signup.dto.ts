/* eslint-disable prettier/prettier */

import { IsEmail, Matches, MinLength } from "class-validator";
import { IsString } from "class-validator";



export class SignupDto {

    @IsString()
    name: string;
    
    @IsEmail()
    email: string;

    @IsString()
    @MinLength(6)
    @Matches(/(?=.*[0-9])(?=.*[a-zA-Z])/, {message: 'password must contain at least one letter and one number'})
    password: string;


}