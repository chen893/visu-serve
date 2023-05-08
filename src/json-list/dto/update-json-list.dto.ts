import { PartialType } from '@nestjs/mapped-types';
import { CreateJsonDto } from './create-json-list.dto';

export class UpdateJsonListDto extends PartialType(CreateJsonDto) {}
