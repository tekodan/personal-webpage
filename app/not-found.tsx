import Link from '@/components/Link'

export const metadata = {
  title: '404 — Page Not Found',
}

export default function NotFound() {
  return (
    <div className="brand-section-bg text-brand-cream-100 flex flex-col items-center justify-center py-24 text-center">
      <h1 className="text-accent text-6xl font-bold md:text-8xl">404</h1>
      <p className="mt-4 text-xl font-semibold md:text-2xl">Page not found</p>
      <p className="mt-2 max-w-md text-white/55">
        The page you are looking for does not exist or has been moved.
      </p>
      <Link
        href="/"
        className="bg-accent-dim text-on-accent mt-8 inline-block px-6 py-3 text-sm font-medium transition duration-200 ease-out hover:brightness-110"
      >
        Go back home
      </Link>
    </div>
  )
}
