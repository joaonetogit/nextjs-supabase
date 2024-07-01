import { createServerComponentClient } from '@supabase/auth-helpers-nextjs';
import { cookies } from 'next/headers';
import { RedirectType, redirect } from 'next/navigation';

export default async function useHome() {
  let loggedIn = false;

  try {
    console.log('Fetching user session...');
    const supabase = createServerComponentClient({ cookies });
    const {
      data: { session },
    } = await supabase.auth.getSession();

    if (session) loggedIn = true;
  } catch (error) {
    console.error('Error fetching user session:', error);
  } finally {
    if (loggedIn) redirect('/user-app', RedirectType.replace);
  }
  return {};
}
