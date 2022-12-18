import { extendZodWithOpenApi } from '@asteasolutions/zod-to-openapi';
import type { z } from 'zod';

declare module 'zod' {
  interface ZodTypeDef {
    asyncApi?: ZodTypeDef['openapi'];
  }

  interface ZodSchema<Output, Def extends ZodTypeDef, Input = Output> {
    asyncApi: ZodSchema<Output, Def, Input>['openapi'];
  }
}

export const extendZodWithAsyncApi = (zod: typeof z) => {
  if (typeof zod.ZodSchema.prototype.openapi !== 'undefined') {
    // This zod instance is already extended with the required methods,
    // doing it again will just result in multiple wrapper methods for
    // `optional` and `nullable`
    return;
  }

  extendZodWithOpenApi(zod);
  zod.ZodSchema.prototype.asyncApi = zod.ZodSchema.prototype.openapi;
};
