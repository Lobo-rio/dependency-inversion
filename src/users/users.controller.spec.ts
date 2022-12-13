import { Test, TestingModule } from '@nestjs/testing';
import { UserEntity } from './entity/user.entity';
import { UsersController } from './users.controller';
import { UsersService } from './users.service';

describe('UsersController', () => {
  let usersController: UsersController;
  let usersService: UsersService;
  
  const usersEntityList: UserEntity[] = [
    new UserEntity({ 
      id: '1',
      name: 'name-test1',
      email: 'name-test1@email.com',
      password: 'name-test1',
      pathImage: 'http://name-test1.com.br/imege.png',
      createdAt: '2022-12-09T19:21:34.000Z',
      updatedAt: '2022-12-09T19:21:34.000Z',
      deletedAt: null,
    }),
    new UserEntity({ 
      id: '2',
      name: 'name-test2',
      email: 'name-test2@email.com',
      password: 'name-test2',
      pathImage: 'http://name-test2.com.br/imege.png',
      createdAt: '2022-12-09T19:21:34.000Z',
      updatedAt: '2022-12-09T19:21:34.000Z',
      deletedAt: null, 
    }),
    new UserEntity({ 
      id: '3',
      name: 'name-test2',
      email: 'name-test2@email.com',
      password: 'name-test2',
      pathImage: 'http://name-test2.com.br/imege.png',
      createdAt: '2022-12-09T19:21:34.000Z',
      updatedAt: '2022-12-09T19:21:34.000Z',
      deletedAt: null, 
    }),
  ];

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [UsersController],
      providers: [
        
        {
          provide: UsersService,
          useValue: {
            findAll: jest.fn().mockRejectedValue(usersEntityList),
            findById: jest.fn(),
            create: jest.fn(),
            update: jest.fn(),
            remove: jest.fn()
          }  
        }
      ],
    }).compile();

    usersController = module.get<UsersController>(UsersController);
    usersService = module.get<UsersService>(UsersService);
  });

  it('should be defined', () => {
    expect(usersController).toBeDefined();
    expect(usersService).toBeDefined();
  });

  describe('findAll', () => {
    it.todo('should return a users list entity successfully');
    it.todo('should throw an exception');
  });

  describe('findById', () => {
    it.todo('should return a user item id successfully');
    it.todo('should throw an exception');
  });
  describe('create', () => {
    it.todo('should create a new user item successfully');
    it.todo('should throw an exception');
  });
  describe('update', () => {
    it.todo('should update a user item successfully');
    it.todo('should throw an exception');
  });
  describe('remove', () => {
    it.todo('should remove a user item successfully');
    it.todo('should throw an exception');
  });
});
