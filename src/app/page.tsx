import styles from './page.module.css'
import { SigninForm } from './_component/SigninForm'

export default async function Home() {
  return (
    <main className={styles.main}>
      <SigninForm />
    </main>
  )
}
