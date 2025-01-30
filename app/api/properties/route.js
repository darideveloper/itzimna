import { api } from '@/libs/api'

export async function GET(request) {

  const response = await api.get('/properties/')
  return new Response(JSON.stringify(response.data), {
    status: response.status,
    headers: { 'Content-Type': 'application/json' },
  })
}
