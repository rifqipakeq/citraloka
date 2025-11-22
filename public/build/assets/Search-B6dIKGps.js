import{v as i,j as e}from"./app-CwGju8CY.js";import{c as h}from"./sweetalert2.esm.all-BOihAQ_-.js";/**
 * @license @tabler/icons-react v3.33.0 - MIT
 *
 * This source code is licensed under the MIT license.
 * See the LICENSE file in the root directory of this source tree.
 */var l=h("outline","search","IconSearch",[["path",{d:"M10 10m-7 0a7 7 0 1 0 14 0a7 7 0 1 0 -14 0",key:"svg-0"}],["path",{d:"M21 21l-6 -6",key:"svg-1"}]]);function p({url:t,placeholder:s}){const{data:a,setData:n,get:o}=i({search:""}),c=r=>{r.preventDefault(),o(`${t}?search=${a.search}`)};return e.jsx("form",{onSubmit:c,children:e.jsxs("div",{className:"relative",children:[e.jsx("input",{type:"text",value:a.search,onChange:r=>n("search",r.target.value),className:"py-2 px-4 pr-11 block w-full rounded-lg text-sm border focus:outline-hidden focus:ring-0 focus:ring-gray-400 text-gray-700 bg-white border-gray-200 focus:border-gray-200",placeholder:s}),e.jsx("div",{className:"absolute inset-y-0 right-0 flex items-center pointer-events-none pr-4",children:e.jsx(l,{size:18,strokeWidth:1.5})})]})})}export{p as S};
