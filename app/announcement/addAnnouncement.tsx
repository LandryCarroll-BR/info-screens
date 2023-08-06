'use server'

import { createServerComponentClient } from '@supabase/auth-helpers-nextjs'
import { revalidatePath } from 'next/cache'
import { cookies } from 'next/headers'

export const addAnnouncement = async (formData: FormData) => {
  'use server'
  const title = formData.get('title')
  const description = formData.get('description')
  const image_source_url = formData.get('image_source_url')

  const supabase = createServerComponentClient({ cookies })

  const {
    data: { user },
  } = await supabase.auth.getUser()

  if (!user) throw new Error('must be logged in to create announcements')

  if (title && description) {
    await supabase
      .from('announcement')
      .insert({ title, description, image_source_url })
    revalidatePath('/admin')
    revalidatePath('/')
  }
}
