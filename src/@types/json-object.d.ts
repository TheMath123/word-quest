type JSONPrimitive = string | boolean | number | null;
type JSONArray = (JSONPrimitive | JSONObject | JSONArray)[];
type InvalidJSONValue = undefined | symbol | ((...args: unknown[]) => unknown);
type JSONObject = {
  [key: string]:
    | JSONPrimitive
    | JSONArray
    | JSONObject
    | object
    | InvalidJSONValue;
};
