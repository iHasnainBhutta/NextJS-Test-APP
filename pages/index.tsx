'use client'

import styles from './index.module.css'
import People from './dashboard/People'

export default function Home() {

  return (
    <main className={styles.main}>
      <div className={styles.grid}>
        <div className="container mx-auto my-10 ">
          <div className="bg-[#fff5f1] px-6 lg:px-16 py-10 rounded-3xl">
            <People />
          </div>
        </div>
      </div>
    </main>
  )
}
