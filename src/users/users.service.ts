import { ConflictException, Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { CreateUserDto } from './dto/create-user.dto/create-user.dto';
import * as bcrypt from 'bcrypt'

@Injectable()
export class UsersService {

    constructor(private readonly prisma: PrismaService) { }

    async findAll() {
        return this.prisma.user.findMany()
    }

    async create(createUserDto: CreateUserDto) {
        const { email, name, password, role } = createUserDto

        // cek duplikasi email
        const existingUser = await this.prisma.user.findUnique({
            where: { email }
        })

        if (existingUser) {
            throw new ConflictException("Email sudah terdaftar!")
        }

        // hash password
        const hashedPassword = await bcrypt.hash(password, 10)
        return this.prisma.user.create({

            data: {
                email,
                name,
                password: hashedPassword,
                role: role ?? 'STUDENT'
            },
            select: {
                id: true,
                email: true,
                name: true,
                role: true,
                createdAt: true,
                updatedAt: true,
            }
        })

    }

    async findByEmail(email: string) {
        return this.prisma.user.findUnique({
            where: { email }
        })
    }


}