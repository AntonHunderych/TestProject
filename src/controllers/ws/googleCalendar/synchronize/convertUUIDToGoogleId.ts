export function convertUUIDToGoogleId(input: string): string {
  return input.replace(/-/g, '');
}
