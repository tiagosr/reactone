import { useEffect, useState } from "react";
import Tone from "tone";

interface UseToneOptions {
    latencyHint: AudioContextLatencyCategory,

}

interface UseToneRetVal {
    loaded: boolean,
    state: AudioContextState,

}

function useTone({latencyHint, }:UseToneOptions):UseToneRetVal {
    const [loaded, setLoaded] = useState(false);
    const [state, setState] = useState(Tone.getContext().state);

    useEffect(() => {
        const newCtx = new Tone.Context({latencyHint});
        Tone.setContext(newCtx);
        setState(newCtx.state);
    }, [latencyHint]);

    useEffect(() => {
        (async ()=> {
            await Tone.loaded();
            setLoaded(true);
        })();
    }, []);

    
    
    return {
        loaded,
        state
    }
}

export default useTone;