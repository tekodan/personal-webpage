interface Project {
  title: string
  year: number
  key_project?: boolean
  company?: string
  description: string
  href?: string
  imgSrc?: string
  tech?: string[]
}

const projectsData: Project[] = [
  // AI / Agentic (Active)
  {
    title: 'Enola — Investigadora Digital',
    year: 2026,
    key_project: true,
    company: 'Ronin',
    description:
      'AI-powered digital investigation assistant built on a Python RAG pipeline grounded in Google Gemma 4. LangChain orchestration with ChromaDB vector storage; retrieves and synthesizes evidence with a conversational, streaming interface.',
    href: 'https://enola.ronin.com.co',
    tech: ['Python', 'RAG', 'Gemma 4', 'LangChain', 'ChromaDB', 'AI Agents', 'Streaming'],
  },

  // E-commerce / Retail (Active)
  {
    title: 'Todomoda',
    year: 2021,
    company: 'Blue Star Group',
    key_project: true,
    description:
      'Implementation of the e-commerce platform under a "Phygital" strategy for the leading accessory brand in LATAM. Integration of 800+ physical stores with the digital channel and optimization for high-demand events like Hot Sale.',
    href: 'https://todomoda.com',
    tech: ['Adobe Commerce', 'Magento', 'PHP', 'MySQL', 'Redis'],
  },
  {
    title: 'Isadora',
    key_project: true,
    year: 2021,
    company: 'Blue Star Group',
    description:
      'Deployment of online stores with a focus on personalization and real-time inventory synchronization across 11 countries. Scalable architecture built on Adobe Commerce to support global traffic peaks.',
    href: 'https://www.shopisadora.com',
    tech: ['Adobe Commerce', 'Magento', 'PHP', 'Varnish', 'MySQL'],
  },
  {
    title: 'RadioShack (Unicomer)',
    company: 'Unicomer',
    year: 2024,
    key_project: true,
    description:
      'Total redesign of the e-commerce platform for Central and South America. Implementation of a unified backend for multi-country management and integration with global marketplaces like Amazon and Walmart.',
    href: 'https://www.radioshackla.com',
    tech: ['Adobe Commerce', 'Magento', 'PHP', 'Elasticsearch'],
  },
  {
    title: 'FYA Ferretería',
    key_project: true,
    company: 'Summa Solutions (Infracommerce)',
    year: 2021,
    description:
      'Development of a hybrid B2B/B2C e-commerce portal for construction materials. Features advanced faceted search for complex technical catalogs and custom pricing rules.',
    href: 'https://www.fya.pe',
    tech: ['Magento 2', 'PHP', 'MySQL', 'Elasticsearch'],
  },
  {
    title: 'Sole',
    year: 2022,
    key_project: true,
    company: 'Summa Solutions (Infracommerce)',
    description:
      'Conversion-oriented platform for household appliances. Includes technical installation scheduling directly from the checkout and integration with local payment gateways.',
    href: 'https://www.sole.com.pe',
    tech: ['Magento', 'PHP', 'MySQL', 'ERP Integration'],
  },

  // Software Products (Active)
  {
    title: 'Compuconta',
    key_project: true,
    company: 'Compuconta Software',
    year: 2012,
    description:
      'Modernization of a leading ERP for public and private sectors in Colombia. Development of electronic payroll, invoicing, and accounting modules using PHP (Laravel/Symfony) standards.',
    href: 'https://www.compuconta.com',
    tech: ['PHP', 'Laravel', 'Symfony', 'MySQL', 'React', 'PostgreSQL'],
  },
  {
    title: 'ClinicalApp (Sion Ingeniería)',
    year: 2020,
    key_project: true,
    company: 'Sion Ingeniería',
    description:
      'SaaS for digitizing medical and dental processes. Includes electronic health records with interactive odontograms, appointment scheduling, and administrative management for clinics.',
    href: 'https://clinicalapp.com.co',
    tech: ['PHP', 'Laravel', 'SQL Server'],
  },

  // Civic Tech & Social Innovation (Awards & Press References)
  {
    title: 'GanaPAE',
    year: 2017,
    key_project: true,
    company: 'Narino Government',
    description:
      'Transparency platform awarded the national INDIGO 2017 Prize (MinTIC) and the Ingenio 2018 Prize (Fedesoft) for open government innovation. (Project currently non-operational).',
    href: 'https://www.funcionpublica.gov.co/eva/admon/files/premios/Indigo_2017.pdf',
    tech: ['PHP', 'MySQL', 'Google Maps API', 'Open Data', 'Java', 'Android'],
  },
  {
    title: 'Museo Virtual del Carnaval',
    company: 'Narino Government',
    year: 2018,
    description:
      '3D immersive nominated Indigo 2018 Prize by Mintic in the Social Impact category. Uses photogrammetry to preserve regional cultural heritage. (Project currently non-operational).',
    href: 'https://narino.gov.co/museo-virtual-del-carnaval-de-negros-y-blancos-de-pasto-ganador-de-los-premios-ingenio-2018/',
    tech: ['Unity', 'Sketchfab', 'Photogrammetry', 'Java'],
  },
  {
    title: 'ERIS - Innovation Ecosystem',
    year: 2019,
    company: 'Narino Government',
    description:
      'Digital mapping platform for social initiatives launched by the Nariño Social Innovation Center (CISNA) to foster community collaboration. (Project currently non-operational).',
    href: 'https://narino.gov.co/gobernacion-de-narino-lanza-eris-la-primera-plataforma-digital-de-mapeo-de-iniciativas-sociales-en-el-departamento/',
    tech: ['Angular', 'Laravel', 'MySQL', 'Geolocation'],
  },
  {
    title: 'Dale la Pata',
    year: 2018,
    company: 'Narino Government',
    description:
      'Pioneering animal welfare platform for the centralization and traceability of the adoption process, managing information for animal-welfare foundations across Nariño. Uses social storytelling to boost adoption and dog/cat neutering campaigns. Recognized as a world best practice by UNDP. (Project currently non-operational).',
    href: 'https://dalelapata.narino.gov.co',
    tech: ['Python', 'Django', 'MySQL', 'Social Innovation'],
  },
]

export default projectsData
