const SUPABASE_URL = import.meta.env.VITE_SUPABASE_URL;
const SUPABASE_ANON_KEY = import.meta.env.VITE_SUPABASE_ANON_KEY;

export async function supabaseFetch(endpoint, options = {}) {
  if (!SUPABASE_URL || !SUPABASE_ANON_KEY) {
    throw new Error('Variáveis de ambiente do Supabase não configuradas no .env');
  }

  const url = `${SUPABASE_URL}/rest/v1/${endpoint}`;
  
  const headers = {
    'apikey': SUPABASE_ANON_KEY,
    'Authorization': `Bearer ${SUPABASE_ANON_KEY}`,
    'Content-Type': 'application/json',
    ...options.headers,
  };

  if (options.preferReturnRepresentation !== false) {
    headers['Prefer'] = 'return=representation';
  }

  const config = {
    ...options,
    headers,
  };

  const response = await fetch(url, config);

  if (!response.ok) {
    const errorBody = await response.text();
    throw new Error(`Erro na API (${response.status}): ${errorBody || response.statusText}`);
  }

  if (response.status === 204) {
    return null;
  }

  const data = await response.json();
  return data;
}