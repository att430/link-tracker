'use client'

import { useOptimistic, startTransition } from 'react'
import { deleteLink } from '../actions'
import type { Link } from '../store'

export default function LinkList({ links }: { links: Link[] }) {
  const [optimisticLinks, removeOptimistic] = useOptimistic<Link[], string>(
    links,
    (state, id) => state.filter((l) => l.id !== id)
  )

  function handleDelete(id: string) {
    startTransition(async () => {
      removeOptimistic(id)
      await deleteLink(id)
    })
  }

  if (optimisticLinks.length === 0) {
    return <p className="text-sm text-zinc-400">No links saved yet.</p>
  }

  return (
    <ul className="flex flex-col gap-3">
      {optimisticLinks.map((link) => (
        <li
          key={link.id}
          className="flex items-start justify-between gap-3 rounded-lg border border-zinc-200 bg-white px-4 py-3 shadow-sm"
        >
          <div className="flex min-w-0 flex-col gap-1">
            <span className="text-sm font-medium text-zinc-900">
              {link.label}
            </span>
            <a
              href={link.url}
              target="_blank"
              rel="noopener noreferrer"
              className="truncate text-xs text-zinc-500 hover:text-zinc-800 hover:underline"
            >
              {link.url}
            </a>
            <time className="text-xs text-zinc-400">
              {new Date(link.createdAt).toLocaleString()}
            </time>
          </div>

          <button
            onClick={() => handleDelete(link.id)}
            aria-label={`Delete ${link.label}`}
            className="mt-0.5 shrink-0 rounded p-1 text-zinc-400 transition-colors hover:bg-red-50 hover:text-red-500"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="14"
              height="14"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <polyline points="3 6 5 6 21 6" />
              <path d="M19 6l-1 14a2 2 0 0 1-2 2H8a2 2 0 0 1-2-2L5 6" />
              <path d="M10 11v6" />
              <path d="M14 11v6" />
              <path d="M9 6V4a1 1 0 0 1 1-1h4a1 1 0 0 1 1 1v2" />
            </svg>
          </button>
        </li>
      ))}
    </ul>
  )
}
