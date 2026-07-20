'use client';

import React from 'react';
import { Loader2 } from 'lucide-react';

const LoadingOverlay = () => {
    return (
        <div className="loading-wrapper">
            <div className="loading-shadow-wrapper bg-white shadow-soft-lg">
                <div className="loading-shadow">
                    <Loader2 className="loading-animation w-12 h-12 text-[#663820]" />
                    <h2 className="loading-title">Synthèse de votre livre en cours</h2>
                    <p className="text-[#777] text-center max-w-xs">
                        Veuillez patienter pendant que nous traitons votre PDF et préparons votre expérience littéraire interactive.
                    </p>
                </div>
            </div>
        </div>
    );
};

export default LoadingOverlay;
