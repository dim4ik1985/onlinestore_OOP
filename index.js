class Good {
    constructor(params) {
        this.id = params.id;
        this.name = params.name;
        this.description = params.description;
        this.sizes = params.sizes;
        this.price = params.price;
        this.available = params.available;
    }
    setAvailable() {
        if (this.available) {
            return this.available = false;
        } else {
            return this.available = true;
        }
    }
}

class GoodsList {
    #goods = [];
    constructor(filter, sortPrice, sortDir) {
        this.filter = filter;
        this.sortPrice = sortPrice;
        this.sortDir = sortDir;
    }

    get list() {
        if (this.sortPrice && this.sortDir) {
            return this.#goods.filter(item => this.filter.test(item.name))
                .sort((item1, item2) => item1.price - item2.price);
        } else if (this.sortPrice && !this.sortDir) {
            return this.#goods.filter(item => this.filter.test(item.name))
                .sort((item1, item2) => item2.price - item1.price);
        } else {
            return this.#goods.filter(item => this.filter.test(item.name));
        }
    }

    add(good) {
        this.#goods.push(good);
    }

    remove(id) {
        let indexItem = this.#goods.findIndex(item => item.id === id);

        if (indexItem > -1) {
            this.#goods.splice(indexItem, 1);
        } else {
            console.log('Нет товара в каталоге с указанным id!!!')
        }
    }
}

class BasketGood extends Good{
    constructor(params, amount) {
        super(params);
        this.amount = amount;
    }
}

class Basket {

    constructor() {
        this.goods = [];
    }

    get totalAmount() {
        return this.goods.reduce((acc, item) => acc + item.amount, 0);
    }

    get totalSum() {
        return this.goods.reduce((acc, item) => acc + item.amount * item.price, 0)
    }

    add(good, amount) {
        let indexItem = this.goods.findIndex(item => item.id === good.id);

        if (indexItem > -1) {
            this.goods[indexItem].amount += amount;
        } else {
            this.goods.push(new BasketGood(good, amount));
        }

    }

    remove(good, amount) {
        let indexItem = this.goods.findIndex(item => item.id === good.id);

        if (indexItem > -1) {
            this.goods[indexItem].amount -= amount;
            if ((this.goods[indexItem]).amount <= 0) {
                this.goods.splice(indexItem, 1)
            }
        } else {
            console.log('Товара нет в корзине')
        }
    }

    clear() {
        this.goods.splice(0, this.goods.length);
        console.log('Корзина очищена')
    }

    removeUnavailable() {
        this.goods.filter(item => item.available === false)
            .forEach(index => this.goods.splice(index, 1));
    }
}


const good1 = new Good(
    {
        id: 1,
        name: "Спортивные толстовки",
        description: "Теплая толстовка с капюшоном",
        sizes: ["XS", "S", "M", "L"],
        price: 2000,
        available: true,
    }
)
const good2 = new Good(
    {
        id: 2,
        name: "Спортивные брюки",
        description: "Однотонные спортивные брюки",
        sizes: ["XS", "S", "M", "L"],
        price: 1500,
        available: true,
    }
)
const good3 = new Good(
    {
        id: 3,
        name: "Спортивные футболки",
        description: "Легкая футболка",
        sizes: ["XS", "S", "M", "L"],
        price: 650,
        available: false,
    }
)
const good4 = new Good(
    {
        id: 4,
        name: "Спортивные шорты",
        description: "Трикотажные шорты с принтом",
        sizes: ["S", "M", "L"],
        price: 900,
        available: false,
    }
)
const good5 = new Good(
    {
        id: 5,
        name: "Кеды",
        description: "Текстильные кроссовки NASA",
        sizes: [41, 43, 44],
        price: 2500,
        available: true,
    }
)

const goodsList = new GoodsList(/брюки/gi, true, true)

goodsList.add(good1)        // добавление товара в каталог
goodsList.add(good2)
goodsList.add(good3)
goodsList.add(good4)
goodsList.add(good5)
console.log(goodsList.list)
console.log('======================')
goodsList.remove(5)     // удаление товара из каталога по его id

good4.setAvailable()       // изменение признака доступности для продажи
good5.setAvailable()
console.log(goodsList.list)
console.log('======================')

const basketTest = new Basket()

basketTest.add(good3, 10)   // Добавление товара в корзину
basketTest.add(good5, 3)
basketTest.add(good1, 2)
basketTest.add(good3, 5)    //Увеличение колличества товара
console.log(basketTest)
console.log('=====================')
console.log(basketTest.totalAmount)
console.log((basketTest.totalSum))
console.log('=====================')

basketTest.remove(good3, 18)
console.log(basketTest)
console.log('=====================')

console.log(basketTest.totalAmount)
console.log((basketTest.totalSum))
console.log('=====================')

basketTest.remove(good3, 18)
basketTest.removeUnavailable()
console.log(basketTest)
basketTest.clear()



