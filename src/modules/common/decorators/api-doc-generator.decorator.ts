import { applyDecorators } from '@nestjs/common';
import {
  ApiBadRequestResponse,
  ApiBearerAuth,
  ApiConflictResponse,
  ApiForbiddenResponse,
  ApiHeader,
  ApiNotFoundResponse,
  ApiOperation,
  ApiUnauthorizedResponse,
  ApiUnprocessableEntityResponse,
} from '@nestjs/swagger';
import { ClassRef } from '../types/common.types';
import { ApiPaginatedResponse } from '../decorators/response-decorators/api-paginated-response.decorator';
import { ApiSuccessResponse } from '../decorators/response-decorators/api-success-response.decorator';

interface DocParams {
  summary?: string;
  conflictResponseDescription?: string;
  unauthorizedResponseDescription?: string;
  notFoundResponseDescription?: string;
  unprocessableEntityResponseDescription?: string;
  forbiddenResponseDescription?: string;

  successResponseDTO?: ClassRef;
  paginatedResponseDTO?: ClassRef;

  useVoidSuccess?: boolean;
  useBearerAuth?: boolean;
  usePermissions?: boolean;
  useApiKey?: boolean;
  useDTOValidations?: boolean;
}

export const ApiDocGenerator = (docParams: DocParams) => {
  const decorators = [];

  if (docParams.summary) decorators.push(ApiOperation({ summary: docParams.summary }));
  if (docParams.successResponseDTO) decorators.push(ApiSuccessResponse(docParams.successResponseDTO));
  if (docParams.useVoidSuccess) decorators.push(ApiSuccessResponse());
  if (docParams.paginatedResponseDTO) decorators.push(ApiPaginatedResponse(docParams.paginatedResponseDTO));
  if (docParams.useBearerAuth) decorators.push(ApiBearerAuth());
  if (docParams.useBearerAuth || docParams.unauthorizedResponseDescription)
    decorators.push(ApiUnauthorizedResponse({ description: docParams.unauthorizedResponseDescription || 'Invalid Access Token' }));
  if (docParams.usePermissions) decorators.push(ApiForbiddenResponse({ description: 'Not enough permissions' }));
  if (docParams.conflictResponseDescription) decorators.push(ApiConflictResponse({ description: docParams.conflictResponseDescription }));
  if (docParams.notFoundResponseDescription) decorators.push(ApiNotFoundResponse({ description: docParams.notFoundResponseDescription }));
  if (docParams.unprocessableEntityResponseDescription) decorators.push(ApiUnprocessableEntityResponse({ description: docParams.unprocessableEntityResponseDescription }));
  if (docParams.useApiKey) decorators.push(ApiHeader({ name: 'api-key', description: 'API key of the sub-system', required: false }));
  if (docParams.useDTOValidations) decorators.push(ApiBadRequestResponse({ description: 'Invalid Request' }));
  if (docParams.forbiddenResponseDescription) decorators.push(ApiForbiddenResponse({ description: docParams.forbiddenResponseDescription }));

  return applyDecorators(...decorators);
};
