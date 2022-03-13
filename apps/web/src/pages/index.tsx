import { RemindersTable } from '@src/components'
import { DashboardLayout } from '@src/layouts'

const Home = () => {
  return <RemindersTable />
}

Home.getLayout = function getLayout(page: React.ReactElement) {
  return <DashboardLayout>{page}</DashboardLayout>
}

export default Home
