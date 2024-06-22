import Tone from "tone";

type Frequency = Tone.Unit.Frequency;
type Time = Tone.Unit.Time;
type UseSynthSynths =
    Tone.Synth |
    Tone.AMSynth | Tone.FMSynth |
    Tone.MonoSynth | Tone.DuoSynth |
    Tone.MetalSynth;
type UseMonophonicSynthVoices = Tone.Synth |
    Tone.MonoSynth | Tone.DuoSynth |
    Tone.MetalSynth;
type UseModulationSynthVoices = Tone.AMSynth | Tone.FMSynth;

class UseSynth {
    private synth:UseSynthSynths;

    constructor(_synth:UseSynthSynths) {
        this.synth = _synth;
    }
    toDestination() {
        this.synth.toDestination();
        return this;
    }
    triggerAttack(
        note: Frequency | Tone.FrequencyClass,
        time?: Time | undefined,
        velocity?: number | undefined
    ) {
        this.synth.triggerAttack(note, time, velocity);
        return this;
    }
    triggerRelease(
        time?: Time | undefined,
    ) {
        this.synth.triggerRelease(time);
        return this;
    }
    triggerAttackRelease(
        note: Frequency,
        duration: Time,
        time?: Time | undefined,
        velocity?: number | undefined
    ) {
        this.synth.triggerAttackRelease(note, duration, time, velocity)
        return this;
    }
}

class UsePluckSynth {
    private synth: Tone.PluckSynth;

    constructor(_synth: Tone.PluckSynth) {
        this.synth = _synth;
    }
    toDestination() {
        this.synth.toDestination();
        return this;
    }
    triggerAttack(
        note: Frequency,
        time?: Time | undefined
    ) {
        this.synth.triggerAttack(note, time);
        return this;
    }
    triggerRelease(
        time?: Time | undefined,
    ) {
        this.synth.triggerRelease(time);
        return this;
    }
    triggerAttackRelease(
        note: Frequency,
        duration: Time,
        time?: Time | undefined,
        velocity?: number | undefined
    ) {
        this.synth.triggerAttackRelease(note, duration, time, velocity)
        return this;
    }
}

type UsePolySynthOptions = Tone.PolySynthOptions<UseModulationSynthVoices | UseMonophonicSynthVoices>;

class UsePolyphonicSynth {
    private synth: Tone.PolySynth;
    constructor(
        options?:UsePolySynthOptions | undefined) {
        this.synth = new Tone.PolySynth(options)
    }
    toDestination() {
        this.synth.toDestination();
        return this;
    }
    triggerAttack(
        note: Frequency | Frequency[],
        time?: Time | undefined,
        velocity?: number | undefined
    ) {
        this.synth.triggerAttack(note, time, velocity);
        return this;
    }
    triggerRelease(
        note: Frequency | Frequency[],
        time?: Time | undefined,
    ) {
        this.synth.triggerRelease(note, time);
        return this;
    }
    triggerAttackRelease(
        note: Frequency,
        duration: Time,
        time?: Time | undefined,
        velocity?: number | undefined
    ) {
        this.synth.triggerAttackRelease(note, duration, time, velocity)
        return this;
    }
}

function useSynth(
    options?:Tone.SynthOptions|undefined
):UseSynth {
    return new UseSynth(new Tone.Synth(options));
}

function useAMSynth(
    options?:Tone.AMSynthOptions|undefined
):UseSynth {
    return new UseSynth(new Tone.AMSynth(options));
}

function useFMSynth(
    options?:Tone.FMSynthOptions|undefined
):UseSynth {
    return new UseSynth(new Tone.FMSynth(options));
}

function useMonoSynth(
    options?:Tone.MonoSynthOptions|undefined
):UseSynth {
    return new UseSynth(new Tone.MonoSynth(options));
}

function useDuoSynth(
    options?:Tone.DuoSynthOptions|undefined
):UseSynth {
    return new UseSynth(new Tone.DuoSynth(options));
}

function useMembraneSynth(
    options?:Tone.MembraneSynthOptions|undefined
):UseSynth {
    return new UseSynth(new Tone.MembraneSynth(options));
}

function useMetalSynth(
    options?:Tone.MetalSynthOptions|undefined
):UseSynth {
    return new UseSynth(new Tone.MetalSynth(options));
}

function usePluckSynth(
    options?:Tone.PluckSynthOptions|undefined
):UsePluckSynth {
    return new UsePluckSynth(new Tone.PluckSynth(options));
}

function usePolySynth(
    options?:UsePolySynthOptions | undefined
):UsePolyphonicSynth {
    return new UsePolyphonicSynth(options);
}

export {
    useAMSynth,
    useFMSynth,
    useMonoSynth,
    useDuoSynth,
    useMembraneSynth,
    useMetalSynth,
    usePluckSynth,
    usePolySynth,
};
export default useSynth;