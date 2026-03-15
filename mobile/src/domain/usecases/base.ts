/**
 * Base abstract class for all use cases.
 * Following the Command pattern to encapsulate business logic.
 *
 * @template Params - The input type for the use case.
 * @template Result - The output type returned by the use case.
 */
export abstract class UseCase<Params, Result> {
  /**
   * Executes the business logic of the use case.
   *
   * @param params - The input parameters for execution.
   * @returns A promise of the result.
   */
  abstract execute(params: Params): Promise<Result>;
}
