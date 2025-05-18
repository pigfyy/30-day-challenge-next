import { NextResponse } from "next/server";
import { z, ZodSchema } from "zod";

export class ValidationError extends Error {
  constructor(
    message: string,
    public errors: any,
  ) {
    super(message);
  }
}

export async function validateRequest<T>(
  schema: ZodSchema<T>,
  req: Request,
): Promise<T> {
  try {
    const body = await req.json();
    return schema.parse(body);
  } catch (error) {
    if (error instanceof z.ZodError) {
      throw new ValidationError("Validation failed", error.errors);
    }
    throw new Error("Failed to parse request");
  }
}

export function handleError(error: unknown) {
  console.log(error);

  if (error instanceof ValidationError) {
    return NextResponse.json(
      { message: error.message, errors: error.errors },
      { status: 400 },
    );
  }

  return NextResponse.json(
    { message: "Internal Server Error" },
    { status: 500 },
  );
}
