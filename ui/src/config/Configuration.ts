import { IConfiguration } from "./IConfiguration";
import { IConfigurationProvider } from "./IConfigurationProvider";

const Configuration = ({
  configurationProvider
}: {
  configurationProvider: IConfigurationProvider;
}): IConfiguration => {
  return <IConfiguration>{
    getApiConfiguration() {
      return configurationProvider.get("api");
    },
    getApplicationConfiguration() {
      return configurationProvider.get("app");
    }
  };
};

export default Configuration;
