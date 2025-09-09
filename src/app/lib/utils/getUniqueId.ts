import { inject } from '@angular/core';
import { IdGeneratorService } from '@lib/services/id-generator.service';

export function getUniqueId(id: string): string {
  return inject(IdGeneratorService).getId(id);
}
