
/**
 * Client
**/

import * as runtime from './runtime/library.js';
import $Types = runtime.Types // general types
import $Public = runtime.Types.Public
import $Utils = runtime.Types.Utils
import $Extensions = runtime.Types.Extensions
import $Result = runtime.Types.Result

export type PrismaPromise<T> = $Public.PrismaPromise<T>


/**
 * Model User
 * 
 */
export type User = $Result.DefaultSelection<Prisma.$UserPayload>
/**
 * Model Challenge
 * 
 */
export type Challenge = $Result.DefaultSelection<Prisma.$ChallengePayload>
/**
 * Model DailyProgress
 * 
 */
export type DailyProgress = $Result.DefaultSelection<Prisma.$DailyProgressPayload>
/**
 * Model ChallengeIdea
 * 
 */
export type ChallengeIdea = $Result.DefaultSelection<Prisma.$ChallengeIdeaPayload>

/**
 * ##  Prisma Client ʲˢ
 *
 * Type-safe database client for TypeScript & Node.js
 * @example
 * ```
 * const prisma = new PrismaClient()
 * // Fetch zero or more Users
 * const users = await prisma.user.findMany()
 * ```
 *
 *
 * Read more in our [docs](https://www.prisma.io/docs/reference/tools-and-interfaces/prisma-client).
 */
export class PrismaClient<
  ClientOptions extends Prisma.PrismaClientOptions = Prisma.PrismaClientOptions,
  U = 'log' extends keyof ClientOptions ? ClientOptions['log'] extends Array<Prisma.LogLevel | Prisma.LogDefinition> ? Prisma.GetEvents<ClientOptions['log']> : never : never,
  ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs
> {
  [K: symbol]: { types: Prisma.TypeMap<ExtArgs>['other'] }

    /**
   * ##  Prisma Client ʲˢ
   *
   * Type-safe database client for TypeScript & Node.js
   * @example
   * ```
   * const prisma = new PrismaClient()
   * // Fetch zero or more Users
   * const users = await prisma.user.findMany()
   * ```
   *
   *
   * Read more in our [docs](https://www.prisma.io/docs/reference/tools-and-interfaces/prisma-client).
   */

  constructor(optionsArg ?: Prisma.Subset<ClientOptions, Prisma.PrismaClientOptions>);
  $on<V extends U>(eventType: V, callback: (event: V extends 'query' ? Prisma.QueryEvent : Prisma.LogEvent) => void): PrismaClient;

  /**
   * Connect with the database
   */
  $connect(): $Utils.JsPromise<void>;

  /**
   * Disconnect from the database
   */
  $disconnect(): $Utils.JsPromise<void>;

  /**
   * Add a middleware
   * @deprecated since 4.16.0. For new code, prefer client extensions instead.
   * @see https://pris.ly/d/extensions
   */
  $use(cb: Prisma.Middleware): void

/**
   * Executes a prepared raw query and returns the number of affected rows.
   * @example
   * ```
   * const result = await prisma.$executeRaw`UPDATE User SET cool = ${true} WHERE email = ${'user@email.com'};`
   * ```
   *
   * Read more in our [docs](https://www.prisma.io/docs/reference/tools-and-interfaces/prisma-client/raw-database-access).
   */
  $executeRaw<T = unknown>(query: TemplateStringsArray | Prisma.Sql, ...values: any[]): Prisma.PrismaPromise<number>;

  /**
   * Executes a raw query and returns the number of affected rows.
   * Susceptible to SQL injections, see documentation.
   * @example
   * ```
   * const result = await prisma.$executeRawUnsafe('UPDATE User SET cool = $1 WHERE email = $2 ;', true, 'user@email.com')
   * ```
   *
   * Read more in our [docs](https://www.prisma.io/docs/reference/tools-and-interfaces/prisma-client/raw-database-access).
   */
  $executeRawUnsafe<T = unknown>(query: string, ...values: any[]): Prisma.PrismaPromise<number>;

  /**
   * Performs a prepared raw query and returns the `SELECT` data.
   * @example
   * ```
   * const result = await prisma.$queryRaw`SELECT * FROM User WHERE id = ${1} OR email = ${'user@email.com'};`
   * ```
   *
   * Read more in our [docs](https://www.prisma.io/docs/reference/tools-and-interfaces/prisma-client/raw-database-access).
   */
  $queryRaw<T = unknown>(query: TemplateStringsArray | Prisma.Sql, ...values: any[]): Prisma.PrismaPromise<T>;

  /**
   * Performs a raw query and returns the `SELECT` data.
   * Susceptible to SQL injections, see documentation.
   * @example
   * ```
   * const result = await prisma.$queryRawUnsafe('SELECT * FROM User WHERE id = $1 OR email = $2;', 1, 'user@email.com')
   * ```
   *
   * Read more in our [docs](https://www.prisma.io/docs/reference/tools-and-interfaces/prisma-client/raw-database-access).
   */
  $queryRawUnsafe<T = unknown>(query: string, ...values: any[]): Prisma.PrismaPromise<T>;


  /**
   * Allows the running of a sequence of read/write operations that are guaranteed to either succeed or fail as a whole.
   * @example
   * ```
   * const [george, bob, alice] = await prisma.$transaction([
   *   prisma.user.create({ data: { name: 'George' } }),
   *   prisma.user.create({ data: { name: 'Bob' } }),
   *   prisma.user.create({ data: { name: 'Alice' } }),
   * ])
   * ```
   * 
   * Read more in our [docs](https://www.prisma.io/docs/concepts/components/prisma-client/transactions).
   */
  $transaction<P extends Prisma.PrismaPromise<any>[]>(arg: [...P], options?: { isolationLevel?: Prisma.TransactionIsolationLevel }): $Utils.JsPromise<runtime.Types.Utils.UnwrapTuple<P>>

  $transaction<R>(fn: (prisma: Omit<PrismaClient, runtime.ITXClientDenyList>) => $Utils.JsPromise<R>, options?: { maxWait?: number, timeout?: number, isolationLevel?: Prisma.TransactionIsolationLevel }): $Utils.JsPromise<R>


  $extends: $Extensions.ExtendsHook<"extends", Prisma.TypeMapCb<ClientOptions>, ExtArgs, $Utils.Call<Prisma.TypeMapCb<ClientOptions>, {
    extArgs: ExtArgs
  }>>

      /**
   * `prisma.user`: Exposes CRUD operations for the **User** model.
    * Example usage:
    * ```ts
    * // Fetch zero or more Users
    * const users = await prisma.user.findMany()
    * ```
    */
  get user(): Prisma.UserDelegate<ExtArgs, ClientOptions>;

  /**
   * `prisma.challenge`: Exposes CRUD operations for the **Challenge** model.
    * Example usage:
    * ```ts
    * // Fetch zero or more Challenges
    * const challenges = await prisma.challenge.findMany()
    * ```
    */
  get challenge(): Prisma.ChallengeDelegate<ExtArgs, ClientOptions>;

  /**
   * `prisma.dailyProgress`: Exposes CRUD operations for the **DailyProgress** model.
    * Example usage:
    * ```ts
    * // Fetch zero or more DailyProgresses
    * const dailyProgresses = await prisma.dailyProgress.findMany()
    * ```
    */
  get dailyProgress(): Prisma.DailyProgressDelegate<ExtArgs, ClientOptions>;

  /**
   * `prisma.challengeIdea`: Exposes CRUD operations for the **ChallengeIdea** model.
    * Example usage:
    * ```ts
    * // Fetch zero or more ChallengeIdeas
    * const challengeIdeas = await prisma.challengeIdea.findMany()
    * ```
    */
  get challengeIdea(): Prisma.ChallengeIdeaDelegate<ExtArgs, ClientOptions>;
}

export namespace Prisma {
  export import DMMF = runtime.DMMF

  export type PrismaPromise<T> = $Public.PrismaPromise<T>

  /**
   * Validator
   */
  export import validator = runtime.Public.validator

  /**
   * Prisma Errors
   */
  export import PrismaClientKnownRequestError = runtime.PrismaClientKnownRequestError
  export import PrismaClientUnknownRequestError = runtime.PrismaClientUnknownRequestError
  export import PrismaClientRustPanicError = runtime.PrismaClientRustPanicError
  export import PrismaClientInitializationError = runtime.PrismaClientInitializationError
  export import PrismaClientValidationError = runtime.PrismaClientValidationError

  /**
   * Re-export of sql-template-tag
   */
  export import sql = runtime.sqltag
  export import empty = runtime.empty
  export import join = runtime.join
  export import raw = runtime.raw
  export import Sql = runtime.Sql



  /**
   * Decimal.js
   */
  export import Decimal = runtime.Decimal

  export type DecimalJsLike = runtime.DecimalJsLike

  /**
   * Metrics
   */
  export type Metrics = runtime.Metrics
  export type Metric<T> = runtime.Metric<T>
  export type MetricHistogram = runtime.MetricHistogram
  export type MetricHistogramBucket = runtime.MetricHistogramBucket

  /**
  * Extensions
  */
  export import Extension = $Extensions.UserArgs
  export import getExtensionContext = runtime.Extensions.getExtensionContext
  export import Args = $Public.Args
  export import Payload = $Public.Payload
  export import Result = $Public.Result
  export import Exact = $Public.Exact

  /**
   * Prisma Client JS version: 6.7.0
   * Query Engine version: 3cff47a7f5d65c3ea74883f1d736e41d68ce91ed
   */
  export type PrismaVersion = {
    client: string
  }

  export const prismaVersion: PrismaVersion

  /**
   * Utility Types
   */


  export import JsonObject = runtime.JsonObject
  export import JsonArray = runtime.JsonArray
  export import JsonValue = runtime.JsonValue
  export import InputJsonObject = runtime.InputJsonObject
  export import InputJsonArray = runtime.InputJsonArray
  export import InputJsonValue = runtime.InputJsonValue

  /**
   * Types of the values used to represent different kinds of `null` values when working with JSON fields.
   *
   * @see https://www.prisma.io/docs/concepts/components/prisma-client/working-with-fields/working-with-json-fields#filtering-on-a-json-field
   */
  namespace NullTypes {
    /**
    * Type of `Prisma.DbNull`.
    *
    * You cannot use other instances of this class. Please use the `Prisma.DbNull` value.
    *
    * @see https://www.prisma.io/docs/concepts/components/prisma-client/working-with-fields/working-with-json-fields#filtering-on-a-json-field
    */
    class DbNull {
      private DbNull: never
      private constructor()
    }

    /**
    * Type of `Prisma.JsonNull`.
    *
    * You cannot use other instances of this class. Please use the `Prisma.JsonNull` value.
    *
    * @see https://www.prisma.io/docs/concepts/components/prisma-client/working-with-fields/working-with-json-fields#filtering-on-a-json-field
    */
    class JsonNull {
      private JsonNull: never
      private constructor()
    }

    /**
    * Type of `Prisma.AnyNull`.
    *
    * You cannot use other instances of this class. Please use the `Prisma.AnyNull` value.
    *
    * @see https://www.prisma.io/docs/concepts/components/prisma-client/working-with-fields/working-with-json-fields#filtering-on-a-json-field
    */
    class AnyNull {
      private AnyNull: never
      private constructor()
    }
  }

  /**
   * Helper for filtering JSON entries that have `null` on the database (empty on the db)
   *
   * @see https://www.prisma.io/docs/concepts/components/prisma-client/working-with-fields/working-with-json-fields#filtering-on-a-json-field
   */
  export const DbNull: NullTypes.DbNull

  /**
   * Helper for filtering JSON entries that have JSON `null` values (not empty on the db)
   *
   * @see https://www.prisma.io/docs/concepts/components/prisma-client/working-with-fields/working-with-json-fields#filtering-on-a-json-field
   */
  export const JsonNull: NullTypes.JsonNull

  /**
   * Helper for filtering JSON entries that are `Prisma.DbNull` or `Prisma.JsonNull`
   *
   * @see https://www.prisma.io/docs/concepts/components/prisma-client/working-with-fields/working-with-json-fields#filtering-on-a-json-field
   */
  export const AnyNull: NullTypes.AnyNull

  type SelectAndInclude = {
    select: any
    include: any
  }

  type SelectAndOmit = {
    select: any
    omit: any
  }

  /**
   * Get the type of the value, that the Promise holds.
   */
  export type PromiseType<T extends PromiseLike<any>> = T extends PromiseLike<infer U> ? U : T;

  /**
   * Get the return type of a function which returns a Promise.
   */
  export type PromiseReturnType<T extends (...args: any) => $Utils.JsPromise<any>> = PromiseType<ReturnType<T>>

  /**
   * From T, pick a set of properties whose keys are in the union K
   */
  type Prisma__Pick<T, K extends keyof T> = {
      [P in K]: T[P];
  };


  export type Enumerable<T> = T | Array<T>;

  export type RequiredKeys<T> = {
    [K in keyof T]-?: {} extends Prisma__Pick<T, K> ? never : K
  }[keyof T]

  export type TruthyKeys<T> = keyof {
    [K in keyof T as T[K] extends false | undefined | null ? never : K]: K
  }

  export type TrueKeys<T> = TruthyKeys<Prisma__Pick<T, RequiredKeys<T>>>

  /**
   * Subset
   * @desc From `T` pick properties that exist in `U`. Simple version of Intersection
   */
  export type Subset<T, U> = {
    [key in keyof T]: key extends keyof U ? T[key] : never;
  };

  /**
   * SelectSubset
   * @desc From `T` pick properties that exist in `U`. Simple version of Intersection.
   * Additionally, it validates, if both select and include are present. If the case, it errors.
   */
  export type SelectSubset<T, U> = {
    [key in keyof T]: key extends keyof U ? T[key] : never
  } &
    (T extends SelectAndInclude
      ? 'Please either choose `select` or `include`.'
      : T extends SelectAndOmit
        ? 'Please either choose `select` or `omit`.'
        : {})

  /**
   * Subset + Intersection
   * @desc From `T` pick properties that exist in `U` and intersect `K`
   */
  export type SubsetIntersection<T, U, K> = {
    [key in keyof T]: key extends keyof U ? T[key] : never
  } &
    K

  type Without<T, U> = { [P in Exclude<keyof T, keyof U>]?: never };

  /**
   * XOR is needed to have a real mutually exclusive union type
   * https://stackoverflow.com/questions/42123407/does-typescript-support-mutually-exclusive-types
   */
  type XOR<T, U> =
    T extends object ?
    U extends object ?
      (Without<T, U> & U) | (Without<U, T> & T)
    : U : T


  /**
   * Is T a Record?
   */
  type IsObject<T extends any> = T extends Array<any>
  ? False
  : T extends Date
  ? False
  : T extends Uint8Array
  ? False
  : T extends BigInt
  ? False
  : T extends object
  ? True
  : False


  /**
   * If it's T[], return T
   */
  export type UnEnumerate<T extends unknown> = T extends Array<infer U> ? U : T

  /**
   * From ts-toolbelt
   */

  type __Either<O extends object, K extends Key> = Omit<O, K> &
    {
      // Merge all but K
      [P in K]: Prisma__Pick<O, P & keyof O> // With K possibilities
    }[K]

  type EitherStrict<O extends object, K extends Key> = Strict<__Either<O, K>>

  type EitherLoose<O extends object, K extends Key> = ComputeRaw<__Either<O, K>>

  type _Either<
    O extends object,
    K extends Key,
    strict extends Boolean
  > = {
    1: EitherStrict<O, K>
    0: EitherLoose<O, K>
  }[strict]

  type Either<
    O extends object,
    K extends Key,
    strict extends Boolean = 1
  > = O extends unknown ? _Either<O, K, strict> : never

  export type Union = any

  type PatchUndefined<O extends object, O1 extends object> = {
    [K in keyof O]: O[K] extends undefined ? At<O1, K> : O[K]
  } & {}

  /** Helper Types for "Merge" **/
  export type IntersectOf<U extends Union> = (
    U extends unknown ? (k: U) => void : never
  ) extends (k: infer I) => void
    ? I
    : never

  export type Overwrite<O extends object, O1 extends object> = {
      [K in keyof O]: K extends keyof O1 ? O1[K] : O[K];
  } & {};

  type _Merge<U extends object> = IntersectOf<Overwrite<U, {
      [K in keyof U]-?: At<U, K>;
  }>>;

  type Key = string | number | symbol;
  type AtBasic<O extends object, K extends Key> = K extends keyof O ? O[K] : never;
  type AtStrict<O extends object, K extends Key> = O[K & keyof O];
  type AtLoose<O extends object, K extends Key> = O extends unknown ? AtStrict<O, K> : never;
  export type At<O extends object, K extends Key, strict extends Boolean = 1> = {
      1: AtStrict<O, K>;
      0: AtLoose<O, K>;
  }[strict];

  export type ComputeRaw<A extends any> = A extends Function ? A : {
    [K in keyof A]: A[K];
  } & {};

  export type OptionalFlat<O> = {
    [K in keyof O]?: O[K];
  } & {};

  type _Record<K extends keyof any, T> = {
    [P in K]: T;
  };

  // cause typescript not to expand types and preserve names
  type NoExpand<T> = T extends unknown ? T : never;

  // this type assumes the passed object is entirely optional
  type AtLeast<O extends object, K extends string> = NoExpand<
    O extends unknown
    ? | (K extends keyof O ? { [P in K]: O[P] } & O : O)
      | {[P in keyof O as P extends K ? P : never]-?: O[P]} & O
    : never>;

  type _Strict<U, _U = U> = U extends unknown ? U & OptionalFlat<_Record<Exclude<Keys<_U>, keyof U>, never>> : never;

  export type Strict<U extends object> = ComputeRaw<_Strict<U>>;
  /** End Helper Types for "Merge" **/

  export type Merge<U extends object> = ComputeRaw<_Merge<Strict<U>>>;

  /**
  A [[Boolean]]
  */
  export type Boolean = True | False

  // /**
  // 1
  // */
  export type True = 1

  /**
  0
  */
  export type False = 0

  export type Not<B extends Boolean> = {
    0: 1
    1: 0
  }[B]

  export type Extends<A1 extends any, A2 extends any> = [A1] extends [never]
    ? 0 // anything `never` is false
    : A1 extends A2
    ? 1
    : 0

  export type Has<U extends Union, U1 extends Union> = Not<
    Extends<Exclude<U1, U>, U1>
  >

  export type Or<B1 extends Boolean, B2 extends Boolean> = {
    0: {
      0: 0
      1: 1
    }
    1: {
      0: 1
      1: 1
    }
  }[B1][B2]

  export type Keys<U extends Union> = U extends unknown ? keyof U : never

  type Cast<A, B> = A extends B ? A : B;

  export const type: unique symbol;



  /**
   * Used by group by
   */

  export type GetScalarType<T, O> = O extends object ? {
    [P in keyof T]: P extends keyof O
      ? O[P]
      : never
  } : never

  type FieldPaths<
    T,
    U = Omit<T, '_avg' | '_sum' | '_count' | '_min' | '_max'>
  > = IsObject<T> extends True ? U : T

  type GetHavingFields<T> = {
    [K in keyof T]: Or<
      Or<Extends<'OR', K>, Extends<'AND', K>>,
      Extends<'NOT', K>
    > extends True
      ? // infer is only needed to not hit TS limit
        // based on the brilliant idea of Pierre-Antoine Mills
        // https://github.com/microsoft/TypeScript/issues/30188#issuecomment-478938437
        T[K] extends infer TK
        ? GetHavingFields<UnEnumerate<TK> extends object ? Merge<UnEnumerate<TK>> : never>
        : never
      : {} extends FieldPaths<T[K]>
      ? never
      : K
  }[keyof T]

  /**
   * Convert tuple to union
   */
  type _TupleToUnion<T> = T extends (infer E)[] ? E : never
  type TupleToUnion<K extends readonly any[]> = _TupleToUnion<K>
  type MaybeTupleToUnion<T> = T extends any[] ? TupleToUnion<T> : T

  /**
   * Like `Pick`, but additionally can also accept an array of keys
   */
  type PickEnumerable<T, K extends Enumerable<keyof T> | keyof T> = Prisma__Pick<T, MaybeTupleToUnion<K>>

  /**
   * Exclude all keys with underscores
   */
  type ExcludeUnderscoreKeys<T extends string> = T extends `_${string}` ? never : T


  export type FieldRef<Model, FieldType> = runtime.FieldRef<Model, FieldType>

  type FieldRefInputType<Model, FieldType> = Model extends never ? never : FieldRef<Model, FieldType>


  export const ModelName: {
    User: 'User',
    Challenge: 'Challenge',
    DailyProgress: 'DailyProgress',
    ChallengeIdea: 'ChallengeIdea'
  };

  export type ModelName = (typeof ModelName)[keyof typeof ModelName]


  export type Datasources = {
    db?: Datasource
  }

  interface TypeMapCb<ClientOptions = {}> extends $Utils.Fn<{extArgs: $Extensions.InternalArgs }, $Utils.Record<string, any>> {
    returns: Prisma.TypeMap<this['params']['extArgs'], ClientOptions extends { omit: infer OmitOptions } ? OmitOptions : {}>
  }

  export type TypeMap<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> = {
    globalOmitOptions: {
      omit: GlobalOmitOptions
    }
    meta: {
      modelProps: "user" | "challenge" | "dailyProgress" | "challengeIdea"
      txIsolationLevel: Prisma.TransactionIsolationLevel
    }
    model: {
      User: {
        payload: Prisma.$UserPayload<ExtArgs>
        fields: Prisma.UserFieldRefs
        operations: {
          findUnique: {
            args: Prisma.UserFindUniqueArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$UserPayload> | null
          }
          findUniqueOrThrow: {
            args: Prisma.UserFindUniqueOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$UserPayload>
          }
          findFirst: {
            args: Prisma.UserFindFirstArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$UserPayload> | null
          }
          findFirstOrThrow: {
            args: Prisma.UserFindFirstOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$UserPayload>
          }
          findMany: {
            args: Prisma.UserFindManyArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$UserPayload>[]
          }
          create: {
            args: Prisma.UserCreateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$UserPayload>
          }
          createMany: {
            args: Prisma.UserCreateManyArgs<ExtArgs>
            result: BatchPayload
          }
          createManyAndReturn: {
            args: Prisma.UserCreateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$UserPayload>[]
          }
          delete: {
            args: Prisma.UserDeleteArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$UserPayload>
          }
          update: {
            args: Prisma.UserUpdateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$UserPayload>
          }
          deleteMany: {
            args: Prisma.UserDeleteManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateMany: {
            args: Prisma.UserUpdateManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateManyAndReturn: {
            args: Prisma.UserUpdateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$UserPayload>[]
          }
          upsert: {
            args: Prisma.UserUpsertArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$UserPayload>
          }
          aggregate: {
            args: Prisma.UserAggregateArgs<ExtArgs>
            result: $Utils.Optional<AggregateUser>
          }
          groupBy: {
            args: Prisma.UserGroupByArgs<ExtArgs>
            result: $Utils.Optional<UserGroupByOutputType>[]
          }
          count: {
            args: Prisma.UserCountArgs<ExtArgs>
            result: $Utils.Optional<UserCountAggregateOutputType> | number
          }
        }
      }
      Challenge: {
        payload: Prisma.$ChallengePayload<ExtArgs>
        fields: Prisma.ChallengeFieldRefs
        operations: {
          findUnique: {
            args: Prisma.ChallengeFindUniqueArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ChallengePayload> | null
          }
          findUniqueOrThrow: {
            args: Prisma.ChallengeFindUniqueOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ChallengePayload>
          }
          findFirst: {
            args: Prisma.ChallengeFindFirstArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ChallengePayload> | null
          }
          findFirstOrThrow: {
            args: Prisma.ChallengeFindFirstOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ChallengePayload>
          }
          findMany: {
            args: Prisma.ChallengeFindManyArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ChallengePayload>[]
          }
          create: {
            args: Prisma.ChallengeCreateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ChallengePayload>
          }
          createMany: {
            args: Prisma.ChallengeCreateManyArgs<ExtArgs>
            result: BatchPayload
          }
          createManyAndReturn: {
            args: Prisma.ChallengeCreateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ChallengePayload>[]
          }
          delete: {
            args: Prisma.ChallengeDeleteArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ChallengePayload>
          }
          update: {
            args: Prisma.ChallengeUpdateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ChallengePayload>
          }
          deleteMany: {
            args: Prisma.ChallengeDeleteManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateMany: {
            args: Prisma.ChallengeUpdateManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateManyAndReturn: {
            args: Prisma.ChallengeUpdateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ChallengePayload>[]
          }
          upsert: {
            args: Prisma.ChallengeUpsertArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ChallengePayload>
          }
          aggregate: {
            args: Prisma.ChallengeAggregateArgs<ExtArgs>
            result: $Utils.Optional<AggregateChallenge>
          }
          groupBy: {
            args: Prisma.ChallengeGroupByArgs<ExtArgs>
            result: $Utils.Optional<ChallengeGroupByOutputType>[]
          }
          count: {
            args: Prisma.ChallengeCountArgs<ExtArgs>
            result: $Utils.Optional<ChallengeCountAggregateOutputType> | number
          }
        }
      }
      DailyProgress: {
        payload: Prisma.$DailyProgressPayload<ExtArgs>
        fields: Prisma.DailyProgressFieldRefs
        operations: {
          findUnique: {
            args: Prisma.DailyProgressFindUniqueArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$DailyProgressPayload> | null
          }
          findUniqueOrThrow: {
            args: Prisma.DailyProgressFindUniqueOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$DailyProgressPayload>
          }
          findFirst: {
            args: Prisma.DailyProgressFindFirstArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$DailyProgressPayload> | null
          }
          findFirstOrThrow: {
            args: Prisma.DailyProgressFindFirstOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$DailyProgressPayload>
          }
          findMany: {
            args: Prisma.DailyProgressFindManyArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$DailyProgressPayload>[]
          }
          create: {
            args: Prisma.DailyProgressCreateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$DailyProgressPayload>
          }
          createMany: {
            args: Prisma.DailyProgressCreateManyArgs<ExtArgs>
            result: BatchPayload
          }
          createManyAndReturn: {
            args: Prisma.DailyProgressCreateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$DailyProgressPayload>[]
          }
          delete: {
            args: Prisma.DailyProgressDeleteArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$DailyProgressPayload>
          }
          update: {
            args: Prisma.DailyProgressUpdateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$DailyProgressPayload>
          }
          deleteMany: {
            args: Prisma.DailyProgressDeleteManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateMany: {
            args: Prisma.DailyProgressUpdateManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateManyAndReturn: {
            args: Prisma.DailyProgressUpdateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$DailyProgressPayload>[]
          }
          upsert: {
            args: Prisma.DailyProgressUpsertArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$DailyProgressPayload>
          }
          aggregate: {
            args: Prisma.DailyProgressAggregateArgs<ExtArgs>
            result: $Utils.Optional<AggregateDailyProgress>
          }
          groupBy: {
            args: Prisma.DailyProgressGroupByArgs<ExtArgs>
            result: $Utils.Optional<DailyProgressGroupByOutputType>[]
          }
          count: {
            args: Prisma.DailyProgressCountArgs<ExtArgs>
            result: $Utils.Optional<DailyProgressCountAggregateOutputType> | number
          }
        }
      }
      ChallengeIdea: {
        payload: Prisma.$ChallengeIdeaPayload<ExtArgs>
        fields: Prisma.ChallengeIdeaFieldRefs
        operations: {
          findUnique: {
            args: Prisma.ChallengeIdeaFindUniqueArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ChallengeIdeaPayload> | null
          }
          findUniqueOrThrow: {
            args: Prisma.ChallengeIdeaFindUniqueOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ChallengeIdeaPayload>
          }
          findFirst: {
            args: Prisma.ChallengeIdeaFindFirstArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ChallengeIdeaPayload> | null
          }
          findFirstOrThrow: {
            args: Prisma.ChallengeIdeaFindFirstOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ChallengeIdeaPayload>
          }
          findMany: {
            args: Prisma.ChallengeIdeaFindManyArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ChallengeIdeaPayload>[]
          }
          create: {
            args: Prisma.ChallengeIdeaCreateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ChallengeIdeaPayload>
          }
          createMany: {
            args: Prisma.ChallengeIdeaCreateManyArgs<ExtArgs>
            result: BatchPayload
          }
          createManyAndReturn: {
            args: Prisma.ChallengeIdeaCreateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ChallengeIdeaPayload>[]
          }
          delete: {
            args: Prisma.ChallengeIdeaDeleteArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ChallengeIdeaPayload>
          }
          update: {
            args: Prisma.ChallengeIdeaUpdateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ChallengeIdeaPayload>
          }
          deleteMany: {
            args: Prisma.ChallengeIdeaDeleteManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateMany: {
            args: Prisma.ChallengeIdeaUpdateManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateManyAndReturn: {
            args: Prisma.ChallengeIdeaUpdateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ChallengeIdeaPayload>[]
          }
          upsert: {
            args: Prisma.ChallengeIdeaUpsertArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ChallengeIdeaPayload>
          }
          aggregate: {
            args: Prisma.ChallengeIdeaAggregateArgs<ExtArgs>
            result: $Utils.Optional<AggregateChallengeIdea>
          }
          groupBy: {
            args: Prisma.ChallengeIdeaGroupByArgs<ExtArgs>
            result: $Utils.Optional<ChallengeIdeaGroupByOutputType>[]
          }
          count: {
            args: Prisma.ChallengeIdeaCountArgs<ExtArgs>
            result: $Utils.Optional<ChallengeIdeaCountAggregateOutputType> | number
          }
        }
      }
    }
  } & {
    other: {
      payload: any
      operations: {
        $executeRaw: {
          args: [query: TemplateStringsArray | Prisma.Sql, ...values: any[]],
          result: any
        }
        $executeRawUnsafe: {
          args: [query: string, ...values: any[]],
          result: any
        }
        $queryRaw: {
          args: [query: TemplateStringsArray | Prisma.Sql, ...values: any[]],
          result: any
        }
        $queryRawUnsafe: {
          args: [query: string, ...values: any[]],
          result: any
        }
      }
    }
  }
  export const defineExtension: $Extensions.ExtendsHook<"define", Prisma.TypeMapCb, $Extensions.DefaultArgs>
  export type DefaultPrismaClient = PrismaClient
  export type ErrorFormat = 'pretty' | 'colorless' | 'minimal'
  export interface PrismaClientOptions {
    /**
     * Overwrites the datasource url from your schema.prisma file
     */
    datasources?: Datasources
    /**
     * Overwrites the datasource url from your schema.prisma file
     */
    datasourceUrl?: string
    /**
     * @default "colorless"
     */
    errorFormat?: ErrorFormat
    /**
     * @example
     * ```
     * // Defaults to stdout
     * log: ['query', 'info', 'warn', 'error']
     * 
     * // Emit as events
     * log: [
     *   { emit: 'stdout', level: 'query' },
     *   { emit: 'stdout', level: 'info' },
     *   { emit: 'stdout', level: 'warn' }
     *   { emit: 'stdout', level: 'error' }
     * ]
     * ```
     * Read more in our [docs](https://www.prisma.io/docs/reference/tools-and-interfaces/prisma-client/logging#the-log-option).
     */
    log?: (LogLevel | LogDefinition)[]
    /**
     * The default values for transactionOptions
     * maxWait ?= 2000
     * timeout ?= 5000
     */
    transactionOptions?: {
      maxWait?: number
      timeout?: number
      isolationLevel?: Prisma.TransactionIsolationLevel
    }
    /**
     * Global configuration for omitting model fields by default.
     * 
     * @example
     * ```
     * const prisma = new PrismaClient({
     *   omit: {
     *     user: {
     *       password: true
     *     }
     *   }
     * })
     * ```
     */
    omit?: Prisma.GlobalOmitConfig
  }
  export type GlobalOmitConfig = {
    user?: UserOmit
    challenge?: ChallengeOmit
    dailyProgress?: DailyProgressOmit
    challengeIdea?: ChallengeIdeaOmit
  }

  /* Types for Logging */
  export type LogLevel = 'info' | 'query' | 'warn' | 'error'
  export type LogDefinition = {
    level: LogLevel
    emit: 'stdout' | 'event'
  }

  export type GetLogType<T extends LogLevel | LogDefinition> = T extends LogDefinition ? T['emit'] extends 'event' ? T['level'] : never : never
  export type GetEvents<T extends any> = T extends Array<LogLevel | LogDefinition> ?
    GetLogType<T[0]> | GetLogType<T[1]> | GetLogType<T[2]> | GetLogType<T[3]>
    : never

  export type QueryEvent = {
    timestamp: Date
    query: string
    params: string
    duration: number
    target: string
  }

  export type LogEvent = {
    timestamp: Date
    message: string
    target: string
  }
  /* End Types for Logging */


  export type PrismaAction =
    | 'findUnique'
    | 'findUniqueOrThrow'
    | 'findMany'
    | 'findFirst'
    | 'findFirstOrThrow'
    | 'create'
    | 'createMany'
    | 'createManyAndReturn'
    | 'update'
    | 'updateMany'
    | 'updateManyAndReturn'
    | 'upsert'
    | 'delete'
    | 'deleteMany'
    | 'executeRaw'
    | 'queryRaw'
    | 'aggregate'
    | 'count'
    | 'runCommandRaw'
    | 'findRaw'
    | 'groupBy'

  /**
   * These options are being passed into the middleware as "params"
   */
  export type MiddlewareParams = {
    model?: ModelName
    action: PrismaAction
    args: any
    dataPath: string[]
    runInTransaction: boolean
  }

  /**
   * The `T` type makes sure, that the `return proceed` is not forgotten in the middleware implementation
   */
  export type Middleware<T = any> = (
    params: MiddlewareParams,
    next: (params: MiddlewareParams) => $Utils.JsPromise<T>,
  ) => $Utils.JsPromise<T>

  // tested in getLogLevel.test.ts
  export function getLogLevel(log: Array<LogLevel | LogDefinition>): LogLevel | undefined;

  /**
   * `PrismaClient` proxy available in interactive transactions.
   */
  export type TransactionClient = Omit<Prisma.DefaultPrismaClient, runtime.ITXClientDenyList>

  export type Datasource = {
    url?: string
  }

  /**
   * Count Types
   */


  /**
   * Count Type UserCountOutputType
   */

  export type UserCountOutputType = {
    challenges: number
    DailyProgress: number
  }

  export type UserCountOutputTypeSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    challenges?: boolean | UserCountOutputTypeCountChallengesArgs
    DailyProgress?: boolean | UserCountOutputTypeCountDailyProgressArgs
  }

  // Custom InputTypes
  /**
   * UserCountOutputType without action
   */
  export type UserCountOutputTypeDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the UserCountOutputType
     */
    select?: UserCountOutputTypeSelect<ExtArgs> | null
  }

  /**
   * UserCountOutputType without action
   */
  export type UserCountOutputTypeCountChallengesArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: ChallengeWhereInput
  }

  /**
   * UserCountOutputType without action
   */
  export type UserCountOutputTypeCountDailyProgressArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: DailyProgressWhereInput
  }


  /**
   * Count Type ChallengeCountOutputType
   */

  export type ChallengeCountOutputType = {
    dailyProgress: number
  }

  export type ChallengeCountOutputTypeSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    dailyProgress?: boolean | ChallengeCountOutputTypeCountDailyProgressArgs
  }

  // Custom InputTypes
  /**
   * ChallengeCountOutputType without action
   */
  export type ChallengeCountOutputTypeDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the ChallengeCountOutputType
     */
    select?: ChallengeCountOutputTypeSelect<ExtArgs> | null
  }

  /**
   * ChallengeCountOutputType without action
   */
  export type ChallengeCountOutputTypeCountDailyProgressArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: DailyProgressWhereInput
  }


  /**
   * Models
   */

  /**
   * Model User
   */

  export type AggregateUser = {
    _count: UserCountAggregateOutputType | null
    _min: UserMinAggregateOutputType | null
    _max: UserMaxAggregateOutputType | null
  }

  export type UserMinAggregateOutputType = {
    id: string | null
    email: string | null
    username: string | null
    imageUrl: string | null
    clerkId: string | null
    createdAt: Date | null
    updatedAt: Date | null
  }

  export type UserMaxAggregateOutputType = {
    id: string | null
    email: string | null
    username: string | null
    imageUrl: string | null
    clerkId: string | null
    createdAt: Date | null
    updatedAt: Date | null
  }

  export type UserCountAggregateOutputType = {
    id: number
    email: number
    username: number
    imageUrl: number
    clerkId: number
    createdAt: number
    updatedAt: number
    _all: number
  }


  export type UserMinAggregateInputType = {
    id?: true
    email?: true
    username?: true
    imageUrl?: true
    clerkId?: true
    createdAt?: true
    updatedAt?: true
  }

  export type UserMaxAggregateInputType = {
    id?: true
    email?: true
    username?: true
    imageUrl?: true
    clerkId?: true
    createdAt?: true
    updatedAt?: true
  }

  export type UserCountAggregateInputType = {
    id?: true
    email?: true
    username?: true
    imageUrl?: true
    clerkId?: true
    createdAt?: true
    updatedAt?: true
    _all?: true
  }

  export type UserAggregateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which User to aggregate.
     */
    where?: UserWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Users to fetch.
     */
    orderBy?: UserOrderByWithRelationInput | UserOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the start position
     */
    cursor?: UserWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Users from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Users.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Count returned Users
    **/
    _count?: true | UserCountAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the minimum value
    **/
    _min?: UserMinAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the maximum value
    **/
    _max?: UserMaxAggregateInputType
  }

  export type GetUserAggregateType<T extends UserAggregateArgs> = {
        [P in keyof T & keyof AggregateUser]: P extends '_count' | 'count'
      ? T[P] extends true
        ? number
        : GetScalarType<T[P], AggregateUser[P]>
      : GetScalarType<T[P], AggregateUser[P]>
  }




  export type UserGroupByArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: UserWhereInput
    orderBy?: UserOrderByWithAggregationInput | UserOrderByWithAggregationInput[]
    by: UserScalarFieldEnum[] | UserScalarFieldEnum
    having?: UserScalarWhereWithAggregatesInput
    take?: number
    skip?: number
    _count?: UserCountAggregateInputType | true
    _min?: UserMinAggregateInputType
    _max?: UserMaxAggregateInputType
  }

  export type UserGroupByOutputType = {
    id: string
    email: string
    username: string
    imageUrl: string
    clerkId: string
    createdAt: Date
    updatedAt: Date
    _count: UserCountAggregateOutputType | null
    _min: UserMinAggregateOutputType | null
    _max: UserMaxAggregateOutputType | null
  }

  type GetUserGroupByPayload<T extends UserGroupByArgs> = Prisma.PrismaPromise<
    Array<
      PickEnumerable<UserGroupByOutputType, T['by']> &
        {
          [P in ((keyof T) & (keyof UserGroupByOutputType))]: P extends '_count'
            ? T[P] extends boolean
              ? number
              : GetScalarType<T[P], UserGroupByOutputType[P]>
            : GetScalarType<T[P], UserGroupByOutputType[P]>
        }
      >
    >


  export type UserSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    email?: boolean
    username?: boolean
    imageUrl?: boolean
    clerkId?: boolean
    createdAt?: boolean
    updatedAt?: boolean
    challenges?: boolean | User$challengesArgs<ExtArgs>
    DailyProgress?: boolean | User$DailyProgressArgs<ExtArgs>
    _count?: boolean | UserCountOutputTypeDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["user"]>

  export type UserSelectCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    email?: boolean
    username?: boolean
    imageUrl?: boolean
    clerkId?: boolean
    createdAt?: boolean
    updatedAt?: boolean
  }, ExtArgs["result"]["user"]>

  export type UserSelectUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    email?: boolean
    username?: boolean
    imageUrl?: boolean
    clerkId?: boolean
    createdAt?: boolean
    updatedAt?: boolean
  }, ExtArgs["result"]["user"]>

  export type UserSelectScalar = {
    id?: boolean
    email?: boolean
    username?: boolean
    imageUrl?: boolean
    clerkId?: boolean
    createdAt?: boolean
    updatedAt?: boolean
  }

  export type UserOmit<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetOmit<"id" | "email" | "username" | "imageUrl" | "clerkId" | "createdAt" | "updatedAt", ExtArgs["result"]["user"]>
  export type UserInclude<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    challenges?: boolean | User$challengesArgs<ExtArgs>
    DailyProgress?: boolean | User$DailyProgressArgs<ExtArgs>
    _count?: boolean | UserCountOutputTypeDefaultArgs<ExtArgs>
  }
  export type UserIncludeCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {}
  export type UserIncludeUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {}

  export type $UserPayload<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    name: "User"
    objects: {
      challenges: Prisma.$ChallengePayload<ExtArgs>[]
      DailyProgress: Prisma.$DailyProgressPayload<ExtArgs>[]
    }
    scalars: $Extensions.GetPayloadResult<{
      id: string
      email: string
      username: string
      imageUrl: string
      clerkId: string
      createdAt: Date
      updatedAt: Date
    }, ExtArgs["result"]["user"]>
    composites: {}
  }

  type UserGetPayload<S extends boolean | null | undefined | UserDefaultArgs> = $Result.GetResult<Prisma.$UserPayload, S>

  type UserCountArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> =
    Omit<UserFindManyArgs, 'select' | 'include' | 'distinct' | 'omit'> & {
      select?: UserCountAggregateInputType | true
    }

  export interface UserDelegate<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> {
    [K: symbol]: { types: Prisma.TypeMap<ExtArgs>['model']['User'], meta: { name: 'User' } }
    /**
     * Find zero or one User that matches the filter.
     * @param {UserFindUniqueArgs} args - Arguments to find a User
     * @example
     * // Get one User
     * const user = await prisma.user.findUnique({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUnique<T extends UserFindUniqueArgs>(args: SelectSubset<T, UserFindUniqueArgs<ExtArgs>>): Prisma__UserClient<$Result.GetResult<Prisma.$UserPayload<ExtArgs>, T, "findUnique", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find one User that matches the filter or throw an error with `error.code='P2025'`
     * if no matches were found.
     * @param {UserFindUniqueOrThrowArgs} args - Arguments to find a User
     * @example
     * // Get one User
     * const user = await prisma.user.findUniqueOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUniqueOrThrow<T extends UserFindUniqueOrThrowArgs>(args: SelectSubset<T, UserFindUniqueOrThrowArgs<ExtArgs>>): Prisma__UserClient<$Result.GetResult<Prisma.$UserPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first User that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {UserFindFirstArgs} args - Arguments to find a User
     * @example
     * // Get one User
     * const user = await prisma.user.findFirst({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirst<T extends UserFindFirstArgs>(args?: SelectSubset<T, UserFindFirstArgs<ExtArgs>>): Prisma__UserClient<$Result.GetResult<Prisma.$UserPayload<ExtArgs>, T, "findFirst", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first User that matches the filter or
     * throw `PrismaKnownClientError` with `P2025` code if no matches were found.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {UserFindFirstOrThrowArgs} args - Arguments to find a User
     * @example
     * // Get one User
     * const user = await prisma.user.findFirstOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirstOrThrow<T extends UserFindFirstOrThrowArgs>(args?: SelectSubset<T, UserFindFirstOrThrowArgs<ExtArgs>>): Prisma__UserClient<$Result.GetResult<Prisma.$UserPayload<ExtArgs>, T, "findFirstOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find zero or more Users that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {UserFindManyArgs} args - Arguments to filter and select certain fields only.
     * @example
     * // Get all Users
     * const users = await prisma.user.findMany()
     * 
     * // Get first 10 Users
     * const users = await prisma.user.findMany({ take: 10 })
     * 
     * // Only select the `id`
     * const userWithIdOnly = await prisma.user.findMany({ select: { id: true } })
     * 
     */
    findMany<T extends UserFindManyArgs>(args?: SelectSubset<T, UserFindManyArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$UserPayload<ExtArgs>, T, "findMany", GlobalOmitOptions>>

    /**
     * Create a User.
     * @param {UserCreateArgs} args - Arguments to create a User.
     * @example
     * // Create one User
     * const User = await prisma.user.create({
     *   data: {
     *     // ... data to create a User
     *   }
     * })
     * 
     */
    create<T extends UserCreateArgs>(args: SelectSubset<T, UserCreateArgs<ExtArgs>>): Prisma__UserClient<$Result.GetResult<Prisma.$UserPayload<ExtArgs>, T, "create", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Create many Users.
     * @param {UserCreateManyArgs} args - Arguments to create many Users.
     * @example
     * // Create many Users
     * const user = await prisma.user.createMany({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     *     
     */
    createMany<T extends UserCreateManyArgs>(args?: SelectSubset<T, UserCreateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Create many Users and returns the data saved in the database.
     * @param {UserCreateManyAndReturnArgs} args - Arguments to create many Users.
     * @example
     * // Create many Users
     * const user = await prisma.user.createManyAndReturn({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Create many Users and only return the `id`
     * const userWithIdOnly = await prisma.user.createManyAndReturn({
     *   select: { id: true },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    createManyAndReturn<T extends UserCreateManyAndReturnArgs>(args?: SelectSubset<T, UserCreateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$UserPayload<ExtArgs>, T, "createManyAndReturn", GlobalOmitOptions>>

    /**
     * Delete a User.
     * @param {UserDeleteArgs} args - Arguments to delete one User.
     * @example
     * // Delete one User
     * const User = await prisma.user.delete({
     *   where: {
     *     // ... filter to delete one User
     *   }
     * })
     * 
     */
    delete<T extends UserDeleteArgs>(args: SelectSubset<T, UserDeleteArgs<ExtArgs>>): Prisma__UserClient<$Result.GetResult<Prisma.$UserPayload<ExtArgs>, T, "delete", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Update one User.
     * @param {UserUpdateArgs} args - Arguments to update one User.
     * @example
     * // Update one User
     * const user = await prisma.user.update({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    update<T extends UserUpdateArgs>(args: SelectSubset<T, UserUpdateArgs<ExtArgs>>): Prisma__UserClient<$Result.GetResult<Prisma.$UserPayload<ExtArgs>, T, "update", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Delete zero or more Users.
     * @param {UserDeleteManyArgs} args - Arguments to filter Users to delete.
     * @example
     * // Delete a few Users
     * const { count } = await prisma.user.deleteMany({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     * 
     */
    deleteMany<T extends UserDeleteManyArgs>(args?: SelectSubset<T, UserDeleteManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more Users.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {UserUpdateManyArgs} args - Arguments to update one or more rows.
     * @example
     * // Update many Users
     * const user = await prisma.user.updateMany({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    updateMany<T extends UserUpdateManyArgs>(args: SelectSubset<T, UserUpdateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more Users and returns the data updated in the database.
     * @param {UserUpdateManyAndReturnArgs} args - Arguments to update many Users.
     * @example
     * // Update many Users
     * const user = await prisma.user.updateManyAndReturn({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Update zero or more Users and only return the `id`
     * const userWithIdOnly = await prisma.user.updateManyAndReturn({
     *   select: { id: true },
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    updateManyAndReturn<T extends UserUpdateManyAndReturnArgs>(args: SelectSubset<T, UserUpdateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$UserPayload<ExtArgs>, T, "updateManyAndReturn", GlobalOmitOptions>>

    /**
     * Create or update one User.
     * @param {UserUpsertArgs} args - Arguments to update or create a User.
     * @example
     * // Update or create a User
     * const user = await prisma.user.upsert({
     *   create: {
     *     // ... data to create a User
     *   },
     *   update: {
     *     // ... in case it already exists, update
     *   },
     *   where: {
     *     // ... the filter for the User we want to update
     *   }
     * })
     */
    upsert<T extends UserUpsertArgs>(args: SelectSubset<T, UserUpsertArgs<ExtArgs>>): Prisma__UserClient<$Result.GetResult<Prisma.$UserPayload<ExtArgs>, T, "upsert", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>


    /**
     * Count the number of Users.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {UserCountArgs} args - Arguments to filter Users to count.
     * @example
     * // Count the number of Users
     * const count = await prisma.user.count({
     *   where: {
     *     // ... the filter for the Users we want to count
     *   }
     * })
    **/
    count<T extends UserCountArgs>(
      args?: Subset<T, UserCountArgs>,
    ): Prisma.PrismaPromise<
      T extends $Utils.Record<'select', any>
        ? T['select'] extends true
          ? number
          : GetScalarType<T['select'], UserCountAggregateOutputType>
        : number
    >

    /**
     * Allows you to perform aggregations operations on a User.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {UserAggregateArgs} args - Select which aggregations you would like to apply and on what fields.
     * @example
     * // Ordered by age ascending
     * // Where email contains prisma.io
     * // Limited to the 10 users
     * const aggregations = await prisma.user.aggregate({
     *   _avg: {
     *     age: true,
     *   },
     *   where: {
     *     email: {
     *       contains: "prisma.io",
     *     },
     *   },
     *   orderBy: {
     *     age: "asc",
     *   },
     *   take: 10,
     * })
    **/
    aggregate<T extends UserAggregateArgs>(args: Subset<T, UserAggregateArgs>): Prisma.PrismaPromise<GetUserAggregateType<T>>

    /**
     * Group by User.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {UserGroupByArgs} args - Group by arguments.
     * @example
     * // Group by city, order by createdAt, get count
     * const result = await prisma.user.groupBy({
     *   by: ['city', 'createdAt'],
     *   orderBy: {
     *     createdAt: true
     *   },
     *   _count: {
     *     _all: true
     *   },
     * })
     * 
    **/
    groupBy<
      T extends UserGroupByArgs,
      HasSelectOrTake extends Or<
        Extends<'skip', Keys<T>>,
        Extends<'take', Keys<T>>
      >,
      OrderByArg extends True extends HasSelectOrTake
        ? { orderBy: UserGroupByArgs['orderBy'] }
        : { orderBy?: UserGroupByArgs['orderBy'] },
      OrderFields extends ExcludeUnderscoreKeys<Keys<MaybeTupleToUnion<T['orderBy']>>>,
      ByFields extends MaybeTupleToUnion<T['by']>,
      ByValid extends Has<ByFields, OrderFields>,
      HavingFields extends GetHavingFields<T['having']>,
      HavingValid extends Has<ByFields, HavingFields>,
      ByEmpty extends T['by'] extends never[] ? True : False,
      InputErrors extends ByEmpty extends True
      ? `Error: "by" must not be empty.`
      : HavingValid extends False
      ? {
          [P in HavingFields]: P extends ByFields
            ? never
            : P extends string
            ? `Error: Field "${P}" used in "having" needs to be provided in "by".`
            : [
                Error,
                'Field ',
                P,
                ` in "having" needs to be provided in "by"`,
              ]
        }[HavingFields]
      : 'take' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "take", you also need to provide "orderBy"'
      : 'skip' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "skip", you also need to provide "orderBy"'
      : ByValid extends True
      ? {}
      : {
          [P in OrderFields]: P extends ByFields
            ? never
            : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
        }[OrderFields]
    >(args: SubsetIntersection<T, UserGroupByArgs, OrderByArg> & InputErrors): {} extends InputErrors ? GetUserGroupByPayload<T> : Prisma.PrismaPromise<InputErrors>
  /**
   * Fields of the User model
   */
  readonly fields: UserFieldRefs;
  }

  /**
   * The delegate class that acts as a "Promise-like" for User.
   * Why is this prefixed with `Prisma__`?
   * Because we want to prevent naming conflicts as mentioned in
   * https://github.com/prisma/prisma-client-js/issues/707
   */
  export interface Prisma__UserClient<T, Null = never, ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> extends Prisma.PrismaPromise<T> {
    readonly [Symbol.toStringTag]: "PrismaPromise"
    challenges<T extends User$challengesArgs<ExtArgs> = {}>(args?: Subset<T, User$challengesArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$ChallengePayload<ExtArgs>, T, "findMany", GlobalOmitOptions> | Null>
    DailyProgress<T extends User$DailyProgressArgs<ExtArgs> = {}>(args?: Subset<T, User$DailyProgressArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$DailyProgressPayload<ExtArgs>, T, "findMany", GlobalOmitOptions> | Null>
    /**
     * Attaches callbacks for the resolution and/or rejection of the Promise.
     * @param onfulfilled The callback to execute when the Promise is resolved.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of which ever callback is executed.
     */
    then<TResult1 = T, TResult2 = never>(onfulfilled?: ((value: T) => TResult1 | PromiseLike<TResult1>) | undefined | null, onrejected?: ((reason: any) => TResult2 | PromiseLike<TResult2>) | undefined | null): $Utils.JsPromise<TResult1 | TResult2>
    /**
     * Attaches a callback for only the rejection of the Promise.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of the callback.
     */
    catch<TResult = never>(onrejected?: ((reason: any) => TResult | PromiseLike<TResult>) | undefined | null): $Utils.JsPromise<T | TResult>
    /**
     * Attaches a callback that is invoked when the Promise is settled (fulfilled or rejected). The
     * resolved value cannot be modified from the callback.
     * @param onfinally The callback to execute when the Promise is settled (fulfilled or rejected).
     * @returns A Promise for the completion of the callback.
     */
    finally(onfinally?: (() => void) | undefined | null): $Utils.JsPromise<T>
  }




  /**
   * Fields of the User model
   */
  interface UserFieldRefs {
    readonly id: FieldRef<"User", 'String'>
    readonly email: FieldRef<"User", 'String'>
    readonly username: FieldRef<"User", 'String'>
    readonly imageUrl: FieldRef<"User", 'String'>
    readonly clerkId: FieldRef<"User", 'String'>
    readonly createdAt: FieldRef<"User", 'DateTime'>
    readonly updatedAt: FieldRef<"User", 'DateTime'>
  }
    

  // Custom InputTypes
  /**
   * User findUnique
   */
  export type UserFindUniqueArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the User
     */
    select?: UserSelect<ExtArgs> | null
    /**
     * Omit specific fields from the User
     */
    omit?: UserOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: UserInclude<ExtArgs> | null
    /**
     * Filter, which User to fetch.
     */
    where: UserWhereUniqueInput
  }

  /**
   * User findUniqueOrThrow
   */
  export type UserFindUniqueOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the User
     */
    select?: UserSelect<ExtArgs> | null
    /**
     * Omit specific fields from the User
     */
    omit?: UserOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: UserInclude<ExtArgs> | null
    /**
     * Filter, which User to fetch.
     */
    where: UserWhereUniqueInput
  }

  /**
   * User findFirst
   */
  export type UserFindFirstArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the User
     */
    select?: UserSelect<ExtArgs> | null
    /**
     * Omit specific fields from the User
     */
    omit?: UserOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: UserInclude<ExtArgs> | null
    /**
     * Filter, which User to fetch.
     */
    where?: UserWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Users to fetch.
     */
    orderBy?: UserOrderByWithRelationInput | UserOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for Users.
     */
    cursor?: UserWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Users from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Users.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of Users.
     */
    distinct?: UserScalarFieldEnum | UserScalarFieldEnum[]
  }

  /**
   * User findFirstOrThrow
   */
  export type UserFindFirstOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the User
     */
    select?: UserSelect<ExtArgs> | null
    /**
     * Omit specific fields from the User
     */
    omit?: UserOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: UserInclude<ExtArgs> | null
    /**
     * Filter, which User to fetch.
     */
    where?: UserWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Users to fetch.
     */
    orderBy?: UserOrderByWithRelationInput | UserOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for Users.
     */
    cursor?: UserWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Users from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Users.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of Users.
     */
    distinct?: UserScalarFieldEnum | UserScalarFieldEnum[]
  }

  /**
   * User findMany
   */
  export type UserFindManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the User
     */
    select?: UserSelect<ExtArgs> | null
    /**
     * Omit specific fields from the User
     */
    omit?: UserOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: UserInclude<ExtArgs> | null
    /**
     * Filter, which Users to fetch.
     */
    where?: UserWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Users to fetch.
     */
    orderBy?: UserOrderByWithRelationInput | UserOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for listing Users.
     */
    cursor?: UserWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Users from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Users.
     */
    skip?: number
    distinct?: UserScalarFieldEnum | UserScalarFieldEnum[]
  }

  /**
   * User create
   */
  export type UserCreateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the User
     */
    select?: UserSelect<ExtArgs> | null
    /**
     * Omit specific fields from the User
     */
    omit?: UserOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: UserInclude<ExtArgs> | null
    /**
     * The data needed to create a User.
     */
    data: XOR<UserCreateInput, UserUncheckedCreateInput>
  }

  /**
   * User createMany
   */
  export type UserCreateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to create many Users.
     */
    data: UserCreateManyInput | UserCreateManyInput[]
    skipDuplicates?: boolean
  }

  /**
   * User createManyAndReturn
   */
  export type UserCreateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the User
     */
    select?: UserSelectCreateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the User
     */
    omit?: UserOmit<ExtArgs> | null
    /**
     * The data used to create many Users.
     */
    data: UserCreateManyInput | UserCreateManyInput[]
    skipDuplicates?: boolean
  }

  /**
   * User update
   */
  export type UserUpdateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the User
     */
    select?: UserSelect<ExtArgs> | null
    /**
     * Omit specific fields from the User
     */
    omit?: UserOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: UserInclude<ExtArgs> | null
    /**
     * The data needed to update a User.
     */
    data: XOR<UserUpdateInput, UserUncheckedUpdateInput>
    /**
     * Choose, which User to update.
     */
    where: UserWhereUniqueInput
  }

  /**
   * User updateMany
   */
  export type UserUpdateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to update Users.
     */
    data: XOR<UserUpdateManyMutationInput, UserUncheckedUpdateManyInput>
    /**
     * Filter which Users to update
     */
    where?: UserWhereInput
    /**
     * Limit how many Users to update.
     */
    limit?: number
  }

  /**
   * User updateManyAndReturn
   */
  export type UserUpdateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the User
     */
    select?: UserSelectUpdateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the User
     */
    omit?: UserOmit<ExtArgs> | null
    /**
     * The data used to update Users.
     */
    data: XOR<UserUpdateManyMutationInput, UserUncheckedUpdateManyInput>
    /**
     * Filter which Users to update
     */
    where?: UserWhereInput
    /**
     * Limit how many Users to update.
     */
    limit?: number
  }

  /**
   * User upsert
   */
  export type UserUpsertArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the User
     */
    select?: UserSelect<ExtArgs> | null
    /**
     * Omit specific fields from the User
     */
    omit?: UserOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: UserInclude<ExtArgs> | null
    /**
     * The filter to search for the User to update in case it exists.
     */
    where: UserWhereUniqueInput
    /**
     * In case the User found by the `where` argument doesn't exist, create a new User with this data.
     */
    create: XOR<UserCreateInput, UserUncheckedCreateInput>
    /**
     * In case the User was found with the provided `where` argument, update it with this data.
     */
    update: XOR<UserUpdateInput, UserUncheckedUpdateInput>
  }

  /**
   * User delete
   */
  export type UserDeleteArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the User
     */
    select?: UserSelect<ExtArgs> | null
    /**
     * Omit specific fields from the User
     */
    omit?: UserOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: UserInclude<ExtArgs> | null
    /**
     * Filter which User to delete.
     */
    where: UserWhereUniqueInput
  }

  /**
   * User deleteMany
   */
  export type UserDeleteManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which Users to delete
     */
    where?: UserWhereInput
    /**
     * Limit how many Users to delete.
     */
    limit?: number
  }

  /**
   * User.challenges
   */
  export type User$challengesArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Challenge
     */
    select?: ChallengeSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Challenge
     */
    omit?: ChallengeOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ChallengeInclude<ExtArgs> | null
    where?: ChallengeWhereInput
    orderBy?: ChallengeOrderByWithRelationInput | ChallengeOrderByWithRelationInput[]
    cursor?: ChallengeWhereUniqueInput
    take?: number
    skip?: number
    distinct?: ChallengeScalarFieldEnum | ChallengeScalarFieldEnum[]
  }

  /**
   * User.DailyProgress
   */
  export type User$DailyProgressArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the DailyProgress
     */
    select?: DailyProgressSelect<ExtArgs> | null
    /**
     * Omit specific fields from the DailyProgress
     */
    omit?: DailyProgressOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: DailyProgressInclude<ExtArgs> | null
    where?: DailyProgressWhereInput
    orderBy?: DailyProgressOrderByWithRelationInput | DailyProgressOrderByWithRelationInput[]
    cursor?: DailyProgressWhereUniqueInput
    take?: number
    skip?: number
    distinct?: DailyProgressScalarFieldEnum | DailyProgressScalarFieldEnum[]
  }

  /**
   * User without action
   */
  export type UserDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the User
     */
    select?: UserSelect<ExtArgs> | null
    /**
     * Omit specific fields from the User
     */
    omit?: UserOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: UserInclude<ExtArgs> | null
  }


  /**
   * Model Challenge
   */

  export type AggregateChallenge = {
    _count: ChallengeCountAggregateOutputType | null
    _min: ChallengeMinAggregateOutputType | null
    _max: ChallengeMaxAggregateOutputType | null
  }

  export type ChallengeMinAggregateOutputType = {
    id: string | null
    title: string | null
    wish: string | null
    dailyAction: string | null
    icon: string | null
    note: string | null
    startDate: Date | null
    endDate: Date | null
    createdAt: Date | null
    updatedAt: Date | null
    userId: string | null
  }

  export type ChallengeMaxAggregateOutputType = {
    id: string | null
    title: string | null
    wish: string | null
    dailyAction: string | null
    icon: string | null
    note: string | null
    startDate: Date | null
    endDate: Date | null
    createdAt: Date | null
    updatedAt: Date | null
    userId: string | null
  }

  export type ChallengeCountAggregateOutputType = {
    id: number
    title: number
    wish: number
    dailyAction: number
    icon: number
    note: number
    startDate: number
    endDate: number
    createdAt: number
    updatedAt: number
    userId: number
    _all: number
  }


  export type ChallengeMinAggregateInputType = {
    id?: true
    title?: true
    wish?: true
    dailyAction?: true
    icon?: true
    note?: true
    startDate?: true
    endDate?: true
    createdAt?: true
    updatedAt?: true
    userId?: true
  }

  export type ChallengeMaxAggregateInputType = {
    id?: true
    title?: true
    wish?: true
    dailyAction?: true
    icon?: true
    note?: true
    startDate?: true
    endDate?: true
    createdAt?: true
    updatedAt?: true
    userId?: true
  }

  export type ChallengeCountAggregateInputType = {
    id?: true
    title?: true
    wish?: true
    dailyAction?: true
    icon?: true
    note?: true
    startDate?: true
    endDate?: true
    createdAt?: true
    updatedAt?: true
    userId?: true
    _all?: true
  }

  export type ChallengeAggregateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which Challenge to aggregate.
     */
    where?: ChallengeWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Challenges to fetch.
     */
    orderBy?: ChallengeOrderByWithRelationInput | ChallengeOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the start position
     */
    cursor?: ChallengeWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Challenges from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Challenges.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Count returned Challenges
    **/
    _count?: true | ChallengeCountAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the minimum value
    **/
    _min?: ChallengeMinAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the maximum value
    **/
    _max?: ChallengeMaxAggregateInputType
  }

  export type GetChallengeAggregateType<T extends ChallengeAggregateArgs> = {
        [P in keyof T & keyof AggregateChallenge]: P extends '_count' | 'count'
      ? T[P] extends true
        ? number
        : GetScalarType<T[P], AggregateChallenge[P]>
      : GetScalarType<T[P], AggregateChallenge[P]>
  }




  export type ChallengeGroupByArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: ChallengeWhereInput
    orderBy?: ChallengeOrderByWithAggregationInput | ChallengeOrderByWithAggregationInput[]
    by: ChallengeScalarFieldEnum[] | ChallengeScalarFieldEnum
    having?: ChallengeScalarWhereWithAggregatesInput
    take?: number
    skip?: number
    _count?: ChallengeCountAggregateInputType | true
    _min?: ChallengeMinAggregateInputType
    _max?: ChallengeMaxAggregateInputType
  }

  export type ChallengeGroupByOutputType = {
    id: string
    title: string
    wish: string
    dailyAction: string
    icon: string
    note: string
    startDate: Date
    endDate: Date
    createdAt: Date
    updatedAt: Date
    userId: string
    _count: ChallengeCountAggregateOutputType | null
    _min: ChallengeMinAggregateOutputType | null
    _max: ChallengeMaxAggregateOutputType | null
  }

  type GetChallengeGroupByPayload<T extends ChallengeGroupByArgs> = Prisma.PrismaPromise<
    Array<
      PickEnumerable<ChallengeGroupByOutputType, T['by']> &
        {
          [P in ((keyof T) & (keyof ChallengeGroupByOutputType))]: P extends '_count'
            ? T[P] extends boolean
              ? number
              : GetScalarType<T[P], ChallengeGroupByOutputType[P]>
            : GetScalarType<T[P], ChallengeGroupByOutputType[P]>
        }
      >
    >


  export type ChallengeSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    title?: boolean
    wish?: boolean
    dailyAction?: boolean
    icon?: boolean
    note?: boolean
    startDate?: boolean
    endDate?: boolean
    createdAt?: boolean
    updatedAt?: boolean
    userId?: boolean
    user?: boolean | UserDefaultArgs<ExtArgs>
    dailyProgress?: boolean | Challenge$dailyProgressArgs<ExtArgs>
    _count?: boolean | ChallengeCountOutputTypeDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["challenge"]>

  export type ChallengeSelectCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    title?: boolean
    wish?: boolean
    dailyAction?: boolean
    icon?: boolean
    note?: boolean
    startDate?: boolean
    endDate?: boolean
    createdAt?: boolean
    updatedAt?: boolean
    userId?: boolean
    user?: boolean | UserDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["challenge"]>

  export type ChallengeSelectUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    title?: boolean
    wish?: boolean
    dailyAction?: boolean
    icon?: boolean
    note?: boolean
    startDate?: boolean
    endDate?: boolean
    createdAt?: boolean
    updatedAt?: boolean
    userId?: boolean
    user?: boolean | UserDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["challenge"]>

  export type ChallengeSelectScalar = {
    id?: boolean
    title?: boolean
    wish?: boolean
    dailyAction?: boolean
    icon?: boolean
    note?: boolean
    startDate?: boolean
    endDate?: boolean
    createdAt?: boolean
    updatedAt?: boolean
    userId?: boolean
  }

  export type ChallengeOmit<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetOmit<"id" | "title" | "wish" | "dailyAction" | "icon" | "note" | "startDate" | "endDate" | "createdAt" | "updatedAt" | "userId", ExtArgs["result"]["challenge"]>
  export type ChallengeInclude<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    user?: boolean | UserDefaultArgs<ExtArgs>
    dailyProgress?: boolean | Challenge$dailyProgressArgs<ExtArgs>
    _count?: boolean | ChallengeCountOutputTypeDefaultArgs<ExtArgs>
  }
  export type ChallengeIncludeCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    user?: boolean | UserDefaultArgs<ExtArgs>
  }
  export type ChallengeIncludeUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    user?: boolean | UserDefaultArgs<ExtArgs>
  }

  export type $ChallengePayload<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    name: "Challenge"
    objects: {
      user: Prisma.$UserPayload<ExtArgs>
      dailyProgress: Prisma.$DailyProgressPayload<ExtArgs>[]
    }
    scalars: $Extensions.GetPayloadResult<{
      id: string
      title: string
      wish: string
      dailyAction: string
      icon: string
      note: string
      startDate: Date
      endDate: Date
      createdAt: Date
      updatedAt: Date
      userId: string
    }, ExtArgs["result"]["challenge"]>
    composites: {}
  }

  type ChallengeGetPayload<S extends boolean | null | undefined | ChallengeDefaultArgs> = $Result.GetResult<Prisma.$ChallengePayload, S>

  type ChallengeCountArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> =
    Omit<ChallengeFindManyArgs, 'select' | 'include' | 'distinct' | 'omit'> & {
      select?: ChallengeCountAggregateInputType | true
    }

  export interface ChallengeDelegate<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> {
    [K: symbol]: { types: Prisma.TypeMap<ExtArgs>['model']['Challenge'], meta: { name: 'Challenge' } }
    /**
     * Find zero or one Challenge that matches the filter.
     * @param {ChallengeFindUniqueArgs} args - Arguments to find a Challenge
     * @example
     * // Get one Challenge
     * const challenge = await prisma.challenge.findUnique({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUnique<T extends ChallengeFindUniqueArgs>(args: SelectSubset<T, ChallengeFindUniqueArgs<ExtArgs>>): Prisma__ChallengeClient<$Result.GetResult<Prisma.$ChallengePayload<ExtArgs>, T, "findUnique", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find one Challenge that matches the filter or throw an error with `error.code='P2025'`
     * if no matches were found.
     * @param {ChallengeFindUniqueOrThrowArgs} args - Arguments to find a Challenge
     * @example
     * // Get one Challenge
     * const challenge = await prisma.challenge.findUniqueOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUniqueOrThrow<T extends ChallengeFindUniqueOrThrowArgs>(args: SelectSubset<T, ChallengeFindUniqueOrThrowArgs<ExtArgs>>): Prisma__ChallengeClient<$Result.GetResult<Prisma.$ChallengePayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first Challenge that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {ChallengeFindFirstArgs} args - Arguments to find a Challenge
     * @example
     * // Get one Challenge
     * const challenge = await prisma.challenge.findFirst({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirst<T extends ChallengeFindFirstArgs>(args?: SelectSubset<T, ChallengeFindFirstArgs<ExtArgs>>): Prisma__ChallengeClient<$Result.GetResult<Prisma.$ChallengePayload<ExtArgs>, T, "findFirst", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first Challenge that matches the filter or
     * throw `PrismaKnownClientError` with `P2025` code if no matches were found.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {ChallengeFindFirstOrThrowArgs} args - Arguments to find a Challenge
     * @example
     * // Get one Challenge
     * const challenge = await prisma.challenge.findFirstOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirstOrThrow<T extends ChallengeFindFirstOrThrowArgs>(args?: SelectSubset<T, ChallengeFindFirstOrThrowArgs<ExtArgs>>): Prisma__ChallengeClient<$Result.GetResult<Prisma.$ChallengePayload<ExtArgs>, T, "findFirstOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find zero or more Challenges that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {ChallengeFindManyArgs} args - Arguments to filter and select certain fields only.
     * @example
     * // Get all Challenges
     * const challenges = await prisma.challenge.findMany()
     * 
     * // Get first 10 Challenges
     * const challenges = await prisma.challenge.findMany({ take: 10 })
     * 
     * // Only select the `id`
     * const challengeWithIdOnly = await prisma.challenge.findMany({ select: { id: true } })
     * 
     */
    findMany<T extends ChallengeFindManyArgs>(args?: SelectSubset<T, ChallengeFindManyArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$ChallengePayload<ExtArgs>, T, "findMany", GlobalOmitOptions>>

    /**
     * Create a Challenge.
     * @param {ChallengeCreateArgs} args - Arguments to create a Challenge.
     * @example
     * // Create one Challenge
     * const Challenge = await prisma.challenge.create({
     *   data: {
     *     // ... data to create a Challenge
     *   }
     * })
     * 
     */
    create<T extends ChallengeCreateArgs>(args: SelectSubset<T, ChallengeCreateArgs<ExtArgs>>): Prisma__ChallengeClient<$Result.GetResult<Prisma.$ChallengePayload<ExtArgs>, T, "create", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Create many Challenges.
     * @param {ChallengeCreateManyArgs} args - Arguments to create many Challenges.
     * @example
     * // Create many Challenges
     * const challenge = await prisma.challenge.createMany({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     *     
     */
    createMany<T extends ChallengeCreateManyArgs>(args?: SelectSubset<T, ChallengeCreateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Create many Challenges and returns the data saved in the database.
     * @param {ChallengeCreateManyAndReturnArgs} args - Arguments to create many Challenges.
     * @example
     * // Create many Challenges
     * const challenge = await prisma.challenge.createManyAndReturn({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Create many Challenges and only return the `id`
     * const challengeWithIdOnly = await prisma.challenge.createManyAndReturn({
     *   select: { id: true },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    createManyAndReturn<T extends ChallengeCreateManyAndReturnArgs>(args?: SelectSubset<T, ChallengeCreateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$ChallengePayload<ExtArgs>, T, "createManyAndReturn", GlobalOmitOptions>>

    /**
     * Delete a Challenge.
     * @param {ChallengeDeleteArgs} args - Arguments to delete one Challenge.
     * @example
     * // Delete one Challenge
     * const Challenge = await prisma.challenge.delete({
     *   where: {
     *     // ... filter to delete one Challenge
     *   }
     * })
     * 
     */
    delete<T extends ChallengeDeleteArgs>(args: SelectSubset<T, ChallengeDeleteArgs<ExtArgs>>): Prisma__ChallengeClient<$Result.GetResult<Prisma.$ChallengePayload<ExtArgs>, T, "delete", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Update one Challenge.
     * @param {ChallengeUpdateArgs} args - Arguments to update one Challenge.
     * @example
     * // Update one Challenge
     * const challenge = await prisma.challenge.update({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    update<T extends ChallengeUpdateArgs>(args: SelectSubset<T, ChallengeUpdateArgs<ExtArgs>>): Prisma__ChallengeClient<$Result.GetResult<Prisma.$ChallengePayload<ExtArgs>, T, "update", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Delete zero or more Challenges.
     * @param {ChallengeDeleteManyArgs} args - Arguments to filter Challenges to delete.
     * @example
     * // Delete a few Challenges
     * const { count } = await prisma.challenge.deleteMany({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     * 
     */
    deleteMany<T extends ChallengeDeleteManyArgs>(args?: SelectSubset<T, ChallengeDeleteManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more Challenges.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {ChallengeUpdateManyArgs} args - Arguments to update one or more rows.
     * @example
     * // Update many Challenges
     * const challenge = await prisma.challenge.updateMany({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    updateMany<T extends ChallengeUpdateManyArgs>(args: SelectSubset<T, ChallengeUpdateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more Challenges and returns the data updated in the database.
     * @param {ChallengeUpdateManyAndReturnArgs} args - Arguments to update many Challenges.
     * @example
     * // Update many Challenges
     * const challenge = await prisma.challenge.updateManyAndReturn({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Update zero or more Challenges and only return the `id`
     * const challengeWithIdOnly = await prisma.challenge.updateManyAndReturn({
     *   select: { id: true },
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    updateManyAndReturn<T extends ChallengeUpdateManyAndReturnArgs>(args: SelectSubset<T, ChallengeUpdateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$ChallengePayload<ExtArgs>, T, "updateManyAndReturn", GlobalOmitOptions>>

    /**
     * Create or update one Challenge.
     * @param {ChallengeUpsertArgs} args - Arguments to update or create a Challenge.
     * @example
     * // Update or create a Challenge
     * const challenge = await prisma.challenge.upsert({
     *   create: {
     *     // ... data to create a Challenge
     *   },
     *   update: {
     *     // ... in case it already exists, update
     *   },
     *   where: {
     *     // ... the filter for the Challenge we want to update
     *   }
     * })
     */
    upsert<T extends ChallengeUpsertArgs>(args: SelectSubset<T, ChallengeUpsertArgs<ExtArgs>>): Prisma__ChallengeClient<$Result.GetResult<Prisma.$ChallengePayload<ExtArgs>, T, "upsert", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>


    /**
     * Count the number of Challenges.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {ChallengeCountArgs} args - Arguments to filter Challenges to count.
     * @example
     * // Count the number of Challenges
     * const count = await prisma.challenge.count({
     *   where: {
     *     // ... the filter for the Challenges we want to count
     *   }
     * })
    **/
    count<T extends ChallengeCountArgs>(
      args?: Subset<T, ChallengeCountArgs>,
    ): Prisma.PrismaPromise<
      T extends $Utils.Record<'select', any>
        ? T['select'] extends true
          ? number
          : GetScalarType<T['select'], ChallengeCountAggregateOutputType>
        : number
    >

    /**
     * Allows you to perform aggregations operations on a Challenge.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {ChallengeAggregateArgs} args - Select which aggregations you would like to apply and on what fields.
     * @example
     * // Ordered by age ascending
     * // Where email contains prisma.io
     * // Limited to the 10 users
     * const aggregations = await prisma.user.aggregate({
     *   _avg: {
     *     age: true,
     *   },
     *   where: {
     *     email: {
     *       contains: "prisma.io",
     *     },
     *   },
     *   orderBy: {
     *     age: "asc",
     *   },
     *   take: 10,
     * })
    **/
    aggregate<T extends ChallengeAggregateArgs>(args: Subset<T, ChallengeAggregateArgs>): Prisma.PrismaPromise<GetChallengeAggregateType<T>>

    /**
     * Group by Challenge.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {ChallengeGroupByArgs} args - Group by arguments.
     * @example
     * // Group by city, order by createdAt, get count
     * const result = await prisma.user.groupBy({
     *   by: ['city', 'createdAt'],
     *   orderBy: {
     *     createdAt: true
     *   },
     *   _count: {
     *     _all: true
     *   },
     * })
     * 
    **/
    groupBy<
      T extends ChallengeGroupByArgs,
      HasSelectOrTake extends Or<
        Extends<'skip', Keys<T>>,
        Extends<'take', Keys<T>>
      >,
      OrderByArg extends True extends HasSelectOrTake
        ? { orderBy: ChallengeGroupByArgs['orderBy'] }
        : { orderBy?: ChallengeGroupByArgs['orderBy'] },
      OrderFields extends ExcludeUnderscoreKeys<Keys<MaybeTupleToUnion<T['orderBy']>>>,
      ByFields extends MaybeTupleToUnion<T['by']>,
      ByValid extends Has<ByFields, OrderFields>,
      HavingFields extends GetHavingFields<T['having']>,
      HavingValid extends Has<ByFields, HavingFields>,
      ByEmpty extends T['by'] extends never[] ? True : False,
      InputErrors extends ByEmpty extends True
      ? `Error: "by" must not be empty.`
      : HavingValid extends False
      ? {
          [P in HavingFields]: P extends ByFields
            ? never
            : P extends string
            ? `Error: Field "${P}" used in "having" needs to be provided in "by".`
            : [
                Error,
                'Field ',
                P,
                ` in "having" needs to be provided in "by"`,
              ]
        }[HavingFields]
      : 'take' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "take", you also need to provide "orderBy"'
      : 'skip' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "skip", you also need to provide "orderBy"'
      : ByValid extends True
      ? {}
      : {
          [P in OrderFields]: P extends ByFields
            ? never
            : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
        }[OrderFields]
    >(args: SubsetIntersection<T, ChallengeGroupByArgs, OrderByArg> & InputErrors): {} extends InputErrors ? GetChallengeGroupByPayload<T> : Prisma.PrismaPromise<InputErrors>
  /**
   * Fields of the Challenge model
   */
  readonly fields: ChallengeFieldRefs;
  }

  /**
   * The delegate class that acts as a "Promise-like" for Challenge.
   * Why is this prefixed with `Prisma__`?
   * Because we want to prevent naming conflicts as mentioned in
   * https://github.com/prisma/prisma-client-js/issues/707
   */
  export interface Prisma__ChallengeClient<T, Null = never, ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> extends Prisma.PrismaPromise<T> {
    readonly [Symbol.toStringTag]: "PrismaPromise"
    user<T extends UserDefaultArgs<ExtArgs> = {}>(args?: Subset<T, UserDefaultArgs<ExtArgs>>): Prisma__UserClient<$Result.GetResult<Prisma.$UserPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions> | Null, Null, ExtArgs, GlobalOmitOptions>
    dailyProgress<T extends Challenge$dailyProgressArgs<ExtArgs> = {}>(args?: Subset<T, Challenge$dailyProgressArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$DailyProgressPayload<ExtArgs>, T, "findMany", GlobalOmitOptions> | Null>
    /**
     * Attaches callbacks for the resolution and/or rejection of the Promise.
     * @param onfulfilled The callback to execute when the Promise is resolved.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of which ever callback is executed.
     */
    then<TResult1 = T, TResult2 = never>(onfulfilled?: ((value: T) => TResult1 | PromiseLike<TResult1>) | undefined | null, onrejected?: ((reason: any) => TResult2 | PromiseLike<TResult2>) | undefined | null): $Utils.JsPromise<TResult1 | TResult2>
    /**
     * Attaches a callback for only the rejection of the Promise.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of the callback.
     */
    catch<TResult = never>(onrejected?: ((reason: any) => TResult | PromiseLike<TResult>) | undefined | null): $Utils.JsPromise<T | TResult>
    /**
     * Attaches a callback that is invoked when the Promise is settled (fulfilled or rejected). The
     * resolved value cannot be modified from the callback.
     * @param onfinally The callback to execute when the Promise is settled (fulfilled or rejected).
     * @returns A Promise for the completion of the callback.
     */
    finally(onfinally?: (() => void) | undefined | null): $Utils.JsPromise<T>
  }




  /**
   * Fields of the Challenge model
   */
  interface ChallengeFieldRefs {
    readonly id: FieldRef<"Challenge", 'String'>
    readonly title: FieldRef<"Challenge", 'String'>
    readonly wish: FieldRef<"Challenge", 'String'>
    readonly dailyAction: FieldRef<"Challenge", 'String'>
    readonly icon: FieldRef<"Challenge", 'String'>
    readonly note: FieldRef<"Challenge", 'String'>
    readonly startDate: FieldRef<"Challenge", 'DateTime'>
    readonly endDate: FieldRef<"Challenge", 'DateTime'>
    readonly createdAt: FieldRef<"Challenge", 'DateTime'>
    readonly updatedAt: FieldRef<"Challenge", 'DateTime'>
    readonly userId: FieldRef<"Challenge", 'String'>
  }
    

  // Custom InputTypes
  /**
   * Challenge findUnique
   */
  export type ChallengeFindUniqueArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Challenge
     */
    select?: ChallengeSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Challenge
     */
    omit?: ChallengeOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ChallengeInclude<ExtArgs> | null
    /**
     * Filter, which Challenge to fetch.
     */
    where: ChallengeWhereUniqueInput
  }

  /**
   * Challenge findUniqueOrThrow
   */
  export type ChallengeFindUniqueOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Challenge
     */
    select?: ChallengeSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Challenge
     */
    omit?: ChallengeOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ChallengeInclude<ExtArgs> | null
    /**
     * Filter, which Challenge to fetch.
     */
    where: ChallengeWhereUniqueInput
  }

  /**
   * Challenge findFirst
   */
  export type ChallengeFindFirstArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Challenge
     */
    select?: ChallengeSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Challenge
     */
    omit?: ChallengeOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ChallengeInclude<ExtArgs> | null
    /**
     * Filter, which Challenge to fetch.
     */
    where?: ChallengeWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Challenges to fetch.
     */
    orderBy?: ChallengeOrderByWithRelationInput | ChallengeOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for Challenges.
     */
    cursor?: ChallengeWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Challenges from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Challenges.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of Challenges.
     */
    distinct?: ChallengeScalarFieldEnum | ChallengeScalarFieldEnum[]
  }

  /**
   * Challenge findFirstOrThrow
   */
  export type ChallengeFindFirstOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Challenge
     */
    select?: ChallengeSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Challenge
     */
    omit?: ChallengeOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ChallengeInclude<ExtArgs> | null
    /**
     * Filter, which Challenge to fetch.
     */
    where?: ChallengeWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Challenges to fetch.
     */
    orderBy?: ChallengeOrderByWithRelationInput | ChallengeOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for Challenges.
     */
    cursor?: ChallengeWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Challenges from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Challenges.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of Challenges.
     */
    distinct?: ChallengeScalarFieldEnum | ChallengeScalarFieldEnum[]
  }

  /**
   * Challenge findMany
   */
  export type ChallengeFindManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Challenge
     */
    select?: ChallengeSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Challenge
     */
    omit?: ChallengeOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ChallengeInclude<ExtArgs> | null
    /**
     * Filter, which Challenges to fetch.
     */
    where?: ChallengeWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Challenges to fetch.
     */
    orderBy?: ChallengeOrderByWithRelationInput | ChallengeOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for listing Challenges.
     */
    cursor?: ChallengeWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Challenges from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Challenges.
     */
    skip?: number
    distinct?: ChallengeScalarFieldEnum | ChallengeScalarFieldEnum[]
  }

  /**
   * Challenge create
   */
  export type ChallengeCreateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Challenge
     */
    select?: ChallengeSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Challenge
     */
    omit?: ChallengeOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ChallengeInclude<ExtArgs> | null
    /**
     * The data needed to create a Challenge.
     */
    data: XOR<ChallengeCreateInput, ChallengeUncheckedCreateInput>
  }

  /**
   * Challenge createMany
   */
  export type ChallengeCreateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to create many Challenges.
     */
    data: ChallengeCreateManyInput | ChallengeCreateManyInput[]
    skipDuplicates?: boolean
  }

  /**
   * Challenge createManyAndReturn
   */
  export type ChallengeCreateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Challenge
     */
    select?: ChallengeSelectCreateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the Challenge
     */
    omit?: ChallengeOmit<ExtArgs> | null
    /**
     * The data used to create many Challenges.
     */
    data: ChallengeCreateManyInput | ChallengeCreateManyInput[]
    skipDuplicates?: boolean
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ChallengeIncludeCreateManyAndReturn<ExtArgs> | null
  }

  /**
   * Challenge update
   */
  export type ChallengeUpdateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Challenge
     */
    select?: ChallengeSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Challenge
     */
    omit?: ChallengeOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ChallengeInclude<ExtArgs> | null
    /**
     * The data needed to update a Challenge.
     */
    data: XOR<ChallengeUpdateInput, ChallengeUncheckedUpdateInput>
    /**
     * Choose, which Challenge to update.
     */
    where: ChallengeWhereUniqueInput
  }

  /**
   * Challenge updateMany
   */
  export type ChallengeUpdateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to update Challenges.
     */
    data: XOR<ChallengeUpdateManyMutationInput, ChallengeUncheckedUpdateManyInput>
    /**
     * Filter which Challenges to update
     */
    where?: ChallengeWhereInput
    /**
     * Limit how many Challenges to update.
     */
    limit?: number
  }

  /**
   * Challenge updateManyAndReturn
   */
  export type ChallengeUpdateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Challenge
     */
    select?: ChallengeSelectUpdateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the Challenge
     */
    omit?: ChallengeOmit<ExtArgs> | null
    /**
     * The data used to update Challenges.
     */
    data: XOR<ChallengeUpdateManyMutationInput, ChallengeUncheckedUpdateManyInput>
    /**
     * Filter which Challenges to update
     */
    where?: ChallengeWhereInput
    /**
     * Limit how many Challenges to update.
     */
    limit?: number
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ChallengeIncludeUpdateManyAndReturn<ExtArgs> | null
  }

  /**
   * Challenge upsert
   */
  export type ChallengeUpsertArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Challenge
     */
    select?: ChallengeSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Challenge
     */
    omit?: ChallengeOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ChallengeInclude<ExtArgs> | null
    /**
     * The filter to search for the Challenge to update in case it exists.
     */
    where: ChallengeWhereUniqueInput
    /**
     * In case the Challenge found by the `where` argument doesn't exist, create a new Challenge with this data.
     */
    create: XOR<ChallengeCreateInput, ChallengeUncheckedCreateInput>
    /**
     * In case the Challenge was found with the provided `where` argument, update it with this data.
     */
    update: XOR<ChallengeUpdateInput, ChallengeUncheckedUpdateInput>
  }

  /**
   * Challenge delete
   */
  export type ChallengeDeleteArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Challenge
     */
    select?: ChallengeSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Challenge
     */
    omit?: ChallengeOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ChallengeInclude<ExtArgs> | null
    /**
     * Filter which Challenge to delete.
     */
    where: ChallengeWhereUniqueInput
  }

  /**
   * Challenge deleteMany
   */
  export type ChallengeDeleteManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which Challenges to delete
     */
    where?: ChallengeWhereInput
    /**
     * Limit how many Challenges to delete.
     */
    limit?: number
  }

  /**
   * Challenge.dailyProgress
   */
  export type Challenge$dailyProgressArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the DailyProgress
     */
    select?: DailyProgressSelect<ExtArgs> | null
    /**
     * Omit specific fields from the DailyProgress
     */
    omit?: DailyProgressOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: DailyProgressInclude<ExtArgs> | null
    where?: DailyProgressWhereInput
    orderBy?: DailyProgressOrderByWithRelationInput | DailyProgressOrderByWithRelationInput[]
    cursor?: DailyProgressWhereUniqueInput
    take?: number
    skip?: number
    distinct?: DailyProgressScalarFieldEnum | DailyProgressScalarFieldEnum[]
  }

  /**
   * Challenge without action
   */
  export type ChallengeDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Challenge
     */
    select?: ChallengeSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Challenge
     */
    omit?: ChallengeOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ChallengeInclude<ExtArgs> | null
  }


  /**
   * Model DailyProgress
   */

  export type AggregateDailyProgress = {
    _count: DailyProgressCountAggregateOutputType | null
    _min: DailyProgressMinAggregateOutputType | null
    _max: DailyProgressMaxAggregateOutputType | null
  }

  export type DailyProgressMinAggregateOutputType = {
    id: string | null
    date: Date | null
    completed: boolean | null
    imageUrl: string | null
    note: string | null
    challengeId: string | null
    userId: string | null
    createdAt: Date | null
    updatedAt: Date | null
  }

  export type DailyProgressMaxAggregateOutputType = {
    id: string | null
    date: Date | null
    completed: boolean | null
    imageUrl: string | null
    note: string | null
    challengeId: string | null
    userId: string | null
    createdAt: Date | null
    updatedAt: Date | null
  }

  export type DailyProgressCountAggregateOutputType = {
    id: number
    date: number
    completed: number
    imageUrl: number
    note: number
    challengeId: number
    userId: number
    createdAt: number
    updatedAt: number
    _all: number
  }


  export type DailyProgressMinAggregateInputType = {
    id?: true
    date?: true
    completed?: true
    imageUrl?: true
    note?: true
    challengeId?: true
    userId?: true
    createdAt?: true
    updatedAt?: true
  }

  export type DailyProgressMaxAggregateInputType = {
    id?: true
    date?: true
    completed?: true
    imageUrl?: true
    note?: true
    challengeId?: true
    userId?: true
    createdAt?: true
    updatedAt?: true
  }

  export type DailyProgressCountAggregateInputType = {
    id?: true
    date?: true
    completed?: true
    imageUrl?: true
    note?: true
    challengeId?: true
    userId?: true
    createdAt?: true
    updatedAt?: true
    _all?: true
  }

  export type DailyProgressAggregateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which DailyProgress to aggregate.
     */
    where?: DailyProgressWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of DailyProgresses to fetch.
     */
    orderBy?: DailyProgressOrderByWithRelationInput | DailyProgressOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the start position
     */
    cursor?: DailyProgressWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` DailyProgresses from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` DailyProgresses.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Count returned DailyProgresses
    **/
    _count?: true | DailyProgressCountAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the minimum value
    **/
    _min?: DailyProgressMinAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the maximum value
    **/
    _max?: DailyProgressMaxAggregateInputType
  }

  export type GetDailyProgressAggregateType<T extends DailyProgressAggregateArgs> = {
        [P in keyof T & keyof AggregateDailyProgress]: P extends '_count' | 'count'
      ? T[P] extends true
        ? number
        : GetScalarType<T[P], AggregateDailyProgress[P]>
      : GetScalarType<T[P], AggregateDailyProgress[P]>
  }




  export type DailyProgressGroupByArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: DailyProgressWhereInput
    orderBy?: DailyProgressOrderByWithAggregationInput | DailyProgressOrderByWithAggregationInput[]
    by: DailyProgressScalarFieldEnum[] | DailyProgressScalarFieldEnum
    having?: DailyProgressScalarWhereWithAggregatesInput
    take?: number
    skip?: number
    _count?: DailyProgressCountAggregateInputType | true
    _min?: DailyProgressMinAggregateInputType
    _max?: DailyProgressMaxAggregateInputType
  }

  export type DailyProgressGroupByOutputType = {
    id: string
    date: Date
    completed: boolean
    imageUrl: string
    note: string
    challengeId: string
    userId: string
    createdAt: Date
    updatedAt: Date
    _count: DailyProgressCountAggregateOutputType | null
    _min: DailyProgressMinAggregateOutputType | null
    _max: DailyProgressMaxAggregateOutputType | null
  }

  type GetDailyProgressGroupByPayload<T extends DailyProgressGroupByArgs> = Prisma.PrismaPromise<
    Array<
      PickEnumerable<DailyProgressGroupByOutputType, T['by']> &
        {
          [P in ((keyof T) & (keyof DailyProgressGroupByOutputType))]: P extends '_count'
            ? T[P] extends boolean
              ? number
              : GetScalarType<T[P], DailyProgressGroupByOutputType[P]>
            : GetScalarType<T[P], DailyProgressGroupByOutputType[P]>
        }
      >
    >


  export type DailyProgressSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    date?: boolean
    completed?: boolean
    imageUrl?: boolean
    note?: boolean
    challengeId?: boolean
    userId?: boolean
    createdAt?: boolean
    updatedAt?: boolean
    challenge?: boolean | ChallengeDefaultArgs<ExtArgs>
    user?: boolean | UserDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["dailyProgress"]>

  export type DailyProgressSelectCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    date?: boolean
    completed?: boolean
    imageUrl?: boolean
    note?: boolean
    challengeId?: boolean
    userId?: boolean
    createdAt?: boolean
    updatedAt?: boolean
    challenge?: boolean | ChallengeDefaultArgs<ExtArgs>
    user?: boolean | UserDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["dailyProgress"]>

  export type DailyProgressSelectUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    date?: boolean
    completed?: boolean
    imageUrl?: boolean
    note?: boolean
    challengeId?: boolean
    userId?: boolean
    createdAt?: boolean
    updatedAt?: boolean
    challenge?: boolean | ChallengeDefaultArgs<ExtArgs>
    user?: boolean | UserDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["dailyProgress"]>

  export type DailyProgressSelectScalar = {
    id?: boolean
    date?: boolean
    completed?: boolean
    imageUrl?: boolean
    note?: boolean
    challengeId?: boolean
    userId?: boolean
    createdAt?: boolean
    updatedAt?: boolean
  }

  export type DailyProgressOmit<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetOmit<"id" | "date" | "completed" | "imageUrl" | "note" | "challengeId" | "userId" | "createdAt" | "updatedAt", ExtArgs["result"]["dailyProgress"]>
  export type DailyProgressInclude<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    challenge?: boolean | ChallengeDefaultArgs<ExtArgs>
    user?: boolean | UserDefaultArgs<ExtArgs>
  }
  export type DailyProgressIncludeCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    challenge?: boolean | ChallengeDefaultArgs<ExtArgs>
    user?: boolean | UserDefaultArgs<ExtArgs>
  }
  export type DailyProgressIncludeUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    challenge?: boolean | ChallengeDefaultArgs<ExtArgs>
    user?: boolean | UserDefaultArgs<ExtArgs>
  }

  export type $DailyProgressPayload<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    name: "DailyProgress"
    objects: {
      challenge: Prisma.$ChallengePayload<ExtArgs>
      user: Prisma.$UserPayload<ExtArgs>
    }
    scalars: $Extensions.GetPayloadResult<{
      id: string
      date: Date
      completed: boolean
      imageUrl: string
      note: string
      challengeId: string
      userId: string
      createdAt: Date
      updatedAt: Date
    }, ExtArgs["result"]["dailyProgress"]>
    composites: {}
  }

  type DailyProgressGetPayload<S extends boolean | null | undefined | DailyProgressDefaultArgs> = $Result.GetResult<Prisma.$DailyProgressPayload, S>

  type DailyProgressCountArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> =
    Omit<DailyProgressFindManyArgs, 'select' | 'include' | 'distinct' | 'omit'> & {
      select?: DailyProgressCountAggregateInputType | true
    }

  export interface DailyProgressDelegate<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> {
    [K: symbol]: { types: Prisma.TypeMap<ExtArgs>['model']['DailyProgress'], meta: { name: 'DailyProgress' } }
    /**
     * Find zero or one DailyProgress that matches the filter.
     * @param {DailyProgressFindUniqueArgs} args - Arguments to find a DailyProgress
     * @example
     * // Get one DailyProgress
     * const dailyProgress = await prisma.dailyProgress.findUnique({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUnique<T extends DailyProgressFindUniqueArgs>(args: SelectSubset<T, DailyProgressFindUniqueArgs<ExtArgs>>): Prisma__DailyProgressClient<$Result.GetResult<Prisma.$DailyProgressPayload<ExtArgs>, T, "findUnique", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find one DailyProgress that matches the filter or throw an error with `error.code='P2025'`
     * if no matches were found.
     * @param {DailyProgressFindUniqueOrThrowArgs} args - Arguments to find a DailyProgress
     * @example
     * // Get one DailyProgress
     * const dailyProgress = await prisma.dailyProgress.findUniqueOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUniqueOrThrow<T extends DailyProgressFindUniqueOrThrowArgs>(args: SelectSubset<T, DailyProgressFindUniqueOrThrowArgs<ExtArgs>>): Prisma__DailyProgressClient<$Result.GetResult<Prisma.$DailyProgressPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first DailyProgress that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {DailyProgressFindFirstArgs} args - Arguments to find a DailyProgress
     * @example
     * // Get one DailyProgress
     * const dailyProgress = await prisma.dailyProgress.findFirst({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirst<T extends DailyProgressFindFirstArgs>(args?: SelectSubset<T, DailyProgressFindFirstArgs<ExtArgs>>): Prisma__DailyProgressClient<$Result.GetResult<Prisma.$DailyProgressPayload<ExtArgs>, T, "findFirst", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first DailyProgress that matches the filter or
     * throw `PrismaKnownClientError` with `P2025` code if no matches were found.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {DailyProgressFindFirstOrThrowArgs} args - Arguments to find a DailyProgress
     * @example
     * // Get one DailyProgress
     * const dailyProgress = await prisma.dailyProgress.findFirstOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirstOrThrow<T extends DailyProgressFindFirstOrThrowArgs>(args?: SelectSubset<T, DailyProgressFindFirstOrThrowArgs<ExtArgs>>): Prisma__DailyProgressClient<$Result.GetResult<Prisma.$DailyProgressPayload<ExtArgs>, T, "findFirstOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find zero or more DailyProgresses that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {DailyProgressFindManyArgs} args - Arguments to filter and select certain fields only.
     * @example
     * // Get all DailyProgresses
     * const dailyProgresses = await prisma.dailyProgress.findMany()
     * 
     * // Get first 10 DailyProgresses
     * const dailyProgresses = await prisma.dailyProgress.findMany({ take: 10 })
     * 
     * // Only select the `id`
     * const dailyProgressWithIdOnly = await prisma.dailyProgress.findMany({ select: { id: true } })
     * 
     */
    findMany<T extends DailyProgressFindManyArgs>(args?: SelectSubset<T, DailyProgressFindManyArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$DailyProgressPayload<ExtArgs>, T, "findMany", GlobalOmitOptions>>

    /**
     * Create a DailyProgress.
     * @param {DailyProgressCreateArgs} args - Arguments to create a DailyProgress.
     * @example
     * // Create one DailyProgress
     * const DailyProgress = await prisma.dailyProgress.create({
     *   data: {
     *     // ... data to create a DailyProgress
     *   }
     * })
     * 
     */
    create<T extends DailyProgressCreateArgs>(args: SelectSubset<T, DailyProgressCreateArgs<ExtArgs>>): Prisma__DailyProgressClient<$Result.GetResult<Prisma.$DailyProgressPayload<ExtArgs>, T, "create", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Create many DailyProgresses.
     * @param {DailyProgressCreateManyArgs} args - Arguments to create many DailyProgresses.
     * @example
     * // Create many DailyProgresses
     * const dailyProgress = await prisma.dailyProgress.createMany({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     *     
     */
    createMany<T extends DailyProgressCreateManyArgs>(args?: SelectSubset<T, DailyProgressCreateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Create many DailyProgresses and returns the data saved in the database.
     * @param {DailyProgressCreateManyAndReturnArgs} args - Arguments to create many DailyProgresses.
     * @example
     * // Create many DailyProgresses
     * const dailyProgress = await prisma.dailyProgress.createManyAndReturn({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Create many DailyProgresses and only return the `id`
     * const dailyProgressWithIdOnly = await prisma.dailyProgress.createManyAndReturn({
     *   select: { id: true },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    createManyAndReturn<T extends DailyProgressCreateManyAndReturnArgs>(args?: SelectSubset<T, DailyProgressCreateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$DailyProgressPayload<ExtArgs>, T, "createManyAndReturn", GlobalOmitOptions>>

    /**
     * Delete a DailyProgress.
     * @param {DailyProgressDeleteArgs} args - Arguments to delete one DailyProgress.
     * @example
     * // Delete one DailyProgress
     * const DailyProgress = await prisma.dailyProgress.delete({
     *   where: {
     *     // ... filter to delete one DailyProgress
     *   }
     * })
     * 
     */
    delete<T extends DailyProgressDeleteArgs>(args: SelectSubset<T, DailyProgressDeleteArgs<ExtArgs>>): Prisma__DailyProgressClient<$Result.GetResult<Prisma.$DailyProgressPayload<ExtArgs>, T, "delete", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Update one DailyProgress.
     * @param {DailyProgressUpdateArgs} args - Arguments to update one DailyProgress.
     * @example
     * // Update one DailyProgress
     * const dailyProgress = await prisma.dailyProgress.update({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    update<T extends DailyProgressUpdateArgs>(args: SelectSubset<T, DailyProgressUpdateArgs<ExtArgs>>): Prisma__DailyProgressClient<$Result.GetResult<Prisma.$DailyProgressPayload<ExtArgs>, T, "update", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Delete zero or more DailyProgresses.
     * @param {DailyProgressDeleteManyArgs} args - Arguments to filter DailyProgresses to delete.
     * @example
     * // Delete a few DailyProgresses
     * const { count } = await prisma.dailyProgress.deleteMany({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     * 
     */
    deleteMany<T extends DailyProgressDeleteManyArgs>(args?: SelectSubset<T, DailyProgressDeleteManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more DailyProgresses.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {DailyProgressUpdateManyArgs} args - Arguments to update one or more rows.
     * @example
     * // Update many DailyProgresses
     * const dailyProgress = await prisma.dailyProgress.updateMany({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    updateMany<T extends DailyProgressUpdateManyArgs>(args: SelectSubset<T, DailyProgressUpdateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more DailyProgresses and returns the data updated in the database.
     * @param {DailyProgressUpdateManyAndReturnArgs} args - Arguments to update many DailyProgresses.
     * @example
     * // Update many DailyProgresses
     * const dailyProgress = await prisma.dailyProgress.updateManyAndReturn({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Update zero or more DailyProgresses and only return the `id`
     * const dailyProgressWithIdOnly = await prisma.dailyProgress.updateManyAndReturn({
     *   select: { id: true },
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    updateManyAndReturn<T extends DailyProgressUpdateManyAndReturnArgs>(args: SelectSubset<T, DailyProgressUpdateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$DailyProgressPayload<ExtArgs>, T, "updateManyAndReturn", GlobalOmitOptions>>

    /**
     * Create or update one DailyProgress.
     * @param {DailyProgressUpsertArgs} args - Arguments to update or create a DailyProgress.
     * @example
     * // Update or create a DailyProgress
     * const dailyProgress = await prisma.dailyProgress.upsert({
     *   create: {
     *     // ... data to create a DailyProgress
     *   },
     *   update: {
     *     // ... in case it already exists, update
     *   },
     *   where: {
     *     // ... the filter for the DailyProgress we want to update
     *   }
     * })
     */
    upsert<T extends DailyProgressUpsertArgs>(args: SelectSubset<T, DailyProgressUpsertArgs<ExtArgs>>): Prisma__DailyProgressClient<$Result.GetResult<Prisma.$DailyProgressPayload<ExtArgs>, T, "upsert", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>


    /**
     * Count the number of DailyProgresses.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {DailyProgressCountArgs} args - Arguments to filter DailyProgresses to count.
     * @example
     * // Count the number of DailyProgresses
     * const count = await prisma.dailyProgress.count({
     *   where: {
     *     // ... the filter for the DailyProgresses we want to count
     *   }
     * })
    **/
    count<T extends DailyProgressCountArgs>(
      args?: Subset<T, DailyProgressCountArgs>,
    ): Prisma.PrismaPromise<
      T extends $Utils.Record<'select', any>
        ? T['select'] extends true
          ? number
          : GetScalarType<T['select'], DailyProgressCountAggregateOutputType>
        : number
    >

    /**
     * Allows you to perform aggregations operations on a DailyProgress.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {DailyProgressAggregateArgs} args - Select which aggregations you would like to apply and on what fields.
     * @example
     * // Ordered by age ascending
     * // Where email contains prisma.io
     * // Limited to the 10 users
     * const aggregations = await prisma.user.aggregate({
     *   _avg: {
     *     age: true,
     *   },
     *   where: {
     *     email: {
     *       contains: "prisma.io",
     *     },
     *   },
     *   orderBy: {
     *     age: "asc",
     *   },
     *   take: 10,
     * })
    **/
    aggregate<T extends DailyProgressAggregateArgs>(args: Subset<T, DailyProgressAggregateArgs>): Prisma.PrismaPromise<GetDailyProgressAggregateType<T>>

    /**
     * Group by DailyProgress.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {DailyProgressGroupByArgs} args - Group by arguments.
     * @example
     * // Group by city, order by createdAt, get count
     * const result = await prisma.user.groupBy({
     *   by: ['city', 'createdAt'],
     *   orderBy: {
     *     createdAt: true
     *   },
     *   _count: {
     *     _all: true
     *   },
     * })
     * 
    **/
    groupBy<
      T extends DailyProgressGroupByArgs,
      HasSelectOrTake extends Or<
        Extends<'skip', Keys<T>>,
        Extends<'take', Keys<T>>
      >,
      OrderByArg extends True extends HasSelectOrTake
        ? { orderBy: DailyProgressGroupByArgs['orderBy'] }
        : { orderBy?: DailyProgressGroupByArgs['orderBy'] },
      OrderFields extends ExcludeUnderscoreKeys<Keys<MaybeTupleToUnion<T['orderBy']>>>,
      ByFields extends MaybeTupleToUnion<T['by']>,
      ByValid extends Has<ByFields, OrderFields>,
      HavingFields extends GetHavingFields<T['having']>,
      HavingValid extends Has<ByFields, HavingFields>,
      ByEmpty extends T['by'] extends never[] ? True : False,
      InputErrors extends ByEmpty extends True
      ? `Error: "by" must not be empty.`
      : HavingValid extends False
      ? {
          [P in HavingFields]: P extends ByFields
            ? never
            : P extends string
            ? `Error: Field "${P}" used in "having" needs to be provided in "by".`
            : [
                Error,
                'Field ',
                P,
                ` in "having" needs to be provided in "by"`,
              ]
        }[HavingFields]
      : 'take' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "take", you also need to provide "orderBy"'
      : 'skip' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "skip", you also need to provide "orderBy"'
      : ByValid extends True
      ? {}
      : {
          [P in OrderFields]: P extends ByFields
            ? never
            : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
        }[OrderFields]
    >(args: SubsetIntersection<T, DailyProgressGroupByArgs, OrderByArg> & InputErrors): {} extends InputErrors ? GetDailyProgressGroupByPayload<T> : Prisma.PrismaPromise<InputErrors>
  /**
   * Fields of the DailyProgress model
   */
  readonly fields: DailyProgressFieldRefs;
  }

  /**
   * The delegate class that acts as a "Promise-like" for DailyProgress.
   * Why is this prefixed with `Prisma__`?
   * Because we want to prevent naming conflicts as mentioned in
   * https://github.com/prisma/prisma-client-js/issues/707
   */
  export interface Prisma__DailyProgressClient<T, Null = never, ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> extends Prisma.PrismaPromise<T> {
    readonly [Symbol.toStringTag]: "PrismaPromise"
    challenge<T extends ChallengeDefaultArgs<ExtArgs> = {}>(args?: Subset<T, ChallengeDefaultArgs<ExtArgs>>): Prisma__ChallengeClient<$Result.GetResult<Prisma.$ChallengePayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions> | Null, Null, ExtArgs, GlobalOmitOptions>
    user<T extends UserDefaultArgs<ExtArgs> = {}>(args?: Subset<T, UserDefaultArgs<ExtArgs>>): Prisma__UserClient<$Result.GetResult<Prisma.$UserPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions> | Null, Null, ExtArgs, GlobalOmitOptions>
    /**
     * Attaches callbacks for the resolution and/or rejection of the Promise.
     * @param onfulfilled The callback to execute when the Promise is resolved.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of which ever callback is executed.
     */
    then<TResult1 = T, TResult2 = never>(onfulfilled?: ((value: T) => TResult1 | PromiseLike<TResult1>) | undefined | null, onrejected?: ((reason: any) => TResult2 | PromiseLike<TResult2>) | undefined | null): $Utils.JsPromise<TResult1 | TResult2>
    /**
     * Attaches a callback for only the rejection of the Promise.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of the callback.
     */
    catch<TResult = never>(onrejected?: ((reason: any) => TResult | PromiseLike<TResult>) | undefined | null): $Utils.JsPromise<T | TResult>
    /**
     * Attaches a callback that is invoked when the Promise is settled (fulfilled or rejected). The
     * resolved value cannot be modified from the callback.
     * @param onfinally The callback to execute when the Promise is settled (fulfilled or rejected).
     * @returns A Promise for the completion of the callback.
     */
    finally(onfinally?: (() => void) | undefined | null): $Utils.JsPromise<T>
  }




  /**
   * Fields of the DailyProgress model
   */
  interface DailyProgressFieldRefs {
    readonly id: FieldRef<"DailyProgress", 'String'>
    readonly date: FieldRef<"DailyProgress", 'DateTime'>
    readonly completed: FieldRef<"DailyProgress", 'Boolean'>
    readonly imageUrl: FieldRef<"DailyProgress", 'String'>
    readonly note: FieldRef<"DailyProgress", 'String'>
    readonly challengeId: FieldRef<"DailyProgress", 'String'>
    readonly userId: FieldRef<"DailyProgress", 'String'>
    readonly createdAt: FieldRef<"DailyProgress", 'DateTime'>
    readonly updatedAt: FieldRef<"DailyProgress", 'DateTime'>
  }
    

  // Custom InputTypes
  /**
   * DailyProgress findUnique
   */
  export type DailyProgressFindUniqueArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the DailyProgress
     */
    select?: DailyProgressSelect<ExtArgs> | null
    /**
     * Omit specific fields from the DailyProgress
     */
    omit?: DailyProgressOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: DailyProgressInclude<ExtArgs> | null
    /**
     * Filter, which DailyProgress to fetch.
     */
    where: DailyProgressWhereUniqueInput
  }

  /**
   * DailyProgress findUniqueOrThrow
   */
  export type DailyProgressFindUniqueOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the DailyProgress
     */
    select?: DailyProgressSelect<ExtArgs> | null
    /**
     * Omit specific fields from the DailyProgress
     */
    omit?: DailyProgressOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: DailyProgressInclude<ExtArgs> | null
    /**
     * Filter, which DailyProgress to fetch.
     */
    where: DailyProgressWhereUniqueInput
  }

  /**
   * DailyProgress findFirst
   */
  export type DailyProgressFindFirstArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the DailyProgress
     */
    select?: DailyProgressSelect<ExtArgs> | null
    /**
     * Omit specific fields from the DailyProgress
     */
    omit?: DailyProgressOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: DailyProgressInclude<ExtArgs> | null
    /**
     * Filter, which DailyProgress to fetch.
     */
    where?: DailyProgressWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of DailyProgresses to fetch.
     */
    orderBy?: DailyProgressOrderByWithRelationInput | DailyProgressOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for DailyProgresses.
     */
    cursor?: DailyProgressWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` DailyProgresses from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` DailyProgresses.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of DailyProgresses.
     */
    distinct?: DailyProgressScalarFieldEnum | DailyProgressScalarFieldEnum[]
  }

  /**
   * DailyProgress findFirstOrThrow
   */
  export type DailyProgressFindFirstOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the DailyProgress
     */
    select?: DailyProgressSelect<ExtArgs> | null
    /**
     * Omit specific fields from the DailyProgress
     */
    omit?: DailyProgressOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: DailyProgressInclude<ExtArgs> | null
    /**
     * Filter, which DailyProgress to fetch.
     */
    where?: DailyProgressWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of DailyProgresses to fetch.
     */
    orderBy?: DailyProgressOrderByWithRelationInput | DailyProgressOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for DailyProgresses.
     */
    cursor?: DailyProgressWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` DailyProgresses from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` DailyProgresses.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of DailyProgresses.
     */
    distinct?: DailyProgressScalarFieldEnum | DailyProgressScalarFieldEnum[]
  }

  /**
   * DailyProgress findMany
   */
  export type DailyProgressFindManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the DailyProgress
     */
    select?: DailyProgressSelect<ExtArgs> | null
    /**
     * Omit specific fields from the DailyProgress
     */
    omit?: DailyProgressOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: DailyProgressInclude<ExtArgs> | null
    /**
     * Filter, which DailyProgresses to fetch.
     */
    where?: DailyProgressWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of DailyProgresses to fetch.
     */
    orderBy?: DailyProgressOrderByWithRelationInput | DailyProgressOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for listing DailyProgresses.
     */
    cursor?: DailyProgressWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` DailyProgresses from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` DailyProgresses.
     */
    skip?: number
    distinct?: DailyProgressScalarFieldEnum | DailyProgressScalarFieldEnum[]
  }

  /**
   * DailyProgress create
   */
  export type DailyProgressCreateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the DailyProgress
     */
    select?: DailyProgressSelect<ExtArgs> | null
    /**
     * Omit specific fields from the DailyProgress
     */
    omit?: DailyProgressOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: DailyProgressInclude<ExtArgs> | null
    /**
     * The data needed to create a DailyProgress.
     */
    data: XOR<DailyProgressCreateInput, DailyProgressUncheckedCreateInput>
  }

  /**
   * DailyProgress createMany
   */
  export type DailyProgressCreateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to create many DailyProgresses.
     */
    data: DailyProgressCreateManyInput | DailyProgressCreateManyInput[]
    skipDuplicates?: boolean
  }

  /**
   * DailyProgress createManyAndReturn
   */
  export type DailyProgressCreateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the DailyProgress
     */
    select?: DailyProgressSelectCreateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the DailyProgress
     */
    omit?: DailyProgressOmit<ExtArgs> | null
    /**
     * The data used to create many DailyProgresses.
     */
    data: DailyProgressCreateManyInput | DailyProgressCreateManyInput[]
    skipDuplicates?: boolean
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: DailyProgressIncludeCreateManyAndReturn<ExtArgs> | null
  }

  /**
   * DailyProgress update
   */
  export type DailyProgressUpdateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the DailyProgress
     */
    select?: DailyProgressSelect<ExtArgs> | null
    /**
     * Omit specific fields from the DailyProgress
     */
    omit?: DailyProgressOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: DailyProgressInclude<ExtArgs> | null
    /**
     * The data needed to update a DailyProgress.
     */
    data: XOR<DailyProgressUpdateInput, DailyProgressUncheckedUpdateInput>
    /**
     * Choose, which DailyProgress to update.
     */
    where: DailyProgressWhereUniqueInput
  }

  /**
   * DailyProgress updateMany
   */
  export type DailyProgressUpdateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to update DailyProgresses.
     */
    data: XOR<DailyProgressUpdateManyMutationInput, DailyProgressUncheckedUpdateManyInput>
    /**
     * Filter which DailyProgresses to update
     */
    where?: DailyProgressWhereInput
    /**
     * Limit how many DailyProgresses to update.
     */
    limit?: number
  }

  /**
   * DailyProgress updateManyAndReturn
   */
  export type DailyProgressUpdateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the DailyProgress
     */
    select?: DailyProgressSelectUpdateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the DailyProgress
     */
    omit?: DailyProgressOmit<ExtArgs> | null
    /**
     * The data used to update DailyProgresses.
     */
    data: XOR<DailyProgressUpdateManyMutationInput, DailyProgressUncheckedUpdateManyInput>
    /**
     * Filter which DailyProgresses to update
     */
    where?: DailyProgressWhereInput
    /**
     * Limit how many DailyProgresses to update.
     */
    limit?: number
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: DailyProgressIncludeUpdateManyAndReturn<ExtArgs> | null
  }

  /**
   * DailyProgress upsert
   */
  export type DailyProgressUpsertArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the DailyProgress
     */
    select?: DailyProgressSelect<ExtArgs> | null
    /**
     * Omit specific fields from the DailyProgress
     */
    omit?: DailyProgressOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: DailyProgressInclude<ExtArgs> | null
    /**
     * The filter to search for the DailyProgress to update in case it exists.
     */
    where: DailyProgressWhereUniqueInput
    /**
     * In case the DailyProgress found by the `where` argument doesn't exist, create a new DailyProgress with this data.
     */
    create: XOR<DailyProgressCreateInput, DailyProgressUncheckedCreateInput>
    /**
     * In case the DailyProgress was found with the provided `where` argument, update it with this data.
     */
    update: XOR<DailyProgressUpdateInput, DailyProgressUncheckedUpdateInput>
  }

  /**
   * DailyProgress delete
   */
  export type DailyProgressDeleteArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the DailyProgress
     */
    select?: DailyProgressSelect<ExtArgs> | null
    /**
     * Omit specific fields from the DailyProgress
     */
    omit?: DailyProgressOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: DailyProgressInclude<ExtArgs> | null
    /**
     * Filter which DailyProgress to delete.
     */
    where: DailyProgressWhereUniqueInput
  }

  /**
   * DailyProgress deleteMany
   */
  export type DailyProgressDeleteManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which DailyProgresses to delete
     */
    where?: DailyProgressWhereInput
    /**
     * Limit how many DailyProgresses to delete.
     */
    limit?: number
  }

  /**
   * DailyProgress without action
   */
  export type DailyProgressDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the DailyProgress
     */
    select?: DailyProgressSelect<ExtArgs> | null
    /**
     * Omit specific fields from the DailyProgress
     */
    omit?: DailyProgressOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: DailyProgressInclude<ExtArgs> | null
  }


  /**
   * Model ChallengeIdea
   */

  export type AggregateChallengeIdea = {
    _count: ChallengeIdeaCountAggregateOutputType | null
    _avg: ChallengeIdeaAvgAggregateOutputType | null
    _sum: ChallengeIdeaSumAggregateOutputType | null
    _min: ChallengeIdeaMinAggregateOutputType | null
    _max: ChallengeIdeaMaxAggregateOutputType | null
  }

  export type ChallengeIdeaAvgAggregateOutputType = {
    id: number | null
    index: number | null
  }

  export type ChallengeIdeaSumAggregateOutputType = {
    id: number | null
    index: number | null
  }

  export type ChallengeIdeaMinAggregateOutputType = {
    id: number | null
    index: number | null
    title: string | null
    wish: string | null
    dailyAction: string | null
    description: string | null
    sourceName: string | null
    sourceLink: string | null
  }

  export type ChallengeIdeaMaxAggregateOutputType = {
    id: number | null
    index: number | null
    title: string | null
    wish: string | null
    dailyAction: string | null
    description: string | null
    sourceName: string | null
    sourceLink: string | null
  }

  export type ChallengeIdeaCountAggregateOutputType = {
    id: number
    index: number
    title: number
    wish: number
    dailyAction: number
    description: number
    sourceName: number
    sourceLink: number
    _all: number
  }


  export type ChallengeIdeaAvgAggregateInputType = {
    id?: true
    index?: true
  }

  export type ChallengeIdeaSumAggregateInputType = {
    id?: true
    index?: true
  }

  export type ChallengeIdeaMinAggregateInputType = {
    id?: true
    index?: true
    title?: true
    wish?: true
    dailyAction?: true
    description?: true
    sourceName?: true
    sourceLink?: true
  }

  export type ChallengeIdeaMaxAggregateInputType = {
    id?: true
    index?: true
    title?: true
    wish?: true
    dailyAction?: true
    description?: true
    sourceName?: true
    sourceLink?: true
  }

  export type ChallengeIdeaCountAggregateInputType = {
    id?: true
    index?: true
    title?: true
    wish?: true
    dailyAction?: true
    description?: true
    sourceName?: true
    sourceLink?: true
    _all?: true
  }

  export type ChallengeIdeaAggregateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which ChallengeIdea to aggregate.
     */
    where?: ChallengeIdeaWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of ChallengeIdeas to fetch.
     */
    orderBy?: ChallengeIdeaOrderByWithRelationInput | ChallengeIdeaOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the start position
     */
    cursor?: ChallengeIdeaWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` ChallengeIdeas from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` ChallengeIdeas.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Count returned ChallengeIdeas
    **/
    _count?: true | ChallengeIdeaCountAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to average
    **/
    _avg?: ChallengeIdeaAvgAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to sum
    **/
    _sum?: ChallengeIdeaSumAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the minimum value
    **/
    _min?: ChallengeIdeaMinAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the maximum value
    **/
    _max?: ChallengeIdeaMaxAggregateInputType
  }

  export type GetChallengeIdeaAggregateType<T extends ChallengeIdeaAggregateArgs> = {
        [P in keyof T & keyof AggregateChallengeIdea]: P extends '_count' | 'count'
      ? T[P] extends true
        ? number
        : GetScalarType<T[P], AggregateChallengeIdea[P]>
      : GetScalarType<T[P], AggregateChallengeIdea[P]>
  }




  export type ChallengeIdeaGroupByArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: ChallengeIdeaWhereInput
    orderBy?: ChallengeIdeaOrderByWithAggregationInput | ChallengeIdeaOrderByWithAggregationInput[]
    by: ChallengeIdeaScalarFieldEnum[] | ChallengeIdeaScalarFieldEnum
    having?: ChallengeIdeaScalarWhereWithAggregatesInput
    take?: number
    skip?: number
    _count?: ChallengeIdeaCountAggregateInputType | true
    _avg?: ChallengeIdeaAvgAggregateInputType
    _sum?: ChallengeIdeaSumAggregateInputType
    _min?: ChallengeIdeaMinAggregateInputType
    _max?: ChallengeIdeaMaxAggregateInputType
  }

  export type ChallengeIdeaGroupByOutputType = {
    id: number
    index: number
    title: string
    wish: string
    dailyAction: string
    description: string
    sourceName: string
    sourceLink: string
    _count: ChallengeIdeaCountAggregateOutputType | null
    _avg: ChallengeIdeaAvgAggregateOutputType | null
    _sum: ChallengeIdeaSumAggregateOutputType | null
    _min: ChallengeIdeaMinAggregateOutputType | null
    _max: ChallengeIdeaMaxAggregateOutputType | null
  }

  type GetChallengeIdeaGroupByPayload<T extends ChallengeIdeaGroupByArgs> = Prisma.PrismaPromise<
    Array<
      PickEnumerable<ChallengeIdeaGroupByOutputType, T['by']> &
        {
          [P in ((keyof T) & (keyof ChallengeIdeaGroupByOutputType))]: P extends '_count'
            ? T[P] extends boolean
              ? number
              : GetScalarType<T[P], ChallengeIdeaGroupByOutputType[P]>
            : GetScalarType<T[P], ChallengeIdeaGroupByOutputType[P]>
        }
      >
    >


  export type ChallengeIdeaSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    index?: boolean
    title?: boolean
    wish?: boolean
    dailyAction?: boolean
    description?: boolean
    sourceName?: boolean
    sourceLink?: boolean
  }, ExtArgs["result"]["challengeIdea"]>

  export type ChallengeIdeaSelectCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    index?: boolean
    title?: boolean
    wish?: boolean
    dailyAction?: boolean
    description?: boolean
    sourceName?: boolean
    sourceLink?: boolean
  }, ExtArgs["result"]["challengeIdea"]>

  export type ChallengeIdeaSelectUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    index?: boolean
    title?: boolean
    wish?: boolean
    dailyAction?: boolean
    description?: boolean
    sourceName?: boolean
    sourceLink?: boolean
  }, ExtArgs["result"]["challengeIdea"]>

  export type ChallengeIdeaSelectScalar = {
    id?: boolean
    index?: boolean
    title?: boolean
    wish?: boolean
    dailyAction?: boolean
    description?: boolean
    sourceName?: boolean
    sourceLink?: boolean
  }

  export type ChallengeIdeaOmit<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetOmit<"id" | "index" | "title" | "wish" | "dailyAction" | "description" | "sourceName" | "sourceLink", ExtArgs["result"]["challengeIdea"]>

  export type $ChallengeIdeaPayload<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    name: "ChallengeIdea"
    objects: {}
    scalars: $Extensions.GetPayloadResult<{
      id: number
      index: number
      title: string
      wish: string
      dailyAction: string
      description: string
      sourceName: string
      sourceLink: string
    }, ExtArgs["result"]["challengeIdea"]>
    composites: {}
  }

  type ChallengeIdeaGetPayload<S extends boolean | null | undefined | ChallengeIdeaDefaultArgs> = $Result.GetResult<Prisma.$ChallengeIdeaPayload, S>

  type ChallengeIdeaCountArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> =
    Omit<ChallengeIdeaFindManyArgs, 'select' | 'include' | 'distinct' | 'omit'> & {
      select?: ChallengeIdeaCountAggregateInputType | true
    }

  export interface ChallengeIdeaDelegate<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> {
    [K: symbol]: { types: Prisma.TypeMap<ExtArgs>['model']['ChallengeIdea'], meta: { name: 'ChallengeIdea' } }
    /**
     * Find zero or one ChallengeIdea that matches the filter.
     * @param {ChallengeIdeaFindUniqueArgs} args - Arguments to find a ChallengeIdea
     * @example
     * // Get one ChallengeIdea
     * const challengeIdea = await prisma.challengeIdea.findUnique({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUnique<T extends ChallengeIdeaFindUniqueArgs>(args: SelectSubset<T, ChallengeIdeaFindUniqueArgs<ExtArgs>>): Prisma__ChallengeIdeaClient<$Result.GetResult<Prisma.$ChallengeIdeaPayload<ExtArgs>, T, "findUnique", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find one ChallengeIdea that matches the filter or throw an error with `error.code='P2025'`
     * if no matches were found.
     * @param {ChallengeIdeaFindUniqueOrThrowArgs} args - Arguments to find a ChallengeIdea
     * @example
     * // Get one ChallengeIdea
     * const challengeIdea = await prisma.challengeIdea.findUniqueOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUniqueOrThrow<T extends ChallengeIdeaFindUniqueOrThrowArgs>(args: SelectSubset<T, ChallengeIdeaFindUniqueOrThrowArgs<ExtArgs>>): Prisma__ChallengeIdeaClient<$Result.GetResult<Prisma.$ChallengeIdeaPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first ChallengeIdea that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {ChallengeIdeaFindFirstArgs} args - Arguments to find a ChallengeIdea
     * @example
     * // Get one ChallengeIdea
     * const challengeIdea = await prisma.challengeIdea.findFirst({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirst<T extends ChallengeIdeaFindFirstArgs>(args?: SelectSubset<T, ChallengeIdeaFindFirstArgs<ExtArgs>>): Prisma__ChallengeIdeaClient<$Result.GetResult<Prisma.$ChallengeIdeaPayload<ExtArgs>, T, "findFirst", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first ChallengeIdea that matches the filter or
     * throw `PrismaKnownClientError` with `P2025` code if no matches were found.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {ChallengeIdeaFindFirstOrThrowArgs} args - Arguments to find a ChallengeIdea
     * @example
     * // Get one ChallengeIdea
     * const challengeIdea = await prisma.challengeIdea.findFirstOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirstOrThrow<T extends ChallengeIdeaFindFirstOrThrowArgs>(args?: SelectSubset<T, ChallengeIdeaFindFirstOrThrowArgs<ExtArgs>>): Prisma__ChallengeIdeaClient<$Result.GetResult<Prisma.$ChallengeIdeaPayload<ExtArgs>, T, "findFirstOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find zero or more ChallengeIdeas that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {ChallengeIdeaFindManyArgs} args - Arguments to filter and select certain fields only.
     * @example
     * // Get all ChallengeIdeas
     * const challengeIdeas = await prisma.challengeIdea.findMany()
     * 
     * // Get first 10 ChallengeIdeas
     * const challengeIdeas = await prisma.challengeIdea.findMany({ take: 10 })
     * 
     * // Only select the `id`
     * const challengeIdeaWithIdOnly = await prisma.challengeIdea.findMany({ select: { id: true } })
     * 
     */
    findMany<T extends ChallengeIdeaFindManyArgs>(args?: SelectSubset<T, ChallengeIdeaFindManyArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$ChallengeIdeaPayload<ExtArgs>, T, "findMany", GlobalOmitOptions>>

    /**
     * Create a ChallengeIdea.
     * @param {ChallengeIdeaCreateArgs} args - Arguments to create a ChallengeIdea.
     * @example
     * // Create one ChallengeIdea
     * const ChallengeIdea = await prisma.challengeIdea.create({
     *   data: {
     *     // ... data to create a ChallengeIdea
     *   }
     * })
     * 
     */
    create<T extends ChallengeIdeaCreateArgs>(args: SelectSubset<T, ChallengeIdeaCreateArgs<ExtArgs>>): Prisma__ChallengeIdeaClient<$Result.GetResult<Prisma.$ChallengeIdeaPayload<ExtArgs>, T, "create", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Create many ChallengeIdeas.
     * @param {ChallengeIdeaCreateManyArgs} args - Arguments to create many ChallengeIdeas.
     * @example
     * // Create many ChallengeIdeas
     * const challengeIdea = await prisma.challengeIdea.createMany({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     *     
     */
    createMany<T extends ChallengeIdeaCreateManyArgs>(args?: SelectSubset<T, ChallengeIdeaCreateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Create many ChallengeIdeas and returns the data saved in the database.
     * @param {ChallengeIdeaCreateManyAndReturnArgs} args - Arguments to create many ChallengeIdeas.
     * @example
     * // Create many ChallengeIdeas
     * const challengeIdea = await prisma.challengeIdea.createManyAndReturn({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Create many ChallengeIdeas and only return the `id`
     * const challengeIdeaWithIdOnly = await prisma.challengeIdea.createManyAndReturn({
     *   select: { id: true },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    createManyAndReturn<T extends ChallengeIdeaCreateManyAndReturnArgs>(args?: SelectSubset<T, ChallengeIdeaCreateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$ChallengeIdeaPayload<ExtArgs>, T, "createManyAndReturn", GlobalOmitOptions>>

    /**
     * Delete a ChallengeIdea.
     * @param {ChallengeIdeaDeleteArgs} args - Arguments to delete one ChallengeIdea.
     * @example
     * // Delete one ChallengeIdea
     * const ChallengeIdea = await prisma.challengeIdea.delete({
     *   where: {
     *     // ... filter to delete one ChallengeIdea
     *   }
     * })
     * 
     */
    delete<T extends ChallengeIdeaDeleteArgs>(args: SelectSubset<T, ChallengeIdeaDeleteArgs<ExtArgs>>): Prisma__ChallengeIdeaClient<$Result.GetResult<Prisma.$ChallengeIdeaPayload<ExtArgs>, T, "delete", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Update one ChallengeIdea.
     * @param {ChallengeIdeaUpdateArgs} args - Arguments to update one ChallengeIdea.
     * @example
     * // Update one ChallengeIdea
     * const challengeIdea = await prisma.challengeIdea.update({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    update<T extends ChallengeIdeaUpdateArgs>(args: SelectSubset<T, ChallengeIdeaUpdateArgs<ExtArgs>>): Prisma__ChallengeIdeaClient<$Result.GetResult<Prisma.$ChallengeIdeaPayload<ExtArgs>, T, "update", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Delete zero or more ChallengeIdeas.
     * @param {ChallengeIdeaDeleteManyArgs} args - Arguments to filter ChallengeIdeas to delete.
     * @example
     * // Delete a few ChallengeIdeas
     * const { count } = await prisma.challengeIdea.deleteMany({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     * 
     */
    deleteMany<T extends ChallengeIdeaDeleteManyArgs>(args?: SelectSubset<T, ChallengeIdeaDeleteManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more ChallengeIdeas.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {ChallengeIdeaUpdateManyArgs} args - Arguments to update one or more rows.
     * @example
     * // Update many ChallengeIdeas
     * const challengeIdea = await prisma.challengeIdea.updateMany({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    updateMany<T extends ChallengeIdeaUpdateManyArgs>(args: SelectSubset<T, ChallengeIdeaUpdateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more ChallengeIdeas and returns the data updated in the database.
     * @param {ChallengeIdeaUpdateManyAndReturnArgs} args - Arguments to update many ChallengeIdeas.
     * @example
     * // Update many ChallengeIdeas
     * const challengeIdea = await prisma.challengeIdea.updateManyAndReturn({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Update zero or more ChallengeIdeas and only return the `id`
     * const challengeIdeaWithIdOnly = await prisma.challengeIdea.updateManyAndReturn({
     *   select: { id: true },
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    updateManyAndReturn<T extends ChallengeIdeaUpdateManyAndReturnArgs>(args: SelectSubset<T, ChallengeIdeaUpdateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$ChallengeIdeaPayload<ExtArgs>, T, "updateManyAndReturn", GlobalOmitOptions>>

    /**
     * Create or update one ChallengeIdea.
     * @param {ChallengeIdeaUpsertArgs} args - Arguments to update or create a ChallengeIdea.
     * @example
     * // Update or create a ChallengeIdea
     * const challengeIdea = await prisma.challengeIdea.upsert({
     *   create: {
     *     // ... data to create a ChallengeIdea
     *   },
     *   update: {
     *     // ... in case it already exists, update
     *   },
     *   where: {
     *     // ... the filter for the ChallengeIdea we want to update
     *   }
     * })
     */
    upsert<T extends ChallengeIdeaUpsertArgs>(args: SelectSubset<T, ChallengeIdeaUpsertArgs<ExtArgs>>): Prisma__ChallengeIdeaClient<$Result.GetResult<Prisma.$ChallengeIdeaPayload<ExtArgs>, T, "upsert", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>


    /**
     * Count the number of ChallengeIdeas.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {ChallengeIdeaCountArgs} args - Arguments to filter ChallengeIdeas to count.
     * @example
     * // Count the number of ChallengeIdeas
     * const count = await prisma.challengeIdea.count({
     *   where: {
     *     // ... the filter for the ChallengeIdeas we want to count
     *   }
     * })
    **/
    count<T extends ChallengeIdeaCountArgs>(
      args?: Subset<T, ChallengeIdeaCountArgs>,
    ): Prisma.PrismaPromise<
      T extends $Utils.Record<'select', any>
        ? T['select'] extends true
          ? number
          : GetScalarType<T['select'], ChallengeIdeaCountAggregateOutputType>
        : number
    >

    /**
     * Allows you to perform aggregations operations on a ChallengeIdea.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {ChallengeIdeaAggregateArgs} args - Select which aggregations you would like to apply and on what fields.
     * @example
     * // Ordered by age ascending
     * // Where email contains prisma.io
     * // Limited to the 10 users
     * const aggregations = await prisma.user.aggregate({
     *   _avg: {
     *     age: true,
     *   },
     *   where: {
     *     email: {
     *       contains: "prisma.io",
     *     },
     *   },
     *   orderBy: {
     *     age: "asc",
     *   },
     *   take: 10,
     * })
    **/
    aggregate<T extends ChallengeIdeaAggregateArgs>(args: Subset<T, ChallengeIdeaAggregateArgs>): Prisma.PrismaPromise<GetChallengeIdeaAggregateType<T>>

    /**
     * Group by ChallengeIdea.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {ChallengeIdeaGroupByArgs} args - Group by arguments.
     * @example
     * // Group by city, order by createdAt, get count
     * const result = await prisma.user.groupBy({
     *   by: ['city', 'createdAt'],
     *   orderBy: {
     *     createdAt: true
     *   },
     *   _count: {
     *     _all: true
     *   },
     * })
     * 
    **/
    groupBy<
      T extends ChallengeIdeaGroupByArgs,
      HasSelectOrTake extends Or<
        Extends<'skip', Keys<T>>,
        Extends<'take', Keys<T>>
      >,
      OrderByArg extends True extends HasSelectOrTake
        ? { orderBy: ChallengeIdeaGroupByArgs['orderBy'] }
        : { orderBy?: ChallengeIdeaGroupByArgs['orderBy'] },
      OrderFields extends ExcludeUnderscoreKeys<Keys<MaybeTupleToUnion<T['orderBy']>>>,
      ByFields extends MaybeTupleToUnion<T['by']>,
      ByValid extends Has<ByFields, OrderFields>,
      HavingFields extends GetHavingFields<T['having']>,
      HavingValid extends Has<ByFields, HavingFields>,
      ByEmpty extends T['by'] extends never[] ? True : False,
      InputErrors extends ByEmpty extends True
      ? `Error: "by" must not be empty.`
      : HavingValid extends False
      ? {
          [P in HavingFields]: P extends ByFields
            ? never
            : P extends string
            ? `Error: Field "${P}" used in "having" needs to be provided in "by".`
            : [
                Error,
                'Field ',
                P,
                ` in "having" needs to be provided in "by"`,
              ]
        }[HavingFields]
      : 'take' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "take", you also need to provide "orderBy"'
      : 'skip' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "skip", you also need to provide "orderBy"'
      : ByValid extends True
      ? {}
      : {
          [P in OrderFields]: P extends ByFields
            ? never
            : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
        }[OrderFields]
    >(args: SubsetIntersection<T, ChallengeIdeaGroupByArgs, OrderByArg> & InputErrors): {} extends InputErrors ? GetChallengeIdeaGroupByPayload<T> : Prisma.PrismaPromise<InputErrors>
  /**
   * Fields of the ChallengeIdea model
   */
  readonly fields: ChallengeIdeaFieldRefs;
  }

  /**
   * The delegate class that acts as a "Promise-like" for ChallengeIdea.
   * Why is this prefixed with `Prisma__`?
   * Because we want to prevent naming conflicts as mentioned in
   * https://github.com/prisma/prisma-client-js/issues/707
   */
  export interface Prisma__ChallengeIdeaClient<T, Null = never, ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> extends Prisma.PrismaPromise<T> {
    readonly [Symbol.toStringTag]: "PrismaPromise"
    /**
     * Attaches callbacks for the resolution and/or rejection of the Promise.
     * @param onfulfilled The callback to execute when the Promise is resolved.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of which ever callback is executed.
     */
    then<TResult1 = T, TResult2 = never>(onfulfilled?: ((value: T) => TResult1 | PromiseLike<TResult1>) | undefined | null, onrejected?: ((reason: any) => TResult2 | PromiseLike<TResult2>) | undefined | null): $Utils.JsPromise<TResult1 | TResult2>
    /**
     * Attaches a callback for only the rejection of the Promise.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of the callback.
     */
    catch<TResult = never>(onrejected?: ((reason: any) => TResult | PromiseLike<TResult>) | undefined | null): $Utils.JsPromise<T | TResult>
    /**
     * Attaches a callback that is invoked when the Promise is settled (fulfilled or rejected). The
     * resolved value cannot be modified from the callback.
     * @param onfinally The callback to execute when the Promise is settled (fulfilled or rejected).
     * @returns A Promise for the completion of the callback.
     */
    finally(onfinally?: (() => void) | undefined | null): $Utils.JsPromise<T>
  }




  /**
   * Fields of the ChallengeIdea model
   */
  interface ChallengeIdeaFieldRefs {
    readonly id: FieldRef<"ChallengeIdea", 'Int'>
    readonly index: FieldRef<"ChallengeIdea", 'Int'>
    readonly title: FieldRef<"ChallengeIdea", 'String'>
    readonly wish: FieldRef<"ChallengeIdea", 'String'>
    readonly dailyAction: FieldRef<"ChallengeIdea", 'String'>
    readonly description: FieldRef<"ChallengeIdea", 'String'>
    readonly sourceName: FieldRef<"ChallengeIdea", 'String'>
    readonly sourceLink: FieldRef<"ChallengeIdea", 'String'>
  }
    

  // Custom InputTypes
  /**
   * ChallengeIdea findUnique
   */
  export type ChallengeIdeaFindUniqueArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the ChallengeIdea
     */
    select?: ChallengeIdeaSelect<ExtArgs> | null
    /**
     * Omit specific fields from the ChallengeIdea
     */
    omit?: ChallengeIdeaOmit<ExtArgs> | null
    /**
     * Filter, which ChallengeIdea to fetch.
     */
    where: ChallengeIdeaWhereUniqueInput
  }

  /**
   * ChallengeIdea findUniqueOrThrow
   */
  export type ChallengeIdeaFindUniqueOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the ChallengeIdea
     */
    select?: ChallengeIdeaSelect<ExtArgs> | null
    /**
     * Omit specific fields from the ChallengeIdea
     */
    omit?: ChallengeIdeaOmit<ExtArgs> | null
    /**
     * Filter, which ChallengeIdea to fetch.
     */
    where: ChallengeIdeaWhereUniqueInput
  }

  /**
   * ChallengeIdea findFirst
   */
  export type ChallengeIdeaFindFirstArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the ChallengeIdea
     */
    select?: ChallengeIdeaSelect<ExtArgs> | null
    /**
     * Omit specific fields from the ChallengeIdea
     */
    omit?: ChallengeIdeaOmit<ExtArgs> | null
    /**
     * Filter, which ChallengeIdea to fetch.
     */
    where?: ChallengeIdeaWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of ChallengeIdeas to fetch.
     */
    orderBy?: ChallengeIdeaOrderByWithRelationInput | ChallengeIdeaOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for ChallengeIdeas.
     */
    cursor?: ChallengeIdeaWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` ChallengeIdeas from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` ChallengeIdeas.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of ChallengeIdeas.
     */
    distinct?: ChallengeIdeaScalarFieldEnum | ChallengeIdeaScalarFieldEnum[]
  }

  /**
   * ChallengeIdea findFirstOrThrow
   */
  export type ChallengeIdeaFindFirstOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the ChallengeIdea
     */
    select?: ChallengeIdeaSelect<ExtArgs> | null
    /**
     * Omit specific fields from the ChallengeIdea
     */
    omit?: ChallengeIdeaOmit<ExtArgs> | null
    /**
     * Filter, which ChallengeIdea to fetch.
     */
    where?: ChallengeIdeaWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of ChallengeIdeas to fetch.
     */
    orderBy?: ChallengeIdeaOrderByWithRelationInput | ChallengeIdeaOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for ChallengeIdeas.
     */
    cursor?: ChallengeIdeaWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` ChallengeIdeas from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` ChallengeIdeas.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of ChallengeIdeas.
     */
    distinct?: ChallengeIdeaScalarFieldEnum | ChallengeIdeaScalarFieldEnum[]
  }

  /**
   * ChallengeIdea findMany
   */
  export type ChallengeIdeaFindManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the ChallengeIdea
     */
    select?: ChallengeIdeaSelect<ExtArgs> | null
    /**
     * Omit specific fields from the ChallengeIdea
     */
    omit?: ChallengeIdeaOmit<ExtArgs> | null
    /**
     * Filter, which ChallengeIdeas to fetch.
     */
    where?: ChallengeIdeaWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of ChallengeIdeas to fetch.
     */
    orderBy?: ChallengeIdeaOrderByWithRelationInput | ChallengeIdeaOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for listing ChallengeIdeas.
     */
    cursor?: ChallengeIdeaWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` ChallengeIdeas from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` ChallengeIdeas.
     */
    skip?: number
    distinct?: ChallengeIdeaScalarFieldEnum | ChallengeIdeaScalarFieldEnum[]
  }

  /**
   * ChallengeIdea create
   */
  export type ChallengeIdeaCreateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the ChallengeIdea
     */
    select?: ChallengeIdeaSelect<ExtArgs> | null
    /**
     * Omit specific fields from the ChallengeIdea
     */
    omit?: ChallengeIdeaOmit<ExtArgs> | null
    /**
     * The data needed to create a ChallengeIdea.
     */
    data: XOR<ChallengeIdeaCreateInput, ChallengeIdeaUncheckedCreateInput>
  }

  /**
   * ChallengeIdea createMany
   */
  export type ChallengeIdeaCreateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to create many ChallengeIdeas.
     */
    data: ChallengeIdeaCreateManyInput | ChallengeIdeaCreateManyInput[]
    skipDuplicates?: boolean
  }

  /**
   * ChallengeIdea createManyAndReturn
   */
  export type ChallengeIdeaCreateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the ChallengeIdea
     */
    select?: ChallengeIdeaSelectCreateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the ChallengeIdea
     */
    omit?: ChallengeIdeaOmit<ExtArgs> | null
    /**
     * The data used to create many ChallengeIdeas.
     */
    data: ChallengeIdeaCreateManyInput | ChallengeIdeaCreateManyInput[]
    skipDuplicates?: boolean
  }

  /**
   * ChallengeIdea update
   */
  export type ChallengeIdeaUpdateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the ChallengeIdea
     */
    select?: ChallengeIdeaSelect<ExtArgs> | null
    /**
     * Omit specific fields from the ChallengeIdea
     */
    omit?: ChallengeIdeaOmit<ExtArgs> | null
    /**
     * The data needed to update a ChallengeIdea.
     */
    data: XOR<ChallengeIdeaUpdateInput, ChallengeIdeaUncheckedUpdateInput>
    /**
     * Choose, which ChallengeIdea to update.
     */
    where: ChallengeIdeaWhereUniqueInput
  }

  /**
   * ChallengeIdea updateMany
   */
  export type ChallengeIdeaUpdateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to update ChallengeIdeas.
     */
    data: XOR<ChallengeIdeaUpdateManyMutationInput, ChallengeIdeaUncheckedUpdateManyInput>
    /**
     * Filter which ChallengeIdeas to update
     */
    where?: ChallengeIdeaWhereInput
    /**
     * Limit how many ChallengeIdeas to update.
     */
    limit?: number
  }

  /**
   * ChallengeIdea updateManyAndReturn
   */
  export type ChallengeIdeaUpdateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the ChallengeIdea
     */
    select?: ChallengeIdeaSelectUpdateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the ChallengeIdea
     */
    omit?: ChallengeIdeaOmit<ExtArgs> | null
    /**
     * The data used to update ChallengeIdeas.
     */
    data: XOR<ChallengeIdeaUpdateManyMutationInput, ChallengeIdeaUncheckedUpdateManyInput>
    /**
     * Filter which ChallengeIdeas to update
     */
    where?: ChallengeIdeaWhereInput
    /**
     * Limit how many ChallengeIdeas to update.
     */
    limit?: number
  }

  /**
   * ChallengeIdea upsert
   */
  export type ChallengeIdeaUpsertArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the ChallengeIdea
     */
    select?: ChallengeIdeaSelect<ExtArgs> | null
    /**
     * Omit specific fields from the ChallengeIdea
     */
    omit?: ChallengeIdeaOmit<ExtArgs> | null
    /**
     * The filter to search for the ChallengeIdea to update in case it exists.
     */
    where: ChallengeIdeaWhereUniqueInput
    /**
     * In case the ChallengeIdea found by the `where` argument doesn't exist, create a new ChallengeIdea with this data.
     */
    create: XOR<ChallengeIdeaCreateInput, ChallengeIdeaUncheckedCreateInput>
    /**
     * In case the ChallengeIdea was found with the provided `where` argument, update it with this data.
     */
    update: XOR<ChallengeIdeaUpdateInput, ChallengeIdeaUncheckedUpdateInput>
  }

  /**
   * ChallengeIdea delete
   */
  export type ChallengeIdeaDeleteArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the ChallengeIdea
     */
    select?: ChallengeIdeaSelect<ExtArgs> | null
    /**
     * Omit specific fields from the ChallengeIdea
     */
    omit?: ChallengeIdeaOmit<ExtArgs> | null
    /**
     * Filter which ChallengeIdea to delete.
     */
    where: ChallengeIdeaWhereUniqueInput
  }

  /**
   * ChallengeIdea deleteMany
   */
  export type ChallengeIdeaDeleteManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which ChallengeIdeas to delete
     */
    where?: ChallengeIdeaWhereInput
    /**
     * Limit how many ChallengeIdeas to delete.
     */
    limit?: number
  }

  /**
   * ChallengeIdea without action
   */
  export type ChallengeIdeaDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the ChallengeIdea
     */
    select?: ChallengeIdeaSelect<ExtArgs> | null
    /**
     * Omit specific fields from the ChallengeIdea
     */
    omit?: ChallengeIdeaOmit<ExtArgs> | null
  }


  /**
   * Enums
   */

  export const TransactionIsolationLevel: {
    ReadUncommitted: 'ReadUncommitted',
    ReadCommitted: 'ReadCommitted',
    RepeatableRead: 'RepeatableRead',
    Serializable: 'Serializable'
  };

  export type TransactionIsolationLevel = (typeof TransactionIsolationLevel)[keyof typeof TransactionIsolationLevel]


  export const UserScalarFieldEnum: {
    id: 'id',
    email: 'email',
    username: 'username',
    imageUrl: 'imageUrl',
    clerkId: 'clerkId',
    createdAt: 'createdAt',
    updatedAt: 'updatedAt'
  };

  export type UserScalarFieldEnum = (typeof UserScalarFieldEnum)[keyof typeof UserScalarFieldEnum]


  export const ChallengeScalarFieldEnum: {
    id: 'id',
    title: 'title',
    wish: 'wish',
    dailyAction: 'dailyAction',
    icon: 'icon',
    note: 'note',
    startDate: 'startDate',
    endDate: 'endDate',
    createdAt: 'createdAt',
    updatedAt: 'updatedAt',
    userId: 'userId'
  };

  export type ChallengeScalarFieldEnum = (typeof ChallengeScalarFieldEnum)[keyof typeof ChallengeScalarFieldEnum]


  export const DailyProgressScalarFieldEnum: {
    id: 'id',
    date: 'date',
    completed: 'completed',
    imageUrl: 'imageUrl',
    note: 'note',
    challengeId: 'challengeId',
    userId: 'userId',
    createdAt: 'createdAt',
    updatedAt: 'updatedAt'
  };

  export type DailyProgressScalarFieldEnum = (typeof DailyProgressScalarFieldEnum)[keyof typeof DailyProgressScalarFieldEnum]


  export const ChallengeIdeaScalarFieldEnum: {
    id: 'id',
    index: 'index',
    title: 'title',
    wish: 'wish',
    dailyAction: 'dailyAction',
    description: 'description',
    sourceName: 'sourceName',
    sourceLink: 'sourceLink'
  };

  export type ChallengeIdeaScalarFieldEnum = (typeof ChallengeIdeaScalarFieldEnum)[keyof typeof ChallengeIdeaScalarFieldEnum]


  export const SortOrder: {
    asc: 'asc',
    desc: 'desc'
  };

  export type SortOrder = (typeof SortOrder)[keyof typeof SortOrder]


  export const QueryMode: {
    default: 'default',
    insensitive: 'insensitive'
  };

  export type QueryMode = (typeof QueryMode)[keyof typeof QueryMode]


  /**
   * Field references
   */


  /**
   * Reference to a field of type 'String'
   */
  export type StringFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'String'>
    


  /**
   * Reference to a field of type 'String[]'
   */
  export type ListStringFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'String[]'>
    


  /**
   * Reference to a field of type 'DateTime'
   */
  export type DateTimeFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'DateTime'>
    


  /**
   * Reference to a field of type 'DateTime[]'
   */
  export type ListDateTimeFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'DateTime[]'>
    


  /**
   * Reference to a field of type 'Boolean'
   */
  export type BooleanFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'Boolean'>
    


  /**
   * Reference to a field of type 'Int'
   */
  export type IntFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'Int'>
    


  /**
   * Reference to a field of type 'Int[]'
   */
  export type ListIntFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'Int[]'>
    


  /**
   * Reference to a field of type 'Float'
   */
  export type FloatFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'Float'>
    


  /**
   * Reference to a field of type 'Float[]'
   */
  export type ListFloatFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'Float[]'>
    
  /**
   * Deep Input Types
   */


  export type UserWhereInput = {
    AND?: UserWhereInput | UserWhereInput[]
    OR?: UserWhereInput[]
    NOT?: UserWhereInput | UserWhereInput[]
    id?: StringFilter<"User"> | string
    email?: StringFilter<"User"> | string
    username?: StringFilter<"User"> | string
    imageUrl?: StringFilter<"User"> | string
    clerkId?: StringFilter<"User"> | string
    createdAt?: DateTimeFilter<"User"> | Date | string
    updatedAt?: DateTimeFilter<"User"> | Date | string
    challenges?: ChallengeListRelationFilter
    DailyProgress?: DailyProgressListRelationFilter
  }

  export type UserOrderByWithRelationInput = {
    id?: SortOrder
    email?: SortOrder
    username?: SortOrder
    imageUrl?: SortOrder
    clerkId?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
    challenges?: ChallengeOrderByRelationAggregateInput
    DailyProgress?: DailyProgressOrderByRelationAggregateInput
  }

  export type UserWhereUniqueInput = Prisma.AtLeast<{
    id?: string
    email?: string
    username?: string
    clerkId?: string
    AND?: UserWhereInput | UserWhereInput[]
    OR?: UserWhereInput[]
    NOT?: UserWhereInput | UserWhereInput[]
    imageUrl?: StringFilter<"User"> | string
    createdAt?: DateTimeFilter<"User"> | Date | string
    updatedAt?: DateTimeFilter<"User"> | Date | string
    challenges?: ChallengeListRelationFilter
    DailyProgress?: DailyProgressListRelationFilter
  }, "id" | "email" | "username" | "clerkId">

  export type UserOrderByWithAggregationInput = {
    id?: SortOrder
    email?: SortOrder
    username?: SortOrder
    imageUrl?: SortOrder
    clerkId?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
    _count?: UserCountOrderByAggregateInput
    _max?: UserMaxOrderByAggregateInput
    _min?: UserMinOrderByAggregateInput
  }

  export type UserScalarWhereWithAggregatesInput = {
    AND?: UserScalarWhereWithAggregatesInput | UserScalarWhereWithAggregatesInput[]
    OR?: UserScalarWhereWithAggregatesInput[]
    NOT?: UserScalarWhereWithAggregatesInput | UserScalarWhereWithAggregatesInput[]
    id?: StringWithAggregatesFilter<"User"> | string
    email?: StringWithAggregatesFilter<"User"> | string
    username?: StringWithAggregatesFilter<"User"> | string
    imageUrl?: StringWithAggregatesFilter<"User"> | string
    clerkId?: StringWithAggregatesFilter<"User"> | string
    createdAt?: DateTimeWithAggregatesFilter<"User"> | Date | string
    updatedAt?: DateTimeWithAggregatesFilter<"User"> | Date | string
  }

  export type ChallengeWhereInput = {
    AND?: ChallengeWhereInput | ChallengeWhereInput[]
    OR?: ChallengeWhereInput[]
    NOT?: ChallengeWhereInput | ChallengeWhereInput[]
    id?: StringFilter<"Challenge"> | string
    title?: StringFilter<"Challenge"> | string
    wish?: StringFilter<"Challenge"> | string
    dailyAction?: StringFilter<"Challenge"> | string
    icon?: StringFilter<"Challenge"> | string
    note?: StringFilter<"Challenge"> | string
    startDate?: DateTimeFilter<"Challenge"> | Date | string
    endDate?: DateTimeFilter<"Challenge"> | Date | string
    createdAt?: DateTimeFilter<"Challenge"> | Date | string
    updatedAt?: DateTimeFilter<"Challenge"> | Date | string
    userId?: StringFilter<"Challenge"> | string
    user?: XOR<UserScalarRelationFilter, UserWhereInput>
    dailyProgress?: DailyProgressListRelationFilter
  }

  export type ChallengeOrderByWithRelationInput = {
    id?: SortOrder
    title?: SortOrder
    wish?: SortOrder
    dailyAction?: SortOrder
    icon?: SortOrder
    note?: SortOrder
    startDate?: SortOrder
    endDate?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
    userId?: SortOrder
    user?: UserOrderByWithRelationInput
    dailyProgress?: DailyProgressOrderByRelationAggregateInput
  }

  export type ChallengeWhereUniqueInput = Prisma.AtLeast<{
    id?: string
    AND?: ChallengeWhereInput | ChallengeWhereInput[]
    OR?: ChallengeWhereInput[]
    NOT?: ChallengeWhereInput | ChallengeWhereInput[]
    title?: StringFilter<"Challenge"> | string
    wish?: StringFilter<"Challenge"> | string
    dailyAction?: StringFilter<"Challenge"> | string
    icon?: StringFilter<"Challenge"> | string
    note?: StringFilter<"Challenge"> | string
    startDate?: DateTimeFilter<"Challenge"> | Date | string
    endDate?: DateTimeFilter<"Challenge"> | Date | string
    createdAt?: DateTimeFilter<"Challenge"> | Date | string
    updatedAt?: DateTimeFilter<"Challenge"> | Date | string
    userId?: StringFilter<"Challenge"> | string
    user?: XOR<UserScalarRelationFilter, UserWhereInput>
    dailyProgress?: DailyProgressListRelationFilter
  }, "id">

  export type ChallengeOrderByWithAggregationInput = {
    id?: SortOrder
    title?: SortOrder
    wish?: SortOrder
    dailyAction?: SortOrder
    icon?: SortOrder
    note?: SortOrder
    startDate?: SortOrder
    endDate?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
    userId?: SortOrder
    _count?: ChallengeCountOrderByAggregateInput
    _max?: ChallengeMaxOrderByAggregateInput
    _min?: ChallengeMinOrderByAggregateInput
  }

  export type ChallengeScalarWhereWithAggregatesInput = {
    AND?: ChallengeScalarWhereWithAggregatesInput | ChallengeScalarWhereWithAggregatesInput[]
    OR?: ChallengeScalarWhereWithAggregatesInput[]
    NOT?: ChallengeScalarWhereWithAggregatesInput | ChallengeScalarWhereWithAggregatesInput[]
    id?: StringWithAggregatesFilter<"Challenge"> | string
    title?: StringWithAggregatesFilter<"Challenge"> | string
    wish?: StringWithAggregatesFilter<"Challenge"> | string
    dailyAction?: StringWithAggregatesFilter<"Challenge"> | string
    icon?: StringWithAggregatesFilter<"Challenge"> | string
    note?: StringWithAggregatesFilter<"Challenge"> | string
    startDate?: DateTimeWithAggregatesFilter<"Challenge"> | Date | string
    endDate?: DateTimeWithAggregatesFilter<"Challenge"> | Date | string
    createdAt?: DateTimeWithAggregatesFilter<"Challenge"> | Date | string
    updatedAt?: DateTimeWithAggregatesFilter<"Challenge"> | Date | string
    userId?: StringWithAggregatesFilter<"Challenge"> | string
  }

  export type DailyProgressWhereInput = {
    AND?: DailyProgressWhereInput | DailyProgressWhereInput[]
    OR?: DailyProgressWhereInput[]
    NOT?: DailyProgressWhereInput | DailyProgressWhereInput[]
    id?: StringFilter<"DailyProgress"> | string
    date?: DateTimeFilter<"DailyProgress"> | Date | string
    completed?: BoolFilter<"DailyProgress"> | boolean
    imageUrl?: StringFilter<"DailyProgress"> | string
    note?: StringFilter<"DailyProgress"> | string
    challengeId?: StringFilter<"DailyProgress"> | string
    userId?: StringFilter<"DailyProgress"> | string
    createdAt?: DateTimeFilter<"DailyProgress"> | Date | string
    updatedAt?: DateTimeFilter<"DailyProgress"> | Date | string
    challenge?: XOR<ChallengeScalarRelationFilter, ChallengeWhereInput>
    user?: XOR<UserScalarRelationFilter, UserWhereInput>
  }

  export type DailyProgressOrderByWithRelationInput = {
    id?: SortOrder
    date?: SortOrder
    completed?: SortOrder
    imageUrl?: SortOrder
    note?: SortOrder
    challengeId?: SortOrder
    userId?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
    challenge?: ChallengeOrderByWithRelationInput
    user?: UserOrderByWithRelationInput
  }

  export type DailyProgressWhereUniqueInput = Prisma.AtLeast<{
    id?: string
    AND?: DailyProgressWhereInput | DailyProgressWhereInput[]
    OR?: DailyProgressWhereInput[]
    NOT?: DailyProgressWhereInput | DailyProgressWhereInput[]
    date?: DateTimeFilter<"DailyProgress"> | Date | string
    completed?: BoolFilter<"DailyProgress"> | boolean
    imageUrl?: StringFilter<"DailyProgress"> | string
    note?: StringFilter<"DailyProgress"> | string
    challengeId?: StringFilter<"DailyProgress"> | string
    userId?: StringFilter<"DailyProgress"> | string
    createdAt?: DateTimeFilter<"DailyProgress"> | Date | string
    updatedAt?: DateTimeFilter<"DailyProgress"> | Date | string
    challenge?: XOR<ChallengeScalarRelationFilter, ChallengeWhereInput>
    user?: XOR<UserScalarRelationFilter, UserWhereInput>
  }, "id">

  export type DailyProgressOrderByWithAggregationInput = {
    id?: SortOrder
    date?: SortOrder
    completed?: SortOrder
    imageUrl?: SortOrder
    note?: SortOrder
    challengeId?: SortOrder
    userId?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
    _count?: DailyProgressCountOrderByAggregateInput
    _max?: DailyProgressMaxOrderByAggregateInput
    _min?: DailyProgressMinOrderByAggregateInput
  }

  export type DailyProgressScalarWhereWithAggregatesInput = {
    AND?: DailyProgressScalarWhereWithAggregatesInput | DailyProgressScalarWhereWithAggregatesInput[]
    OR?: DailyProgressScalarWhereWithAggregatesInput[]
    NOT?: DailyProgressScalarWhereWithAggregatesInput | DailyProgressScalarWhereWithAggregatesInput[]
    id?: StringWithAggregatesFilter<"DailyProgress"> | string
    date?: DateTimeWithAggregatesFilter<"DailyProgress"> | Date | string
    completed?: BoolWithAggregatesFilter<"DailyProgress"> | boolean
    imageUrl?: StringWithAggregatesFilter<"DailyProgress"> | string
    note?: StringWithAggregatesFilter<"DailyProgress"> | string
    challengeId?: StringWithAggregatesFilter<"DailyProgress"> | string
    userId?: StringWithAggregatesFilter<"DailyProgress"> | string
    createdAt?: DateTimeWithAggregatesFilter<"DailyProgress"> | Date | string
    updatedAt?: DateTimeWithAggregatesFilter<"DailyProgress"> | Date | string
  }

  export type ChallengeIdeaWhereInput = {
    AND?: ChallengeIdeaWhereInput | ChallengeIdeaWhereInput[]
    OR?: ChallengeIdeaWhereInput[]
    NOT?: ChallengeIdeaWhereInput | ChallengeIdeaWhereInput[]
    id?: IntFilter<"ChallengeIdea"> | number
    index?: IntFilter<"ChallengeIdea"> | number
    title?: StringFilter<"ChallengeIdea"> | string
    wish?: StringFilter<"ChallengeIdea"> | string
    dailyAction?: StringFilter<"ChallengeIdea"> | string
    description?: StringFilter<"ChallengeIdea"> | string
    sourceName?: StringFilter<"ChallengeIdea"> | string
    sourceLink?: StringFilter<"ChallengeIdea"> | string
  }

  export type ChallengeIdeaOrderByWithRelationInput = {
    id?: SortOrder
    index?: SortOrder
    title?: SortOrder
    wish?: SortOrder
    dailyAction?: SortOrder
    description?: SortOrder
    sourceName?: SortOrder
    sourceLink?: SortOrder
  }

  export type ChallengeIdeaWhereUniqueInput = Prisma.AtLeast<{
    id?: number
    AND?: ChallengeIdeaWhereInput | ChallengeIdeaWhereInput[]
    OR?: ChallengeIdeaWhereInput[]
    NOT?: ChallengeIdeaWhereInput | ChallengeIdeaWhereInput[]
    index?: IntFilter<"ChallengeIdea"> | number
    title?: StringFilter<"ChallengeIdea"> | string
    wish?: StringFilter<"ChallengeIdea"> | string
    dailyAction?: StringFilter<"ChallengeIdea"> | string
    description?: StringFilter<"ChallengeIdea"> | string
    sourceName?: StringFilter<"ChallengeIdea"> | string
    sourceLink?: StringFilter<"ChallengeIdea"> | string
  }, "id">

  export type ChallengeIdeaOrderByWithAggregationInput = {
    id?: SortOrder
    index?: SortOrder
    title?: SortOrder
    wish?: SortOrder
    dailyAction?: SortOrder
    description?: SortOrder
    sourceName?: SortOrder
    sourceLink?: SortOrder
    _count?: ChallengeIdeaCountOrderByAggregateInput
    _avg?: ChallengeIdeaAvgOrderByAggregateInput
    _max?: ChallengeIdeaMaxOrderByAggregateInput
    _min?: ChallengeIdeaMinOrderByAggregateInput
    _sum?: ChallengeIdeaSumOrderByAggregateInput
  }

  export type ChallengeIdeaScalarWhereWithAggregatesInput = {
    AND?: ChallengeIdeaScalarWhereWithAggregatesInput | ChallengeIdeaScalarWhereWithAggregatesInput[]
    OR?: ChallengeIdeaScalarWhereWithAggregatesInput[]
    NOT?: ChallengeIdeaScalarWhereWithAggregatesInput | ChallengeIdeaScalarWhereWithAggregatesInput[]
    id?: IntWithAggregatesFilter<"ChallengeIdea"> | number
    index?: IntWithAggregatesFilter<"ChallengeIdea"> | number
    title?: StringWithAggregatesFilter<"ChallengeIdea"> | string
    wish?: StringWithAggregatesFilter<"ChallengeIdea"> | string
    dailyAction?: StringWithAggregatesFilter<"ChallengeIdea"> | string
    description?: StringWithAggregatesFilter<"ChallengeIdea"> | string
    sourceName?: StringWithAggregatesFilter<"ChallengeIdea"> | string
    sourceLink?: StringWithAggregatesFilter<"ChallengeIdea"> | string
  }

  export type UserCreateInput = {
    id?: string
    email: string
    username: string
    imageUrl: string
    clerkId: string
    createdAt?: Date | string
    updatedAt?: Date | string
    challenges?: ChallengeCreateNestedManyWithoutUserInput
    DailyProgress?: DailyProgressCreateNestedManyWithoutUserInput
  }

  export type UserUncheckedCreateInput = {
    id?: string
    email: string
    username: string
    imageUrl: string
    clerkId: string
    createdAt?: Date | string
    updatedAt?: Date | string
    challenges?: ChallengeUncheckedCreateNestedManyWithoutUserInput
    DailyProgress?: DailyProgressUncheckedCreateNestedManyWithoutUserInput
  }

  export type UserUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    email?: StringFieldUpdateOperationsInput | string
    username?: StringFieldUpdateOperationsInput | string
    imageUrl?: StringFieldUpdateOperationsInput | string
    clerkId?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    challenges?: ChallengeUpdateManyWithoutUserNestedInput
    DailyProgress?: DailyProgressUpdateManyWithoutUserNestedInput
  }

  export type UserUncheckedUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    email?: StringFieldUpdateOperationsInput | string
    username?: StringFieldUpdateOperationsInput | string
    imageUrl?: StringFieldUpdateOperationsInput | string
    clerkId?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    challenges?: ChallengeUncheckedUpdateManyWithoutUserNestedInput
    DailyProgress?: DailyProgressUncheckedUpdateManyWithoutUserNestedInput
  }

  export type UserCreateManyInput = {
    id?: string
    email: string
    username: string
    imageUrl: string
    clerkId: string
    createdAt?: Date | string
    updatedAt?: Date | string
  }

  export type UserUpdateManyMutationInput = {
    id?: StringFieldUpdateOperationsInput | string
    email?: StringFieldUpdateOperationsInput | string
    username?: StringFieldUpdateOperationsInput | string
    imageUrl?: StringFieldUpdateOperationsInput | string
    clerkId?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type UserUncheckedUpdateManyInput = {
    id?: StringFieldUpdateOperationsInput | string
    email?: StringFieldUpdateOperationsInput | string
    username?: StringFieldUpdateOperationsInput | string
    imageUrl?: StringFieldUpdateOperationsInput | string
    clerkId?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type ChallengeCreateInput = {
    id?: string
    title: string
    wish: string
    dailyAction: string
    icon?: string
    note?: string
    startDate: Date | string
    endDate: Date | string
    createdAt?: Date | string
    updatedAt?: Date | string
    user: UserCreateNestedOneWithoutChallengesInput
    dailyProgress?: DailyProgressCreateNestedManyWithoutChallengeInput
  }

  export type ChallengeUncheckedCreateInput = {
    id?: string
    title: string
    wish: string
    dailyAction: string
    icon?: string
    note?: string
    startDate: Date | string
    endDate: Date | string
    createdAt?: Date | string
    updatedAt?: Date | string
    userId: string
    dailyProgress?: DailyProgressUncheckedCreateNestedManyWithoutChallengeInput
  }

  export type ChallengeUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    title?: StringFieldUpdateOperationsInput | string
    wish?: StringFieldUpdateOperationsInput | string
    dailyAction?: StringFieldUpdateOperationsInput | string
    icon?: StringFieldUpdateOperationsInput | string
    note?: StringFieldUpdateOperationsInput | string
    startDate?: DateTimeFieldUpdateOperationsInput | Date | string
    endDate?: DateTimeFieldUpdateOperationsInput | Date | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    user?: UserUpdateOneRequiredWithoutChallengesNestedInput
    dailyProgress?: DailyProgressUpdateManyWithoutChallengeNestedInput
  }

  export type ChallengeUncheckedUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    title?: StringFieldUpdateOperationsInput | string
    wish?: StringFieldUpdateOperationsInput | string
    dailyAction?: StringFieldUpdateOperationsInput | string
    icon?: StringFieldUpdateOperationsInput | string
    note?: StringFieldUpdateOperationsInput | string
    startDate?: DateTimeFieldUpdateOperationsInput | Date | string
    endDate?: DateTimeFieldUpdateOperationsInput | Date | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    userId?: StringFieldUpdateOperationsInput | string
    dailyProgress?: DailyProgressUncheckedUpdateManyWithoutChallengeNestedInput
  }

  export type ChallengeCreateManyInput = {
    id?: string
    title: string
    wish: string
    dailyAction: string
    icon?: string
    note?: string
    startDate: Date | string
    endDate: Date | string
    createdAt?: Date | string
    updatedAt?: Date | string
    userId: string
  }

  export type ChallengeUpdateManyMutationInput = {
    id?: StringFieldUpdateOperationsInput | string
    title?: StringFieldUpdateOperationsInput | string
    wish?: StringFieldUpdateOperationsInput | string
    dailyAction?: StringFieldUpdateOperationsInput | string
    icon?: StringFieldUpdateOperationsInput | string
    note?: StringFieldUpdateOperationsInput | string
    startDate?: DateTimeFieldUpdateOperationsInput | Date | string
    endDate?: DateTimeFieldUpdateOperationsInput | Date | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type ChallengeUncheckedUpdateManyInput = {
    id?: StringFieldUpdateOperationsInput | string
    title?: StringFieldUpdateOperationsInput | string
    wish?: StringFieldUpdateOperationsInput | string
    dailyAction?: StringFieldUpdateOperationsInput | string
    icon?: StringFieldUpdateOperationsInput | string
    note?: StringFieldUpdateOperationsInput | string
    startDate?: DateTimeFieldUpdateOperationsInput | Date | string
    endDate?: DateTimeFieldUpdateOperationsInput | Date | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    userId?: StringFieldUpdateOperationsInput | string
  }

  export type DailyProgressCreateInput = {
    id?: string
    date: Date | string
    completed: boolean
    imageUrl?: string
    note?: string
    createdAt?: Date | string
    updatedAt?: Date | string
    challenge: ChallengeCreateNestedOneWithoutDailyProgressInput
    user: UserCreateNestedOneWithoutDailyProgressInput
  }

  export type DailyProgressUncheckedCreateInput = {
    id?: string
    date: Date | string
    completed: boolean
    imageUrl?: string
    note?: string
    challengeId: string
    userId: string
    createdAt?: Date | string
    updatedAt?: Date | string
  }

  export type DailyProgressUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    date?: DateTimeFieldUpdateOperationsInput | Date | string
    completed?: BoolFieldUpdateOperationsInput | boolean
    imageUrl?: StringFieldUpdateOperationsInput | string
    note?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    challenge?: ChallengeUpdateOneRequiredWithoutDailyProgressNestedInput
    user?: UserUpdateOneRequiredWithoutDailyProgressNestedInput
  }

  export type DailyProgressUncheckedUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    date?: DateTimeFieldUpdateOperationsInput | Date | string
    completed?: BoolFieldUpdateOperationsInput | boolean
    imageUrl?: StringFieldUpdateOperationsInput | string
    note?: StringFieldUpdateOperationsInput | string
    challengeId?: StringFieldUpdateOperationsInput | string
    userId?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type DailyProgressCreateManyInput = {
    id?: string
    date: Date | string
    completed: boolean
    imageUrl?: string
    note?: string
    challengeId: string
    userId: string
    createdAt?: Date | string
    updatedAt?: Date | string
  }

  export type DailyProgressUpdateManyMutationInput = {
    id?: StringFieldUpdateOperationsInput | string
    date?: DateTimeFieldUpdateOperationsInput | Date | string
    completed?: BoolFieldUpdateOperationsInput | boolean
    imageUrl?: StringFieldUpdateOperationsInput | string
    note?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type DailyProgressUncheckedUpdateManyInput = {
    id?: StringFieldUpdateOperationsInput | string
    date?: DateTimeFieldUpdateOperationsInput | Date | string
    completed?: BoolFieldUpdateOperationsInput | boolean
    imageUrl?: StringFieldUpdateOperationsInput | string
    note?: StringFieldUpdateOperationsInput | string
    challengeId?: StringFieldUpdateOperationsInput | string
    userId?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type ChallengeIdeaCreateInput = {
    index: number
    title: string
    wish: string
    dailyAction: string
    description: string
    sourceName: string
    sourceLink: string
  }

  export type ChallengeIdeaUncheckedCreateInput = {
    id?: number
    index: number
    title: string
    wish: string
    dailyAction: string
    description: string
    sourceName: string
    sourceLink: string
  }

  export type ChallengeIdeaUpdateInput = {
    index?: IntFieldUpdateOperationsInput | number
    title?: StringFieldUpdateOperationsInput | string
    wish?: StringFieldUpdateOperationsInput | string
    dailyAction?: StringFieldUpdateOperationsInput | string
    description?: StringFieldUpdateOperationsInput | string
    sourceName?: StringFieldUpdateOperationsInput | string
    sourceLink?: StringFieldUpdateOperationsInput | string
  }

  export type ChallengeIdeaUncheckedUpdateInput = {
    id?: IntFieldUpdateOperationsInput | number
    index?: IntFieldUpdateOperationsInput | number
    title?: StringFieldUpdateOperationsInput | string
    wish?: StringFieldUpdateOperationsInput | string
    dailyAction?: StringFieldUpdateOperationsInput | string
    description?: StringFieldUpdateOperationsInput | string
    sourceName?: StringFieldUpdateOperationsInput | string
    sourceLink?: StringFieldUpdateOperationsInput | string
  }

  export type ChallengeIdeaCreateManyInput = {
    id?: number
    index: number
    title: string
    wish: string
    dailyAction: string
    description: string
    sourceName: string
    sourceLink: string
  }

  export type ChallengeIdeaUpdateManyMutationInput = {
    index?: IntFieldUpdateOperationsInput | number
    title?: StringFieldUpdateOperationsInput | string
    wish?: StringFieldUpdateOperationsInput | string
    dailyAction?: StringFieldUpdateOperationsInput | string
    description?: StringFieldUpdateOperationsInput | string
    sourceName?: StringFieldUpdateOperationsInput | string
    sourceLink?: StringFieldUpdateOperationsInput | string
  }

  export type ChallengeIdeaUncheckedUpdateManyInput = {
    id?: IntFieldUpdateOperationsInput | number
    index?: IntFieldUpdateOperationsInput | number
    title?: StringFieldUpdateOperationsInput | string
    wish?: StringFieldUpdateOperationsInput | string
    dailyAction?: StringFieldUpdateOperationsInput | string
    description?: StringFieldUpdateOperationsInput | string
    sourceName?: StringFieldUpdateOperationsInput | string
    sourceLink?: StringFieldUpdateOperationsInput | string
  }

  export type StringFilter<$PrismaModel = never> = {
    equals?: string | StringFieldRefInput<$PrismaModel>
    in?: string[] | ListStringFieldRefInput<$PrismaModel>
    notIn?: string[] | ListStringFieldRefInput<$PrismaModel>
    lt?: string | StringFieldRefInput<$PrismaModel>
    lte?: string | StringFieldRefInput<$PrismaModel>
    gt?: string | StringFieldRefInput<$PrismaModel>
    gte?: string | StringFieldRefInput<$PrismaModel>
    contains?: string | StringFieldRefInput<$PrismaModel>
    startsWith?: string | StringFieldRefInput<$PrismaModel>
    endsWith?: string | StringFieldRefInput<$PrismaModel>
    mode?: QueryMode
    not?: NestedStringFilter<$PrismaModel> | string
  }

  export type DateTimeFilter<$PrismaModel = never> = {
    equals?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    in?: Date[] | string[] | ListDateTimeFieldRefInput<$PrismaModel>
    notIn?: Date[] | string[] | ListDateTimeFieldRefInput<$PrismaModel>
    lt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    lte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    not?: NestedDateTimeFilter<$PrismaModel> | Date | string
  }

  export type ChallengeListRelationFilter = {
    every?: ChallengeWhereInput
    some?: ChallengeWhereInput
    none?: ChallengeWhereInput
  }

  export type DailyProgressListRelationFilter = {
    every?: DailyProgressWhereInput
    some?: DailyProgressWhereInput
    none?: DailyProgressWhereInput
  }

  export type ChallengeOrderByRelationAggregateInput = {
    _count?: SortOrder
  }

  export type DailyProgressOrderByRelationAggregateInput = {
    _count?: SortOrder
  }

  export type UserCountOrderByAggregateInput = {
    id?: SortOrder
    email?: SortOrder
    username?: SortOrder
    imageUrl?: SortOrder
    clerkId?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
  }

  export type UserMaxOrderByAggregateInput = {
    id?: SortOrder
    email?: SortOrder
    username?: SortOrder
    imageUrl?: SortOrder
    clerkId?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
  }

  export type UserMinOrderByAggregateInput = {
    id?: SortOrder
    email?: SortOrder
    username?: SortOrder
    imageUrl?: SortOrder
    clerkId?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
  }

  export type StringWithAggregatesFilter<$PrismaModel = never> = {
    equals?: string | StringFieldRefInput<$PrismaModel>
    in?: string[] | ListStringFieldRefInput<$PrismaModel>
    notIn?: string[] | ListStringFieldRefInput<$PrismaModel>
    lt?: string | StringFieldRefInput<$PrismaModel>
    lte?: string | StringFieldRefInput<$PrismaModel>
    gt?: string | StringFieldRefInput<$PrismaModel>
    gte?: string | StringFieldRefInput<$PrismaModel>
    contains?: string | StringFieldRefInput<$PrismaModel>
    startsWith?: string | StringFieldRefInput<$PrismaModel>
    endsWith?: string | StringFieldRefInput<$PrismaModel>
    mode?: QueryMode
    not?: NestedStringWithAggregatesFilter<$PrismaModel> | string
    _count?: NestedIntFilter<$PrismaModel>
    _min?: NestedStringFilter<$PrismaModel>
    _max?: NestedStringFilter<$PrismaModel>
  }

  export type DateTimeWithAggregatesFilter<$PrismaModel = never> = {
    equals?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    in?: Date[] | string[] | ListDateTimeFieldRefInput<$PrismaModel>
    notIn?: Date[] | string[] | ListDateTimeFieldRefInput<$PrismaModel>
    lt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    lte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    not?: NestedDateTimeWithAggregatesFilter<$PrismaModel> | Date | string
    _count?: NestedIntFilter<$PrismaModel>
    _min?: NestedDateTimeFilter<$PrismaModel>
    _max?: NestedDateTimeFilter<$PrismaModel>
  }

  export type UserScalarRelationFilter = {
    is?: UserWhereInput
    isNot?: UserWhereInput
  }

  export type ChallengeCountOrderByAggregateInput = {
    id?: SortOrder
    title?: SortOrder
    wish?: SortOrder
    dailyAction?: SortOrder
    icon?: SortOrder
    note?: SortOrder
    startDate?: SortOrder
    endDate?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
    userId?: SortOrder
  }

  export type ChallengeMaxOrderByAggregateInput = {
    id?: SortOrder
    title?: SortOrder
    wish?: SortOrder
    dailyAction?: SortOrder
    icon?: SortOrder
    note?: SortOrder
    startDate?: SortOrder
    endDate?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
    userId?: SortOrder
  }

  export type ChallengeMinOrderByAggregateInput = {
    id?: SortOrder
    title?: SortOrder
    wish?: SortOrder
    dailyAction?: SortOrder
    icon?: SortOrder
    note?: SortOrder
    startDate?: SortOrder
    endDate?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
    userId?: SortOrder
  }

  export type BoolFilter<$PrismaModel = never> = {
    equals?: boolean | BooleanFieldRefInput<$PrismaModel>
    not?: NestedBoolFilter<$PrismaModel> | boolean
  }

  export type ChallengeScalarRelationFilter = {
    is?: ChallengeWhereInput
    isNot?: ChallengeWhereInput
  }

  export type DailyProgressCountOrderByAggregateInput = {
    id?: SortOrder
    date?: SortOrder
    completed?: SortOrder
    imageUrl?: SortOrder
    note?: SortOrder
    challengeId?: SortOrder
    userId?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
  }

  export type DailyProgressMaxOrderByAggregateInput = {
    id?: SortOrder
    date?: SortOrder
    completed?: SortOrder
    imageUrl?: SortOrder
    note?: SortOrder
    challengeId?: SortOrder
    userId?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
  }

  export type DailyProgressMinOrderByAggregateInput = {
    id?: SortOrder
    date?: SortOrder
    completed?: SortOrder
    imageUrl?: SortOrder
    note?: SortOrder
    challengeId?: SortOrder
    userId?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
  }

  export type BoolWithAggregatesFilter<$PrismaModel = never> = {
    equals?: boolean | BooleanFieldRefInput<$PrismaModel>
    not?: NestedBoolWithAggregatesFilter<$PrismaModel> | boolean
    _count?: NestedIntFilter<$PrismaModel>
    _min?: NestedBoolFilter<$PrismaModel>
    _max?: NestedBoolFilter<$PrismaModel>
  }

  export type IntFilter<$PrismaModel = never> = {
    equals?: number | IntFieldRefInput<$PrismaModel>
    in?: number[] | ListIntFieldRefInput<$PrismaModel>
    notIn?: number[] | ListIntFieldRefInput<$PrismaModel>
    lt?: number | IntFieldRefInput<$PrismaModel>
    lte?: number | IntFieldRefInput<$PrismaModel>
    gt?: number | IntFieldRefInput<$PrismaModel>
    gte?: number | IntFieldRefInput<$PrismaModel>
    not?: NestedIntFilter<$PrismaModel> | number
  }

  export type ChallengeIdeaCountOrderByAggregateInput = {
    id?: SortOrder
    index?: SortOrder
    title?: SortOrder
    wish?: SortOrder
    dailyAction?: SortOrder
    description?: SortOrder
    sourceName?: SortOrder
    sourceLink?: SortOrder
  }

  export type ChallengeIdeaAvgOrderByAggregateInput = {
    id?: SortOrder
    index?: SortOrder
  }

  export type ChallengeIdeaMaxOrderByAggregateInput = {
    id?: SortOrder
    index?: SortOrder
    title?: SortOrder
    wish?: SortOrder
    dailyAction?: SortOrder
    description?: SortOrder
    sourceName?: SortOrder
    sourceLink?: SortOrder
  }

  export type ChallengeIdeaMinOrderByAggregateInput = {
    id?: SortOrder
    index?: SortOrder
    title?: SortOrder
    wish?: SortOrder
    dailyAction?: SortOrder
    description?: SortOrder
    sourceName?: SortOrder
    sourceLink?: SortOrder
  }

  export type ChallengeIdeaSumOrderByAggregateInput = {
    id?: SortOrder
    index?: SortOrder
  }

  export type IntWithAggregatesFilter<$PrismaModel = never> = {
    equals?: number | IntFieldRefInput<$PrismaModel>
    in?: number[] | ListIntFieldRefInput<$PrismaModel>
    notIn?: number[] | ListIntFieldRefInput<$PrismaModel>
    lt?: number | IntFieldRefInput<$PrismaModel>
    lte?: number | IntFieldRefInput<$PrismaModel>
    gt?: number | IntFieldRefInput<$PrismaModel>
    gte?: number | IntFieldRefInput<$PrismaModel>
    not?: NestedIntWithAggregatesFilter<$PrismaModel> | number
    _count?: NestedIntFilter<$PrismaModel>
    _avg?: NestedFloatFilter<$PrismaModel>
    _sum?: NestedIntFilter<$PrismaModel>
    _min?: NestedIntFilter<$PrismaModel>
    _max?: NestedIntFilter<$PrismaModel>
  }

  export type ChallengeCreateNestedManyWithoutUserInput = {
    create?: XOR<ChallengeCreateWithoutUserInput, ChallengeUncheckedCreateWithoutUserInput> | ChallengeCreateWithoutUserInput[] | ChallengeUncheckedCreateWithoutUserInput[]
    connectOrCreate?: ChallengeCreateOrConnectWithoutUserInput | ChallengeCreateOrConnectWithoutUserInput[]
    createMany?: ChallengeCreateManyUserInputEnvelope
    connect?: ChallengeWhereUniqueInput | ChallengeWhereUniqueInput[]
  }

  export type DailyProgressCreateNestedManyWithoutUserInput = {
    create?: XOR<DailyProgressCreateWithoutUserInput, DailyProgressUncheckedCreateWithoutUserInput> | DailyProgressCreateWithoutUserInput[] | DailyProgressUncheckedCreateWithoutUserInput[]
    connectOrCreate?: DailyProgressCreateOrConnectWithoutUserInput | DailyProgressCreateOrConnectWithoutUserInput[]
    createMany?: DailyProgressCreateManyUserInputEnvelope
    connect?: DailyProgressWhereUniqueInput | DailyProgressWhereUniqueInput[]
  }

  export type ChallengeUncheckedCreateNestedManyWithoutUserInput = {
    create?: XOR<ChallengeCreateWithoutUserInput, ChallengeUncheckedCreateWithoutUserInput> | ChallengeCreateWithoutUserInput[] | ChallengeUncheckedCreateWithoutUserInput[]
    connectOrCreate?: ChallengeCreateOrConnectWithoutUserInput | ChallengeCreateOrConnectWithoutUserInput[]
    createMany?: ChallengeCreateManyUserInputEnvelope
    connect?: ChallengeWhereUniqueInput | ChallengeWhereUniqueInput[]
  }

  export type DailyProgressUncheckedCreateNestedManyWithoutUserInput = {
    create?: XOR<DailyProgressCreateWithoutUserInput, DailyProgressUncheckedCreateWithoutUserInput> | DailyProgressCreateWithoutUserInput[] | DailyProgressUncheckedCreateWithoutUserInput[]
    connectOrCreate?: DailyProgressCreateOrConnectWithoutUserInput | DailyProgressCreateOrConnectWithoutUserInput[]
    createMany?: DailyProgressCreateManyUserInputEnvelope
    connect?: DailyProgressWhereUniqueInput | DailyProgressWhereUniqueInput[]
  }

  export type StringFieldUpdateOperationsInput = {
    set?: string
  }

  export type DateTimeFieldUpdateOperationsInput = {
    set?: Date | string
  }

  export type ChallengeUpdateManyWithoutUserNestedInput = {
    create?: XOR<ChallengeCreateWithoutUserInput, ChallengeUncheckedCreateWithoutUserInput> | ChallengeCreateWithoutUserInput[] | ChallengeUncheckedCreateWithoutUserInput[]
    connectOrCreate?: ChallengeCreateOrConnectWithoutUserInput | ChallengeCreateOrConnectWithoutUserInput[]
    upsert?: ChallengeUpsertWithWhereUniqueWithoutUserInput | ChallengeUpsertWithWhereUniqueWithoutUserInput[]
    createMany?: ChallengeCreateManyUserInputEnvelope
    set?: ChallengeWhereUniqueInput | ChallengeWhereUniqueInput[]
    disconnect?: ChallengeWhereUniqueInput | ChallengeWhereUniqueInput[]
    delete?: ChallengeWhereUniqueInput | ChallengeWhereUniqueInput[]
    connect?: ChallengeWhereUniqueInput | ChallengeWhereUniqueInput[]
    update?: ChallengeUpdateWithWhereUniqueWithoutUserInput | ChallengeUpdateWithWhereUniqueWithoutUserInput[]
    updateMany?: ChallengeUpdateManyWithWhereWithoutUserInput | ChallengeUpdateManyWithWhereWithoutUserInput[]
    deleteMany?: ChallengeScalarWhereInput | ChallengeScalarWhereInput[]
  }

  export type DailyProgressUpdateManyWithoutUserNestedInput = {
    create?: XOR<DailyProgressCreateWithoutUserInput, DailyProgressUncheckedCreateWithoutUserInput> | DailyProgressCreateWithoutUserInput[] | DailyProgressUncheckedCreateWithoutUserInput[]
    connectOrCreate?: DailyProgressCreateOrConnectWithoutUserInput | DailyProgressCreateOrConnectWithoutUserInput[]
    upsert?: DailyProgressUpsertWithWhereUniqueWithoutUserInput | DailyProgressUpsertWithWhereUniqueWithoutUserInput[]
    createMany?: DailyProgressCreateManyUserInputEnvelope
    set?: DailyProgressWhereUniqueInput | DailyProgressWhereUniqueInput[]
    disconnect?: DailyProgressWhereUniqueInput | DailyProgressWhereUniqueInput[]
    delete?: DailyProgressWhereUniqueInput | DailyProgressWhereUniqueInput[]
    connect?: DailyProgressWhereUniqueInput | DailyProgressWhereUniqueInput[]
    update?: DailyProgressUpdateWithWhereUniqueWithoutUserInput | DailyProgressUpdateWithWhereUniqueWithoutUserInput[]
    updateMany?: DailyProgressUpdateManyWithWhereWithoutUserInput | DailyProgressUpdateManyWithWhereWithoutUserInput[]
    deleteMany?: DailyProgressScalarWhereInput | DailyProgressScalarWhereInput[]
  }

  export type ChallengeUncheckedUpdateManyWithoutUserNestedInput = {
    create?: XOR<ChallengeCreateWithoutUserInput, ChallengeUncheckedCreateWithoutUserInput> | ChallengeCreateWithoutUserInput[] | ChallengeUncheckedCreateWithoutUserInput[]
    connectOrCreate?: ChallengeCreateOrConnectWithoutUserInput | ChallengeCreateOrConnectWithoutUserInput[]
    upsert?: ChallengeUpsertWithWhereUniqueWithoutUserInput | ChallengeUpsertWithWhereUniqueWithoutUserInput[]
    createMany?: ChallengeCreateManyUserInputEnvelope
    set?: ChallengeWhereUniqueInput | ChallengeWhereUniqueInput[]
    disconnect?: ChallengeWhereUniqueInput | ChallengeWhereUniqueInput[]
    delete?: ChallengeWhereUniqueInput | ChallengeWhereUniqueInput[]
    connect?: ChallengeWhereUniqueInput | ChallengeWhereUniqueInput[]
    update?: ChallengeUpdateWithWhereUniqueWithoutUserInput | ChallengeUpdateWithWhereUniqueWithoutUserInput[]
    updateMany?: ChallengeUpdateManyWithWhereWithoutUserInput | ChallengeUpdateManyWithWhereWithoutUserInput[]
    deleteMany?: ChallengeScalarWhereInput | ChallengeScalarWhereInput[]
  }

  export type DailyProgressUncheckedUpdateManyWithoutUserNestedInput = {
    create?: XOR<DailyProgressCreateWithoutUserInput, DailyProgressUncheckedCreateWithoutUserInput> | DailyProgressCreateWithoutUserInput[] | DailyProgressUncheckedCreateWithoutUserInput[]
    connectOrCreate?: DailyProgressCreateOrConnectWithoutUserInput | DailyProgressCreateOrConnectWithoutUserInput[]
    upsert?: DailyProgressUpsertWithWhereUniqueWithoutUserInput | DailyProgressUpsertWithWhereUniqueWithoutUserInput[]
    createMany?: DailyProgressCreateManyUserInputEnvelope
    set?: DailyProgressWhereUniqueInput | DailyProgressWhereUniqueInput[]
    disconnect?: DailyProgressWhereUniqueInput | DailyProgressWhereUniqueInput[]
    delete?: DailyProgressWhereUniqueInput | DailyProgressWhereUniqueInput[]
    connect?: DailyProgressWhereUniqueInput | DailyProgressWhereUniqueInput[]
    update?: DailyProgressUpdateWithWhereUniqueWithoutUserInput | DailyProgressUpdateWithWhereUniqueWithoutUserInput[]
    updateMany?: DailyProgressUpdateManyWithWhereWithoutUserInput | DailyProgressUpdateManyWithWhereWithoutUserInput[]
    deleteMany?: DailyProgressScalarWhereInput | DailyProgressScalarWhereInput[]
  }

  export type UserCreateNestedOneWithoutChallengesInput = {
    create?: XOR<UserCreateWithoutChallengesInput, UserUncheckedCreateWithoutChallengesInput>
    connectOrCreate?: UserCreateOrConnectWithoutChallengesInput
    connect?: UserWhereUniqueInput
  }

  export type DailyProgressCreateNestedManyWithoutChallengeInput = {
    create?: XOR<DailyProgressCreateWithoutChallengeInput, DailyProgressUncheckedCreateWithoutChallengeInput> | DailyProgressCreateWithoutChallengeInput[] | DailyProgressUncheckedCreateWithoutChallengeInput[]
    connectOrCreate?: DailyProgressCreateOrConnectWithoutChallengeInput | DailyProgressCreateOrConnectWithoutChallengeInput[]
    createMany?: DailyProgressCreateManyChallengeInputEnvelope
    connect?: DailyProgressWhereUniqueInput | DailyProgressWhereUniqueInput[]
  }

  export type DailyProgressUncheckedCreateNestedManyWithoutChallengeInput = {
    create?: XOR<DailyProgressCreateWithoutChallengeInput, DailyProgressUncheckedCreateWithoutChallengeInput> | DailyProgressCreateWithoutChallengeInput[] | DailyProgressUncheckedCreateWithoutChallengeInput[]
    connectOrCreate?: DailyProgressCreateOrConnectWithoutChallengeInput | DailyProgressCreateOrConnectWithoutChallengeInput[]
    createMany?: DailyProgressCreateManyChallengeInputEnvelope
    connect?: DailyProgressWhereUniqueInput | DailyProgressWhereUniqueInput[]
  }

  export type UserUpdateOneRequiredWithoutChallengesNestedInput = {
    create?: XOR<UserCreateWithoutChallengesInput, UserUncheckedCreateWithoutChallengesInput>
    connectOrCreate?: UserCreateOrConnectWithoutChallengesInput
    upsert?: UserUpsertWithoutChallengesInput
    connect?: UserWhereUniqueInput
    update?: XOR<XOR<UserUpdateToOneWithWhereWithoutChallengesInput, UserUpdateWithoutChallengesInput>, UserUncheckedUpdateWithoutChallengesInput>
  }

  export type DailyProgressUpdateManyWithoutChallengeNestedInput = {
    create?: XOR<DailyProgressCreateWithoutChallengeInput, DailyProgressUncheckedCreateWithoutChallengeInput> | DailyProgressCreateWithoutChallengeInput[] | DailyProgressUncheckedCreateWithoutChallengeInput[]
    connectOrCreate?: DailyProgressCreateOrConnectWithoutChallengeInput | DailyProgressCreateOrConnectWithoutChallengeInput[]
    upsert?: DailyProgressUpsertWithWhereUniqueWithoutChallengeInput | DailyProgressUpsertWithWhereUniqueWithoutChallengeInput[]
    createMany?: DailyProgressCreateManyChallengeInputEnvelope
    set?: DailyProgressWhereUniqueInput | DailyProgressWhereUniqueInput[]
    disconnect?: DailyProgressWhereUniqueInput | DailyProgressWhereUniqueInput[]
    delete?: DailyProgressWhereUniqueInput | DailyProgressWhereUniqueInput[]
    connect?: DailyProgressWhereUniqueInput | DailyProgressWhereUniqueInput[]
    update?: DailyProgressUpdateWithWhereUniqueWithoutChallengeInput | DailyProgressUpdateWithWhereUniqueWithoutChallengeInput[]
    updateMany?: DailyProgressUpdateManyWithWhereWithoutChallengeInput | DailyProgressUpdateManyWithWhereWithoutChallengeInput[]
    deleteMany?: DailyProgressScalarWhereInput | DailyProgressScalarWhereInput[]
  }

  export type DailyProgressUncheckedUpdateManyWithoutChallengeNestedInput = {
    create?: XOR<DailyProgressCreateWithoutChallengeInput, DailyProgressUncheckedCreateWithoutChallengeInput> | DailyProgressCreateWithoutChallengeInput[] | DailyProgressUncheckedCreateWithoutChallengeInput[]
    connectOrCreate?: DailyProgressCreateOrConnectWithoutChallengeInput | DailyProgressCreateOrConnectWithoutChallengeInput[]
    upsert?: DailyProgressUpsertWithWhereUniqueWithoutChallengeInput | DailyProgressUpsertWithWhereUniqueWithoutChallengeInput[]
    createMany?: DailyProgressCreateManyChallengeInputEnvelope
    set?: DailyProgressWhereUniqueInput | DailyProgressWhereUniqueInput[]
    disconnect?: DailyProgressWhereUniqueInput | DailyProgressWhereUniqueInput[]
    delete?: DailyProgressWhereUniqueInput | DailyProgressWhereUniqueInput[]
    connect?: DailyProgressWhereUniqueInput | DailyProgressWhereUniqueInput[]
    update?: DailyProgressUpdateWithWhereUniqueWithoutChallengeInput | DailyProgressUpdateWithWhereUniqueWithoutChallengeInput[]
    updateMany?: DailyProgressUpdateManyWithWhereWithoutChallengeInput | DailyProgressUpdateManyWithWhereWithoutChallengeInput[]
    deleteMany?: DailyProgressScalarWhereInput | DailyProgressScalarWhereInput[]
  }

  export type ChallengeCreateNestedOneWithoutDailyProgressInput = {
    create?: XOR<ChallengeCreateWithoutDailyProgressInput, ChallengeUncheckedCreateWithoutDailyProgressInput>
    connectOrCreate?: ChallengeCreateOrConnectWithoutDailyProgressInput
    connect?: ChallengeWhereUniqueInput
  }

  export type UserCreateNestedOneWithoutDailyProgressInput = {
    create?: XOR<UserCreateWithoutDailyProgressInput, UserUncheckedCreateWithoutDailyProgressInput>
    connectOrCreate?: UserCreateOrConnectWithoutDailyProgressInput
    connect?: UserWhereUniqueInput
  }

  export type BoolFieldUpdateOperationsInput = {
    set?: boolean
  }

  export type ChallengeUpdateOneRequiredWithoutDailyProgressNestedInput = {
    create?: XOR<ChallengeCreateWithoutDailyProgressInput, ChallengeUncheckedCreateWithoutDailyProgressInput>
    connectOrCreate?: ChallengeCreateOrConnectWithoutDailyProgressInput
    upsert?: ChallengeUpsertWithoutDailyProgressInput
    connect?: ChallengeWhereUniqueInput
    update?: XOR<XOR<ChallengeUpdateToOneWithWhereWithoutDailyProgressInput, ChallengeUpdateWithoutDailyProgressInput>, ChallengeUncheckedUpdateWithoutDailyProgressInput>
  }

  export type UserUpdateOneRequiredWithoutDailyProgressNestedInput = {
    create?: XOR<UserCreateWithoutDailyProgressInput, UserUncheckedCreateWithoutDailyProgressInput>
    connectOrCreate?: UserCreateOrConnectWithoutDailyProgressInput
    upsert?: UserUpsertWithoutDailyProgressInput
    connect?: UserWhereUniqueInput
    update?: XOR<XOR<UserUpdateToOneWithWhereWithoutDailyProgressInput, UserUpdateWithoutDailyProgressInput>, UserUncheckedUpdateWithoutDailyProgressInput>
  }

  export type IntFieldUpdateOperationsInput = {
    set?: number
    increment?: number
    decrement?: number
    multiply?: number
    divide?: number
  }

  export type NestedStringFilter<$PrismaModel = never> = {
    equals?: string | StringFieldRefInput<$PrismaModel>
    in?: string[] | ListStringFieldRefInput<$PrismaModel>
    notIn?: string[] | ListStringFieldRefInput<$PrismaModel>
    lt?: string | StringFieldRefInput<$PrismaModel>
    lte?: string | StringFieldRefInput<$PrismaModel>
    gt?: string | StringFieldRefInput<$PrismaModel>
    gte?: string | StringFieldRefInput<$PrismaModel>
    contains?: string | StringFieldRefInput<$PrismaModel>
    startsWith?: string | StringFieldRefInput<$PrismaModel>
    endsWith?: string | StringFieldRefInput<$PrismaModel>
    not?: NestedStringFilter<$PrismaModel> | string
  }

  export type NestedDateTimeFilter<$PrismaModel = never> = {
    equals?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    in?: Date[] | string[] | ListDateTimeFieldRefInput<$PrismaModel>
    notIn?: Date[] | string[] | ListDateTimeFieldRefInput<$PrismaModel>
    lt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    lte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    not?: NestedDateTimeFilter<$PrismaModel> | Date | string
  }

  export type NestedStringWithAggregatesFilter<$PrismaModel = never> = {
    equals?: string | StringFieldRefInput<$PrismaModel>
    in?: string[] | ListStringFieldRefInput<$PrismaModel>
    notIn?: string[] | ListStringFieldRefInput<$PrismaModel>
    lt?: string | StringFieldRefInput<$PrismaModel>
    lte?: string | StringFieldRefInput<$PrismaModel>
    gt?: string | StringFieldRefInput<$PrismaModel>
    gte?: string | StringFieldRefInput<$PrismaModel>
    contains?: string | StringFieldRefInput<$PrismaModel>
    startsWith?: string | StringFieldRefInput<$PrismaModel>
    endsWith?: string | StringFieldRefInput<$PrismaModel>
    not?: NestedStringWithAggregatesFilter<$PrismaModel> | string
    _count?: NestedIntFilter<$PrismaModel>
    _min?: NestedStringFilter<$PrismaModel>
    _max?: NestedStringFilter<$PrismaModel>
  }

  export type NestedIntFilter<$PrismaModel = never> = {
    equals?: number | IntFieldRefInput<$PrismaModel>
    in?: number[] | ListIntFieldRefInput<$PrismaModel>
    notIn?: number[] | ListIntFieldRefInput<$PrismaModel>
    lt?: number | IntFieldRefInput<$PrismaModel>
    lte?: number | IntFieldRefInput<$PrismaModel>
    gt?: number | IntFieldRefInput<$PrismaModel>
    gte?: number | IntFieldRefInput<$PrismaModel>
    not?: NestedIntFilter<$PrismaModel> | number
  }

  export type NestedDateTimeWithAggregatesFilter<$PrismaModel = never> = {
    equals?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    in?: Date[] | string[] | ListDateTimeFieldRefInput<$PrismaModel>
    notIn?: Date[] | string[] | ListDateTimeFieldRefInput<$PrismaModel>
    lt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    lte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    not?: NestedDateTimeWithAggregatesFilter<$PrismaModel> | Date | string
    _count?: NestedIntFilter<$PrismaModel>
    _min?: NestedDateTimeFilter<$PrismaModel>
    _max?: NestedDateTimeFilter<$PrismaModel>
  }

  export type NestedBoolFilter<$PrismaModel = never> = {
    equals?: boolean | BooleanFieldRefInput<$PrismaModel>
    not?: NestedBoolFilter<$PrismaModel> | boolean
  }

  export type NestedBoolWithAggregatesFilter<$PrismaModel = never> = {
    equals?: boolean | BooleanFieldRefInput<$PrismaModel>
    not?: NestedBoolWithAggregatesFilter<$PrismaModel> | boolean
    _count?: NestedIntFilter<$PrismaModel>
    _min?: NestedBoolFilter<$PrismaModel>
    _max?: NestedBoolFilter<$PrismaModel>
  }

  export type NestedIntWithAggregatesFilter<$PrismaModel = never> = {
    equals?: number | IntFieldRefInput<$PrismaModel>
    in?: number[] | ListIntFieldRefInput<$PrismaModel>
    notIn?: number[] | ListIntFieldRefInput<$PrismaModel>
    lt?: number | IntFieldRefInput<$PrismaModel>
    lte?: number | IntFieldRefInput<$PrismaModel>
    gt?: number | IntFieldRefInput<$PrismaModel>
    gte?: number | IntFieldRefInput<$PrismaModel>
    not?: NestedIntWithAggregatesFilter<$PrismaModel> | number
    _count?: NestedIntFilter<$PrismaModel>
    _avg?: NestedFloatFilter<$PrismaModel>
    _sum?: NestedIntFilter<$PrismaModel>
    _min?: NestedIntFilter<$PrismaModel>
    _max?: NestedIntFilter<$PrismaModel>
  }

  export type NestedFloatFilter<$PrismaModel = never> = {
    equals?: number | FloatFieldRefInput<$PrismaModel>
    in?: number[] | ListFloatFieldRefInput<$PrismaModel>
    notIn?: number[] | ListFloatFieldRefInput<$PrismaModel>
    lt?: number | FloatFieldRefInput<$PrismaModel>
    lte?: number | FloatFieldRefInput<$PrismaModel>
    gt?: number | FloatFieldRefInput<$PrismaModel>
    gte?: number | FloatFieldRefInput<$PrismaModel>
    not?: NestedFloatFilter<$PrismaModel> | number
  }

  export type ChallengeCreateWithoutUserInput = {
    id?: string
    title: string
    wish: string
    dailyAction: string
    icon?: string
    note?: string
    startDate: Date | string
    endDate: Date | string
    createdAt?: Date | string
    updatedAt?: Date | string
    dailyProgress?: DailyProgressCreateNestedManyWithoutChallengeInput
  }

  export type ChallengeUncheckedCreateWithoutUserInput = {
    id?: string
    title: string
    wish: string
    dailyAction: string
    icon?: string
    note?: string
    startDate: Date | string
    endDate: Date | string
    createdAt?: Date | string
    updatedAt?: Date | string
    dailyProgress?: DailyProgressUncheckedCreateNestedManyWithoutChallengeInput
  }

  export type ChallengeCreateOrConnectWithoutUserInput = {
    where: ChallengeWhereUniqueInput
    create: XOR<ChallengeCreateWithoutUserInput, ChallengeUncheckedCreateWithoutUserInput>
  }

  export type ChallengeCreateManyUserInputEnvelope = {
    data: ChallengeCreateManyUserInput | ChallengeCreateManyUserInput[]
    skipDuplicates?: boolean
  }

  export type DailyProgressCreateWithoutUserInput = {
    id?: string
    date: Date | string
    completed: boolean
    imageUrl?: string
    note?: string
    createdAt?: Date | string
    updatedAt?: Date | string
    challenge: ChallengeCreateNestedOneWithoutDailyProgressInput
  }

  export type DailyProgressUncheckedCreateWithoutUserInput = {
    id?: string
    date: Date | string
    completed: boolean
    imageUrl?: string
    note?: string
    challengeId: string
    createdAt?: Date | string
    updatedAt?: Date | string
  }

  export type DailyProgressCreateOrConnectWithoutUserInput = {
    where: DailyProgressWhereUniqueInput
    create: XOR<DailyProgressCreateWithoutUserInput, DailyProgressUncheckedCreateWithoutUserInput>
  }

  export type DailyProgressCreateManyUserInputEnvelope = {
    data: DailyProgressCreateManyUserInput | DailyProgressCreateManyUserInput[]
    skipDuplicates?: boolean
  }

  export type ChallengeUpsertWithWhereUniqueWithoutUserInput = {
    where: ChallengeWhereUniqueInput
    update: XOR<ChallengeUpdateWithoutUserInput, ChallengeUncheckedUpdateWithoutUserInput>
    create: XOR<ChallengeCreateWithoutUserInput, ChallengeUncheckedCreateWithoutUserInput>
  }

  export type ChallengeUpdateWithWhereUniqueWithoutUserInput = {
    where: ChallengeWhereUniqueInput
    data: XOR<ChallengeUpdateWithoutUserInput, ChallengeUncheckedUpdateWithoutUserInput>
  }

  export type ChallengeUpdateManyWithWhereWithoutUserInput = {
    where: ChallengeScalarWhereInput
    data: XOR<ChallengeUpdateManyMutationInput, ChallengeUncheckedUpdateManyWithoutUserInput>
  }

  export type ChallengeScalarWhereInput = {
    AND?: ChallengeScalarWhereInput | ChallengeScalarWhereInput[]
    OR?: ChallengeScalarWhereInput[]
    NOT?: ChallengeScalarWhereInput | ChallengeScalarWhereInput[]
    id?: StringFilter<"Challenge"> | string
    title?: StringFilter<"Challenge"> | string
    wish?: StringFilter<"Challenge"> | string
    dailyAction?: StringFilter<"Challenge"> | string
    icon?: StringFilter<"Challenge"> | string
    note?: StringFilter<"Challenge"> | string
    startDate?: DateTimeFilter<"Challenge"> | Date | string
    endDate?: DateTimeFilter<"Challenge"> | Date | string
    createdAt?: DateTimeFilter<"Challenge"> | Date | string
    updatedAt?: DateTimeFilter<"Challenge"> | Date | string
    userId?: StringFilter<"Challenge"> | string
  }

  export type DailyProgressUpsertWithWhereUniqueWithoutUserInput = {
    where: DailyProgressWhereUniqueInput
    update: XOR<DailyProgressUpdateWithoutUserInput, DailyProgressUncheckedUpdateWithoutUserInput>
    create: XOR<DailyProgressCreateWithoutUserInput, DailyProgressUncheckedCreateWithoutUserInput>
  }

  export type DailyProgressUpdateWithWhereUniqueWithoutUserInput = {
    where: DailyProgressWhereUniqueInput
    data: XOR<DailyProgressUpdateWithoutUserInput, DailyProgressUncheckedUpdateWithoutUserInput>
  }

  export type DailyProgressUpdateManyWithWhereWithoutUserInput = {
    where: DailyProgressScalarWhereInput
    data: XOR<DailyProgressUpdateManyMutationInput, DailyProgressUncheckedUpdateManyWithoutUserInput>
  }

  export type DailyProgressScalarWhereInput = {
    AND?: DailyProgressScalarWhereInput | DailyProgressScalarWhereInput[]
    OR?: DailyProgressScalarWhereInput[]
    NOT?: DailyProgressScalarWhereInput | DailyProgressScalarWhereInput[]
    id?: StringFilter<"DailyProgress"> | string
    date?: DateTimeFilter<"DailyProgress"> | Date | string
    completed?: BoolFilter<"DailyProgress"> | boolean
    imageUrl?: StringFilter<"DailyProgress"> | string
    note?: StringFilter<"DailyProgress"> | string
    challengeId?: StringFilter<"DailyProgress"> | string
    userId?: StringFilter<"DailyProgress"> | string
    createdAt?: DateTimeFilter<"DailyProgress"> | Date | string
    updatedAt?: DateTimeFilter<"DailyProgress"> | Date | string
  }

  export type UserCreateWithoutChallengesInput = {
    id?: string
    email: string
    username: string
    imageUrl: string
    clerkId: string
    createdAt?: Date | string
    updatedAt?: Date | string
    DailyProgress?: DailyProgressCreateNestedManyWithoutUserInput
  }

  export type UserUncheckedCreateWithoutChallengesInput = {
    id?: string
    email: string
    username: string
    imageUrl: string
    clerkId: string
    createdAt?: Date | string
    updatedAt?: Date | string
    DailyProgress?: DailyProgressUncheckedCreateNestedManyWithoutUserInput
  }

  export type UserCreateOrConnectWithoutChallengesInput = {
    where: UserWhereUniqueInput
    create: XOR<UserCreateWithoutChallengesInput, UserUncheckedCreateWithoutChallengesInput>
  }

  export type DailyProgressCreateWithoutChallengeInput = {
    id?: string
    date: Date | string
    completed: boolean
    imageUrl?: string
    note?: string
    createdAt?: Date | string
    updatedAt?: Date | string
    user: UserCreateNestedOneWithoutDailyProgressInput
  }

  export type DailyProgressUncheckedCreateWithoutChallengeInput = {
    id?: string
    date: Date | string
    completed: boolean
    imageUrl?: string
    note?: string
    userId: string
    createdAt?: Date | string
    updatedAt?: Date | string
  }

  export type DailyProgressCreateOrConnectWithoutChallengeInput = {
    where: DailyProgressWhereUniqueInput
    create: XOR<DailyProgressCreateWithoutChallengeInput, DailyProgressUncheckedCreateWithoutChallengeInput>
  }

  export type DailyProgressCreateManyChallengeInputEnvelope = {
    data: DailyProgressCreateManyChallengeInput | DailyProgressCreateManyChallengeInput[]
    skipDuplicates?: boolean
  }

  export type UserUpsertWithoutChallengesInput = {
    update: XOR<UserUpdateWithoutChallengesInput, UserUncheckedUpdateWithoutChallengesInput>
    create: XOR<UserCreateWithoutChallengesInput, UserUncheckedCreateWithoutChallengesInput>
    where?: UserWhereInput
  }

  export type UserUpdateToOneWithWhereWithoutChallengesInput = {
    where?: UserWhereInput
    data: XOR<UserUpdateWithoutChallengesInput, UserUncheckedUpdateWithoutChallengesInput>
  }

  export type UserUpdateWithoutChallengesInput = {
    id?: StringFieldUpdateOperationsInput | string
    email?: StringFieldUpdateOperationsInput | string
    username?: StringFieldUpdateOperationsInput | string
    imageUrl?: StringFieldUpdateOperationsInput | string
    clerkId?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    DailyProgress?: DailyProgressUpdateManyWithoutUserNestedInput
  }

  export type UserUncheckedUpdateWithoutChallengesInput = {
    id?: StringFieldUpdateOperationsInput | string
    email?: StringFieldUpdateOperationsInput | string
    username?: StringFieldUpdateOperationsInput | string
    imageUrl?: StringFieldUpdateOperationsInput | string
    clerkId?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    DailyProgress?: DailyProgressUncheckedUpdateManyWithoutUserNestedInput
  }

  export type DailyProgressUpsertWithWhereUniqueWithoutChallengeInput = {
    where: DailyProgressWhereUniqueInput
    update: XOR<DailyProgressUpdateWithoutChallengeInput, DailyProgressUncheckedUpdateWithoutChallengeInput>
    create: XOR<DailyProgressCreateWithoutChallengeInput, DailyProgressUncheckedCreateWithoutChallengeInput>
  }

  export type DailyProgressUpdateWithWhereUniqueWithoutChallengeInput = {
    where: DailyProgressWhereUniqueInput
    data: XOR<DailyProgressUpdateWithoutChallengeInput, DailyProgressUncheckedUpdateWithoutChallengeInput>
  }

  export type DailyProgressUpdateManyWithWhereWithoutChallengeInput = {
    where: DailyProgressScalarWhereInput
    data: XOR<DailyProgressUpdateManyMutationInput, DailyProgressUncheckedUpdateManyWithoutChallengeInput>
  }

  export type ChallengeCreateWithoutDailyProgressInput = {
    id?: string
    title: string
    wish: string
    dailyAction: string
    icon?: string
    note?: string
    startDate: Date | string
    endDate: Date | string
    createdAt?: Date | string
    updatedAt?: Date | string
    user: UserCreateNestedOneWithoutChallengesInput
  }

  export type ChallengeUncheckedCreateWithoutDailyProgressInput = {
    id?: string
    title: string
    wish: string
    dailyAction: string
    icon?: string
    note?: string
    startDate: Date | string
    endDate: Date | string
    createdAt?: Date | string
    updatedAt?: Date | string
    userId: string
  }

  export type ChallengeCreateOrConnectWithoutDailyProgressInput = {
    where: ChallengeWhereUniqueInput
    create: XOR<ChallengeCreateWithoutDailyProgressInput, ChallengeUncheckedCreateWithoutDailyProgressInput>
  }

  export type UserCreateWithoutDailyProgressInput = {
    id?: string
    email: string
    username: string
    imageUrl: string
    clerkId: string
    createdAt?: Date | string
    updatedAt?: Date | string
    challenges?: ChallengeCreateNestedManyWithoutUserInput
  }

  export type UserUncheckedCreateWithoutDailyProgressInput = {
    id?: string
    email: string
    username: string
    imageUrl: string
    clerkId: string
    createdAt?: Date | string
    updatedAt?: Date | string
    challenges?: ChallengeUncheckedCreateNestedManyWithoutUserInput
  }

  export type UserCreateOrConnectWithoutDailyProgressInput = {
    where: UserWhereUniqueInput
    create: XOR<UserCreateWithoutDailyProgressInput, UserUncheckedCreateWithoutDailyProgressInput>
  }

  export type ChallengeUpsertWithoutDailyProgressInput = {
    update: XOR<ChallengeUpdateWithoutDailyProgressInput, ChallengeUncheckedUpdateWithoutDailyProgressInput>
    create: XOR<ChallengeCreateWithoutDailyProgressInput, ChallengeUncheckedCreateWithoutDailyProgressInput>
    where?: ChallengeWhereInput
  }

  export type ChallengeUpdateToOneWithWhereWithoutDailyProgressInput = {
    where?: ChallengeWhereInput
    data: XOR<ChallengeUpdateWithoutDailyProgressInput, ChallengeUncheckedUpdateWithoutDailyProgressInput>
  }

  export type ChallengeUpdateWithoutDailyProgressInput = {
    id?: StringFieldUpdateOperationsInput | string
    title?: StringFieldUpdateOperationsInput | string
    wish?: StringFieldUpdateOperationsInput | string
    dailyAction?: StringFieldUpdateOperationsInput | string
    icon?: StringFieldUpdateOperationsInput | string
    note?: StringFieldUpdateOperationsInput | string
    startDate?: DateTimeFieldUpdateOperationsInput | Date | string
    endDate?: DateTimeFieldUpdateOperationsInput | Date | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    user?: UserUpdateOneRequiredWithoutChallengesNestedInput
  }

  export type ChallengeUncheckedUpdateWithoutDailyProgressInput = {
    id?: StringFieldUpdateOperationsInput | string
    title?: StringFieldUpdateOperationsInput | string
    wish?: StringFieldUpdateOperationsInput | string
    dailyAction?: StringFieldUpdateOperationsInput | string
    icon?: StringFieldUpdateOperationsInput | string
    note?: StringFieldUpdateOperationsInput | string
    startDate?: DateTimeFieldUpdateOperationsInput | Date | string
    endDate?: DateTimeFieldUpdateOperationsInput | Date | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    userId?: StringFieldUpdateOperationsInput | string
  }

  export type UserUpsertWithoutDailyProgressInput = {
    update: XOR<UserUpdateWithoutDailyProgressInput, UserUncheckedUpdateWithoutDailyProgressInput>
    create: XOR<UserCreateWithoutDailyProgressInput, UserUncheckedCreateWithoutDailyProgressInput>
    where?: UserWhereInput
  }

  export type UserUpdateToOneWithWhereWithoutDailyProgressInput = {
    where?: UserWhereInput
    data: XOR<UserUpdateWithoutDailyProgressInput, UserUncheckedUpdateWithoutDailyProgressInput>
  }

  export type UserUpdateWithoutDailyProgressInput = {
    id?: StringFieldUpdateOperationsInput | string
    email?: StringFieldUpdateOperationsInput | string
    username?: StringFieldUpdateOperationsInput | string
    imageUrl?: StringFieldUpdateOperationsInput | string
    clerkId?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    challenges?: ChallengeUpdateManyWithoutUserNestedInput
  }

  export type UserUncheckedUpdateWithoutDailyProgressInput = {
    id?: StringFieldUpdateOperationsInput | string
    email?: StringFieldUpdateOperationsInput | string
    username?: StringFieldUpdateOperationsInput | string
    imageUrl?: StringFieldUpdateOperationsInput | string
    clerkId?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    challenges?: ChallengeUncheckedUpdateManyWithoutUserNestedInput
  }

  export type ChallengeCreateManyUserInput = {
    id?: string
    title: string
    wish: string
    dailyAction: string
    icon?: string
    note?: string
    startDate: Date | string
    endDate: Date | string
    createdAt?: Date | string
    updatedAt?: Date | string
  }

  export type DailyProgressCreateManyUserInput = {
    id?: string
    date: Date | string
    completed: boolean
    imageUrl?: string
    note?: string
    challengeId: string
    createdAt?: Date | string
    updatedAt?: Date | string
  }

  export type ChallengeUpdateWithoutUserInput = {
    id?: StringFieldUpdateOperationsInput | string
    title?: StringFieldUpdateOperationsInput | string
    wish?: StringFieldUpdateOperationsInput | string
    dailyAction?: StringFieldUpdateOperationsInput | string
    icon?: StringFieldUpdateOperationsInput | string
    note?: StringFieldUpdateOperationsInput | string
    startDate?: DateTimeFieldUpdateOperationsInput | Date | string
    endDate?: DateTimeFieldUpdateOperationsInput | Date | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    dailyProgress?: DailyProgressUpdateManyWithoutChallengeNestedInput
  }

  export type ChallengeUncheckedUpdateWithoutUserInput = {
    id?: StringFieldUpdateOperationsInput | string
    title?: StringFieldUpdateOperationsInput | string
    wish?: StringFieldUpdateOperationsInput | string
    dailyAction?: StringFieldUpdateOperationsInput | string
    icon?: StringFieldUpdateOperationsInput | string
    note?: StringFieldUpdateOperationsInput | string
    startDate?: DateTimeFieldUpdateOperationsInput | Date | string
    endDate?: DateTimeFieldUpdateOperationsInput | Date | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    dailyProgress?: DailyProgressUncheckedUpdateManyWithoutChallengeNestedInput
  }

  export type ChallengeUncheckedUpdateManyWithoutUserInput = {
    id?: StringFieldUpdateOperationsInput | string
    title?: StringFieldUpdateOperationsInput | string
    wish?: StringFieldUpdateOperationsInput | string
    dailyAction?: StringFieldUpdateOperationsInput | string
    icon?: StringFieldUpdateOperationsInput | string
    note?: StringFieldUpdateOperationsInput | string
    startDate?: DateTimeFieldUpdateOperationsInput | Date | string
    endDate?: DateTimeFieldUpdateOperationsInput | Date | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type DailyProgressUpdateWithoutUserInput = {
    id?: StringFieldUpdateOperationsInput | string
    date?: DateTimeFieldUpdateOperationsInput | Date | string
    completed?: BoolFieldUpdateOperationsInput | boolean
    imageUrl?: StringFieldUpdateOperationsInput | string
    note?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    challenge?: ChallengeUpdateOneRequiredWithoutDailyProgressNestedInput
  }

  export type DailyProgressUncheckedUpdateWithoutUserInput = {
    id?: StringFieldUpdateOperationsInput | string
    date?: DateTimeFieldUpdateOperationsInput | Date | string
    completed?: BoolFieldUpdateOperationsInput | boolean
    imageUrl?: StringFieldUpdateOperationsInput | string
    note?: StringFieldUpdateOperationsInput | string
    challengeId?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type DailyProgressUncheckedUpdateManyWithoutUserInput = {
    id?: StringFieldUpdateOperationsInput | string
    date?: DateTimeFieldUpdateOperationsInput | Date | string
    completed?: BoolFieldUpdateOperationsInput | boolean
    imageUrl?: StringFieldUpdateOperationsInput | string
    note?: StringFieldUpdateOperationsInput | string
    challengeId?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type DailyProgressCreateManyChallengeInput = {
    id?: string
    date: Date | string
    completed: boolean
    imageUrl?: string
    note?: string
    userId: string
    createdAt?: Date | string
    updatedAt?: Date | string
  }

  export type DailyProgressUpdateWithoutChallengeInput = {
    id?: StringFieldUpdateOperationsInput | string
    date?: DateTimeFieldUpdateOperationsInput | Date | string
    completed?: BoolFieldUpdateOperationsInput | boolean
    imageUrl?: StringFieldUpdateOperationsInput | string
    note?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    user?: UserUpdateOneRequiredWithoutDailyProgressNestedInput
  }

  export type DailyProgressUncheckedUpdateWithoutChallengeInput = {
    id?: StringFieldUpdateOperationsInput | string
    date?: DateTimeFieldUpdateOperationsInput | Date | string
    completed?: BoolFieldUpdateOperationsInput | boolean
    imageUrl?: StringFieldUpdateOperationsInput | string
    note?: StringFieldUpdateOperationsInput | string
    userId?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type DailyProgressUncheckedUpdateManyWithoutChallengeInput = {
    id?: StringFieldUpdateOperationsInput | string
    date?: DateTimeFieldUpdateOperationsInput | Date | string
    completed?: BoolFieldUpdateOperationsInput | boolean
    imageUrl?: StringFieldUpdateOperationsInput | string
    note?: StringFieldUpdateOperationsInput | string
    userId?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }



  /**
   * Batch Payload for updateMany & deleteMany & createMany
   */

  export type BatchPayload = {
    count: number
  }

  /**
   * DMMF
   */
  export const dmmf: runtime.BaseDMMF
}