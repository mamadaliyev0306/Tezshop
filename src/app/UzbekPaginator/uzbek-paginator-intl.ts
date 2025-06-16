// uzbek-paginator-intl.ts
import { MatPaginatorIntl } from '@angular/material/paginator';
import { Injectable } from '@angular/core';

@Injectable()
export class UzbekPaginatorIntl extends MatPaginatorIntl {
  override itemsPerPageLabel = 'Har sahifada:';
  override nextPageLabel = 'Keyingi';
  override previousPageLabel = 'Oldingi';
  override firstPageLabel = 'Birinchi';
  override lastPageLabel = 'Oxirgi';

  override getRangeLabel = (page: number, pageSize: number, length: number): string => {
    if (length === 0 || pageSize === 0) {
      return `0 dan ${length}`;
    }
    length = Math.max(length, 0);
    const startIndex = page * pageSize;
    const endIndex = startIndex < length ? 
      Math.min(startIndex + pageSize, length) : startIndex + pageSize;
    return `${startIndex + 1} - ${endIndex} dan ${length}`;
  };
}

export function getUzbekPaginatorIntl(): UzbekPaginatorIntl {
  return new UzbekPaginatorIntl();
}
