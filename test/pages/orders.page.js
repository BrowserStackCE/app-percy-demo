const Page = require("./page");

class OrdersPage extends Page {
  get ordersCount() {
    return $("~number-of-orders");
  }

  get ordersList() {
    return $$("~order-item");
  }
}

module.exports = new OrdersPage();
