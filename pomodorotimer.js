import React, { useEffect, useRef, useState } from "react";
import { View, Text, Pressable, StyleSheet } from "react-native";
import { colors, fonts } from "../theme";
import { fmtClock } from "../utils/time";

const DURATIONS = [15, 25, 50];

// phase: 'idle' | 'confirm' | 'running'
export default function PomodoroTimer({ bookTitle, onLogSession }) {
  const [duration, setDuration] = useState(25);
  const [phase, setPhase] = useState("idle");
  const [secondsLeft, setSecondsLeft] = useState(25 * 60);
  const intervalRef = useRef(null);
  const startedSecondsRef = useRef(25 * 60);

  useEffect(() => {
    return () => clearInterval(intervalRef.current);
  }, []);

  function selectDuration(mins) {
    if (phase !== "idle") return;
    setDuration(mins);
    setSecondsLeft(mins * 60);
  }

  function askStart() {
    setPhase("confirm");
  }

  function cancelStart() {
    setPhase("idle");
  }

  function startTimer() {
    setPhase("running");
    const totalSeconds = duration * 60;
    startedSecondsRef.current = totalSeconds;
    setSecondsLeft(totalSeconds);

    intervalRef.current = setInterval(() => {
      setSecondsLeft((prev) => {
        if (prev <= 1) {
          clearInterval(intervalRef.current);
          onLogSession(duration); // full session completed
          setPhase("idle");
          return duration * 60;
        }
        return prev - 1;
      });
    }, 1000);
  }

  function stopTimer() {
    clearInterval(intervalRef.current);
    const elapsedSeconds = startedSecondsRef.current - secondsLeft;
    const elapsedMinutes = Math.max(1, Math.round(elapsedSeconds / 60));
    onLogSession(elapsedMinutes);
    setPhase("idle");
    setSecondsLeft(duration * 60);
  }

  return (
    <View style={styles.wrap}>
      <View style={styles.chipRow}>
        {DURATIONS.map((d) => (
          <Pressable
            key={d}
            disabled={phase !== "idle"}
            onPress={() => selectDuration(d)}
            style={[
              styles.chip,
              d === duration && styles.chipSelected,
              phase !== "idle" && styles.chipDisabled,
            ]}
          >
            <Text style={[styles.chipText, d === duration && styles.chipTextSelected]}>
              {d} min
            </Text>
          </Pressable>
        ))}
      </View>

      <Text style={styles.clock}>{fmtClock(secondsLeft)}</Text>

      {phase === "idle" && (
        <>
          <Text style={styles.status}>Ready when you are</Text>
          <Pressable style={styles.primaryButton} onPress={askStart}>
            <Text style={styles.primaryButtonText}>Start Pomodoro</Text>
          </Pressable>
        </>
      )}

      {phase === "confirm" && (
        <View style={styles.confirmBox}>
          <Text style={styles.confirmText}>
            Start a <Text style={styles.bold}>{duration}-minute</Text> reading session for{" "}
            <Text style={styles.bold}>{bookTitle}</Text>?
          </Text>
          <View style={styles.confirmActions}>
            <Pressable style={[styles.primaryButton, styles.flex1]} onPress={startTimer}>
              <Text style={styles.primaryButtonText}>Yes, start</Text>
            </Pressable>
            <Pressable style={[styles.secondaryButton, styles.flex1]} onPress={cancelStart}>
              <Text style={styles.secondaryButtonText}>Cancel</Text>
            </Pressable>
          </View>
        </View>
      )}

      {phase === "running" && (
        <>
          <Text style={[styles.status, styles.statusRunning]}>Reading now — timer running</Text>
          <Pressable style={styles.stopButton} onPress={stopTimer}>
            <Text style={styles.stopButtonText}>Stop &amp; log session</Text>
          </Pressable>
        </>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  wrap: {
    marginTop: 30,
    paddingTop: 26,
    borderTopWidth: 1,
    borderTopColor: colors.line,
  },
  chipRow: {
    flexDirection: "row",
    gap: 8,
    marginBottom: 18,
  },
  chip: {
    borderWidth: 1,
    borderColor: colors.lineStrong,
    paddingVertical: 6,
    paddingHorizontal: 12,
  },
  chipSelected: {
    borderColor: colors.accent,
  },
  chipDisabled: {
    opacity: 0.5,
  },
  chipText: {
    fontFamily: fonts.mono,
    fontSize: 12,
    color: colors.textSoft,
  },
  chipTextSelected: {
    color: colors.accent,
  },
  clock: {
    fontFamily: fonts.mono,
    fontWeight: "700",
    fontSize: 52,
    color: colors.text,
    textAlign: "center",
    paddingVertical: 10,
  },
  status: {
    fontFamily: fonts.mono,
    fontSize: 12,
    color: colors.textSoft,
    textAlign: "center",
    textTransform: "uppercase",
    letterSpacing: 1,
    marginBottom: 16,
  },
  statusRunning: {
    color: colors.good,
  },
  primaryButton: {
    backgroundColor: colors.accent,
    borderWidth: 1,
    borderColor: colors.accent,
    paddingVertical: 12,
    alignItems: "center",
  },
  primaryButtonText: {
    fontFamily: fonts.mono,
    fontSize: 13,
    color: colors.bgCard,
  },
  secondaryButton: {
    borderWidth: 1,
    borderColor: colors.text,
    paddingVertical: 12,
    alignItems: "center",
  },
  secondaryButtonText: {
    fontFamily: fonts.mono,
    fontSize: 13,
    color: colors.text,
  },
  stopButton: {
    borderWidth: 1,
    borderColor: colors.accent,
    paddingVertical: 12,
    alignItems: "center",
  },
  stopButtonText: {
    fontFamily: fonts.mono,
    fontSize: 13,
    color: colors.accent,
  },
  confirmBox: {
    borderWidth: 1,
    borderStyle: "dashed",
    borderColor: colors.lineStrong,
    padding: 14,
  },
  confirmText: {
    fontFamily: fonts.body,
    fontSize: 14,
    color: colors.textSoft,
    lineHeight: 20,
  },
  bold: {
    fontWeight: "700",
    color: colors.text,
  },
  confirmActions: {
    flexDirection: "row",
    gap: 8,
    marginTop: 12,
  },
  flex1: { flex: 1 },
});