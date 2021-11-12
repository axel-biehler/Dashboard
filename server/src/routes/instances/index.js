const express = require('express');
const instanceRouteMiddleware = require('../../services/instanceRouteMiddleware');
const services = require('../../services');

const router = express.Router();
router.post('/', require('./createInstance'));
router.delete('/:id', require('./deleteInstance'));
router.get('/', require('./listInstances'));

services.forEach((svc) => {
  svc.widgets.forEach((wid) => {
    router.get(`/${svc.name}/${wid.name}/:id`, instanceRouteMiddleware, wid.route);
  });
});

module.exports = router;
