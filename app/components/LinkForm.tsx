'use client'

import { useActionState, useEffect, useRef } from 'react'
import { addLink, type FormState } from '../actions'

const initialState: FormState = { error: null }

export default function LinkForm() {
  const [state, formAction, pending] = useActionState(addLink, initialState)
  const formRef = useRef<HTMLFormElement>(null)

  useEffect(() => {
    if (!state.error && !pending) {
      formRef.current?.reset()
    }
  }, [state, pending])

  return (
    <form ref={formRef} action={formAction} className="flex flex-col gap-3">
      <div className="flex flex-col gap-1">
        <label htmlFor="url" className="text-sm font-medium text-zinc-700">
          URL
        </label>
        <input
          id="url"
          name="url"
          type="text"
          placeholder="https://example.com"
          required
          className="rounded-lg border border-zinc-300 px-3 py-2 text-sm focus:border-zinc-500 focus:outline-none focus:ring-1 focus:ring-zinc-500"
        />
      </div>

      <div className="flex flex-col gap-1">
        <label htmlFor="label" className="text-sm font-medium text-zinc-700">
          Label
        </label>
        <input
          id="label"
          name="label"
          type="text"
          placeholder="My favourite article"
          required
          className="rounded-lg border border-zinc-300 px-3 py-2 text-sm focus:border-zinc-500 focus:outline-none focus:ring-1 focus:ring-zinc-500"
        />
      </div>

      {state.error && (
        <p className="text-sm text-red-600" role="alert">
          {state.error}
        </p>
      )}

      <button
        type="submit"
        disabled={pending}
        className="rounded-lg bg-zinc-900 px-4 py-2 text-sm font-medium text-white transition-colors hover:bg-zinc-700 disabled:opacity-50"
      >
        {pending ? 'Saving…' : 'Save link'}
      </button>
    </form>
  )
}
