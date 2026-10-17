export function joystickVector(dx,dy,radius=46){
 if(!Number.isFinite(dx)||!Number.isFinite(dy)||!Number.isFinite(radius)||radius<=0)return{x:0,y:0,magnitude:0,knobX:0,knobY:0};
 const distance=Math.hypot(dx,dy),clamped=Math.min(distance,radius),magnitude=Math.max(0,(clamped/radius-.14)/.86),n=distance||1;
 return{x:dx/n*magnitude,y:dy/n*magnitude,magnitude,knobX:dx/n*clamped,knobY:dy/n*clamped};
}
export function bindJoystick(element,{paused,move}){
 const knob=element.querySelector('.joystick-knob');let active=null;
 const reset=()=>{active=null;knob.style.transform='translate(0px,0px)';element.classList.remove('active');move(joystickVector(0,0));};
 const update=e=>{const r=element.getBoundingClientRect(),value=joystickVector(e.clientX-r.left-r.width/2,e.clientY-r.top-r.height/2,r.width*.32);knob.style.transform=`translate(${value.knobX}px,${value.knobY}px)`;move(value);};
 element.addEventListener('pointerdown',e=>{if(paused()||active!==null)return;e.preventDefault();active=e.pointerId;element.setPointerCapture(active);element.classList.add('active');update(e);});
 element.addEventListener('pointermove',e=>{if(e.pointerId!==active)return;e.preventDefault();if(paused()){reset();return;}update(e);});
 for(const name of ['pointerup','pointercancel','lostpointercapture'])element.addEventListener(name,e=>{if(e.pointerId===active)reset();});
 window.addEventListener('blur',reset);window.addEventListener('resize',reset);document.addEventListener('visibilitychange',()=>{if(document.hidden)reset();});return{reset};
}

export function bindTouchAction(element,action){let lastTouch=-Infinity;element.addEventListener('pointerdown',e=>{if(e.pointerType!=='touch'&&e.pointerType!=='pen')return;e.preventDefault();if(element.disabled)return;lastTouch=performance.now();action();});element.addEventListener('click',()=>{if(performance.now()-lastTouch>600)action();});}
