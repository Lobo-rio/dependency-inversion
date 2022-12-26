import { ConflictException, Injectable, NotFoundException } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { Repository } from "typeorm";
import { CreateUserDto } from "../dto/create-user.dto";
import { UpdateUserDto } from "../dto/update-user.dto";
import { UserEntity } from "../entity/user.entity";
import { IUserRepository } from "../interfaces/user-repository.interface";

@Injectable()
export class UserRepository implements IUserRepository {
    constructor(
        @InjectRepository(UserEntity)
        private userRepository: Repository<UserEntity>
    ) {}
            
    async findAll(): Promise<UserEntity[]> {
        return await this.userRepository.find({
            select: ['id', 'name', 'email', 'pathImage', 'createdAt'],
        });
    }
    async findById(id: string): Promise<UserEntity | NotFoundException> {
        const user = await this.userRepository.findOne({ where: { id } });
        if (!user) return new NotFoundException('User not found!'); 
       
        return user;
    }
    async findByEmail(email: string): Promise<UserEntity> {
        return await this.userRepository.findOne({ where: { email } });
    }
    async create(data: CreateUserDto): Promise<UserEntity | ConflictException> {
        const user = await this.findByEmail(data.email);

        if (user) return new ConflictException({ message: 'User existed!' });

        return await this.userRepository.save(this.userRepository.create(data));
    }
    async update(id: string, data: UpdateUserDto): Promise<UserEntity | NotFoundException> {
        const user = await this.userRepository.findOne({ where: { id } });

        if (!user) return new NotFoundException({ message: 'User not found!' });
        
        this.userRepository.merge(user, data);

        return await this.userRepository.save(user);
    }
    async remove(id: string): Promise<void | NotFoundException> {
        await this.findById(id);
        await this.userRepository.softDelete(id);
    }
}

