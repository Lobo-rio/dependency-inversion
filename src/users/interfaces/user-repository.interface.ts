import { ConflictException, NotFoundException } from "@nestjs/common"
import { CreateUserDto } from "../dto/create-user.dto"
import { UpdateUserDto } from "../dto/update-user.dto"
import { UserEntity } from "../entity/user.entity"

export interface IUserRepository {
    findAll(): Promise<UserEntity[]>;
    findById(id: string): Promise<UserEntity | NotFoundException>;
    findByEmail(email: string): Promise<UserEntity>;
    create(data: CreateUserDto): Promise<UserEntity | ConflictException>;
    update(id: string, data: UpdateUserDto): Promise<UserEntity | NotFoundException>;
    remove(id: string): Promise<void | NotFoundException>;
} 