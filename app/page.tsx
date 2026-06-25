import LinkForm from './components/LinkForm'
import LinkList from './components/LinkList'
import { links } from './store'

export default function Home() {
  const savedLinks = [...links].reverse()

  return (
    <main className="mx-auto w-full max-w-xl px-4 py-12">
      <h1 className="mb-8 text-2xl font-semibold tracking-tight text-zinc-900">
        My Link Tracker
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
        <LinkList links={savedLinks} />
      </section>
    </main>
  )
}
