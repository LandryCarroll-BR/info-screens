'use server'

import { createServerComponentClient } from '@supabase/auth-helpers-nextjs'
import { revalidatePath } from 'next/cache'
import { cookies } from 'next/headers'

export const uploadImage = async (file: any) => {
  'use server'

  const supabase = createServerComponentClient({ cookies })

  const {
    data: { user },
  } = await supabase.auth.getUser()

  if (!user) throw new Error('must be logged in to create announcements')

  const { data, error } = await supabase.storage
    .from('bucket_name')
    .upload('file_path', file)
  if (error) {
    // Handle error
  } else {
    console.log(data)
  }
}
