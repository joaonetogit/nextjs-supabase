import { createRouteHandlerClient } from '@supabase/auth-helpers-nextjs';
import { cookies } from 'next/headers';
import { NextRequest, NextResponse } from 'next/server';

export async function GET(request: NextRequest) {
  const requestURL = new URL(request.url);
  const code = requestURL.searchParams.get('code');

  try {
    if (code) {
      const supabase = createRouteHandlerClient({ cookies });
      await supabase.auth.exchangeCodeForSession(code);
    }
  } catch (error) {
    console.error('Auth Callback', error);
  }

  return NextResponse.redirect(requestURL.origin);
}
