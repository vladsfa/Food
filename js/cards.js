
document.addEventListener("DOMContentLoaded", _ => {
    class Card {
        constructor({ img, title, descr, price, container, template }) {
            this.img = img;
            this.title = title;
            this.descr = descr;
            this.price = price;
            this.container = container;
            this.template = template;
        }
    
        render() {
            const element = document.createElement('div');
            this.container.innerHTML += this.template
                .replace("{img}", this.img)
                .replace("{title}", this.title)
                .replace("{descr}", this.descr)
                .replace("{price}", this.price);
        }
    }

    const container = document.querySelector('#menu__container');
    const template = `<div class="menu__item">
                        <img src="{img}">
                        <h3 class="menu__item-subtitle">{title}</h3>
                        <div class="menu__item-descr">{descr}</div>
                        <div class="menu__item-divider"></div>
                        <div class="menu__item-price">
                            <div class="menu__item-cost">Цена:</div>
                            <div class="menu__item-total"><span>{price}</span> грн/день</div>
                        </div>
                    </div>`;
    
    new Card({container,
        template,
        title: `Меню "Фитнес"`,
        descr: `Меню "Фитнес" - это новый подход к приготовлению блюд: больше свежих овощей и фруктов. Продукт активных и здоровых людей. Это абсолютно новый продукт с оптимальной ценой и высоким качеством!`,
        price: `229`,
        img: `img/tabs/vegy.jpg`}).render();

    new Card({container,
        template,
        title: `Меню “Премиум”`,
        descr: `В меню “Премиум” мы используем не только красивый дизайн упаковки, но
        и качественное исполнение блюд. Красная рыба, морепродукты, фрукты - ресторанное меню без похода
        в ресторан!`,
        price: `550`,
        img: `img/tabs/elite.jpg`}).render();
    
    new Card({container,
        template,
        title: `Меню "Постное"`,
        descr: `Меню “Постное” - это тщательный подбор ингредиентов: полное отсутствие
        продуктов животного происхождения, молоко из миндаля, овса, кокоса или гречки, правильное
        количество белков за счет тофу и импортных вегетарианских стейков.`,
        price: `430`,
        img: `img/tabs/post.jpg`}).render();
});

