import './App.css'
import Pages from "@/pages/index.jsx"
import { Toaster } from "@/components/ui/toaster"
import { Toaster as SonnerToaster } from "@/components/ui/sonner"
import { ThemeProvider } from "@/contexts/ThemeContext"
import OfflineIndicator from "@/components/OfflineIndicator"

function App() {
  return (
    <ThemeProvider>
      <Pages />
      <Toaster />
      <SonnerToaster />
      <OfflineIndicator />
    </ThemeProvider>
  )
}

export default App 