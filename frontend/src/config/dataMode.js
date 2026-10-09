/**
 * Shopora Data Source Configuration
 * Currently set to 'mock' to allow full standalone local development
 * without any Spring Boot backend dependency.
 */
export const DATA_SOURCE = 'mock'; // 'mock' | 'api'

export const config = {
  dataSource: DATA_SOURCE,
  isMock: DATA_SOURCE === 'mock',
  apiBaseUrl: 'http://localhost:8080/api', // For future backend integration
};

export default config;
