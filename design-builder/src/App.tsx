import BuilderPage from './page-components/builder-page'
import { Toaster } from 'sonner'

function App() {
  return (
    <>
      <BuilderPage />
      <Toaster richColors position="top-right" />
    </>
  )
}

export default App
