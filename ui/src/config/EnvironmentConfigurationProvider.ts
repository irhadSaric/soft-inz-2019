import { IConfigurationProvider } from "./IConfigurationProvider";

let configs: IConfigurationProvider;

const EnvironmentConfigurationProvider = ({
  config
}: {
  config: any;
}): IConfigurationProvider => {
  return {
    get(key?: string | undefined) {
      if (!key) {
        return null;
      }
      return config[key];
    }
  };
};

export default EnvironmentConfigurationProvider;
