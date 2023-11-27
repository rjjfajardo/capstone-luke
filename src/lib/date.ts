import { parse } from "date-fns";

// export type DateVariant = Exclude<ConfigType, null | undefined>;

export const formatToDateTime = (date: Date): string => {
  return String(parse(date.toISOString(), "yyyy-mm-dd", new Date()));
};
