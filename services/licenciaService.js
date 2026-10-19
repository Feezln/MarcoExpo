import client from '../api/client';

// Get -> GET /licencia
export async function getLicencia() {
  const res = await client.get('/licencia');
  return res.data;
}
