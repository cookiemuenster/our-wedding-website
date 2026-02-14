type LogLevel = "debug" | "info" | "warn" | "error";

function base(level: LogLevel, event: string, meta?: Record<string, unknown>) {
    const payload = {
        ts: new Date().toISOString(),
        level,
        event,
        ...meta,
    };

    // Vercel/Node will capture console.* as structured logs
    if (level === "error") console.error(payload);
    else if (level === "warn") console.warn(payload);
    else console.log(payload);
}

export const log = {
    debug: (event: string, meta?: Record<string, unknown>) => base("debug", event, meta),
    info: (event: string, meta?: Record<string, unknown>) => base("info", event, meta),
    warn: (event: string, meta?: Record<string, unknown>) => base("warn", event, meta),
    error: (event: string, meta?: Record<string, unknown>) => base("error", event, meta),
};