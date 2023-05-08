import { Test, TestingModule } from '@nestjs/testing';
import { JsonListService } from './json-list.service';

describe('JsonListService', () => {
  let service: JsonListService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [JsonListService],
    }).compile();

    service = module.get<JsonListService>(JsonListService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
