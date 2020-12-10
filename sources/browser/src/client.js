import * as sapper from '@sapper/app';
import {
  ApiService,
} from './services/ApiService.mjs';
import {
  DataService,
} from './services/DataService.mjs';

let apiService = new ApiService();
let dataService = new DataService();

const handleWindowUnload = () => {
  window.removeEventListener('unload', handleWindowUnload);

  apiService.destructor();
  dataService.destructor();

  apiService = null;
  dataService = null;
};

window.addEventListener('unload', handleWindowUnload);

(async () => {
  await apiService.start();

  sapper.start({
    target: document.querySelector('#giphy-browser')
  });
})();
