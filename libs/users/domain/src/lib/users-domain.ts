import { ListLine } from '@lab/list-page/infrastructure';
import { UserDomainModel } from '@users/infrastructure';

/**
 * Gets nested value from object using dot notation (e.g., 'company.name')
 */
const getValue = (
  obj: Record<string, unknown>,
  path: string,
): string | undefined => {
  const value = path
    .split('.')
    .reduce<unknown>(
      (current: unknown, prop: string) =>
        !!current && typeof current === 'object'
          ? (current as Record<string, unknown>)[prop]
          : undefined,
      obj,
    );

  return value !== null && value !== undefined ? String(value) : undefined;
};

/**
 * @function
 * @returns {ListLine[]} -
 */
export const getUserAllLines = (
  user: UserDomainModel,
  displayFields: (string | string[])[],
): ListLine[] => {
  const entries = Object.entries(user);
  const lines: ListLine[] = [];
  const userRecord = user as unknown as Record<string, unknown>;

  displayFields.forEach((field) => {
    if (typeof field === 'string') {
      lines.push({ key: field, value: getValue(userRecord, field) });
    } else if (Array.isArray(field)) {
      field.forEach((nestedField) => {
        lines.push({
          key: nestedField,
          value: getValue(userRecord, nestedField),
        });
      });
    }
  });

  return lines;
};
