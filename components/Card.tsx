import Image from './Image'
import Link from './Link'

const Card = ({ title, description, imgSrc, href, tech, company, year }) => (
  <div className="md max-w-[544px] p-4 md:w-1/2">
    <div
      className={`${
        imgSrc && 'h-full'
      } hover:border-accent/40 overflow-hidden rounded-md border border-white/10 bg-white/5 shadow-[0_4px_24px_-12px_rgba(0,0,0,0.45)] transition`}
    >
      {imgSrc &&
        (href ? (
          <Link href={href} aria-label={`Link to ${title}`}>
            <Image
              alt={title}
              src={imgSrc}
              className="object-cover object-center md:h-36 lg:h-48"
              width={544}
              height={306}
            />
          </Link>
        ) : (
          <Image
            alt={title}
            src={imgSrc}
            className="object-cover object-center md:h-36 lg:h-48"
            width={544}
            height={306}
          />
        ))}
      <div className="p-6">
        <h2 className="text-brand-cream-100 mb-1 text-2xl leading-8 font-semibold tracking-tight">
          {href ? (
            <Link href={href} aria-label={`Link to ${title}`}>
              {title}
            </Link>
          ) : (
            title
          )}
        </h2>
        {(company || year) && (
          <p className="mb-3 text-sm text-white/55">
            {company}
            {company && year && ' · '}
            {year}
          </p>
        )}
        <p className="prose prose-invert mb-3 max-w-none">{description}</p>
        <div className="mb-4 flex flex-wrap gap-2">
          {tech?.map((t) => (
            <span
              key={t}
              className="bg-brand-bronze-500/15 text-brand-cream-200 ring-brand-bronze-500/30 rounded-full px-3 py-1 text-xs font-medium ring-1 ring-inset"
            >
              {t}
            </span>
          ))}
        </div>
        {href && (
          <Link
            href={href}
            className="text-accent inline-block text-base leading-6 font-medium underline-offset-4 transition hover:underline"
            aria-label={`Link to ${title}`}
          >
            Learn more →
          </Link>
        )}
      </div>
    </div>
  </div>
)

export default Card
