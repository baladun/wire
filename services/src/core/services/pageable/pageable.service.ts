import { Injectable } from '@nestjs/common';
import { PageRequest, PageResponse } from '@wire/core/models';
import { SelectQueryBuilder } from 'typeorm/query-builder/SelectQueryBuilder';
import { OrderByCondition } from 'typeorm/find-options/OrderByCondition';
import { FindOperator } from 'typeorm/find-options/FindOperator';
import { ILike } from 'typeorm';

interface Arguments<V> {
  totalSelect: SelectQueryBuilder<V>;
  page: PageRequest['page'];
  size: PageRequest['size'];
  sort: PageRequest['sort'];
}

interface PageRes<V> {
  entities: V[],
  metadata: Omit<PageResponse<any>, 'content'>
}

@Injectable()
export class PageableService {

  async getPage<V>({ totalSelect, page, size, sort }: Arguments<V>): Promise<PageRes<V>> {
    const allRequested = size === -1;

    const pageable = allRequested ?
      totalSelect :
      totalSelect
        .skip(page * size)
        .take(size);

    const totalElements = await totalSelect.getCount();
    const [entities, numberOfElements] = await pageable.getManyAndCount();
    const totalPages = totalElements ?
      (allRequested ? 1 : Math.ceil(totalElements / size)) :
      0;

    return {
      entities,
      metadata: {
        empty: !entities.length,
        first: allRequested || !page,
        last: allRequested || !totalPages || page + 1 === totalPages,
        page: allRequested ? 0 : page,
        numberOfElements,
        size: allRequested ? totalElements : size,
        sort,
        totalElements,
        totalPages,
      },
    };
  }

  toSearchPattern(search: PageRequest['search']): FindOperator<string> {
    return ILike(`%${search}%`);
  }

  toOrderBy(sort: PageRequest['sort'], alias: string): OrderByCondition {
    return sort.reduce((acc, cur) => {
      const [key, dir] = cur.split(',');

      return {
        ...acc,
        [`${alias}.${key}`]: dir.toUpperCase(),
      };
    }, {});
  }
}
