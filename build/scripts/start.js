const logger = require('../lib/logger')

logger.info('Starting server...')
require('../../server/main').listen(3033, () => {
  logger.success('Server is running at http://localhost:3033')
})
