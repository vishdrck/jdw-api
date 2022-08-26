import { Injectable } from '@nestjs/common';

@Injectable()
export class ResponseService {
  getPaginatedResponse(data: any[], start: number, size: number): { data: any[]; count: number } {
    if (!start || start < 0) {
      start = 0;
    }
    if (!size || size < 0) {
      size = 0;
    }
    if (data.length === 0) {
      return { data: [], count: 0 };
    } else if (start <= data.length) {
      let end = 0;
      if (size === 0) {
        end = data.length;
      } else if (data.length > start + size) {
        end = start + size;
      } else {
        end = data.length;
      }

      return { data: data.slice(start, end), count: data.length };
    } else {
      return { data: [], count: 0 };
    }
  }
}
