import Link from 'next/link'
import LogoutButton from './LogoutButton'
import React from 'react'

import { User } from '@supabase/supabase-js'

interface NavigationProps extends React.HTMLProps<HTMLElement> {
  user: User | null
}

export const Navigation: React.FC<NavigationProps> = ({ user }) => {
  return (
    <nav className="w-full flex justify-center border-b border-b-foreground/10 h-16">
      <div className="container w-full flex justify-between items-center p-4 lg:px-12 text-sm text-foreground">
        <div className="flex gap-4">
          <Link className="hover:text-foreground/80 block" href={'/'}>
            Announcements
          </Link>
          <Link className="hover:text-foreground/80 block" href={'/admin'}>
            Admin
          </Link>
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
  )
}
