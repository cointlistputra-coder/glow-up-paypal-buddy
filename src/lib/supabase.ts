const SUPABASE_URL = 'https://iexeqltttsoaxmvmmzhu.supabase.co';
const SUPABASE_ANON_KEY =
  'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImlleGVxbHR0dHNvYXhtdm1temh1Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3OTE4MzY4NjMsImV4cCI6MjEwNzQxMjg2M30.waYElL7hrjwn_32er1R4CFiIPY5C-vuiwCyUe8vCFog';

const headers = {
  apikey: SUPABASE_ANON_KEY,
  Authorization: `Bearer ${SUPABASE_ANON_KEY}`,
  'Content-Type': 'application/json',
};

export type DbTransaction = {
  id: string;
  customer_name: string;
  whatsapp: string;
  service: string;
  amount_usd: number;
  total_idr: string;
  target_account: string;
  status: string;
  created_at?: string;
};

export type DbReview = {
  id: string;
  name: string;
  rating: number;
  service: string;
  comment: string;
  date: string;
};

// TRANSAKSI ONLINE (CLOUD)
export async function fetchAllTransactions(): Promise<DbTransaction[]> {
  try {
    const res = await fetch(`${SUPABASE_URL}/rest/v1/transactions?select=*&order=created_at.desc`, { headers });
    if (!res.ok) return [];
    return await res.json();
  } catch {
    return [];
  }
}

export async function fetchTransactionById(id: string): Promise<DbTransaction | null> {
  try {
    const res = await fetch(`${SUPABASE_URL}/rest/v1/transactions?id=eq.${encodeURIComponent(id)}&select=*`, { headers });
    if (!res.ok) return null;
    const data = await res.json();
    return data[0] || null;
  } catch {
    return null;
  }
}

export async function insertTransaction(tx: DbTransaction): Promise<boolean> {
  try {
    const res = await fetch(`${SUPABASE_URL}/rest/v1/transactions`, {
      method: 'POST',
      headers: { ...headers, Prefer: 'return=minimal' },
      body: JSON.stringify(tx),
    });
    return res.ok;
  } catch {
    return false;
  }
}

export async function updateTransactionStatus(id: string, status: string): Promise<boolean> {
  try {
    const res = await fetch(`${SUPABASE_URL}/rest/v1/transactions?id=eq.${encodeURIComponent(id)}`, {
      method: 'PATCH',
      headers: { ...headers, Prefer: 'return=minimal' },
      body: JSON.stringify({ status }),
    });
    return res.ok;
  } catch {
    return false;
  }
}

// ULASAN ONLINE (CLOUD)
export async function fetchAllReviews(): Promise<DbReview[]> {
  try {
    const res = await fetch(`${SUPABASE_URL}/rest/v1/reviews?select=*&order=created_at.desc`, { headers });
    if (!res.ok) return [];
    return await res.json();
  } catch {
    return [];
  }
}

export async function insertReview(review: DbReview): Promise<boolean> {
  try {
    const res = await fetch(`${SUPABASE_URL}/rest/v1/reviews`, {
      method: 'POST',
      headers: { ...headers, Prefer: 'return=minimal' },
      body: JSON.stringify(review),
    });
    return res.ok;
  } catch {
    return false;
  }
}

export async function deleteReviewById(id: string): Promise<boolean> {
  try {
    const res = await fetch(`${SUPABASE_URL}/rest/v1/reviews?id=eq.${encodeURIComponent(id)}`, {
      method: 'DELETE',
      headers,
    });
    return res.ok;
  } catch {
    return false;
  }
}
