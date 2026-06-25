import LinkForm from './components/LinkForm'
import { links } from './store'

export default function Home() {
  const savedLinks = [...links].reverse()

  return (
    <main className="mx-auto w-full max-w-xl px-4 py-12">
      <h1 className="mb-8 text-2xl font-semibold tracking-tight text-zinc-900">
        Link Tracker
      </h1>

      <section className="mb-10 rounded-xl border border-zinc-200 bg-white p-6 shadow-sm">
        <h2 className="mb-4 text-sm font-semibold uppercase tracking-widest text-zinc-400">
          Add a link
        </h2>
        <LinkForm />
      </section>

      <section>
        <h2 className="mb-4 text-sm font-semibold uppercase tracking-widest text-zinc-400">
          Saved links
        </h2>

        {savedLinks.length === 0 ? (
          <p className="text-sm text-zinc-400">No links saved yet.</p>
        ) : (
          <ul className="flex flex-col gap-3">
            {savedLinks.map((link) => (
              <li
                key={link.id}
                className="flex flex-col gap-1 rounded-lg border border-zinc-200 bg-white px-4 py-3 shadow-sm"
              >
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
              </li>
            ))}
          </ul>
        )}
      </section>
    </main>
  )
}
