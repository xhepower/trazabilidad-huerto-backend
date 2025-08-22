import { Injectable } from '@nestjs/common';
import { CreateExportationDto } from './dto/create-exportation.dto';
import { UpdateExportationDto } from './dto/update-exportation.dto';

@Injectable()
export class ExportationsService {
  create(createExportationDto: CreateExportationDto) {
    return 'This action adds a new exportation';
  }

  findAll() {
    return `This action returns all exportations`;
  }

  findOne(id: number) {
    return `This action returns a #${id} exportation`;
  }

  update(id: number, updateExportationDto: UpdateExportationDto) {
    return `This action updates a #${id} exportation`;
  }

  remove(id: number) {
    return `This action removes a #${id} exportation`;
  }
}
