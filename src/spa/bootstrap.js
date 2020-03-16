import { start, registerApplication } from 'single-spa'
import './libs/es6-promise.auto.min.js'
import "./libs/system";
import "./libs/named-exports";
import "./libs/named-register";
import "./libs/use-default";

import { registerApp } from './register'
async function bootstrap() {
  // let projectConfig = await SystemJS.import('/project.config.js');
  // projectConfig.forEach((element) => {
  //   registerApp({
  //     name: element.name,
  //     main: element.main,
  //     url: element.prefix,
  //     store: element.store,
  //     base: element.base,
  //     path: element.path
  //   });
  // })
  // start();
  registerApplication(
    'app1_app',
     () => SystemJS.import('/app1/js/app.js'),
    location => location.pathname.startsWith('/app1')
  )
  start()
}

bootstrap();