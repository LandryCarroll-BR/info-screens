'use server'

import { createServerComponentClient } from '@supabase/auth-helpers-nextjs'
import { revalidatePath } from 'next/cache'
import { cookies } from 'next/headers'

export const deleteAnnouncement = async (formData: FormData) => {
  'use server'
  const id = formData.get('announcement_id')

  const supabase = createServerComponentClient({ cookies })

  const {
    data: { user },
  } = await supabase.auth.getUser()

  if (!user) throw new Error('must be logged in to create announcements')

  if (id) {
    await supabase.from('announcement').delete().eq('id', id)
    revalidatePath('/admin')
    revalidatePath('/')
  }
}
