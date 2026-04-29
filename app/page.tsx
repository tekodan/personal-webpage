import { redirect } from 'next/navigation'
import appConfig from '@/data/appConfig'

export default function Page() {
  if (appConfig.features.home) {
    redirect('/home')
  }

  if (appConfig.features.about) {
    redirect('/about')
  }

  redirect('/home')
}
