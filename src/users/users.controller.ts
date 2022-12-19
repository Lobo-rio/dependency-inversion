import { Body, Controller, Delete, Get, HttpCode, HttpStatus, Param, ParseUUIDPipe, Post, Put } from '@nestjs/common';
import { ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';
import { BadRequestSwagger } from '../helpers/swagger/bad-request.swagger';
import { ConflictExceptionSwagger } from '../helpers/swagger/conflict-exception.swagger';
import { NotFoundSwagger } from '../helpers/swagger/not-found.swagger';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { CreateTodoSwagger } from './swagger/create-todo.swagger';
import { IndexTodoSwagger } from './swagger/index-todo.swagger';
import { UpdateTodoSwagger } from './swagger/update-todo.swagger';
import { UsersService } from './users.service';

@Controller('app/v1/users')
@ApiTags('Users')
export class UsersController {
    constructor(private userService: UsersService) {}
    
    @Get()
    @ApiOperation({ summary: 'List users' })
    @ApiResponse({ 
        status:  200, 
        description: 'List of users returned successfully',
        type: IndexTodoSwagger,
        isArray: true,
    })
    async findAll() {
        return await this.userService.findAll();
    }

    @Get(':id')
    @ApiOperation({ summary: 'List a single users' })
    @ApiResponse({ 
        status:  200, 
        description: 'Returned single user successfully',
        type: IndexTodoSwagger,
        isArray: false, 
    })
    @ApiResponse({ 
        status:  400, 
        description: 'Invalid parameters',
        type: BadRequestSwagger,
    })
    @ApiResponse({ 
        status: 404,
        description: 'User not found',
        type: NotFoundSwagger,
    })
    async findById(@Param('id') id: string) {
        return await this.userService.findById(id);
    }

    @Post()
    @ApiOperation({ summary: 'Create user' })
    @ApiResponse({ 
        status:  201, 
        description: 'New user successfully created',
        type: CreateTodoSwagger,
    })
    @ApiResponse({ 
        status:  400, 
        description: 'Invalid parameters',
        type: BadRequestSwagger, 
    })
    @ApiResponse({ 
        status:  409, 
        description: 'ConflictException',
        type: ConflictExceptionSwagger, 
    })
    async create(@Body() body: CreateUserDto) {
        return await this.userService.create(body);
    }

    @Put(':id')
    @ApiOperation({ summary: 'Update user' })
    @ApiResponse({ 
        status:  200, 
        description: 'User updated successfully',
        type: UpdateTodoSwagger,
    })
    @ApiResponse({ 
        status:  400, 
        description: 'Invalid parameters',
        type: BadRequestSwagger,
    })
    @ApiResponse({ 
        status: 404,
        description: 'User not found',
        type: NotFoundSwagger,
    })
    async update( 
        @Param('id', new ParseUUIDPipe()) id: string,
        @Body() body: UpdateUserDto
    ) {
        return await this.userService.update(id, body);
    }

    @Delete(':id')
    @ApiOperation({ summary: 'Delete user' })
    @HttpCode(HttpStatus.NO_CONTENT)
    @ApiResponse({ 
        status:  204, 
        description: 'User removed successfully' 
    })
    @ApiResponse({ 
        status:  400, 
        description: 'Invalid parameters',
        type: BadRequestSwagger,
    })
    @ApiResponse({ 
        status: 404,
        description: 'User not found',
        type: NotFoundSwagger,
    })
    async remove(@Param('id', new ParseUUIDPipe()) id: string) {
        return await this.userService.remove(id);
    }
}
