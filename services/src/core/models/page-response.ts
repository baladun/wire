export class PageResponse<V> {
  content: V[];
  empty: boolean;
  first: boolean;
  last: boolean;
  page: number;
  numberOfElements: number;
  size: number;
  sort: string[];
  totalElements: number;
  totalPages: number;
}
