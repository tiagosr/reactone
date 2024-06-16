import { useEffect, useRef } from "react";
import Tone from "tone";

type Time = Tone.Unit.Time;
type TimeSignature = Tone.Unit.TimeSignature;
type NormalRange = Tone.Unit.NormalRange;
type BarsBeatsSixteenths = Tone.Unit.BarsBeatsSixteenths;
type Subdivision = Tone.Unit.Subdivision;
type Seconds = Tone.Unit.Seconds;
type TransportTimeClass = Tone.TransportTimeClass;
type PlaybackState = Tone.PlaybackState;

class UseTransportClass {
    start(time?: Time | undefined, offset?: Time | undefined) {
        Tone.getTransport().start(time, offset);
        return this;
    }
    stop(time?: Time | undefined) {
        Tone.getTransport().stop(time);
        return this;
    }
    pause(time?: Time | undefined) {
        Tone.getTransport().pause(time);
        return this;
    }
    toggle(time?: Time | undefined) {
        Tone.getTransport().toggle(time);
        return this;
    }

    get state (): PlaybackState { return Tone.getTransport().state; }
    
    cancel(after?:Time | undefined) {
        Tone.getTransport().cancel(after);
        return this;
    }

    get loop (): boolean { return Tone.getTransport().loop; }
    set loop (b:boolean) { Tone.getTransport().loop = b; }
    setLoop(b:boolean) {
        Tone.getTransport().loop = b;
        return this;
    }

    get loopStart (): Time { return Tone.getTransport().loopStart; }
    set loopStart (t:Time) { Tone.getTransport().loopStart = t; }
    setLoopStart(t: Time) {
        Tone.getTransport().loopStart = t;
        return this;
    }

    get loopEnd (): Time { return Tone.getTransport().loopEnd; }
    set loopEnd (t:Time) { Tone.getTransport().loopEnd = t; }
    setLoopEnd(t: Time) {
        Tone.getTransport().loopEnd = t;
        return this;
    }

    setLoopPoints(start: Time, end: Time) {
        Tone.getTransport().setLoopPoints(start, end);
        return this;
    }

    get timeSignature (): TimeSignature { return Tone.getTransport().timeSignature; }
    set timeSignature (ts:TimeSignature) { Tone.getTransport().timeSignature = ts; }

    setTimeSignature(ts: TimeSignature) {
        Tone.getTransport().timeSignature = ts;
        return this;
    }

    get position(): BarsBeatsSixteenths | Time { return Tone.getTransport().position; }
    set position(p: BarsBeatsSixteenths | Time) { Tone.getTransport().position = p; }
    setPosition(p: BarsBeatsSixteenths | Time) {
        Tone.getTransport().position = p;
        return this;
    }
}


function useTransport(): UseTransportClass {
    return new UseTransportClass();
}

function useTransportStartStop(): [
    (time?: Time | undefined, offset?: Time | undefined) => UseTransportClass,
    (time?: Time | undefined) => UseTransportClass,
    PlaybackState,
    BarsBeatsSixteenths | Time,
    (pos: BarsBeatsSixteenths | Time) => UseTransportClass
] {
    const t = new UseTransportClass();
    return [t.start, t.stop, t.state, t.position, t.setPosition];
}

function useLoop(initial?:boolean | undefined): [
    boolean,
    (b:boolean) => void,
    {
        start: Time,
        setStart: (t:Time) => void,
        end: Time,
        setEnd: (t:Time) => void
        setLoopPoints: (start: Time, end: Time) => void
    }
] {
    const t = new UseTransportClass();
    if (typeof initial !== "undefined") {
        t.setLoop(initial);
    }
    return [
        t.loop,
        t.setLoop,
        {
            start: t.loopStart,
            setStart: t.setLoopStart,
            end: t.loopEnd,
            setEnd: t.setLoopEnd,
            setLoopPoints: t.setLoopPoints
        }
    ]
}

function useSchedule(): [
    (
        callback: (time:Time) => undefined,
        time: Time | TransportTimeClass
    ) => void,
    () => void
] {
    const scheduleRef = useRef<number>();
    const clear = () => {
        if (typeof scheduleRef.current !== "undefined")
            Tone.getTransport().clear(scheduleRef.current);
        scheduleRef.current = undefined;
    }
    const useSchedule = (
        callback: (time: Time) => undefined,
        time: Time | TransportTimeClass
    ) => {
        useEffect(() => {
            scheduleRef.current = Tone.getTransport().schedule(callback, time);
            return clear;
        }, [callback, time]);
    }
    return [useSchedule, clear];
}

function useScheduleRepeat(): [
    (
        callback: (time:Time) => undefined,
        interval: Time | TransportTimeClass,
        startTime?: Time | TransportTimeClass | undefined,
        duration?: Time | undefined
    ) => void,
    () => void
] {
    const scheduleRef = useRef<number>();
    const clear = () => {
        if (typeof scheduleRef.current !== "undefined")
            Tone.getTransport().clear(scheduleRef.current);
        scheduleRef.current = undefined;
    }
    const useSchedule = (
        callback: (time: Time) => undefined,
        interval: Time | TransportTimeClass,
        startTime?: Time | TransportTimeClass | undefined,
        duration?: Time | undefined
    ) => {
        useEffect(() => {
            scheduleRef.current = Tone.getTransport().scheduleRepeat(callback, interval, startTime, duration);
            return clear;
        }, [callback, interval, startTime, duration]);
    }
    return [useSchedule, clear];
}

function useScheduleOnce(): [
    (
        callback: (time:Time) => undefined,
        time: Time | TransportTimeClass
    ) => void,
    () => void
] {
    const scheduleRef = useRef<number>();
    const clear = () => {
        if (typeof scheduleRef.current !== "undefined")
            Tone.getTransport().clear(scheduleRef.current);
        scheduleRef.current = undefined;
    }
    const useSchedule = (
        callback: (time: Time) => undefined,
        time: Time | TransportTimeClass
    ) => {
        useEffect(()=> {
            scheduleRef.current = Tone.getTransport().scheduleOnce(callback, time);
            return clear;
        }, [callback, time]);
    }
    return [useSchedule, clear];
}

class UseBpmClass {
    get bpm () { return Tone.getTransport().bpm.value; }
    setBpm(bpm: number) {
        return Tone.getTransport().bpm.value = bpm;
    }
    rampTo(
        value:number,
        rampTime?: Time | undefined,
        startTime?: Time | undefined
    ) {
        Tone.getTransport().bpm.rampTo(value, rampTime, startTime);
        return this;
    }
    setValueAtTime(value: number, time: Time) {
        Tone.getTransport().bpm.setValueAtTime(value, time);
        return this;
    }
}

function useBpm(): UseBpmClass {
    return new UseBpmClass();
}

function useTimeSignature(): [TimeSignature, (ts: TimeSignature) => void] {
    return [
        Tone.getTransport().timeSignature,
        (ts: TimeSignature) => { Tone.getTransport().timeSignature = ts; }
    ]
}

function useSwing(): [
    NormalRange,
    (swing:NormalRange) => void,
    Subdivision,
    (subdiv:Subdivision) => void,
] {
    return [
        Tone.getTransport().swing,
        (swing:NormalRange) => { Tone.getTransport().swing = swing; },
        Tone.getTransport().swingSubdivision,
        (subdiv:Subdivision) => { Tone.getTransport().swingSubdivision = subdiv; }
    ];
}

class UseTransportPositionClass {
    get position () { return Tone.getTransport().position; }
    set position (pos:BarsBeatsSixteenths | Time) {
        Tone.getTransport().position = pos;
    }

    get seconds () { return Tone.getTransport().seconds; }
    set seconds (sec:Seconds) {
        Tone.getTransport().seconds = sec;
    }

    get ticks () { return Tone.getTransport().ticks; }
    set ticks (t:number) {
        Tone.getTransport().ticks = t;
    }

    get progress () { return Tone.getTransport().progress; }
}

function useTransportPosition(): UseTransportPositionClass {
    return new UseTransportPositionClass();
}




export {
    useTransportStartStop,
    useLoop,
    useSchedule,
    useScheduleRepeat,
    useScheduleOnce,
    useBpm,
    useTimeSignature,
    useSwing,
    useTransportPosition
}
export default useTransport;