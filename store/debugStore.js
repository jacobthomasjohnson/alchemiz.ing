import { create } from "zustand";

const useDebugStore = create((set) => ({
    debugMessage: null,
    debugTrigger: null, // Add a trigger to force re-runs
    debugColor: null,
    setDebugMessage: (message, color) => {
        set({
            debugMessage: message,
            debugColor: color,
            debugTrigger: Date.now(), // Update with the current timestamp
        });

        // Optional: Clear the message after a timeout
        setTimeout(() => set({ debugMessage: null }), 2000);
    },
}));

export default useDebugStore;
