function ProxyClickEvent(proxyBox) {
    var self = this;
    self.eventPool = [];
    if (proxyBox) {
        self._proxyBox = proxyBox;
    } else {
        self._proxyBox = document.body;
    }
    //更新数组，过滤掉被销毁的dom的事件
    self._bind_clearRemoveDomEventItem = self._clearRemoveDomEventItem.bind(self);
    //定时过滤dom不存在的元素
    self._timer = setInterval(function() {
        self._bind_clearRemoveDomEventItem();
    }, 1000)
    self.__bindEvent = self._bindEvent.bind(self);
    self._proxyBox.addEventListener("click", self.__bindEvent)
}
ProxyClickEvent.prototype._clearRemoveDomEventItem = function() {
    if (this.eventPool.some((el) => !document.body.contains(el.dom))) {
        this.eventPool = this.eventPool.filter(item => document.body.contains(item.dom));
    }
}
ProxyClickEvent.prototype._bindEvent = function(e) {
    let self = this;
    let target = e.target;
    for (let i = self.eventPool.length - 1; i >= 0; i--) {
        let event = self.eventPool[i];
        let fn = event.fn;

        /**
         * 1.如果target等于事件对应的dom
         * 2.否则事件dom是target的父节点&&e._target不为false
         * 3.如果e._stop为true时候，break
         * 那就执行回调函数
         * 
         * **/
        if (event.dom == target) {
            fn(e);
        } else if (!e.__stop && event.dom.contains(target)) {
            fn(e);
        } else if (e.__stop) {
            break;
        }
    }
}
ProxyClickEvent.prototype.add = function(dom, fn) {
    if (!(dom instanceof HTMLElement)) {
        console.error("invalid parameter dom", dom, "fn", fn)
        throw "function add arg1 should be a HTMLElement,but get " + (typeof dom)
    }
    if (typeof fn !== "function") {
        console.error("invalid parameter dom", dom, "fn", fn)
        throw "function add arg2 should be a function,but get " + (typeof fn)
    }
    if (this.eventPool.some(e => e.dom === dom)) {
        let fn = this.eventPool.filter(el => el.dom === dom)[0];
        console.error("本次添加点击事件的dom被拒绝，该dom是", dom, "它已经关联了函数:", fn);
        throw "该dom已有关联的点击回调函数，本次add被拒绝"
        return;
    }
    this.eventPool.push({
        dom: dom,
        fn: fn
    })
}
ProxyClickEvent.prototype.remove = function(dom, fn) {
    this.eventPool = this.eventPool.filter(item => item.dom != dom && item.fn != fn)
}
ProxyClickEvent.prototype.clear = function(dom, fn) {
    this.eventPool = []
}
ProxyClickEvent.prototype.destroy = function() {
    this.eventPool = [];
    this._proxyBox.removeEventListener("click", this.__bindEvent);
    clearInterval(this._timer);
}
export default ProxyClickEvent;