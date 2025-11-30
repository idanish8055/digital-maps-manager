const cron = require('node-cron');
const OrderQHandler = require("./components/orderQHandler");

class Scheduler{
    initOrderCreateScheduler(){
        cron.schedule('*/3 * * * * *', async() => {
            await OrderQHandler.pollCreateOrderMessage();
            // await OrderReciever.pollCreateOrderMessage();
            console.log('Polling for Order creation');
        });
    }

    initOrderUpdateBulkOperation(){
        cron.schedule('0 0 */12 * * *', async()=>{
            await OrderQHandler.pollUpdateOrderBulkOperation();
            console.log('Polling for Order updation bulk Operation');
        })
    }

    initOrderUpdateScheduler(){
        cron.schedule('*/5 * * * * *', async() => {
            await OrderQHandler.pollUpdateOrderMessage();
            console.log('Polling for Order updation');
        })
    }

    initOrderDeleteScheduler(){
        cron.schedule('*/10 * * * * *', async() => {
            await OrderQHandler.pollDeleteOrderMessage();
            console.log('Polling for Order deletion');
        })
    }
}

module.exports = new Scheduler;