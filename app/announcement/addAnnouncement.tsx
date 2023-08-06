'use server'

import { createServerComponentClient } from '@supabase/auth-helpers-nextjs'
import { revalidatePath } from 'next/cache'
import { cookies } from 'next/headers'

export const addAnnouncement = async (formData: FormData) => {
  'use server'

  const supabase = createServerComponentClient({ cookies })

  const {
    data: { user },
  } = await supabase.auth.getUser()

  if (!user) throw new Error('must be logged in to create announcements')

  const title = formData.get('title') ?? ' '
  const description = formData.get('description') ?? ' '
  const file = formData.get('image_file') as File

  const { data, error } = await supabase.storage
    .from('images')
    .upload(file.name, file)
  if (error) {
    console.log({ error })
  } else {
    let image_source_url = `https://ibbcazsenzltzokoeiwr.supabase.co/storage/v1/object/public/images/${data.path}`
    await supabase
      .from('announcement')
      .insert({ title, description, image_source_url })
    revalidatePath('/admin')
    revalidatePath('/')
  }
}
