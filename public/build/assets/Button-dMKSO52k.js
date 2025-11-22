import{v as p,j as e,Y as o}from"./app-CwGju8CY.js";import{c as s,S as r}from"./sweetalert2.esm.all-BOihAQ_-.js";/**
 * @license @tabler/icons-react v3.33.0 - MIT
 *
 * This source code is licensed under the MIT license.
 * See the LICENSE file in the root directory of this source tree.
 */var x=s("outline","arrow-back","IconArrowBack",[["path",{d:"M9 11l-4 4l4 4m-4 -4h11a4 4 0 0 0 0 -8h-1",key:"svg-0"}]]);/**
 * @license @tabler/icons-react v3.33.0 - MIT
 *
 * This source code is licensed under the MIT license.
 * See the LICENSE file in the root directory of this source tree.
 */var v=s("outline","check","IconCheck",[["path",{d:"M5 12l5 5l10 -10",key:"svg-0"}]]);/**
 * @license @tabler/icons-react v3.33.0 - MIT
 *
 * This source code is licensed under the MIT license.
 * See the LICENSE file in the root directory of this source tree.
 */var u=s("outline","pencil-cog","IconPencilCog",[["path",{d:"M4 20h4l10.5 -10.5a2.828 2.828 0 1 0 -4 -4l-10.5 10.5v4",key:"svg-0"}],["path",{d:"M13.5 6.5l4 4",key:"svg-1"}],["path",{d:"M19.001 19m-2 0a2 2 0 1 0 4 0a2 2 0 1 0 -4 0",key:"svg-2"}],["path",{d:"M19.001 15.5v1.5",key:"svg-3"}],["path",{d:"M19.001 21v1.5",key:"svg-4"}],["path",{d:"M22.032 17.25l-1.299 .75",key:"svg-5"}],["path",{d:"M17.27 20l-1.3 .75",key:"svg-6"}],["path",{d:"M15.97 17.25l1.3 .75",key:"svg-7"}],["path",{d:"M20.733 20l1.3 .75",key:"svg-8"}]]);/**
 * @license @tabler/icons-react v3.33.0 - MIT
 *
 * This source code is licensed under the MIT license.
 * See the LICENSE file in the root directory of this source tree.
 */var m=s("outline","plus","IconPlus",[["path",{d:"M12 5l0 14",key:"svg-0"}],["path",{d:"M5 12l14 0",key:"svg-1"}]]);/**
 * @license @tabler/icons-react v3.33.0 - MIT
 *
 * This source code is licensed under the MIT license.
 * See the LICENSE file in the root directory of this source tree.
 */var k=s("outline","trash","IconTrash",[["path",{d:"M4 7l16 0",key:"svg-0"}],["path",{d:"M10 11l0 6",key:"svg-1"}],["path",{d:"M14 11l0 6",key:"svg-2"}],["path",{d:"M5 7l1 12a2 2 0 0 0 2 2h8a2 2 0 0 0 2 -2l1 -12",key:"svg-3"}],["path",{d:"M9 7v-3a1 1 0 0 1 1 -1h4a1 1 0 0 1 1 1v3",key:"svg-4"}]]);function f({type:t,url:a,className:n,children:l,...c}){const{delete:d}=p(),i=async h=>{r.fire({title:"Are you sure you want to delete this?",text:"Data is unrecoverable!",icon:"warning",showCancelButton:!0,confirmButtonColor:"#3085d6",cancelButtonColor:"#d33",confirmButtonText:"Yes, delete it!",cancelButtonText:"Cancel"}).then(g=>{g.isConfirmed&&(d(h),r.fire({title:"Success!",text:"Data deleted successfully!",icon:"success",showConfirmButton:!1,timer:1500}))})};return e.jsxs(e.Fragment,{children:[t==="add"&&e.jsxs(o,{href:a,className:"px-4 py-2 text-sm border whitespace-nowrap rounded-lg bg-white text-gray-700 flex items-center gap-2 hover:bg-gray-100",children:[e.jsx(m,{size:18,strokeWidth:1.5})," ",e.jsx("span",{className:"hidden lg:flex",children:"Create New Data"})]}),t==="modal"&&e.jsx("button",{...c,type:"button",className:`${n} px-4 py-2 text-sm border rounded-lg flex items-center gap-2`,children:l}),t==="submit"&&e.jsxs("button",{type:"submit",className:"px-4 py-2 text-sm rounded-lg border border-teal-100 bg-teal-50 text-teal-500 flex items-center gap-2 hover:bg-teal-100",children:[e.jsx(v,{size:16,strokeWidth:1.5})," Save Data"]}),t==="cancel"&&e.jsxs(o,{href:a,className:"px-4 py-2 text-sm rounded-lg border border-rose-100 bg-rose-50 text-rose-500 flex items-center gap-2 hover:bg-rose-100",children:[e.jsx(x,{size:16,strokeWidth:1.5})," Go Back"]}),t==="edit"&&e.jsx(o,{href:a,className:"px-4 py-2 rounded-lg bg-orange-50 text-orange-500 flex items-center gap-2 hover:bg-orange-100",children:e.jsx(u,{size:16,strokeWidth:1.5})}),t==="delete"&&e.jsx("button",{onClick:()=>i(a),className:"px-4 py-2 rounded-lg bg-rose-50 text-rose-500 flex items-center gap-2 hover:bg-rose-100",children:e.jsx(k,{size:18,strokeWidth:1.5})})]})}export{f as B};
