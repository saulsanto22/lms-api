import { Injectable, UnauthorizedException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { UsersService } from 'src/users/users.service';
import { Login } from './dto/login/login';
import * as bcrypt from 'bcrypt'

@Injectable()
export class AuthService {
    constructor(
        private readonly usersService: UsersService,
        private readonly jwtService: JwtService
    ) { }

    async login(loginDto: Login) {
        const { email, password } = loginDto

        const user = await this.usersService.findByEmail(email)

        if (!user) {
            throw new UnauthorizedException('Email atau password salah!')
        }

        const isPasswordValid = await bcrypt.compare(password, user.password)
        if (!isPasswordValid) {
            throw new UnauthorizedException('Email atau password salah!')
        }

        const payload = {
            sub: user.id,
            email: user.email,
            role: user.role
        }

        const token = await this.jwtService.signAsync(payload)
        return {
            message: "Login Berhasil!",
            access_token: token,
            user: {
                id: user.id,
                email: user.email,
                name: user.name,
                role: user.role
            }
        }

    }
}
