module.exports.PrepareOrderAnalyticsData = (orders) => {
    const ordersByMonth = [];
    const currentMonth = new Date(Date.now()).getMonth();
    const currentYear = new Date(Date.now()).getFullYear();
    const months = ['January', 'Febuary', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', "December"];

    for(let i=0; i < orders.length; i++){
        const orderCreatedAt = new Date(orders[i]['created_at']);
        const orderMonth = orderCreatedAt.getMonth();
        const orderMonthName = months[orderCreatedAt.getMonth()];
        const orderYear = orderCreatedAt.getFullYear();

        // console.log(orderMonth <= currentMonth, "orders", orderYear === currentYear)
        if(orderMonth <= currentMonth && orderYear === currentYear){
            let monthIsExist = ordersByMonth.find(ele => {let objKeys = Object.values(ele); return objKeys.includes(orderMonthName);});
            if(monthIsExist === undefined){
                let orderObj = {
                    month: orderMonthName,
                    orders: [{id: orders[i].shopify_order_id, status: orders[i].order_status}]
                };
                ordersByMonth.push(orderObj);
            }
            else{
                monthIsExist.orders.push({id: orders[i].shopify_order_id, status: orders[i].order_status});
            }   
        }
    }

    // console.log(JSON.stringify(ordersByMonth));
    let salesOrdersByMonth = [];
    let totalOrdersByMonth = [];

    for(let i=0; i < months.length; i++){
        let monthIsExist = ordersByMonth.filter((ele) => {return ele.month === months[i]; });        
        if(monthIsExist.length > 0){
            const {orders} = monthIsExist[0];
            totalOrdersByMonth.push(orders.length);
            let salesOrders = orders.filter((order)=>{ return order.status === 'fulfilled'});
            salesOrdersByMonth.push(salesOrders.length);
        }
        else{
            salesOrdersByMonth.push(0);
            totalOrdersByMonth.push(0);
        }
    }

    return {salesOrdersByMonth, totalOrdersByMonth};

}