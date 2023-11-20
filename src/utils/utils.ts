 type JSON = string | number | boolean | { [x: string]: JSON } | Array<JSON>;



export const buildResponse = (statusCode: number, body: JSON): any => {
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



