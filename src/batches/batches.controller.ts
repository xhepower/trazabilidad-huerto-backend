import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  ParseIntPipe,
} from '@nestjs/common';

import { CreateBatchDto } from './dto/create-batch.dto';
import { UpdateBatchDto } from './dto/update-batch.dto';
import { BatchesService } from './batches.service';

@Controller('batches')
export class BatchesController {
  constructor(private readonly batchesService: BatchesService) {}

  @Post()
  create(@Body() createBatchDto: CreateBatchDto) {
    return this.batchesService.create(createBatchDto);
  }

  @Get()
  findAll() {
    return this.batchesService.findAll();
  }

  @Get(':id')
  findOne(@Param('id', ParseIntPipe) id: string) {
    return this.batchesService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateBatchDto: UpdateBatchDto) {
    return this.batchesService.update(+id, updateBatchDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.batchesService.remove(+id);
  }
}
