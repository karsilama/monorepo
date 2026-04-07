import { getUserAllLines } from './users-domain';
import { UserDomainModel } from '@users/infrastructure';

describe('getUserAllLines', () => {
  const mockUser: UserDomainModel = {
    id: 1,
    firstName: 'John',
    maidenName: 'Smith',
    lastName: 'Doe',
    email: 'john.doe@example.com',
    phone: '123-456-7890',
    age: 30,
  };

  it('should handle string fields', () => {
    const displayFields = ['firstName', 'email'];
    const result = getUserAllLines(mockUser, displayFields);

    expect(result).toEqual([
      { key: 'firstName', value: 'John' },
      { key: 'email', value: 'john.doe@example.com' },
    ]);
  });

  it('should handle array of fields as separate lines', () => {
    const displayFields = [['firstName', 'maidenName', 'secondName'], 'email'];
    const result = getUserAllLines(mockUser, displayFields);

    expect(result).toContainEqual({ key: 'firstName', value: 'John' });
    expect(result).toContainEqual({ key: 'maidenName', value: 'Smith' });
    expect(result).toContainEqual({ key: 'email', value: 'john.doe@example.com' });
  });

  it('should return undefined for missing fields', () => {
    const displayFields = ['firstName', 'nonExistentField'];
    const result = getUserAllLines(mockUser, displayFields);

    expect(result[0]).toEqual({ key: 'firstName', value: 'John' });
    expect(result[1]).toEqual({ key: 'nonExistentField', value: undefined });
  });

  it('should handle dot notation for nested fields', () => {
    const userWithNested: UserDomainModel = {
      ...mockUser,
      address: {
        address: '123 Main St',
        city: 'Springfield',
        state: 'IL',
        stateCode: 'IL',
        postalCode: '62701',
        country: 'USA',
        coordinates: { lat: 39.7817, lng: -89.6501 },
      },
    };

    const displayFields = ['firstName', 'address.city'];
    const result = getUserAllLines(userWithNested, displayFields);

    expect(result).toEqual([
      { key: 'firstName', value: 'John' },
      { key: 'address.city', value: 'Springfield' },
    ]);
  });

  it('should handle mixed field types', () => {
    const displayFields = ['firstName', ['maidenName', 'lastName'], 'email'];
    const result = getUserAllLines(mockUser, displayFields);

    expect(result.length).toBe(4);
    expect(result).toContainEqual({ key: 'firstName', value: 'John' });
    expect(result).toContainEqual({ key: 'maidenName', value: 'Smith' });
    expect(result).toContainEqual({ key: 'lastName', value: 'Doe' });
    expect(result).toContainEqual({ key: 'email', value: 'john.doe@example.com' });
  });

  it('should handle empty displayFields', () => {
    const displayFields: (string | string[])[] = [];
    const result = getUserAllLines(mockUser, displayFields);

    expect(result).toEqual([]);
  });
});
