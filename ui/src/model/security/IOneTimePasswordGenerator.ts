export default interface IOneTimePasswordGenerator {
  generateResponse(challenge: string): string;
}
