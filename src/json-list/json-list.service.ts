import { Injectable } from '@nestjs/common';
import { CreateJsonDto } from './dto/create-json-list.dto';
import { UpdateJsonListDto } from './dto/update-json-list.dto';
// import { JsonList } from './entities/json-list.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from 'src/users/users.entity';
import { Repository } from 'typeorm';
import { JsonContent } from './entities/json-content.entity';

@Injectable()
export class JsonListService {
  constructor(
    // @InjectRepository(JsonList)
    // private jsonListRepository: Repository<JsonList>,
    @InjectRepository(JsonContent)
    private JsonContentRepository: Repository<JsonContent>,
    @InjectRepository(User)
    private userRepository: Repository<User>,
  ) {}
  async createJson(userId: number, createJsonDto: CreateJsonDto) {
    const user = await this.userRepository.findOne({
      where: {
        id: userId,
      },
    });

    if (!user) {
      throw new Error('User not found');
    }

    const newJson = new JsonContent();
    newJson.title = createJsonDto.title;
    newJson.content = createJsonDto.content;
    newJson.user = user;

    await this.JsonContentRepository.save(newJson);

    // Retrieve the updated user with jsonContents relation
    const updatedUser = await this.userRepository.findOne({
      where: { id: userId },
      relations: ['jsonContents'],
    });

    console.log(updatedUser?.jsonContents);

    return;
  }

  async findAll(id: number) {
    console.log(id);
    const user = await this.userRepository.findOne({
      where: { id },
      relations: ['jsonContents'],
    });

    console.log(user);

    if (!user) {
      throw new Error('User not found');
    }
    // console.log(user, user.jsonContents);
    const newList = [];
    for (let i = user.jsonContents.length - 1; i >= 0; i--) {
      newList.push(user.jsonContents[i]);
    }
    return newList;
    return `This action returns all jsonList`;
  }

  async findOne(id: number) {
    const jsonContent = await this.JsonContentRepository.findOne({
      where: {
        id,
      },
    });
    if (!jsonContent) {
      throw new Error(`JsonContent with id ${id} not found`);
    }
    return jsonContent;
  }

  async update(id: number, updateJsonListDto: UpdateJsonListDto) {
    const jsonContent = await this.JsonContentRepository.findOne({
      where: {
        id,
      },
    });
    if (!jsonContent) {
      throw new Error(`JsonContent with id ${id} not found`);
    }
    jsonContent.title = updateJsonListDto.title || jsonContent.title;
    jsonContent.content = updateJsonListDto.content || jsonContent.content;
    await this.JsonContentRepository.save(jsonContent);
    return jsonContent;
  }

  async remove(id: number) {
    const jsonContent = await this.JsonContentRepository.findOne({
      where: {
        id,
      },
    });
    if (!jsonContent) {
      throw new Error(`JsonContent with id ${id} not found`);
    }
    await this.JsonContentRepository.remove(jsonContent);
    return `JsonContent with id ${id} successfully removed`;
  }
}
