const Page = require("./page");

class CartPage extends Page {

    get deleteFromCart() {
        if(driver.isIOS){
            return $("id=Delete");
        }else{
            return $(`//*[@text = 'Delete']`);
        }
    }

    get item() {
        return $('~cart-item');  
    }

    get productCount() {
        return $('~number-of-products');
    }

    get btnCheckout(){
        return $('~checkout-btn');
    }

    async proceedToCheckout() {
        await this.scrollToElement({anchor: 'x'}, await this.btnCheckout);
        await (await this.btnCheckout).click();
    }
}

module.exports = new CartPage();
