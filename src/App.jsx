import './App.css'
import Pages from "@/pages/index.jsx"
import { Toaster } from "@/components/ui/toaster"
import { Toaster as SonnerToaster } from "@/components/ui/sonner"
import { ThemeProvider } from "@/contexts/ThemeContext"
// Offline features disabled temporarily
// import OfflineIndicator from "@/components/OfflineIndicator"
// import InstallPrompt from "@/components/InstallPrompt"

function App() {
  return (
    <ThemeProvider>
      <Pages />
      <Toaster />
      <SonnerToaster />
      {/* <OfflineIndicator /> */}
      {/* <InstallPrompt /> */}
    </ThemeProvider>
  )
}

export default App 