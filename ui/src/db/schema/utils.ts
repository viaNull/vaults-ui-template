import { decimal, varchar } from "drizzle-orm/pg-core";

export const createPubkeyField = (fieldName: string) => {
  const field = varchar(fieldName, { length: 44 });

  return field;
};

// Used for storing BN values
export const createBNField = (fieldName: string) => {
  return decimal(fieldName, { precision: 40, scale: 0 });
};
