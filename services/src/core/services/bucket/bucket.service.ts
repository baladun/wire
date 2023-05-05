import { Injectable } from '@nestjs/common';
import { ConfigurationKeys, ConfigurationService } from '@wire/configuration';
import { Bucket, Storage } from '@google-cloud/storage';

@Injectable()
export class BucketService {
  imagesBucket: Bucket;
  audiosBucket: Bucket;

  constructor(
    private configService: ConfigurationService,
  ) {
    this.imagesBucket = this.initImagesBucket();
    this.audiosBucket = this.initAudiosBucket();
  }

  private initImagesBucket(): Bucket {
    const storage = new Storage({
      projectId: this.configService.get(ConfigurationKeys.GcpProjectId),
      credentials: {
        client_email: this.configService.get(ConfigurationKeys.GcpClientEmail),
        private_key: this.configService.get(ConfigurationKeys.GcpPrivateKey),
      },
    });

    return storage.bucket(this.configService.get(ConfigurationKeys.GcpBucketNameImages));
  }

  private initAudiosBucket(): Bucket {
    const storage = new Storage({
      projectId: this.configService.get(ConfigurationKeys.GcpProjectId),
      credentials: {
        client_email: this.configService.get(ConfigurationKeys.GcpClientEmail),
        private_key: this.configService.get(ConfigurationKeys.GcpPrivateKey),
      },
    });

    return storage.bucket(this.configService.get(ConfigurationKeys.GcpBucketNameAudios));
  }
}
