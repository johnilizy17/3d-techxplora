import React from 'react';

class ThreeErrorBoundary extends React.Component {
    constructor(props) {
        super(props);
        this.state = { hasError: false, error: null };
    }

    static getDerivedStateFromError(error) {
        return { hasError: true, error };
    }

    componentDidCatch(error, errorInfo) {
        console.error('3D Scene Error:', error, errorInfo);
    }

    render() {
        if (this.state.hasError) {
            return (
                <div className="w-full h-full flex items-center justify-center bg-gradient-to-br from-[#0a0a0a] via-[#1a1520] to-[#0a0a0a]">
                    <div className="text-center p-8 glass-morphism rounded-2xl max-w-md">
                        <div className="text-[#a6b1ff] text-6xl mb-4">⚠️</div>
                        <h3 className="text-xl font-bold text-white mb-2">3D Scene Error</h3>
                        <p className="text-gray-400 text-sm mb-4">
                            Unable to load 3D content. Your browser may not support WebGL.
                        </p>
                        {this.state.error && (
                            <div className="text-left bg-black/50 p-4 rounded text-xs font-mono text-red-300 mb-4 overflow-auto max-h-32">
                                {this.state.error.toString()}
                            </div>
                        )}
                        <button
                            onClick={() => window.location.reload()}
                            className="px-6 py-2 bg-gradient-to-r from-[#a6b1ff] to-[#c7aff8] text-[#0a0a0a] rounded-lg font-medium hover:scale-105 transition-transform"
                        >
                            Reload Page
                        </button>
                    </div>
                </div>
            );
        }

        return this.props.children;
    }
}

export default ThreeErrorBoundary;
