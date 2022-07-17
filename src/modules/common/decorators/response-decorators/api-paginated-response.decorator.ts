import { applyDecorators, Type } from '@nestjs/common';
import { ApiExtraModels, ApiOkResponse, getSchemaPath } from '@nestjs/swagger';
import { PaginatedResponseDTO } from '../../dto/paginated-response.dto';

export const ApiPaginatedResponse = <DataDto extends Type<unknown>>(dataDto?: DataDto) =>
  applyDecorators(
    ApiExtraModels(PaginatedResponseDTO, dataDto),
    ApiOkResponse({
      schema: {
        allOf: [
          { $ref: getSchemaPath(PaginatedResponseDTO) },
          {
            properties: {
              data: {
                type: 'array',
                items: { $ref: getSchemaPath(dataDto) },
              },
            },
          },
        ],
      },
    }),
  );
