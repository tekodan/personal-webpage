import Link from '@/components/Link'

export const metadata = {
  title: '404 — Page Not Found',
}

export default function NotFound() {
  return (
    <div className="flex flex-col items-center justify-center py-24 text-center">
      <h1 className="text-6xl font-bold text-[#9DFF00] md:text-8xl">404</h1>
      <p className="mt-4 text-xl font-semibold text-white md:text-2xl">Page not found</p>
      <p className="mt-2 max-w-md text-gray-400">
        The page you are looking for does not exist or has been moved.
      </p>
      <Link
        href="/"
        className="mt-8 inline-block bg-[#8fdc10] px-6 py-3 text-sm font-medium text-[#081106] transition duration-200 ease-out hover:brightness-110"
      >
        Go back home
      </Link>
    </div>
  )
}
