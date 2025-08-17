import { Injectable, NotFoundException } from '@nestjs/common';
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
    const newUser=await this.usersRepository.save(createUserDto)
    return newUser
  }

  async findAll() {
    return this.usersRepository.find();
  }

  async findOne(id: number) {
    const user = await this.usersRepository.findOneBy({ id });
    if (!user) {
      throw new NotFoundException(`User with id ${id} not found`);
    }
    return user;
  }

  async update(id: number, updateUserDto: UpdateUserDto) {
    const user=await this.findOne(id)
    const updatedUser= this.usersRepository.merge(user,updateUserDto)
    return await this.usersRepository.save(updatedUser)
  }

  remove(id: number) {
    const user=this.findOne(id)
    return this.usersRepository.delete(id)
  }
}
