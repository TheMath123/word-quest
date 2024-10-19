import { BaseCustomError, BaseCustomErrorParams } from "../base-custom-error";

export class HTTPError extends BaseCustomError {
  constructor(params: BaseCustomErrorParams, json?: BaseCustomErrorParams) {
    const message =
      params.message ||
      json?.message?.toString() ||
      params.description?.toString() ||
      json?.description?.toString() ||
      "Error during request";
    super({
      ...params,
      name: params.name || json?.name || "RequestError",
      message: message,
      description:
        params.description ||
        json?.description ||
        "Unknown error occurred during request. Please try again later.",
      statusCode: params.statusCode || 500,
      priority: params.priority || "medium",
      tag: params.tag || json?.tag || "Berners-Lee",
    });
  }
}
