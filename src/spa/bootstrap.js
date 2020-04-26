import { start } from 'single-spa'
import './libs/es6-promise.auto.min.js'
import "./libs/system";
import "./libs/named-exports";
import "./libs/named-register";
import "./libs/use-default";
import { registerApp } from './register'

window.SystemJS = window.System;
export async function bootstrap() {
  let projectConfig = await SystemJS.import('/project.config.js');
  projectConfig.projects.forEach((element) => {
    registerApp({
      name: element.name,
      main: element.main,
      url: element.prefix,
      store: element.store,
      base: element.base,
      path: element.path
    });
  })
  start()
}


