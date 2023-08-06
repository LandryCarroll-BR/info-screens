import { createServerComponentClient } from '@supabase/auth-helpers-nextjs'
import { cookies } from 'next/headers'
import { Announcements } from '@/components/Announcements'
import { Navigation } from '@/components/Navigation'

export default async function Index() {
  const supabase = createServerComponentClient({ cookies })

  const {
    data: { user },
  } = await supabase.auth.getUser()

  const { data: announcements } = await supabase.from('announcement').select()

  return (
    <main className="flex items-center justify-center h-screen w-full flex-col">
      {user ? <Navigation user={user} /> : ''}
      <Announcements announcements={announcements} className="w-full h-full" />
    </main>
  )
}
