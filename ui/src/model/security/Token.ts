import Model from "../Model";

export interface TToken {
  clientId: number;
}

const Token = Model((token: TToken) => {
  const _token = token;
  return {
    get clientId() {
      return _token.clientId;
    }
  };
});

export default Token;