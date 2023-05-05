export class ExceptionMessage<T = Record<string, any>> {
  field: keyof T;
  description: string;

  constructor(
    field: keyof T,
    description: string
  ) {
    this.field = field;
    this.description = description;
  }
}
