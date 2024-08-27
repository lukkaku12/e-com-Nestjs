import { IsOptional, IsString } from "class-validator";

export class createUserDto {
    @IsString()
    readonly name:string;

    @IsString()
    readonly password:string;
    @IsOptional()
    @IsString()
    readonly role?:string;
}