import{s as d}from"./assets/x-Cbxi1o0w.js";/* empty css                      */import{f as l,i as m}from"./assets/vendor-Dov3POoy.js";const s=document.querySelector("input#datetime-picker"),t=document.querySelector("button[data-start]");t.disabled=!0;let r;function f(e){const n=Math.floor(e/864e5),i=Math.floor(e%864e5/36e5),u=Math.floor(e%864e5%36e5/6e4),c=Math.floor(e%864e5%36e5%6e4/1e3);return{days:n,hours:i,minutes:u,seconds:c}}const h={activeTimerID:null,timerElements:{days:document.querySelector(".value[data-days]"),hours:document.querySelector(".value[data-hours]"),minutes:document.querySelector(".value[data-minutes]"),seconds:document.querySelector(".value[data-seconds]")},start(){t.disabled=!0,s.disabled=!0,this.activeTimerID=setInterval(()=>{const e=r.getTime()-Date.now();if(e<=0)this.stop(),s.disabled=!1;else{const a=f(e);for(const o in this.timerElements)this.timerElements[o].textContent=String(a[o]).padStart(2,"0")}},1e3)},stop(){clearInterval(this.activeTimerID)}},y={enableTime:!0,time_24hr:!0,defaultDate:new Date,minuteIncrement:1,onClose(e){e[0]<Date.now()?(t.disabled=!0,m.show({message:"Please choose a date in the future",messageColor:"#ffffff",color:"#EF4040",position:"topRight",displayMode:1,iconUrl:`${d}`})):(t.disabled=!1,r=e[0])}};l(s,y);t.addEventListener("click",e=>{h.start()});
//# sourceMappingURL=1-timer.js.map
