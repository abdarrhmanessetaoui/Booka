"use client";

import { useEffect, useState } from "react";
import Vapi from "@vapi-ai/web";

// Initialize Vapi with your public key
const vapi = new Vapi(process.env.NEXT_PUBLIC_VAPI_PUBLIC_KEY || "");

export default function VapiButton() {
    const [callStatus, setCallStatus] = useState<"inactive" | "loading" | "active">("inactive");

    useEffect(() => {
        // Listen to Vapi events
        vapi.on("call-start", () => setCallStatus("active"));
        vapi.on("call-end", () => setCallStatus("inactive"));
        vapi.on("error", (e) => {
            console.error(e);
            setCallStatus("inactive");
        });

        // Cleanup on unmount
        return () => {
            vapi.removeAllListeners();
        };
    }, []);

    const toggleCall = async () => {
        if (callStatus === "active") {
            vapi.stop();
        } else {
            setCallStatus("loading");
            // Replace with your actual Assistant ID from the Vapi dashboard
            // You can find this ID under your assistant's name (e.g., aa214f...8c5afb)
            await vapi.start("aa214f89-626b-4d0e-b96c-fd18ce8c5afb");
        }
    };

    return (
        <button
            onClick={toggleCall}
            disabled={callStatus === "loading"}
            className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 disabled:opacity-50"
        >
            {callStatus === "inactive" ? "Start Interview" :
                callStatus === "loading" ? "Connecting..." : "End Interview"}
        </button>
    );
}
