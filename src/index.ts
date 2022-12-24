import mongoose from 'mongoose';
import { PORT, MONGODB } from './constants';

import * as serverService from './services/server.service';

(async () => {
  try {
    await mongoose.connect(process.env.MONGO_CONNECTION_STRING || MONGODB);
    serverService.server.listen(process.env.PORT || PORT, function () {
      console.log('Сервер ожидает подключения...');
    })
  } catch (error) {
    console.log(error);
  }
})();

process.on('SIGINT', async () => {
  await mongoose.disconnect();
  process.exit();
});
