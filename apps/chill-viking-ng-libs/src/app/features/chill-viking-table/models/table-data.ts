export type TableMeta<T> = {
  columns?: Partial<Record<keyof T, string>>;
  displayColumns?: string[];
  tableCaption?: string;
};

export type TableData<T> = {
  meta?: TableMeta<T>;
  items: T[];
};
