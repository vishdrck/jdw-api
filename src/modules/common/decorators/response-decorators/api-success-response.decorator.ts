import { applyDecorators, Type } from '@nestjs/common';
import { ApiExtraModels, ApiOkResponse, getSchemaPath } from '@nestjs/swagger';
import { SuccessResponseDTO } from '../../dto/success-response.dto';

export const ApiSuccessResponse = <DataDto extends Type<unknown>>(
  dataDto?: DataDto,
) => {
  if (dataDto) {
    return applyDecorators(
      ApiExtraModels(SuccessResponseDTO, dataDto),
      ApiOkResponse({
        schema: {
          allOf: [
            { $ref: getSchemaPath(SuccessResponseDTO) },
            {
              properties: {
                data: { $ref: getSchemaPath(dataDto) },
              },
            },
          ],
        },
      }),
    );
  }

  return applyDecorators(
    ApiExtraModels(SuccessResponseDTO),
    ApiOkResponse({
      schema: {
        allOf: [{ $ref: getSchemaPath(SuccessResponseDTO) }],
      },
    }),
  );
};
