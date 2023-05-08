import { Test, TestingModule } from '@nestjs/testing';
import { JsonListController } from './json-list.controller';
import { JsonListService } from './json-list.service';

describe('JsonListController', () => {
  let controller: JsonListController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [JsonListController],
      providers: [JsonListService],
    }).compile();

    controller = module.get<JsonListController>(JsonListController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
