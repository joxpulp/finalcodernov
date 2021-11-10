import { CONFIG } from './config/config'
import { logger } from './config/logs';
import Server from './services/server'

Server.listen(CONFIG.PORT, () =>  logger.info(`Server listening in ${CONFIG.PORT}`))
Server.on('error', (error) => logger.error(`There was an error: ${error}`));