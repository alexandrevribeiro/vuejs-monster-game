var runner = require('express-app-runner');

runner.routeHomepageToFile('./index.html');
runner.addStaticDir('./css', '/css');
runner.run();