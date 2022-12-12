import { ApiProperty } from "@nestjs/swagger";
import { 
    Column,
    CreateDateColumn,
    DeleteDateColumn,
    Entity,
    PrimaryGeneratedColumn,
    UpdateDateColumn
} from "typeorm";

@Entity({ name: 'users' })
export class UserEntity {
    @PrimaryGeneratedColumn('uuid')
    @ApiProperty()
    id: string;

    @Column()
    @ApiProperty()
    name: string;
   
    @Column()
    @ApiProperty()
    email: string;

    @Column()
    @ApiProperty()
    password: string;

    @Column({ name: 'path-image' })
    @ApiProperty()
    pathImage: string;

    @CreateDateColumn({ name: 'created-at '})
    @ApiProperty()
    createdAt: string;

    @UpdateDateColumn({ name: 'updated-at'})
    @ApiProperty()
    updatedAt: string;

    @DeleteDateColumn({ name: 'deleted-at' })
    @ApiProperty()
    deletedAt: string;

    constructor(user?: Partial<UserEntity>) {
        this.id = user?.id;
        this.name = user?.name;
        this.email = user?.email;
        this.password = user?.password;
        this.pathImage = user?.pathImage;
        this.createdAt = user?.createdAt;
        this.deletedAt = user?.updatedAt;
        this.deletedAt = user?.deletedAt;
    }
}