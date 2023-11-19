import { buildResponse } from '../src/utils/utils';
import { handlerAllProducts } from '../src/lambdas/getProductList';
import { handlerProductById } from '../src/lambdas/getProductById';
import { products } from '../src/mocks/data';


describe('test api products', () => {
  it('return porduct id', async () => {
    const expectedResult = {
      pathParameters: {
        productId: '3',
      },
    };
    const productItem = await handlerProductById(expectedResult);
    expect(productItem).toEqual(buildResponse(200, products[0]));
  });

  it('should return error Product not found', async () => {
    const expectedResult = {
      pathParameters: {
        productId: '1000',
      },
    };
    const productItem = await handlerProductById(expectedResult);
    expect(productItem).toEqual(
      buildResponse(404, {
        message: 'Product not found',
      })
    );
  });
  it('should return array of products', async () => {
    const productList = await handlerAllProducts();
    expect(productList).toEqual(buildResponse(200, products));
  });
});
