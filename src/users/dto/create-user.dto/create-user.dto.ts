import { Role } from "@prisma/client";
import { IsEmail, IsEnum, IsNotEmpty, IsOptional, IsString, MinLength, minLength } from "class-validator";

export class CreateUserDto {
    @IsEmail({}, { message: "Format email tidak valid!" })
    @IsNotEmpty({ message: 'Email tidak boleh kosong!' })
    email: string

    @IsString()
    @IsNotEmpty({ message: 'Nama tidak boleh kosong!' })
    name: string

    @IsString()
    @MinLength(6, { message: 'Passowrnd minimal 6 karakter' })
    password: string

    @IsEnum(Role, { message: 'Role tidak valid!' })
    @IsOptional()
    role?: Role

}
