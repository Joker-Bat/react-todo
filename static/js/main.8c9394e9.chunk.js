(this["webpackJsonp10-react-todo"]=this["webpackJsonp10-react-todo"]||[]).push([[0],{12:function(t,e,n){},14:function(t,e,n){"use strict";n.r(e);var c=n(1),o=n.n(c),r=n(7),i=n.n(r),a=n(6),s=n(4),u=(n(12),n(0));var d=function(){var t=Object(c.useRef)(null),e=Object(c.useState)(""),n=Object(s.a)(e,2),o=n[0],r=n[1],i=Object(c.useState)([]),d=Object(s.a)(i,2),j=d[0],l=d[1],b=Object(c.useState)(void 0),f=Object(s.a)(b,2),O=f[0],v=f[1],h=function(t){var e=JSON.stringify(t);localStorage.setItem("todos",e)};return Object(c.useEffect)((function(){!function(){var t=JSON.parse(localStorage.getItem("todos"));t&&l(t)}()}),[]),Object(u.jsx)("div",{className:"App",children:Object(u.jsxs)("section",{className:"container",children:[Object(u.jsx)("h1",{children:"React Todo"}),Object(u.jsxs)("form",{onSubmit:function(t){if(t.preventDefault(),void 0!==O){var e=j.findIndex((function(t){return t.id===O})),n=Object(a.a)(j);n[e].todo=o,l(n),h(n),v(void 0)}else l((function(t){var e=[].concat(Object(a.a)(t),[{id:t.length,todo:o}]);return h(e),e}));r("")},children:[Object(u.jsx)("input",{ref:t,type:"text",value:o,placeholder:"Ithu ok va bro :)",onChange:function(t){return r(t.target.value)}}),Object(u.jsx)("button",{type:"submit",children:void 0!==O?"Save":"Add"})]}),Object(u.jsxs)("div",{className:"todoList",children:[Object(u.jsx)("h1",{children:"Your Todos"}),Object(u.jsx)("ul",{children:j.map((function(e){return Object(u.jsxs)("li",{children:[Object(u.jsx)("span",{onClick:function(){return function(e){t.current.focus();var n=j.filter((function(t){return t.id===e}))[0];v(n.id),r(n.todo)}(e.id)},children:e.todo}),Object(u.jsx)("span",{onClick:function(){return t=e.id,void l((function(e){var n=e.filter((function(e){return e.id!==t}));return h(n),n}));var t},children:"X"})]},e.id)}))})]})]})})};i.a.render(Object(u.jsx)(o.a.StrictMode,{children:Object(u.jsx)(d,{})}),document.getElementById("root"))}},[[14,1,2]]]);
//# sourceMappingURL=main.8c9394e9.chunk.js.map