class DescriptionCustom {
  constructor(private description: string | JSONObject) {
    this.description = description;
  }

  ObjectToString() {
    return JSON.stringify(this.description);
  }

  toString() {
    return this.description.toString();
  }
}

export type ErrorPriority = "low" | "medium" | "high" | "critical";

export interface AppError {
  name: string;
  message: string;
  description: DescriptionCustom;
  statusCode: StatusCode;
  priority: ErrorPriority;
  tag?: string;
}

export interface BaseCustomErrorParams {
  name?: string;
  message?: string;
  description?: string | JSONObject;
  statusCode?: StatusCode;
  priority?: ErrorPriority;
  tag?: string;
}

export interface ErrorResponse extends BaseCustomErrorParams {
  success: false;
  description?: string;
}

export class BaseCustomError extends Error implements AppError {
  private _description: DescriptionCustom;
  readonly statusCode: StatusCode;
  readonly priority: ErrorPriority = "low";
  readonly tag?: string;

  constructor(params: BaseCustomErrorParams) {
    super(params.message);
    this._description = new DescriptionCustom(params.description || "");
    this.statusCode = params.statusCode || 500;
    this.name = params.name || "BaseCustomError";
    this.tag = params.tag;
    this.priority = params.priority || "low";
  }

  get message(): string {
    return this.message;
  }

  get description() {
    return this._description;
  }
}
