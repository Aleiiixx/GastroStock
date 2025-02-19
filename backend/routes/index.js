const fs = require('fs');
const path = require('path');

const loadRoutes = (app) => {
    const routesPath = path.join(__dirname);

    fs.readdirSync(routesPath).forEach((file) => {
        if (file.endsWith('.js')) {
            const route = require(path.join(routesPath, file));
            const routeName = `/api/${file.replace('.js', '')}`;
            app.use(routeName, route);
        }
    });
};

module.exports = loadRoutes;
