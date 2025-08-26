import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { Repository } from 'typeorm';
import { User } from './entities/user.entity';
import { InjectRepository } from '@nestjs/typeorm';

@Injectable()
export class UsersService {
  @InjectRepository(User)
  private usersRepository: Repository<User>;
  async create(createUserDto: CreateUserDto) {
    try {
      const newUser = await this.usersRepository.create(createUserDto);
      const savedUser = await this.usersRepository.save(newUser);
      return this.findOne(savedUser.id);
    } catch (error) {
      throw new BadRequestException('Error creating user');
    }
  }

  async findAll() {
    return this.usersRepository.find({ relations: ['profile', 'producer'] });
  }

  async findOne(id: string) {
    const user = await this.usersRepository.findOne({
      where: { id },
      relations: ['producer'], // 👈 para que no truene tu validador
    });
    if (!user) {
      throw new NotFoundException(`User with id ${id} not found`);
    }
    return user;
  }

  async update(id: string, updateUserDto: UpdateUserDto) {
    const user: User = await this.findOne(id);
    
    if (user.id !== id) {
      throw new BadRequestException('Error creating user');
    }

    const updatedUser = this.usersRepository.merge(user, updateUserDto);
    return await this.usersRepository.save(updatedUser);
  }

  async remove(id: string) {
    const user = await this.findOne(id);
    return this.usersRepository.delete(id);
  }
}
