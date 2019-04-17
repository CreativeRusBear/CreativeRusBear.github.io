import PubSub from "pubsub-js";
export default class Paginator {
    constructor(){
        this.scrollEvents();
        this.clickEvents();
        this.activeSlide=0;
        this.max=document.querySelectorAll('.section').length-1;
    }
    scrollEvents(){
        let that=this;
        window.onwheel=function(e) {
            let direction=e.deltaY>0?1:-1;
            let newSlide=that.activeSlide+direction;
            if (newSlide>that.max || newSlide<0) return;
            PubSub.publish('goToSlide', {from: that.activeSlide, to: newSlide});
            that.activeSlide=newSlide;
        }
    }
    clickEvents(){
        let that=this;
        let links=document.querySelectorAll('.pagination a');
        for (let val of links){
            val.onclick=function (e) {
                e.preventDefault();
                let newSlide=parseInt(this.getAttribute('data-gotoslide'));
                if (newSlide!==that.activeSlide){
                    PubSub.publish('goToSlide', {from: that.activeSlide, to: newSlide});
                    that.activeSlide=newSlide;
                }

            }
        }

    }
}
