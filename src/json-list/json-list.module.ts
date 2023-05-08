import { Module } from '@nestjs/common';
import { JsonListService } from './json-list.service';
import { JsonListController } from './json-list.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from 'src/users/users.entity';
// import { JsonList } from './entities/json-list.entity';
import { JsonContent } from './entities/json-content.entity';

@Module({
  imports: [TypeOrmModule.forFeature([User, JsonContent])],
  controllers: [JsonListController],
  providers: [JsonListService],
})
export class JsonListModule {}
