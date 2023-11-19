import { buildResponse } from '../utils/utils';
import { products } from '../mocks/data';



export const handlerAllProducts = async () => {
    try {
      return buildResponse(200, products);;
    } catch (error) {
      return buildResponse(500, {
        message: error instanceof Error ? error.message : "error",
      });
    }
  };
  