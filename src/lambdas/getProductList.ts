import { buildResponse } from '../utils/utils';
import { mockProducts } from '../mocks/data';



export const handler = async () => {
    try {
      return buildResponse(200, mockProducts);;
    } catch (error) {
      return buildResponse(500, {
        message: error instanceof Error ? error.message : "error",
      });
    }
  };
  