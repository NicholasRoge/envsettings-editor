const components = {};

const requireFromContext = require.context("./", false, /.jsx$/);
for (let componentPath of requireFromContext.keys()) {
    let componentName = componentPath.match(/\/(.*)\.jsx$/)[1];

    components[componentName] = requireFromContext(componentPath).default;
}

module.exports = components;
