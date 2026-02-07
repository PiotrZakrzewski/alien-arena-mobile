export function checkPanic(stressDiceResults: number[]): boolean {
  return stressDiceResults.some((v) => v === 1);
}
