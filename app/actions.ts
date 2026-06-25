'use server'

import { revalidatePath } from 'next/cache'
import { links } from './store'

export type FormState = {
  error: string | null
}

export async function addLink(
  _prevState: FormState,
  formData: FormData
): Promise<FormState> {
  const url = (formData.get('url') as string | null)?.trim() ?? ''
  const label = (formData.get('label') as string | null)?.trim() ?? ''

  if (!url || !label) {
    return { error: 'Both URL and label are required.' }
  }

  let parsed: URL
  try {
    parsed = new URL(url)
  } catch {
    return { error: 'Please enter a valid URL (include https://).' }
  }

  if (parsed.protocol !== 'http:' && parsed.protocol !== 'https:') {
    return { error: 'Only http and https URLs are allowed.' }
  }

  links.push({
    id: crypto.randomUUID(),
    url,
    label,
    createdAt: new Date().toISOString(),
  })

  revalidatePath('/')
  return { error: null }
}

export async function deleteLink(id: string): Promise<void> {
  const idx = links.findIndex((l) => l.id === id)
  if (idx !== -1) links.splice(idx, 1)
  revalidatePath('/')
}
