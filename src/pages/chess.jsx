import AmbientParticles from "@/components/collectors/AmbientParticles";
import CustomCursor from "@/components/collectors/CustomCursor";
import ScrollProgress from "@/components/collectors/ScrollProgress";
import React from "react";

export default function Chess() {
    return (
        <div className="w-screen h-screen overflow-hidden">
           
            <iframe
                src="https://chess-six-gamma.vercel.app/"
                title="Chess App"
                className="w-full h-full"
                style={{ border: "none" }}
                allowFullScreen
                sandbox="allow-scripts allow-same-origin allow-forms"
            />
        </div>
    );
}
