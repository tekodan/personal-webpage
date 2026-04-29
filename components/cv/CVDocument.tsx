import { Document, Page, Text, View, Link, Image, StyleSheet } from '@react-pdf/renderer'

export interface CVAuthor {
  name: string
  avatar?: string
  avatarSrc?: string
  occupation?: string
  company?: string
  availability?: string
  email?: string
  linkedin?: string
  github?: string
  introduction?: string
  skills?: string[]
  experience?: {
    title: string
    company: string
    location?: string
    period: string
    bullets?: string[]
  }[]
  education?: {
    degree: string
    institution: string
    year?: string
  }[]
  awards?: {
    title: string
    organization?: string
    year?: string
  }[]
  certifications?: {
    name: string
    institution?: string
    date?: string
  }[]
}

const ACCENT = '#16a34a'
const DARK = '#111827'
const MUTED = '#6b7280'
const LIGHT = '#f3f4f6'
const RULE = '#e5e7eb'

const s = StyleSheet.create({
  page: {
    fontFamily: 'Helvetica',
    fontSize: 9,
    color: DARK,
    paddingTop: 36,
    paddingBottom: 40,
    paddingHorizontal: 40,
    lineHeight: 1.5,
  },

  // Header
  header: { flexDirection: 'row', gap: 16, marginBottom: 14, alignItems: 'flex-start' },
  avatar: { width: 72, height: 72, borderRadius: 36 },
  headerText: { flex: 1 },
  name: { fontSize: 22, fontFamily: 'Helvetica-Bold', color: DARK, letterSpacing: 0.3 },
  occupation: { fontSize: 11, color: ACCENT, fontFamily: 'Helvetica-Bold', marginTop: 6 },
  company: { fontSize: 9, color: MUTED, marginTop: 2 },
  contactRow: { flexDirection: 'row', flexWrap: 'wrap', gap: 6, marginTop: 5 },
  contactItem: { fontSize: 8, color: MUTED },
  contactLink: { fontSize: 8, color: ACCENT },
  availability: { fontSize: 8, color: MUTED, marginTop: 3, fontFamily: 'Helvetica-Oblique' },

  // Rule
  rule: { borderBottomWidth: 1, borderBottomColor: RULE, marginVertical: 10 },

  // Section
  section: { marginBottom: 12 },
  sectionLabel: {
    fontSize: 7,
    fontFamily: 'Helvetica-Bold',
    color: MUTED,
    letterSpacing: 1.2,
    textTransform: 'uppercase',
    marginBottom: 6,
  },

  // Summary
  paragraph: { fontSize: 9, color: DARK, lineHeight: 1.6 },

  // Experience
  expEntry: { marginBottom: 9 },
  expHeader: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'flex-start' },
  expTitle: { fontSize: 10, fontFamily: 'Helvetica-Bold', color: DARK },
  expPeriod: { fontSize: 8, color: MUTED },
  expSub: { fontSize: 8, color: MUTED, marginTop: 1 },
  bullet: { flexDirection: 'row', marginTop: 3 },
  bulletDot: { width: 10, color: ACCENT, fontSize: 9 },
  bulletText: { flex: 1, fontSize: 8.5, color: '#374151', lineHeight: 1.5 },

  // Skills
  skillsWrap: { flexDirection: 'row', flexWrap: 'wrap', gap: 4 },
  skillTag: {
    backgroundColor: LIGHT,
    borderRadius: 3,
    paddingHorizontal: 6,
    paddingVertical: 2,
    fontSize: 7.5,
    color: DARK,
  },

  // Education
  eduEntry: { marginBottom: 5 },
  eduDegree: { fontSize: 9, fontFamily: 'Helvetica-Bold', color: DARK },
  eduSub: { fontSize: 8, color: MUTED },

  // Awards
  awardEntry: { flexDirection: 'row', marginBottom: 3 },
  awardDot: { width: 10, color: ACCENT, fontSize: 9 },
  awardText: { flex: 1, fontSize: 8.5, color: '#374151' },

  // Certifications — two-column
  certGrid: { flexDirection: 'row', flexWrap: 'wrap' },
  certEntry: { width: '50%', marginBottom: 4 },
  certName: { fontSize: 8.5, fontFamily: 'Helvetica-Bold', color: DARK },
  certSub: { fontSize: 7.5, color: MUTED },

  // Footer
  footer: {
    position: 'absolute',
    bottom: 20,
    left: 40,
    right: 40,
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  footerText: { fontSize: 7, color: MUTED, fontFamily: 'Helvetica-Oblique' },
})

function Rule() {
  return <View style={s.rule} />
}

function SectionLabel({ children }: { children: string }) {
  return <Text style={s.sectionLabel}>{children}</Text>
}

export function CVDocument({ author }: { author: CVAuthor }) {
  const {
    name,
    avatarSrc,
    occupation,
    company,
    availability,
    email,
    linkedin,
    github,
    introduction,
    skills,
    experience,
    education,
    awards,
    certifications,
  } = author

  return (
    <Document title={`${name} — CV`} author={name} subject="Curriculum Vitae">
      <Page size="A4" style={s.page}>
        {/* Header */}
        <View style={s.header}>
          {avatarSrc && <Image src={avatarSrc} style={s.avatar} />}
          <View style={s.headerText}>
            <Text style={s.name}>{name}</Text>
            {occupation && <Text style={s.occupation}>{occupation}</Text>}
            {company && <Text style={s.company}>{company}</Text>}
            <View style={s.contactRow}>
              {email && (
                <Link src={`mailto:${email}`} style={s.contactLink}>
                  {email}
                </Link>
              )}
              {linkedin && (
                <Link src={linkedin} style={s.contactLink}>
                  {linkedin}
                </Link>
              )}
              {github && (
                <Link src={github} style={s.contactLink}>
                  {github}
                </Link>
              )}
            </View>
            {availability && <Text style={s.availability}>{availability}</Text>}
          </View>
        </View>

        <Rule />

        {/* Summary */}
        {introduction && (
          <View style={s.section}>
            <SectionLabel>Professional Summary</SectionLabel>
            <Text style={s.paragraph}>{introduction}</Text>
          </View>
        )}

        {/* Experience */}
        {experience?.length ? (
          <View style={s.section}>
            <SectionLabel>Experience</SectionLabel>
            {experience.map((e, i) => (
              <View key={i} style={s.expEntry}>
                <View style={s.expHeader}>
                  <Text style={s.expTitle}>{e.title}</Text>
                  <Text style={s.expPeriod}>{e.period}</Text>
                </View>
                <Text style={s.expSub}>
                  {e.company}
                  {e.location ? ` — ${e.location}` : ''}
                </Text>
                {e.bullets?.map((b, j) => (
                  <View key={j} style={s.bullet}>
                    <Text style={s.bulletDot}>·</Text>
                    <Text style={s.bulletText}>{b}</Text>
                  </View>
                ))}
              </View>
            ))}
          </View>
        ) : null}

        {/* Skills */}
        {skills?.length ? (
          <View style={s.section}>
            <SectionLabel>Technical Skills</SectionLabel>
            <View style={s.skillsWrap}>
              {skills.map((skill, i) => (
                <View key={i} style={s.skillTag}>
                  <Text>{skill}</Text>
                </View>
              ))}
            </View>
          </View>
        ) : null}

        {/* Education */}
        {education?.length ? (
          <View style={s.section}>
            <SectionLabel>Education</SectionLabel>
            {education.map((e, i) => (
              <View key={i} style={s.eduEntry}>
                <Text style={s.eduDegree}>{e.degree}</Text>
                <Text style={s.eduSub}>
                  {e.institution}
                  {e.year ? ` — ${e.year}` : ''}
                </Text>
              </View>
            ))}
          </View>
        ) : null}

        {/* Awards */}
        {awards?.length ? (
          <View style={s.section}>
            <SectionLabel>Awards &amp; Recognition</SectionLabel>
            {awards.map((a, i) => (
              <View key={i} style={s.awardEntry}>
                <Text style={s.awardDot}>·</Text>
                <Text style={s.awardText}>
                  {a.title}
                  {a.organization ? ` — ${a.organization}` : ''}
                  {a.year ? ` (${a.year})` : ''}
                </Text>
              </View>
            ))}
          </View>
        ) : null}

        {/* Certifications */}
        {certifications?.length ? (
          <View style={s.section}>
            <SectionLabel>Certifications</SectionLabel>
            <View style={s.certGrid}>
              {certifications.map((c, i) => (
                <View key={i} style={s.certEntry}>
                  <Text style={s.certName}>{c.name}</Text>
                  <Text style={s.certSub}>
                    {c.institution}
                    {c.date ? ` · ${c.date}` : ''}
                  </Text>
                </View>
              ))}
            </View>
          </View>
        ) : null}

        {/* Languages */}
        <View style={s.section}>
          <SectionLabel>Languages</SectionLabel>
          <Text style={s.paragraph}>
            Spanish — Native · English — B2 (professional working proficiency)
          </Text>
        </View>

        {/* Footer */}
        <View style={s.footer} fixed>
          <Text style={s.footerText}>
            Independent Contractor · Invoices internationally · No legal complications for the
            client
          </Text>
          <Text
            style={s.footerText}
            render={({ pageNumber, totalPages }) => `${pageNumber} / ${totalPages}`}
          />
        </View>
      </Page>
    </Document>
  )
}
