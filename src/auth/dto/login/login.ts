import { IsEmail, IsNotEmpty, IsString } from "class-validator";

export class Login {

    @IsEmail({}, { message: 'Format email tidak valid!' })
    @IsNotEmpty({ message: 'Email tidak boleh kosong!' })
    email: string

    @IsString()
    @IsNotEmpty({ message: 'Password tidak boleh kosong!' })
    password: string
}
