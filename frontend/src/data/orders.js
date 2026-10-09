/**
 * Shopora Mock Orders
 * Derived directly from Reference Panel 6 (Tracking) and Panel 7 (My Orders).
 */

export const mockOrders = [
  {
    id: 'order-sho123456',
    orderNumber: '#SHO123456',
    date: 'Jan 10, 2024',
    status: 'Processing',
    subtotal: 108997,
    discount: 5000,
    delivery: 0,
    total: 103997,
    paymentMethod: 'Test / Mock Payment',
    shippingAddress: {
      fullName: 'John Doe',
      address: '123, MG Road',
      city: 'Bangalore',
      state: 'Karnataka',
      postalCode: '560001',
      phone: '+91 9876543210',
    },
    estimatedDelivery: 'Jan 15, 2024 – Jan 18, 2024',
    items: [
      {
        productId: 'prod-apple-iphone-15-128gb',
        name: 'Apple iPhone 15 (128GB)',
        price: 69999,
        quantity: 1,
        selectedColor: 'Pink',
        selectedStorage: '128GB',
        image: '/images/products/apple-iphone-15-128gb-1.png',
      },
      {
        productId: 'prod-sony-wh-1000xm5',
        name: 'Sony WH-1000XM5',
        price: 29999,
        quantity: 1,
        selectedColor: 'Black',
        image: '/images/products/sony-wh-1000xm5-1.png',
      },
      {
        productId: 'prod-nike-air-max-270',
        name: 'Nike Air Max 270',
        price: 8999,
        quantity: 1,
        selectedColor: 'White',
        image: '/images/products/nike-air-max-270-1.png',
      },
    ],
    trackingSteps: [
      { step: 'Confirmed', date: 'Jan 10', completed: true, current: false },
      { step: 'Packed', date: 'Jan 11', completed: true, current: false },
      { step: 'Shipped', date: 'Jan 12', completed: true, current: false },
      { step: 'Out for Delivery', date: 'Jan 15', completed: false, current: true },
      { step: 'Delivered', date: 'Jan 18', completed: false, current: false },
    ],
  },
  {
    id: 'order-sho123455',
    orderNumber: '#SHO123455',
    date: 'Jan 05, 2024',
    status: 'Delivered',
    subtotal: 58298,
    discount: 3299,
    delivery: 0,
    total: 54999,
    paymentMethod: 'UPI (Mock)',
    shippingAddress: {
      fullName: 'John Doe',
      address: '123, MG Road',
      city: 'Bangalore',
      state: 'Karnataka',
      postalCode: '560001',
      phone: '+91 9876543210',
    },
    estimatedDelivery: 'Jan 08, 2024',
    items: [
      {
        productId: 'prod-dell-inspiron-15',
        name: 'Dell Inspiron 15',
        price: 54999,
        quantity: 1,
        selectedColor: 'Platinum Silver',
        image: '/images/products/dell-inspiron-15-1.png',
      },
    ],
    trackingSteps: [
      { step: 'Confirmed', date: 'Jan 05', completed: true, current: false },
      { step: 'Packed', date: 'Jan 05', completed: true, current: false },
      { step: 'Shipped', date: 'Jan 06', completed: true, current: false },
      { step: 'Out for Delivery', date: 'Jan 08', completed: true, current: false },
      { step: 'Delivered', date: 'Jan 08', completed: true, current: false },
    ],
  },
  {
    id: 'order-sho123454',
    orderNumber: '#SHO123454',
    date: 'Dec 28, 2023',
    status: 'Cancelled',
    subtotal: 29999,
    discount: 0,
    delivery: 0,
    total: 29999,
    paymentMethod: 'Card (Mock)',
    shippingAddress: {
      fullName: 'John Doe',
      address: '456, IT Park, Whitefield',
      city: 'Bangalore',
      state: 'Karnataka',
      postalCode: '560066',
      phone: '+91 8765432100',
    },
    estimatedDelivery: null,
    items: [
      {
        productId: 'prod-sony-wh-1000xm5',
        name: 'Sony WH-1000XM5',
        price: 29999,
        quantity: 1,
        selectedColor: 'Black',
        image: '/images/products/sony-wh-1000xm5-1.png',
      },
    ],
    trackingSteps: [
      { step: 'Confirmed', date: 'Dec 28', completed: true, current: false },
      { step: 'Cancelled', date: 'Dec 29', completed: true, current: true },
    ],
  },
];

export default mockOrders;
