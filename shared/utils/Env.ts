import { MyEnvs } from "./declartion-merging.types";

export const getEnvOrThrow = <K extends keyof MyEnvs>( envName: K): MyEnvs[K] => {
  const varValue = process.env[envName];

  if (!varValue) {
    throw new Error(`Environment variable '${envName}' is missing or empty`);
  }
  return varValue;
};
