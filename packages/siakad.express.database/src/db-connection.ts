import { AppDataSource } from './data-source';
import { Logger } from '@siakad/express.utils';

export const DatabaseConnection = async (): Promise<void> => {
    try {
        await AppDataSource.initialize();
        Logger.info('Database connected');
    } catch (error: any) {
        Logger.error(
            `Database connection failed | message: ${error} | stack: ${error.stack}`
        );
        Logger.error('Shutting down the server...');
        process.exit(1);
    }
};
