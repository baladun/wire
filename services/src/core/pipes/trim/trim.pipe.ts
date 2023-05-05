import { ArgumentMetadata, Injectable, PipeTransform } from '@nestjs/common';

@Injectable()
export class TrimPipe implements PipeTransform {
  transform(value: any, metadata: ArgumentMetadata): any {
    const { type } = metadata;

    switch (type) {
      case 'body':
        return this.handleBody(value);
      case 'param':
        return this.handleParam(value);
      case 'query':
        return this.handleQuery(value);
      default:
        return value;
    }
  }

  private handleBody(value: any): any {
    return this.isObject(value) ? this.trimObject(value) : value;
  }

  private handleParam(value: any): any {
    return this.isString(value) ? this.trimString(value) : value;
  }

  private handleQuery(value: any): any {
    return this.isString(value) ? this.trimString(value) : value;
  }

  private isObject(value: any): boolean {
    return value && typeof value === 'object';
  }

  private isArray(value: any): boolean {
    return value && Array.isArray(value);
  }

  private isString(value: any): boolean {
    return typeof value === 'string';
  }

  private trimObject(value: any): any {
    if (this.isArray(value)) {
      return (value as any[]).map(el => this.trimByType(el));
    } else {
      for (const key in value) {
        value[key] = this.trimByType(value[key]);
      }
      return value;
    }
  }

  private trimString(value: string): string {
    return value.trim();
  }

  private trimByType(value: any): any {
    if (typeof value === 'string') {
      return this.trimString(value);
    } else if (this.isObject(value)) {
      return this.trimObject(value);
    } else {
      return value;
    }
  }
}
