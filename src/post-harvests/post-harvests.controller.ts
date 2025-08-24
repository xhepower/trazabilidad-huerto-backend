import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { PostHarvestsService } from './post-harvests.service';
import { CreatePostHarvestDto } from './dto/create-post-harvest.dto';
import { UpdatePostHarvestDto } from './dto/update-post-harvest.dto';

@Controller('post-harvests')
export class PostHarvestsController {
  constructor(private readonly postHarvestsService: PostHarvestsService) {}

  @Post()
  create(@Body() createPostHarvestDto: CreatePostHarvestDto) {
    return this.postHarvestsService.create(createPostHarvestDto);
  }

  @Get()
  findAll() {
    return this.postHarvestsService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.postHarvestsService.findOne(id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updatePostHarvestDto: UpdatePostHarvestDto) {
    return this.postHarvestsService.update(id, updatePostHarvestDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.postHarvestsService.remove(id);
  }
}
