import enableGesture from '../js/enableGesture';
import Component, { PROPERTY_SYMBOL, ATTRIBUTE_SYMBOL, EVENT_SYMBOL, STATE_SYMBOL } from './Component';



/* props
* data
* width
* height
* dots
* easing
* autoplay
* effect
* easing
* */


// state



// attribute


/** config
 *
 *
 * */

/** Event
 *  beforeChange 切换前回调
 *  afterChange 切换后回调
 * */

/** methods
 * next()
 * prev()
 * goTo(slideNumber, dontAnimate)
 * */

export class Carousel extends Component {
    constructor() {
        super();
        this.timer = null;
        this.create();
    }
    create() {

    }
    appendTo(element){
        this.mount(element);
    }

    set data(val) {
        return this[PROPERTY_SYMBOL].data = val;
    }
    get data() {
        return this[PROPERTY_SYMBOL].data;
    }

    set auto(val) {
        return this[PROPERTY_SYMBOL].auto = val;
    }
    get auto() {
        return this[PROPERTY_SYMBOL].auto;
    }

    set position(val) {
        return this[STATE_SYMBOL].position = val;
    }
    get position() {
        return this[STATE_SYMBOL].position
    }
    set timer(val) {
        return this[STATE_SYMBOL].timer = val;
    }
    get timer() {
        return this[STATE_SYMBOL].timer;
    }
    set container(val) {
        return this[STATE_SYMBOL].container = val;
    }
    get container() {
        return this[STATE_SYMBOL].container;
    }
    /** 水平位移 */
    set disX(val) {
        return this[STATE_SYMBOL].disX = val;
    }
    get disX() {
        return this[STATE_SYMBOL].disX;
    }
    /** 鼠标最初位置 */
    set startX(val) {
        return this[STATE_SYMBOL].startX = val;
    }
    get startX() {
        return this[STATE_SYMBOL].startX;
    }
    /** 轮播宽度 */
    get width() {
        return this.container.offsetWidth;
    }
    mount(container) {
        const data = this.data;
        this[PROPERTY_SYMBOL].children = [];
        this[PROPERTY_SYMBOL].position = 0;
        for (let src of data) {
            const item = document.createElement('img');
            item.src = src;
            this[PROPERTY_SYMBOL].children.push(item);
        }
        this.container = container;
        this.container.classList.add('carousel');
        this[PROPERTY_SYMBOL].children.forEach(child => {
            container.appendChild(child);
        });
        this.mounted();
        // this.render();
    }
    mounted() {
        this.position = 0;
        // 注释此行禁止原始拖动代码
        // enableGesture(this.container);
        this.container.addEventListener('pan', this.panHandler.bind(this));
        this.container.addEventListener('flick', this.flickHandler.bind(this));
        this.container.addEventListener('panend', this.panendHandler.bind(this));
        this.container.addEventListener('mousedown', (event) => {
            event.preventDefault();
        });

    }
    render() {
        // 将子元素转化为普通数组
    }
    panHandler(event) {
        this.disX = event.clientX - this.startX;
        for (let child of this[PROPERTY_SYMBOL].children) {
            child.style.transition = 'ease 0s';
            child.style.transform = `translate(${-this.position * this.width + event.dx}px)`;
        }
    }
    panendHandler(event) {
        if (event.isFlick) return;
        console.log('panend');

        this.position = -Math.round((-this.position * this.width + event.dx) / this.width);
        this.position = Math.max(0, Math.min(this.position, this[PROPERTY_SYMBOL].children.length - 1));
        for (let child of this[PROPERTY_SYMBOL].children) {
            child.style.transition = '';
            child.style.transform = `translate(${-this.position * this.width}px)`;
        }
        this.triggerEvent('panend');
    }
    flickHandler(event) {
        if (event.dx < 0) {
            this.position += 1;
        } else {
            this.position -= 1;
        }
        this.position = Math.max(0, Math.min(this.position, this[PROPERTY_SYMBOL].children.length - 1));
        for (let child of this[PROPERTY_SYMBOL].children) {
            child.style.transition = '';
            child.style.transform = `translate(${-this.position * this.width}px)`;
        }
    }
    start(event) {
        this.triggerEvent('movestart');
        event.preventDefault();
        this.startX = event.clientX;
        this.disX = 0;
        document.addEventListener('mousemove', move);
        document.addEventListener('mouseup', end);
    }
    move(event) {
        this.triggerEvent('move');
        event.preventDefault();
        this.disX = event.clientX - this.startX;
        for (let child of this[PROPERTY_SYMBOL].children) {
            child.style.transition = 'ease 0s';
            child.style.transform = `translate(${-this.position * this.width + this.disX}px)`;
        }
    }
    end() {
        this.position = -Math.round((-this.position * this.width + this.disX) / this.width);
        this.position = Math.max(0, Math.min(this.position, this[PROPERTY_SYMBOL].children.length - 1));
        for (let child of this[PROPERTY_SYMBOL].children) {
            child.style.transition = '';
            child.style.transform = `translate(${-this.position * this.width}px)`;
        }
        document.removeEventListener('mousemove', this.move);
        document.removeEventListener('mouseup', this.move);
        this.triggerEvent('moveend');
    }
    nextFrame() {
        /** 下一轮播位置 */
        let nextPosition = this.position + 1;
        nextPosition = nextPosition % children.length;

        /** 当前轮播元素 */
        const current = children[this.position];

        /** 下一轮播元素 */
        const next = children[nextPosition];

        next.style.transition = 'ease 0s';
        next.style.transform = `translate(${ -nextPosition * 100 + 100 }%)`;

        requestAnimationFrame(() => {
            requestAnimationFrame(() => {
                current.style.transform = `translate(${ -100 - 100 * this.position }%)`;
                next.style.transition = '';
                next.style.transform = `translate(${ -nextPosition * 100 }%)`;
                this.position = nextPosition;
            });
        });
        this.timer = setTimeout(nextFrame, 3000);
    }
}
