import { ZodError } from "zod";
import { fromZodError } from 'zod-validation-error';

export function* RestifyError(e: Error) {
    if (e instanceof ZodError) {
        yield* [400, fromZodError(e).toString()];
    }
    yield* [500, e.message];
};