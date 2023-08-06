import { createServerComponentClient } from '@supabase/auth-helpers-nextjs'
import { cookies } from 'next/headers'
import { Navigation } from '@/components/Navigation'
import { AnnouncementModalCreate } from '@/components/AnnouncementModal'
import { redirect } from 'next/navigation'

export default async function Index() {
  const supabase = createServerComponentClient({ cookies })

  const {
    data: { user },
  } = await supabase.auth.getUser()

  if (!user) redirect('/')

  const { data: announcements } = await supabase.from('announcement').select()

  return (
    <div className="flex items-center justify-center w-full flex-col">
      <Navigation user={user} />
      <main className="container animate-in w-full flex flex-col flex-1 px-4 lg:px-12 my-20">
        <div className="flex items-center mb-10 gap-4">
          <h1 className="text-4xl text-foreground">Announcements</h1>
          <AnnouncementModalCreate className="w-fit ml-auto" />
        </div>
        <ul className="grid grid-cols-1 md:grid-cols-[repeat(auto-fill,_minmax(300px,_1fr))] grid-rows-[minmax(180px,_auto)] gap-4 ">
          {announcements?.map((announcement, index) => {
            return (
              <li
                key={announcement.id}
                className="bg-foreground/[.01] rounded border-foreground/10 border min-h-[180px] text-foreground/80 p-4 relative flex flex-col gap-1"
              >
                <h2 className="text-2xl font-bold">{announcement.title}</h2>
                <p>{announcement.description}</p>
                <div className="mt-auto w-full flex">
                  <button
                    className={
                      'p-1 px-2 border-foreground/10 text-foreground/40 hover:text-red-500/90 border hover:border-red-500/90 rounded ml-auto'
                    }
                  >
                    Delete
                  </button>
                </div>
              </li>
            )
          })}
        </ul>
      </main>
    </div>
  )
}
