import {
  BadRequestException,
  ConflictException,
  Injectable,
  InternalServerErrorException,
  NotFoundException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { UserCreateDto } from './dto/create.dto';
import { User } from './user.entity';
import { validate } from 'class-validator';
import { ValidateException } from '../customExeptions';
import { genSalt, hash } from 'bcryptjs';

@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(User)
    private readonly usersRepository: Repository<User>,
  ) {}

  async create(createUserDto: UserCreateDto): Promise<User> {
    const oldUser = await this.findForValidate(createUserDto.email);

    if (oldUser) {
      throw new BadRequestException(
        'Такой пользователь уже был зарегистрирован',
      );
    }

    const salt = await genSalt(10);
    const passwordHash = await hash(createUserDto.password, salt);

    const user = new User();
    user.firstName = createUserDto.firstName;
    user.lastName = createUserDto.lastName;
    user.email = createUserDto.email;
    user.passwordHash = passwordHash;

    const fields = await validate(user);

    if (fields.length) {
      throw new ValidateException(fields);
    }

    try {
      const savedUser = await this.usersRepository.save(user);
      delete savedUser.passwordHash;
      return savedUser;
    } catch (error) {
      if (error?.code === 'ER_DUP_ENTRY') {
        throw new ConflictException('Email already exists');
      } else {
        throw new InternalServerErrorException(error?.message);
      }
    }
  }

  async findAll(): Promise<User[]> {
    return this.usersRepository.find();
  }

  async findOne(id: number): Promise<User | null> {
    const user = await this.usersRepository.findOneBy({ id });

    if (!user) {
      throw new NotFoundException(`User with id ${id} not found`);
    }

    return user;
  }

  async findForValidate(
    email: string,
  ): Promise<Pick<User, 'passwordHash' | 'email' | 'id'> | null> {
    return await this.usersRepository.findOne({
      where: { email },
      select: ['passwordHash', 'email', 'id'],
    });
  }

  async remove(id: number): Promise<void> {
    const { affected } = await this.usersRepository.delete(id);

    if (affected === 0) {
      throw new NotFoundException(`User with id ${id} not found`);
    }
  }
}
