import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { Configuration } from './configuration';

@Injectable()
export class ConfigurationService {

  constructor(
    private configService: ConfigService<Configuration>,
  ) { }

  get<K extends keyof Configuration>(key: K): Configuration[K] {
    return this.configService.get<Configuration[K]>(key);
  }

}
