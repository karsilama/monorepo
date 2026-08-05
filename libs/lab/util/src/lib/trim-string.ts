export function trimString(value: string | undefined): string {
  return value?.trim() ?? "";
}
