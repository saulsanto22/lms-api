import { Body, Controller, Get, Post, UseGuards } from '@nestjs/common';
import { UsersService } from './users.service';
import { CreateUserDto } from './dto/create-user.dto/create-user.dto';
import { JwtAuthGuard } from 'src/auth/jwt-auth.guard';
import { RoleGuard } from 'src/auth/guards/roles.guard';
import { Role } from '@prisma/client';
import { Roles } from 'src/auth/decorators/roles.decorators';

@Controller('users')
export class UsersController {

    constructor(private readonly userService: UsersService) { }
    @UseGuards(JwtAuthGuard, RoleGuard)
    @Roles('ADMIN')
    @Get()
    async findAll() {
        return this.userService.findAll()
    }


    @Post()
    async create(@Body() CreateUserDto: CreateUserDto) {
        return this.userService.create(CreateUserDto)
    }

}
