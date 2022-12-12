import { Inject, Injectable } from '@nestjs/common';
import { hashSync } from 'bcryptjs';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { IUserRepository } from './interfaces/user-repository.interface';

@Injectable()
export class UsersService {
    constructor(
        @Inject("IUserRepository")
        private readonly userRepository: IUserRepository
    ) {}
    
    async findAll() {
        return await this.userRepository.findAll();
    }

    async findById(id: string) {
        return await this.userRepository.findById(id);
    }

    async create(data: CreateUserDto) {
        const hashPassword = hashSync(data.password, 10);
        data.password = hashPassword;
        return await this.userRepository.create(data);
    }

    async update(id: string, data: UpdateUserDto) {
        return await this.userRepository.update(id, data);
    }

    async remove(id: string) {
        return await this.userRepository.remove(id);
    }
}
