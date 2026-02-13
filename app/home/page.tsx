import Link from '@/components/Link'
import Image from '@/components/Image'
import siteMetadata from '@/data/siteMetadata'
import { genPageMetadata } from 'app/seo'

export const metadata = genPageMetadata({
  title: 'Home',
  description: 'Professional profile landing page',
})

export default function HomeLandingPage() {
  const heroBackgroundImage = `${process.env.BASE_PATH || ''}/static/images/back.jpg`

  return (
    <div className="space-y-14 pb-10">
      <section className="relative overflow-hidden rounded-2xl px-6 py-12 md:px-10">
        <div
          className="absolute inset-0 bg-cover bg-center"
          style={{ backgroundImage: `url('${heroBackgroundImage}')` }}
        />
        <div className="absolute inset-0 bg-black/40" />
        <div className="pointer-events-none absolute inset-0 dark:hidden">
          <div className="absolute inset-0 bg-gradient-to-r from-white via-transparent to-white opacity-90" />
          <div className="absolute inset-0 bg-gradient-to-b from-white/80 via-transparent to-white" />
        </div>
        <div className="pointer-events-none absolute inset-0 hidden dark:block">
          <div className="absolute inset-0 bg-gradient-to-r from-gray-950 via-transparent to-gray-950 opacity-90" />
          <div className="absolute inset-0 bg-gradient-to-b from-gray-950/80 via-transparent to-gray-950" />
        </div>

        <div className="relative mx-auto max-w-3xl text-center">
          <h1 className="text-4xl leading-tight font-extrabold tracking-tight text-white drop-shadow-sm md:text-6xl">
            Hi, I&apos;m {siteMetadata.author}
          </h1>
          <p className="mt-6 text-lg leading-8 text-gray-100">
            I build digital products focused on real outcomes: clean interfaces, strong
            architecture, and thoughtfully crafted user experience.
          </p>
          <div className="mt-8 flex flex-wrap items-center justify-center gap-3">
            <Link
              href="/projects"
              className="bg-primary-500 hover:bg-primary-600 rounded-lg px-5 py-2.5 text-sm font-semibold text-gray-950 transition"
            >
              View projects
            </Link>
            <Link
              href="/about"
              className="rounded-lg border border-white/70 px-5 py-2.5 text-sm font-semibold text-white transition hover:bg-white/10"
            >
              About me
            </Link>
          </div>
        </div>
      </section>

      <section className="grid gap-8 rounded-2xl p-6 md:grid-cols-2 md:items-center md:p-8">
        <div className="md:order-2 md:border-l md:border-gray-200 md:pl-8 dark:md:border-gray-800">
          <h2 className="text-3xl font-bold tracking-tight text-gray-900 dark:text-gray-100">
            About me
          </h2>
          <p className="mt-3 text-justify text-sm leading-7 text-gray-600 dark:text-gray-300">
            I am a Full Stack Developer with experience in eCommerce platforms, scalable backend
            services, and modern web applications. I have a strong focus on architecture,
            performance, and delivering high-quality solutions in production environments while
            combining technical execution with agile leadership to help teams ship better
            products...
          </p>
          <Link
            href="/about"
            className="text-primary-700 dark:text-primary-300 mt-5 inline-flex text-sm font-semibold hover:underline"
          >
            Read full About page
          </Link>
        </div>
        <div className="space-y-5 md:order-1 md:pr-8">
          <div className="flex justify-center">
            <Image
              src="/static/images/dani-photo.jpg"
              alt={`${siteMetadata.author} profile photo`}
              width={220}
              height={220}
              className="h-40 w-40 rounded-full border border-gray-300 object-cover md:h-48 md:w-48 dark:border-gray-700"
            />
          </div>
          <div className="text-center">
            <h3 className="text-xl font-semibold text-gray-900 dark:text-gray-100">Dani Alva</h3>
            <p className="mt-2 text-sm text-gray-600 dark:text-gray-300">
              Full Stack Ai Powered Engineer
            </p>
            <p className="mt-1 text-sm text-gray-600 dark:text-gray-300">
              Captain of My Own Journey
            </p>
          </div>
        </div>
      </section>

      <section className="rounded-2xl p-8 text-center">
        <h2 className="text-2xl font-bold tracking-tight text-gray-900 dark:text-gray-100">
          Have an idea or a project?
        </h2>
        <p className="mx-auto mt-3 max-w-2xl text-sm leading-7 text-gray-600 dark:text-gray-300">
          I&apos;m available to collaborate on freelance work, product initiatives, or technical
          consulting.
        </p>
        <div className="mt-6 flex flex-wrap items-center justify-center gap-3">
          <Link
            href={`mailto:${siteMetadata.email}`}
            className="bg-primary-500 hover:bg-primary-600 rounded-lg px-5 py-2.5 text-sm font-semibold text-gray-950 transition"
          >
            Contact by email
          </Link>
          <Link
            href={siteMetadata.linkedin}
            className="rounded-lg border border-gray-300 px-5 py-2.5 text-sm font-semibold text-gray-800 transition hover:border-gray-400 dark:border-gray-700 dark:text-gray-100 dark:hover:border-gray-600"
          >
            View LinkedIn
          </Link>
        </div>
      </section>
    </div>
  )
}
