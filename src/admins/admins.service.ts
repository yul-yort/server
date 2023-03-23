import {
  BadRequestException,
  ConflictException,
  Injectable,
  InternalServerErrorException,
  NotFoundException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository, UpdateResult } from 'typeorm';
import { AdminCreateDto } from './dto/create.dto';
import { Admin } from './admin.entity';
import { validate } from 'class-validator';
import { ValidateException } from '../customExeptions';
import { genSalt, hash } from 'bcryptjs';
import { AdminUpdateDto } from './dto/update.dto';

@Injectable()
export class AdminsService {
  constructor(
    @InjectRepository(Admin)
    private readonly adminRepository: Repository<Admin>,
  ) {}

  private async hashPassword(password) {
    const salt = await genSalt(10);

    return await hash(password, salt);
  }

  private deletePasswordHash(admin) {
    delete admin.passwordHash;
    return admin;
  }

  async create(createAdminDto: AdminCreateDto): Promise<Admin> {
    const oldAdmin = await this.findForValidate(createAdminDto.email);

    if (oldAdmin) {
      throw new BadRequestException(
        'Такой пользователь уже был зарегистрирован',
      );
    }

    const passwordHash = await this.hashPassword(createAdminDto.password);

    const admin = new Admin();
    admin.firstName = createAdminDto.firstName;
    admin.lastName = createAdminDto.lastName;
    admin.email = createAdminDto.email;
    admin.passwordHash = passwordHash;

    const fields = await validate(admin);

    if (fields.length) {
      throw new ValidateException(fields);
    }

    try {
      const newAdmin = await this.adminRepository.save(admin);
      return this.deletePasswordHash(newAdmin);
    } catch (error) {
      if (error?.code === 'ER_DUP_ENTRY') {
        throw new ConflictException('Email already exists');
      } else {
        throw new InternalServerErrorException(error?.message);
      }
    }
  }

  async findAll(): Promise<Admin[]> {
    return this.adminRepository.find();
  }

  async findOne(id: number): Promise<Admin | null> {
    const admin = await this.adminRepository.findOneBy({ id });

    if (!admin) {
      throw new NotFoundException(`Admin with id ${id} not found`);
    }

    return admin;
  }

  async findForValidate(
    email: string,
  ): Promise<Pick<Admin, 'passwordHash' | 'email' | 'id'> | null> {
    return await this.adminRepository.findOne({
      where: { email },
      select: ['passwordHash', 'email', 'id'],
    });
  }

  async remove(id: number): Promise<void> {
    const { affected } = await this.adminRepository.delete(id);

    if (affected === 0) {
      throw new NotFoundException(`Admin with id ${id} not found`);
    }
  }

  async update({ id, password, ...dto }: AdminUpdateDto): Promise<Admin> {
    if (password) {
      dto['passwordHash'] = await this.hashPassword(password);
    }

    const { affected }: UpdateResult = await this.adminRepository.update(
      { id },
      dto,
    );

    if (affected === 0) {
      throw new NotFoundException('Обновляемый администратор не найден');
    }

    return await this.findOne(id);
  }
}
