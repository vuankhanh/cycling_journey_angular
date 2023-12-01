require('dotenv').config();
const fs = require('fs');
// Configure Angular `environment.ts` file path
const targetPath = './src/environments/environment.staging.ts';
// `environment.development.ts` file structure
const backendApi = process.env.STAGING_BE_API;
const backendStatic = process.env.STAGING_BE_STATIC;
const googleMapApiKey = process.env.STAGINGDEV_GOOGLE_MAP_API_KEY;

const environment = {
    backendApi,
    backendStatic,
    googleMapApiKey
}

const envConfigFile = `export const environment = ${JSON.stringify(environment)};`;
const setEnv = () => {
    fs.writeFileSync(targetPath, envConfigFile, { encoding: "utf8" });
};

setEnv();