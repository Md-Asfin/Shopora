/**
 * Shopora Mock Users
 * Designed for local development and mock authentication.
 * DO NOT USE IN PRODUCTION.
 */

export const mockUsers = [
  {
    id: 'user-001',
    name: 'John Doe',
    email: 'john@example.com',
    role: 'customer',
    avatar: '/images/users/john-doe.png',
    phone: '+91 9876543210',
    joinedDate: '2023-08-15',
    defaultAddressId: 'addr-001',
    wishlistCount: 3,
    ordersCount: 3,
  },
  {
    id: 'user-admin',
    name: 'Admin Shopora',
    email: 'admin@shopora.com',
    role: 'admin',
    avatar: '/images/users/admin.png',
    phone: '+91 9876500000',
    joinedDate: '2023-01-01',
    defaultAddressId: 'addr-002',
    wishlistCount: 0,
    ordersCount: 0,
  },
];

export const currentUser = mockUsers[0];

export default mockUsers;
