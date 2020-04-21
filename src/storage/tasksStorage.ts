import NodeCache from "node-cache";

const STORAGE_KEY = "storage";

const globalProperties = Object.getOwnPropertyNames(global);
const alreadyExists: boolean = (globalProperties.indexOf(STORAGE_KEY) > -1);

if (!alreadyExists){
  (global as NodeJS.Global)[STORAGE_KEY] = new NodeCache();
}

interface TasksStorage {
  cache? : NodeCache;
};
const singleton: TasksStorage = {};

Object.defineProperty(singleton, "cache", {
  get: function(): NodeCache {
    return global[STORAGE_KEY];
  }
});
Object.freeze(singleton);

export = singleton;