import { emit } from 'process';
import { products } from '../mocks/data';
import { buildResponse } from '../utils/utils';

export const handlerProductById = async (e: any) => {
  try {
    const { productId } = e.pathParameters;

    const product = products.find((prod) => prod.id === productId);

    if (!product) {
      return buildResponse(404, {
        message: 'Product not found',
      });
    }

    return buildResponse(200, product);
  } catch (err: any) {
    return buildResponse(500, {
      message: err.message,
    });
  }
};
