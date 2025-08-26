import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { CreateProfileDto } from './dto/create-profile.dto';
import { UpdateProfileDto } from './dto/update-profile.dto';
import { Repository } from 'typeorm';
import { Profile } from './entities/profile.entity';
import { InjectRepository } from '@nestjs/typeorm';

@Injectable()
export class ProfilesService {
  @InjectRepository(Profile)
  private profilesRepository: Repository<Profile>;
  async create(createProfileDto: CreateProfileDto) {
    try {
      const newProfile = await this.profilesRepository.create(createProfileDto);
      const savedProfile = await this.profilesRepository.save(newProfile);
      return this.findOne(savedProfile.id);
    } catch (error) {
      throw new BadRequestException('Error creating profile');
    }
  }
  async findByUserId(userId: string) {
    const profile = await this.profilesRepository.findOne({
      where: { user: { id: userId } },
      relations: ['user'],
    });
    if (!profile) {
      throw new NotFoundException(`Profile with userId ${userId} not found`);
    }
    return profile;
  }
  async findAll() {
    return this.profilesRepository.find({  relations: ['user'] });
  }

  async findOne(id: string) {
    const profile = await this.profilesRepository.findOne({ where: { id },relations:['user'] });
    if (!profile) {
      throw new NotFoundException(`Profile with id ${id} not found`);
    }
    return profile;
  }

  async update(id: string, updateProfileDto: UpdateProfileDto) {
    const profile = await this.findOne(id);
    const updatedProfile = this.profilesRepository.merge(
      profile,
      updateProfileDto,
    );
    return await this.profilesRepository.save(updatedProfile);
  }

  async remove(id: string) {
    const profile = await this.findOne(id);
    return this.profilesRepository.delete(id);
  }
}
