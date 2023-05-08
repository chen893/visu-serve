import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  UseGuards,
  Req,
} from '@nestjs/common';
import { JsonListService } from './json-list.service';
import { CreateJsonDto } from './dto/create-json-list.dto';
import { UpdateJsonListDto } from './dto/update-json-list.dto';
import { AuthGuard } from '@nestjs/passport';

@Controller('json-list')
export class JsonListController {
  constructor(private readonly jsonListService: JsonListService) {}

  @UseGuards(AuthGuard('jwt'))
  @Post()
  create(@Req() req: any, @Body() createJsonDto: CreateJsonDto) {
    return this.jsonListService.createJson(req.user.userId, createJsonDto);
  }

  @UseGuards(AuthGuard('jwt'))
  @Get()
  findAll(@Req() request) {
    const user = request.user;

    return this.jsonListService.findAll(user.userId);
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.jsonListService.findOne(+id);
  }

  @Patch(':id')
  update(
    @Param('id') id: string,
    @Body() updateJsonListDto: UpdateJsonListDto,
  ) {
    return this.jsonListService.update(+id, updateJsonListDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.jsonListService.remove(+id);
  }
}
