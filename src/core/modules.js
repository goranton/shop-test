import initLogger from "./logger";
const logger = initLogger();

/**
 *
 * @param path
 * @param routes
 * @param baseComponent
 * @param layout
 * @return {{path: string, component: *, children: [{path: *, component: *}]}}
 */
export function getRoutesStackForModule({
  path,
  routes,
  baseComponent,
  layout
}) {
  const baseRoute = {
    path,
    component: baseComponent
  };

  if (Array.isArray(routes)) {
    Object.assign(baseRoute, { children: routes });
  }

  return {
    path: "",
    component: layout,
    children: [baseRoute]
  };
}

export function getRoutesStackForModules(modules) {
  if (!Array.isArray(modules)) {
    logger(
      "Passing 'modules' attribute must be array [getRoutesStackForModules]",
      TypeError,
      true
    );
  }

  const stack = [];

  modules.forEach(module => {
    stack.push(getRoutesStackForModule(module));
  });

  return stack;
}

export async function getStoreConfigurationForModule({ name, store }) {
  return [
    name,
    {
      namespaced: true,
      ...(await store())?.default
    }
  ];
}

export function getStoreConfigurationForModules(modules) {
  const storeModules = [];
  const modulesWithStore = modules.filter(
    ({ store }) => typeof store === "function"
  );

  if (modulesWithStore.length) {
    modulesWithStore.forEach(module => {
      storeModules.push(getStoreConfigurationForModule(module));
    });
  }
  return storeModules;
}
