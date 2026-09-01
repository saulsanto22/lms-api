import 'dotenv/config'
import { Injectable, OnModuleInit, OnModuleDestroy } from '@nestjs/common'
import { PrismaPg } from '@prisma/adapter-pg'
import { PrismaClient } from '@prisma/client'
import { Pool } from 'pg'
// import { async } from 'rxjs'


@Injectable()
export class PrismaService extends PrismaClient implements
    OnModuleInit, OnModuleDestroy {

    constructor() {

        console.log(process.env.DATABASE_URL)
        // 1. KONEKSI POOL -> ke postgress 
        const pool = new Pool({
            connectionString: process.env.DATABASE_URL
        })

        const adapter = new PrismaPg(pool)
        super({ adapter })
    }
    async onModuleInit() {
        await this.$connect()
    }

    async onModuleDestroy() {
        await this.$disconnect()
    }
}