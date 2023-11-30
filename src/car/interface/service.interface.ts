export interface Service<Params, Response> {
  call(params: Params): Response;
}
