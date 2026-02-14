import { NextResponse } from "next/server";

export type ApiSuccess<T = unknown> = {
    ok: true;
    data?: T;
    requestId: String;
};

export type ApiError = {
    ok: false;
    error: string;
    requestId: string;
};

export function success<T>(
    requestId: string,
    data?: T,
    status: number = 200
) {
    return NextResponse.json<ApiSuccess<T>>(
        { ok: true, data, requestId },
        { status }
    );
}

export function failure(
    requestId: string,
    error: string,
    status: number = 400
) {
    return NextResponse.json<ApiError>(
        { ok: false, error, requestId },
        { status }
    );
}