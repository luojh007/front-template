import { start } from 'single-spa'
import './libs/es6-promise.auto.min.js'
import { registerApp } from './register'
export default async function bootstrap() {
  let projectConfig = await SystemJS.import('/project.config.js');
  projectConfig.forEach((element) => {
    registerApp({
      name: element.name,
      main: element.main,
      url: element.prefix,
      store: element.store,
      base: element.base,
      path: element.path
    });
  })
  start();
}

bootstrap();