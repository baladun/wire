export enum ConfigurationKeys {
  Env = 'ENV',

  DbHost = 'DB_HOST',
  DbPort = 'DB_PORT',
  DbUsername = 'DB_USERNAME',
  DbPassword = 'DB_PASSWORD',
  DbName = 'DB_NAME',

  JwtSecret = 'JWT_SECRET',
  JwtExpires = 'JWT_EXPIRES',

  GcpProjectId = 'GCP_PROJECT_ID',
  GcpClientEmail = 'GCP_CLIENT_EMAIL',
  GcpPrivateKey = 'GCP_PRIVATE_KEY',
  GcpBucketNameImages = 'GCP_BUCKET_NAME_IMAGES',
  GcpBucketNameAudios = 'GCP_BUCKET_NAME_AUDIOS',
}

export enum ConfigurationEnvs {
  Dev = 'dev',
  Prod = 'prod',
}

export type Configuration = {
  [ConfigurationKeys.Env]: ConfigurationEnvs;
  [ConfigurationKeys.DbHost]: string;
  [ConfigurationKeys.DbPort]: number;
  [ConfigurationKeys.DbUsername]: string;
  [ConfigurationKeys.DbPassword]: string;
  [ConfigurationKeys.DbName]: string;
  [ConfigurationKeys.JwtSecret]: string;
  [ConfigurationKeys.JwtExpires]: string;
  [ConfigurationKeys.GcpProjectId]: string;
  [ConfigurationKeys.GcpClientEmail]: string;
  [ConfigurationKeys.GcpPrivateKey]: string;
  [ConfigurationKeys.GcpBucketNameImages]: string;
  [ConfigurationKeys.GcpBucketNameAudios]: string;
};
