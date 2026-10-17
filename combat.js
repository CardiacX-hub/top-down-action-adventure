// Shared combat rules keep the class identities consistent in the UI and simulation.
export const COMBAT = {
  druid: { attack: 'Thorn volley', primary: 'Living grove', secondary: 'Entangling roots', cooldown: 8, secondaryCooldown: 10, interval: .48, speed: 350, role: 'Nature keeper · sustain & control', look: 'Antler crown · leaf mantle · living staff', primaryDetail: 'Grow a healing grove that lashes nearby foes. Shapeshifting turns you into a bear.', secondaryDetail: 'Root enemies around your cursor for 4 seconds.', range: 220 },
  paladin: { attack: 'Crescent cleave', primary: 'Consecration', secondary: 'Dawn charge', cooldown: 9, secondaryCooldown: 8, interval: .6, speed: 0, role: 'Armored guardian · melee & defense', look: 'Silver plate · sun shield · golden blade', primaryDetail: 'Sanctify the ground for 5 seconds and gain a sacred shield.', secondaryDetail: 'Charge toward your cursor, striking foes along your path.', range: 105 },
  warlock: { attack: 'Soul bolt', primary: 'Soul rupture', secondary: 'Summon fiend', cooldown: 8, secondaryCooldown: 14, interval: .58, speed: 290, role: 'Pact weaver · lifesteal & minions', look: 'Horned hood · violet robes · fel grimoire', primaryDetail: 'Detonate souls around your cursor and steal health. Demon form adds wings and power.', secondaryDetail: 'Open a portal and call a fighting fiend for 12 seconds.', range: 300 },
  wizard: { attack: 'Ember & frost', primary: 'Inferno nova', secondary: 'Glacial lance', cooldown: 7, secondaryCooldown: 9, interval: .4, speed: 470, role: 'Elementalist · ranged bursts & frost', look: 'Starred blue hat · arcane robes · crystal staff', primaryDetail: 'Unleash a fire nova that burns nearby enemies for 3 seconds.', secondaryDetail: 'Launch a piercing ice lance that freezes enemies for 2.5 seconds.', range: 260 }
};
export function attackPattern(id,skills=[0,0,0],transformed=false){
 const c=COMBAT[id];
 if(id==='paladin'||(id==='druid'&&transformed))return {kind:'melee',count:1,range:id==='paladin'?105+skills[2]*3:85+skills[0]*4,interval:transformed?.42:c.interval,multiplier:transformed?1.9+skills[0]*.1:1.6+skills[2]*.05};
 if(id==='druid')return{kind:'thorn',count:skills[1]>=5?5:skills[1]>=2?3:1,pierce:skills[1]>=4,interval:c.interval,speed:c.speed,multiplier:1};
 if(id==='warlock')return{kind:'soul',count:skills[2]>=5?3:1,interval:transformed?.38:c.interval,speed:c.speed,multiplier:transformed?1.8:1.2,homing:true};
 return{kind:'elemental',count:skills[1]>=5?5:skills[1]>=3?3:1,interval:c.interval,speed:c.speed,multiplier:1};
}
export function inCone(origin,target,angle,range,halfAngle=1.15){const dx=target.x-origin.x,dy=target.y-origin.y;return Math.hypot(dx,dy)<=range&&Math.abs(Math.atan2(Math.sin(Math.atan2(dy,dx)-angle),Math.cos(Math.atan2(dy,dx)-angle)))<=halfAngle;}
export function boundedTarget(origin,target,range){const dx=target.x-origin.x,dy=target.y-origin.y,d=Math.hypot(dx,dy)||1;return{x:origin.x+dx/d*Math.min(d,range),y:origin.y+dy/d*Math.min(d,range)};}
