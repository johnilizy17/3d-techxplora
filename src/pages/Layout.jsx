import Navbar from "@/components/navigation/Navbar";

export default function Layout({ children }) {
    return (
        <div className="min-h-screen bg-[#0a0a0a] text-white selection:bg-[#a6b1ff]/30">
            <Navbar />
            <main>
                {children}
            </main>
        </div>
    )
}
