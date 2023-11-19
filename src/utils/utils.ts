 type JSON = string | number | boolean | { [x: string]: JSON } | Array<JSON>;

type Headers = Record<string, string | boolean>; 

export interface Response {
  statusCode: number;
  headers: Headers;
  body: string;
  
}

export const buildResponse = (statusCode: number, body: JSON): Response => {
  return {
    statusCode,
    headers: {
      "Access-Control-Allow-Methods": "*",
      "Access-Control-Allow-Origin": "*",
      "Access-Control-Allow-Headers": "*",
      "Access-Control-Allow-Credentials": true,
    },
    body: JSON.stringify(body)
  };
};



