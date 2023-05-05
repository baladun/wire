import { ValidationError } from '@nestjs/common/interfaces/external/validation-error.interface';
import { BadRequestException } from '@nestjs/common';
import { ExceptionMessage } from './exception-message';

export function exceptionFactory(errors: ValidationError[]): BadRequestException {
  const exceptionMessages: ExceptionMessage[] = errors
    .map(({ property, constraints }) => ({ property, constraintTypes: Object.keys(constraints) }))
    .reduce<ExceptionMessage[]>((acc, { property, constraintTypes }) => [
      ...acc,
      ...constraintTypes.map(msg => ({ field: property, description: msg.replace(property, '').trim() })),
    ], []);

  return new BadRequestException(exceptionMessages);
}
