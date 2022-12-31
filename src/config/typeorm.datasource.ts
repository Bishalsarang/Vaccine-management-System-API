import { DataSource } from 'typeorm';
import dataSourceConfig from './typorm.common.config';

const dataSource = new DataSource(dataSourceConfig);

dataSource.initialize();

export default dataSource;
