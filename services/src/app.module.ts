import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ConfigurationEnvs, ConfigurationKeys, ConfigurationModule, ConfigurationService } from '@wire/configuration';
import { TypeOrmModule } from '@nestjs/typeorm';
import { TrackModule } from '@wire/modules/track';
import { ArtistModule } from '@wire/modules/artist';
import { GenreModule } from '@wire/modules/genre';
import { SnakeNamingStrategy } from 'typeorm-naming-strategies';
import { CoreModule } from './core/core.module';
import { MediaModule } from '@wire/modules/media';
import { AuthModule } from '@wire/modules/auth';

@Module({
  imports: [
    ConfigurationModule,
    TypeOrmModule.forRootAsync({
      useFactory: (configService: ConfigurationService) => ({
        type: 'postgres',
        host: configService.get(ConfigurationKeys.DbHost),
        port: configService.get(ConfigurationKeys.DbPort),
        username: configService.get(ConfigurationKeys.DbUsername),
        password: configService.get(ConfigurationKeys.DbPassword),
        database: configService.get(ConfigurationKeys.DbName),
        synchronize: configService.get(ConfigurationKeys.Env) === ConfigurationEnvs.Dev,
        autoLoadEntities: true,
        namingStrategy: new SnakeNamingStrategy(),
      }),
      inject: [ConfigurationService],
    }),
    CoreModule,
    TrackModule,
    ArtistModule,
    GenreModule,
    MediaModule,
    AuthModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
