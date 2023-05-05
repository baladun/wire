import { Configuration, ConfigurationEnvs, ConfigurationKeys } from './configuration';
import * as Joi from 'joi';

export const validationSchema = Joi.object<Configuration, true>({
  [ConfigurationKeys.Env]: Joi
    .string()
    .valid(ConfigurationEnvs.Dev, ConfigurationEnvs.Prod)
    .required(),
  [ConfigurationKeys.DbHost]: Joi
    .string()
    .required(),
  [ConfigurationKeys.DbPort]: Joi
    .number()
    .required(),
  [ConfigurationKeys.DbUsername]: Joi
    .string()
    .required(),
  [ConfigurationKeys.DbPassword]: Joi
    .string()
    .required(),
  [ConfigurationKeys.DbName]: Joi
    .string()
    .required(),
  [ConfigurationKeys.JwtSecret]: Joi
    .string()
    .required(),
  [ConfigurationKeys.JwtExpires]: Joi
    .string()
    .required(),
  [ConfigurationKeys.GcpProjectId]: Joi
    .string()
    .required(),
  [ConfigurationKeys.GcpClientEmail]: Joi
    .string()
    .required(),
  [ConfigurationKeys.GcpPrivateKey]: Joi
    .string()
    .required(),
  [ConfigurationKeys.GcpBucketNameImages]: Joi
    .string()
    .required(),
  [ConfigurationKeys.GcpBucketNameAudios]: Joi
    .string()
    .required(),
});
