import type {
  QueryReturnValue,
  BaseQueryFn,
} from '@reduxjs/toolkit/src/query/baseQueryTypes'
import type { MaybePromise } from '@reduxjs/toolkit/src/query/tsHelpers'

export const apiSlicePromiseWrapper = async <F extends () => Promise<O>, O>(
  fn: F
): Promise<QueryReturnValue<O>> => {
  try {
    const data = await fn()
    return {
      data,
    }
  } catch (e: unknown) {
    return {
      error: e,
    }
  }
}

export function fakeBaseQuery<ErrorType>(): BaseQueryFn<
  void,
  never,
  ErrorType
> {
  return (): MaybePromise<
    QueryReturnValue<never, ErrorType, Record<string, string>>
  > => {
    throw new Error(
      'All queries & mutations must use the `queryFn` definition syntax'
    )
  }
}
