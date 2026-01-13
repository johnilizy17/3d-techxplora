import React, { useState } from 'react';
import { Copy, Check } from 'lucide-react';
import { toast } from 'sonner';

export default function CopyIcon({ code, className }) {
    const [copied, setCopied] = useState(false);

    const handleCopy = (e) => {
        e.stopPropagation();
        navigator.clipboard.writeText(code);
        setCopied(true);
        toast.success("Code copied to clipboard!");
        setTimeout(() => setCopied(false), 2000);
    };

    return (
        <button
            onClick={handleCopy}
            className={`p-1.5 rounded-lg bg-white/5 border border-white/10 hover:bg-white/10 transition-colors group ${className}`}
            title="Copy code"
        >
            {copied ? (
                <Check size={14} className="text-green-400" />
            ) : (
                <Copy size={14} className="text-gray-400 group-hover:text-white" />
            )}
        </button>
    );
}
