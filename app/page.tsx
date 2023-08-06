import LogoutButton from '@/components/LogoutButton'
import Image from 'next/image'
import Link from 'next/link'

import { createServerComponentClient } from '@supabase/auth-helpers-nextjs'
import { cookies } from 'next/headers'
import { motion } from 'framer-motion'
import { Announcements } from '@/components/Announcements'

export default async function Index() {
  const supabase = createServerComponentClient({ cookies })

  const {
    data: { user },
  } = await supabase.auth.getUser()

  const { data: announcements } = await supabase.from('announcement').select()
  console.log(announcements)

  return (
    <main className="flex items-center justify-center h-screen w-full flex-col">
      <nav className="w-full flex justify-center border-b border-b-foreground/10 h-16">
        <div className="w-full max-w-4xl flex justify-between items-center p-3 text-sm text-foreground">
          <div>
            <Link href={'/'}>Announcements</Link>
          </div>
          <div>
            {user ? (
              <div className="flex items-center gap-4">
                Hey, {user.email}!
                <LogoutButton />
              </div>
            ) : (
              <Link
                href="/login"
                className="py-2 px-4 rounded-md no-underline bg-btn-background hover:bg-btn-background-hover"
              >
                Login
              </Link>
            )}
          </div>
        </div>
      </nav>
      <Announcements announcements={announcements} className="w-full h-full" />
    </main>
  )
}
