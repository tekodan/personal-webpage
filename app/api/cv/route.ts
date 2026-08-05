import { NextResponse } from 'next/server'
import { Authors, allAuthors } from 'contentlayer/generated'
import { coreContent } from 'pliny/utils/contentlayer'
import siteMetadata from '@/data/siteMetadata'
import projectsData from '@/data/projectsData'

// shields.io color overrides for well-known skills
const BADGE_COLORS: Record<string, string> = {
  PHP: '777BB4',
  Laravel: 'FF2D20',
  'Adobe Commerce': 'EE672F',
  Python: '3776AB',
  Django: '092E20',
  'Node.js': '339933',
  NestJS: 'E0234E',
  'Next.js': '000000',
  TypeScript: '3178C6',
  React: '61DAFB',
  GraphQL: 'E10098',
  Docker: '2496ED',
  Kubernetes: '326CE5',
  AWS: '232F3E',
  PostgreSQL: '4169E1',
  MariaDB: '003545',
  Oracle: 'F80000',
  LangChain: '3178C6',
  RAG: '7C3AED',
  'Gemma 4': '4285F4',
  ChromaDB: '9CA3AF',
  Cybersecurity: '6D28D9',
  OWASP: '000000',
}

function skillBadge(skill: string): string {
  const color = BADGE_COLORS[skill] ?? '1a1a2e'
  const label = skill.replace(/-/g, '--').replace(/\s/g, '_')
  return `![${skill}](https://img.shields.io/badge/${label}-${color}?style=flat-square&logoColor=white)`
}

function renderSkills(
  skills: { category: string; items: string[] }[],
  format: 'plain' | 'badges'
): string {
  return skills
    .map((cat) => {
      const rendered =
        format === 'badges' ? cat.items.map(skillBadge).join(' ') : cat.items.join(' · ')
      return `**${cat.category}:** ${rendered}`
    })
    .join('\n\n')
}

function renderProjects(
  projects: {
    title: string
    description: string
    href?: string
    tech?: string[]
    company?: string
    year?: number
  }[]
): string {
  if (!projects?.length) return ''
  return projects
    .map((p) => {
      const header = p.href ? `### [${p.title}](${p.href})` : `### ${p.title}`
      const meta = [p.company, p.year].filter(Boolean).join(' · ')
      const tech = p.tech?.length ? `**Technologies:** ${p.tech.join(' · ')}` : ''
      return `${header}${meta ? `\n*${meta}*` : ''}\n\n${p.description}\n\n${tech}`
    })
    .join('\n\n')
}

function renderExperience(experience: Authors['experience'] | undefined): string {
  if (!experience?.length) return ''
  return experience
    .map((e) => {
      const header = `### ${e.title}\n${e.company} — ${e.location}\n${e.period}`
      const bullets = e.bullets?.map((b) => `- ${b}`).join('\n') ?? ''
      return bullets ? `${header}\n\n${bullets}` : header
    })
    .join('\n\n')
}

function renderEducation(education: Authors['education'] | undefined): string {
  if (!education?.length) return ''
  return education
    .map((e) => [e.degree, [e.institution, e.year].filter(Boolean).join(' — ')].join('\n'))
    .join('\n\n')
}

function renderAwards(awards: Authors['awards'] | undefined): string {
  if (!awards?.length) return ''
  return awards
    .map(
      (a) =>
        `- ${a.title}${a.organization ? ` — ${a.organization}` : ''}${a.year ? ` (${a.year})` : ''}`
    )
    .join('\n')
}

function renderCertifications(certifications: Authors['certifications'] | undefined): string {
  if (!certifications?.length) return ''
  return certifications
    .map((c) => {
      const meta = [c.institution, c.date].filter(Boolean).join(', ')
      const idPart = c.issuerId
        ? c.verifyUrl
          ? ` · [ID: ${c.issuerId}](${c.verifyUrl})`
          : ` · ID: ${c.issuerId}`
        : ''
      return `- **${c.name}**${meta ? ` — ${meta}` : ''}${idPart}`
    })
    .join('\n')
}

function buildCV(
  author: Omit<Authors, '_id' | '_raw' | 'body'>,
  skillsFormat: 'plain' | 'badges'
): string {
  const {
    name,
    avatar,
    occupation,
    availability,
    email,
    linkedin,
    telegram,
    introduction,
    skills,
    experience,
    education,
    awards,
    certifications,
  } = author
  const siteUrl = siteMetadata.siteUrl
  const keyProjects = projectsData.filter((p) => p.key_project).sort((a, b) => b.year - a.year)

  return `# ${name}
<img src="${siteUrl}${avatar}" alt="${name}" width="110" style="border-radius: 12px;" />

### ${occupation} | RAG & Agentic Systems | Full-Stack | Independent Contractor

Location: Remote · ${availability}
Email: ${email}
LinkedIn: ${linkedin}
Telegram: @${telegram?.split('/').pop()}
Website: ${siteUrl}

---

## Professional Summary

${introduction}

Strong focus on clean architecture, long-term maintainability, disciplined delivery,
and AI security applied to every layer (OWASP, prompt injection defense). I work with
spec-driven planning and a test-first quality mindset (unit, integration, and E2E) to
deliver reliable, predictable releases.

---

## Technical Skills

${renderSkills(skills ?? [], skillsFormat)}

---

## Professional Experience

${renderExperience(experience)}

---

## Key Projects

${renderProjects(keyProjects)}

---

## Education

${renderEducation(education)}

---

## Awards & Recognition

${renderAwards(awards)}

---

## Certifications

${renderCertifications(certifications)}

---

## Languages

Spanish — Native
English — B2 (professional working proficiency)

---

Independent Contractor · Invoices internationally · No legal complications for the client
`
}

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url)
  const skillsFormat = searchParams.get('skills') === 'badges' ? 'badges' : 'plain'

  const author = allAuthors.find((p) => p.slug === 'default') as Authors
  const content = coreContent(author)
  const filename = `${content.name.toLowerCase().replace(/\s+/g, '-')}-cv.md`

  return new NextResponse(buildCV(content, skillsFormat), {
    headers: {
      'Content-Type': 'text/markdown; charset=utf-8',
      'Content-Disposition': `attachment; filename="${filename}"`,
    },
  })
}
