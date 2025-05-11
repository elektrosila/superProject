const util = require('util');

// jsdom-инстанс иногда не поднимает эти глобалы
global.TextEncoder = util.TextEncoder;
global.TextDecoder = util.TextDecoder;