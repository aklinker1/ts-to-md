/**
 * Configuration provided by the user
 */
export interface UserConfig {
  name: string;
}

/**
 * An identity function used to ensure type safety when defining config.
 */
export function defineConfig(config: UserConfig): UserConfig {
  return config;
}
