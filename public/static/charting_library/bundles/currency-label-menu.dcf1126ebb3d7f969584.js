(window.webpackJsonp=window.webpackJsonp||[]).push([["currency-label-menu"],{"1sXn":function(e,t,n){e.exports={scrollWrap:"scrollWrap-2-It3_hB"}},"20PO":function(e,t){e.exports='<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 18 18" width="18" height="18" fill="none"><path fill="currentColor" fill-rule="evenodd" clip-rule="evenodd" d="M9.7 9l4.65-4.65-.7-.7L9 8.29 4.35 3.65l-.7.7L8.29 9l-4.64 4.65.7.7L9 9.71l4.65 4.64.7-.7L9.71 9z"/></svg>'},"9agd":function(e,t,n){"use strict";n.r(t);var a=n("q1tI"),i=n.n(a),c=n("i8i4"),s=n.n(c),o=n("mrSG"),r=n("/KDZ"),l=n("uhCe"),u=n("Iksw"),d=n("TSYQ"),m=n.n(d),p=n("YFKU"),h=n("Iivm"),f=n("9dlw"),b=n("N5tr"),g=n("DTHj"),v=n("nPPD"),j=n("H9Gg"),O=n("KKsp"),E=n("cwLw"),w=n("1LIl");function x(e,t,n){const a=e.reduce((e,t)=>[...e,...t.actions],[]);return Object(j.c)({data:a,rules:n,queryString:t,primaryKey:"label"})}var A=n("9e/V"),y=n("20PO"),C=n("Znkj"),S=n("RNFX"),_=n("1sXn");const N=Object(v.a)(b.a,S),k=Object(v.a)(g.a,_);function Y(e){const{title:t,sections:n}=e,c=Object(o.a)(e,["title","sections"]),[s,r]=Object(a.useState)(""),[l,u]=Object(a.useState)(()=>n.reduce((e,t,n)=>(t.name&&(e[t.id]=!0),e),{})),d=Object(a.useMemo)(()=>Object(j.a)(s),[s]);return i.a.createElement(f.a,Object.assign({},c,{className:C.menu,theme:k,maxHeight:233,isOpened:!0}),i.a.createElement("div",{className:C.header},i.a.createElement("div",{className:C.title},t),i.a.createElement("div",{className:C.container},i.a.createElement(h.a,{icon:A,className:C.icon}),i.a.createElement("input",{size:1,type:"text",className:C.input,placeholder:Object(p.t)("Search"),autoComplete:"off","data-role":"search",onChange:function(e){r(e.target.value)},value:s}),Boolean(s)&&i.a.createElement(h.a,{icon:y,className:C.clear,onClick:function(){r("")}}))),s?x(n,s,d).map(e=>{const{label:t,isActive:n}=e,a=Object(o.a)(e,["label","isActive"]);return i.a.createElement(B,Object.assign({key:t,isActive:n,label:i.a.createElement(w.a,{text:t,rules:d,queryString:s,className:m()(n&&C.highlighted,n&&C.active)})},a))}):n.map((e,t)=>e.name?i.a.createElement(i.a.Fragment,{key:e.id},Boolean(t)&&i.a.createElement(O.a,null),i.a.createElement(E.a,{summary:e.name,className:C.section,open:l[e.id],onStateChange:t=>u(Object.assign(Object.assign({},l),{[e.id]:t}))},U(e.actions))):U(e.actions)))}function U(e){return e.map(e=>{const{id:t}=e,n=Object(o.a)(e,["id"]);return i.a.createElement(B,Object.assign({key:t},n))})}function B(e){const{description:t}=e,n=Object(o.a)(e,["description"]);return i.a.createElement(b.b,Object.assign({theme:N,shortcut:t},n))}var P=n("g89m"),T=n("QHWU"),G=n("sYiF");function q(e){const{title:t,onClose:n,sections:c}=e,[s,r]=Object(a.useState)(""),l=Object(a.useMemo)(()=>Object(j.a)(s),[s]);return i.a.createElement(P.a,{title:t,onClose:n,render:function(){return i.a.createElement(i.a.Fragment,null,i.a.createElement(T.a,{placeholder:Object(p.t)("Search"),onChange:u}),i.a.createElement("div",{className:G.container},s?x(c,s,l).map(e=>{const{id:t,label:n,isActive:a}=e,c=Object(o.a)(e,["id","label","isActive"])
;return i.a.createElement(F,Object.assign({key:t,isActive:a,label:i.a.createElement(w.a,{text:n,rules:l,queryString:s,className:m()(a&&G.highlighted)})},c))}):c.map((e,t)=>i.a.createElement(i.a.Fragment,{key:e.id},e.name&&i.a.createElement("div",{className:G.section},e.name),e.actions.map((n,a)=>{const{id:s}=n,r=Object(o.a)(n,["id"]),l=a===e.actions.length-1,u=t===c.length-1;return i.a.createElement(i.a.Fragment,{key:s},i.a.createElement(F,Object.assign({},r)),!u&&l&&i.a.createElement("div",{className:G.separator}))})))))},dataName:"unit-conversion-dialog",draggable:!1,fullScreen:!0,isOpened:!0});function u(e){r(e.target.value)}}function F(e){const{label:t,description:n,onClick:a,isActive:c}=e;return i.a.createElement("div",{className:m()(G.action,c&&G.active),onClick:a},i.a.createElement("div",{className:G.label},t),i.a.createElement("div",{className:G.description},n))}function X(e){const{element:t}=e,n=Object(o.a)(e,["element"]);return i.a.createElement(r.a,{rule:l.a.TabletSmall},e=>e?i.a.createElement(q,Object.assign({},n)):i.a.createElement(Y,Object.assign({},n,{onClickOutside:n.onClose,position:Object(u.e)(t,{})})))}function L(e,t,n){let a=document.createElement("div");const c=()=>{null!==a&&(s.a.unmountComponentAtNode(a),a=null)},o={title:e,sections:n,element:t,onClose:c};return s.a.render(i.a.createElement(X,Object.assign({},o)),a),{close:c,isOpened:()=>null!==a}}n.d(t,"showUnitConversion",(function(){return L}))},"9e/V":function(e,t){e.exports='<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 18 18" width="18" height="18" fill="none"><path stroke="currentColor" d="M11.85 11.93A5.48 5.48 0 0 0 8 2.5a5.5 5.5 0 1 0 3.85 9.43zm0 0L16 16"/></svg>'},ASyk:function(e,t,n){e.exports={"tablet-normal-breakpoint":"screen and (max-width: 768px)","small-height-breakpoint":"screen and (max-height: 360px)","tablet-small-breakpoint":"screen and (max-width: 428px)"}},KKsp:function(e,t,n){"use strict";n.d(t,"a",(function(){return o}));var a=n("q1tI"),i=n("TSYQ"),c=n.n(i),s=n("NOPy");function o(e){const{size:t="normal",className:n}=e;return a.createElement("div",{className:c()(s.separator,"small"===t&&s.small,"normal"===t&&s.normal,"large"===t&&s.large,n)})}},"ML8+":function(e,t,n){"use strict";n.d(t,"a",(function(){return r}));var a=n("q1tI"),i=n("TSYQ"),c=n("Iivm"),s=n("cvzQ"),o=n("R4+T");function r(e){const{dropped:t,className:n}=e;return a.createElement(c.a,{className:i(n,s.icon,{[s.dropped]:t}),icon:o})}},NOPy:function(e,t,n){e.exports={separator:"separator-eqcGT_ow",small:"small-eqcGT_ow",normal:"normal-eqcGT_ow",large:"large-eqcGT_ow"}},"R4+T":function(e,t){e.exports='<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 16 8" width="16" height="8"><path fill="currentColor" d="M0 1.475l7.396 6.04.596.485.593-.49L16 1.39 14.807 0 7.393 6.122 8.58 6.12 1.186.08z"/></svg>'},RNFX:function(e,t,n){e.exports={item:"item-212NePbJ",isActive:"isActive-212NePbJ",shortcut:"shortcut-212NePbJ",labelRow:"labelRow-212NePbJ"}},Znkj:function(e,t,n){e.exports={menu:"menu-__tSsAAY",header:"header-__tSsAAY",title:"title-__tSsAAY",
container:"container-__tSsAAY",icon:"icon-__tSsAAY",clear:"clear-__tSsAAY",input:"input-__tSsAAY",highlighted:"highlighted-__tSsAAY",active:"active-__tSsAAY",section:"section-__tSsAAY"}},aWqZ:function(e,t,n){"use strict";n.r(t),n.d(t,"currencyActions",(function(){return c}));var a=n("Eyy1"),i=n("YFKU");function c(e,t,n){if(null===t||t.readOnly)return[];const c=[],s=(e,t,n,a)=>({id:e,label:t,isActive:n,onClick:a}),o=t=>{e.setPriceScaleCurrency(n,t)},r=t.selectedCurrency,l=t.originalCurrencies,u=t.baseCurrencies,d=t.displayedValues,m={id:"first_section",actions:[]};if(l.size>1){const e=s("Mixed",Object(i.t)("Mixed"),null===t.selectedCurrency,()=>o(null));m.actions.push(e)}const p=e.model().availableCurrencies();if(null!==r){const e=s(r,Object(a.ensureDefined)(d.get(r)),!0,()=>{});m.actions.push(e)}const h=p.filterConvertible(u,e=>e!==r&&l.has(e));for(const a of h)m.actions.push(s(a.id,a.code,t.selectedCurrency===a.id,()=>o(a.id)));m.actions.length>0&&c.push(m);const f=p.filterConvertible(u,e=>e!==r&&!l.has(e)),b={id:"second_section",actions:[]};for(const a of f)b.actions.push(s(a.id,a.code,t.selectedCurrency===a.id,()=>o(a.id)));return b.actions.length>0&&c.push(b),c}},cvzQ:function(e,t,n){e.exports={icon:"icon-19OjtB6A",dropped:"dropped-19OjtB6A"}},cwLw:function(e,t,n){"use strict";n.d(t,"a",(function(){return l}));var a=n("q1tI"),i=n.n(a),c=n("TSYQ"),s=n.n(c),o=n("ML8+"),r=n("fioS");function l(e){return i.a.createElement(i.a.Fragment,null,i.a.createElement("div",{className:s()(e.className,r.summary),onClick:function(){e.onStateChange&&e.onStateChange(!e.open)},"data-open":e.open},e.summary,i.a.createElement(o.a,{className:r.caret,dropped:Boolean(e.open)})),e.open&&e.children)}},fioS:function(e,t,n){e.exports={summary:"summary-3UYGeClB",hovered:"hovered-3UYGeClB",caret:"caret-3UYGeClB"}},hpdS:function(e,t,n){"use strict";n.r(t),n.d(t,"unitActions",(function(){return c}));var a=n("Eyy1"),i=n("YFKU");function c(e,t,n){if(null===t||0===t.availableGroups.size)return[];const c=[],s=(e,t,n,a,i)=>({id:e,label:t,isActive:a,onClick:i,description:n}),o=t=>{e.setPriceScaleUnit(n,t)},r=t.selectedUnit,l=t.originalUnits,u=t.names,d=t.descriptions,m={actions:[],id:"first_section"};if(l.size>1){const e=s("Mixed",Object(i.t)("Mixed"),void 0,null===t.selectedUnit,()=>o(null));m.actions.push(e)}const p=e.model().availableUnits();if(null!==r){const e=s(r,Object(a.ensureDefined)(u.get(r)),Object(a.ensureDefined)(d.get(r)),!0,()=>{});m.actions.push(e)}const h=p.unitsByGroups(t.availableGroups);for(const a of h)for(const e of a.units)e.id!==r&&l.has(e.id)&&m.actions.push(s(e.id,e.name,e.description,!1,()=>o(e.id)));m.actions.length>0&&c.push(m);const f=r&&p.unitGroupById(r);if(null!==f)for(const a of h){if(a.name!==f)continue;const e={id:a.name,actions:[],name:a.name};for(const t of a.units)t.id===r||l.has(t.id)||e.actions.push(s(t.id,t.name,t.description,!1,()=>o(t.id)));e.actions.length>0&&c.push(e)}for(const a of h){if(a.name===f)continue;const e={id:a.name,actions:[],name:a.name}
;for(const t of a.units)t.id===r||l.has(t.id)||e.actions.push(s(t.id,t.name,t.description,!1,()=>o(t.id)));e.actions.length>0&&c.push(e)}return c}},nPPD:function(e,t,n){"use strict";function a(e,t,n={}){const a=Object.assign({},t);for(const i of Object.keys(t)){const c=n[i]||i;c in e&&(a[i]=[e[c],t[i]].join(" "))}return a}function i(e,t,n={}){return Object.assign({},e,a(e,t,n))}n.d(t,"b",(function(){return a})),n.d(t,"a",(function(){return i}))},sYiF:function(e,t,n){e.exports={container:"container-9xiUj6X_",separator:"separator-9xiUj6X_",section:"section-9xiUj6X_",action:"action-9xiUj6X_",active:"active-9xiUj6X_",label:"label-9xiUj6X_",description:"description-9xiUj6X_",highlighted:"highlighted-9xiUj6X_"}},uhCe:function(e,t,n){"use strict";n.d(t,"a",(function(){return i}));var a=n("ASyk");const i={SmallHeight:a["small-height-breakpoint"],TabletSmall:a["tablet-small-breakpoint"],TabletNormal:a["tablet-normal-breakpoint"]}}}]);