import * as runner from 'express-app-runner';

runner.routeHomepageToFile('./index.html');
runner.addStaticDir('./css', '/css');
runner.addStaticDir('./js', '/js');
runner.run();