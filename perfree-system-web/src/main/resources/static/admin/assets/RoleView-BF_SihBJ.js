import{e as te,g as oe,f as ne}from"./menu-Zv2FujxN.js";import{r as s,l as de,a as i,y as se,b as O,d as ie,e as b,f as l,w as o,u as a,z as ue,h as p,B as S,C as re,D as K,k as me,t as ce,J as pe,M as fe,a3 as _e,N as ve,j as w,E as h,p as ge,n as be}from"./index-sKYmNANA.js";import{r as he,a as ke,b as Ve,c as ye}from"./role-DFWIJcAV.js";const xe={class:"page"},Ce={class:"search-box"},we={class:"right-tool"},Ae={class:"table-box"},Fe={style:{width:"100%",border:"1px solid rgb(228 231 237)",padding:"5px"}},Re={class:"dialog-footer"},Ue={class:"dialog-footer"},De={__name:"RoleView",setup(ze){let M=s([]);const L={children:"children",label:"name"},u=s({pageNo:1,pageSize:20,total:0,name:""}),d=s({id:"",name:"",code:"",expand:!1,selectAll:!1}),m=s({id:"",name:"",code:"",description:""}),P=de({name:[{required:!0,message:"请输入角色名称",trigger:"blur"}],code:[{required:!0,message:"请输入角色编码",trigger:"blur"}]}),_=s(),T=s(),x=s(),A=s();let f=s(!1),c=s(!1),V=s(""),B=s([]),F=s(!1),R=s(!1);function $(){x.value.validate(n=>{n&&he(m.value).then(e=>{e.code===200?(h.success("操作成功"),c.value=!1,C(),k()):h.error(e.msg)})})}function q(){C(),V.value="添加角色",c.value=!0}function I(n){C(),V.value="修改角色",c.value=!0,ke(n.id).then(e=>{m.value=e.data})}function G(n){ge.confirm("确定要删除["+n.name+"]吗？","提示",{confirmButtonText:"确认",cancelButtonText:"取消",type:"warning"}).then(()=>{Ve(n.id).then(e=>{e.code===200&&e.data?(h.success("删除成功"),k()):h.error(e.msg)})}).catch(()=>{})}function k(){F.value=!0,ye(u.value).then(n=>{B.value=n.data.list,u.value.total=n.data.total,F.value=!1})}function H(){u.value={name:""},T.value.resetFields()}function C(){m.value={id:"",name:"",code:"",description:""},x.value&&x.value.resetFields()}function U(){d.value={id:"",name:"",code:"",expand:!1,selectAll:!1},A.value&&A.value.resetFields()}function J(n){if(n.code==="admin"){h.warning("admin角色默认拥有所有权限,不可修改");return}U(),f.value=!0,d.value.name=n.name,d.value.code=n.code,d.value.id=n.id,V.value="菜单权限",R.value=!0,te({}).then(e=>{M.value=be(e.data,"id","pid","children","-1"),oe(n.id).then(v=>{_.value.setCheckedKeys(v.data),R.value=!1})})}function Q(){d.value.expand?Object.values(_.value.store.nodesMap).forEach(n=>n.expand()):Object.values(_.value.store.nodesMap).forEach(n=>n.collapse())}function W(){d.value.selectAll?Object.values(_.value.store.nodesMap).forEach(n=>{n.checked=!0}):Object.values(_.value.store.nodesMap).forEach(n=>{n.checked=!1})}function X(){let n={menuIds:[..._.value.getCheckedKeys(),..._.value.getHalfCheckedKeys()],roleId:d.value.id};ne(n).then(e=>{e.code===200&&e.data?(h.success("操作成功"),f.value=!1,U()):h.error(e.msg)})}return k(),(n,e)=>{const v=i("el-input"),g=i("el-form-item"),r=i("el-button"),z=i("el-form"),Y=i("el-col"),Z=i("el-row"),y=i("el-table-column"),ee=i("el-table"),le=i("el-pagination"),D=i("el-checkbox"),ae=i("el-tree"),E=i("el-dialog"),N=se("loading");return O(),ie("div",xe,[b("div",Ce,[l(z,{inline:!0,model:a(u),class:"demo-form-inline",ref_key:"searchFormRef",ref:T},{default:o(()=>[l(g,{label:"角色名称"},{default:o(()=>[l(v,{modelValue:a(u).name,"onUpdate:modelValue":e[0]||(e[0]=t=>a(u).name=t),placeholder:"请输入角色名称",clearable:""},null,8,["modelValue"])]),_:1}),l(g,null,{default:o(()=>[l(r,{type:"primary",onClick:k,icon:a(ue)},{default:o(()=>[p("查询")]),_:1},8,["icon"]),l(r,{icon:a(S),onClick:H},{default:o(()=>[p("重置")]),_:1},8,["icon"])]),_:1})]),_:1},8,["model"])]),l(Z,{gutter:10,class:"mb8"},{default:o(()=>[l(Y,{span:1.5},{default:o(()=>[l(r,{icon:a(re),type:"primary",plain:"",onClick:q},{default:o(()=>[p("新增")]),_:1},8,["icon"])]),_:1}),b("div",we,[l(r,{icon:a(S),circle:"",onClick:k},null,8,["icon"])])]),_:1}),b("div",Ae,[K((O(),me(ee,{data:a(B),style:{width:"100%",height:"100%"},"row-key":"id"},{default:o(()=>[l(y,{prop:"name",label:"角色名称","min-width":"150"}),l(y,{prop:"code",label:"角色编码","min-width":"150"}),l(y,{prop:"description",label:"描述","min-width":"240"}),l(y,{prop:"createTime",label:"创建时间","min-width":"120"},{default:o(t=>[b("span",null,ce(a(pe)(t.row.createTime)),1)]),_:1}),l(y,{label:"操作",width:"240",fixed:"right"},{default:o(t=>[l(r,{size:"small",type:"primary",link:"",icon:a(fe),onClick:j=>I(t.row)},{default:o(()=>[p("修改")]),_:2},1032,["icon","onClick"]),l(r,{size:"small",type:"primary",link:"",icon:a(_e),onClick:j=>J(t.row)},{default:o(()=>[p("菜单权限 ")]),_:2},1032,["icon","onClick"]),l(r,{size:"small",type:"primary",link:"",icon:a(ve),onClick:j=>G(t.row)},{default:o(()=>[p("删除")]),_:2},1032,["icon","onClick"])]),_:1})]),_:1},8,["data"])),[[N,a(F)]]),l(le,{"current-page":a(u).pageNo,"onUpdate:currentPage":e[1]||(e[1]=t=>a(u).pageNo=t),"page-size":a(u).pageSize,"onUpdate:pageSize":e[2]||(e[2]=t=>a(u).pageSize=t),"page-sizes":[10,20,30,50],layout:"total,sizes,prev, pager, next, jumper",background:"",small:"",onChange:k,total:a(u).total},null,8,["current-page","page-size","total"])]),l(E,{modelValue:a(f),"onUpdate:modelValue":e[8]||(e[8]=t=>w(f)?f.value=t:f=t),title:a(V),width:"600px",draggable:""},{footer:o(()=>[b("span",Re,[l(r,{type:"primary",onClick:X},{default:o(()=>[p("确 定")]),_:1}),l(r,{onClick:e[7]||(e[7]=t=>{w(f)?f.value=!1:f=!1,U()})},{default:o(()=>[p("取 消")]),_:1})])]),default:o(()=>[l(z,{ref_key:"menuFormRef",ref:A,model:a(d),"label-width":"80px",class:"demo-ruleForm","status-icon":""},{default:o(()=>[l(g,{label:"角色名称",prop:"name"},{default:o(()=>[l(v,{modelValue:a(d).name,"onUpdate:modelValue":e[3]||(e[3]=t=>a(d).name=t),disabled:""},null,8,["modelValue"])]),_:1}),l(g,{label:"角色编码",prop:"code"},{default:o(()=>[l(v,{modelValue:a(d).code,"onUpdate:modelValue":e[4]||(e[4]=t=>a(d).code=t),disabled:""},null,8,["modelValue"])]),_:1}),l(g,{label:"菜单权限",prop:"code"},{default:o(()=>[l(D,{modelValue:a(d).expand,"onUpdate:modelValue":e[5]||(e[5]=t=>a(d).expand=t),label:"展开/折叠",onChange:Q},null,8,["modelValue"]),l(D,{modelValue:a(d).selectAll,"onUpdate:modelValue":e[6]||(e[6]=t=>a(d).selectAll=t),label:"全选/全不选",onChange:W},null,8,["modelValue"]),b("div",Fe,[K(l(ae,{props:L,data:a(M),"node-key":"id","show-checkbox":"",ref_key:"menuTree",ref:_,"check-strictly":!0},null,8,["data"]),[[N,a(R)]])])]),_:1})]),_:1},8,["model"])]),_:1},8,["modelValue","title"]),l(E,{modelValue:a(c),"onUpdate:modelValue":e[13]||(e[13]=t=>w(c)?c.value=t:c=t),title:a(V),width:"600px",draggable:""},{footer:o(()=>[b("span",Ue,[l(r,{type:"primary",onClick:$},{default:o(()=>[p("确 定")]),_:1}),l(r,{onClick:e[12]||(e[12]=t=>{w(c)?c.value=!1:c=!1,C()})},{default:o(()=>[p("取 消")]),_:1})])]),default:o(()=>[l(z,{ref_key:"addFormRef",ref:x,model:a(m),"label-width":"80px","status-icon":"",rules:a(P)},{default:o(()=>[l(g,{label:"角色名称",prop:"name"},{default:o(()=>[l(v,{modelValue:a(m).name,"onUpdate:modelValue":e[9]||(e[9]=t=>a(m).name=t),placeholder:"请输入角色名称"},null,8,["modelValue"])]),_:1}),l(g,{label:"角色编码",prop:"code"},{default:o(()=>[l(v,{modelValue:a(m).code,"onUpdate:modelValue":e[10]||(e[10]=t=>a(m).code=t),placeholder:"请输入角色编码"},null,8,["modelValue"])]),_:1}),l(g,{label:"描述",prop:"description"},{default:o(()=>[l(v,{modelValue:a(m).description,"onUpdate:modelValue":e[11]||(e[11]=t=>a(m).description=t),placeholder:"请输入角色描述",autosize:{minRows:3,maxRows:6},type:"textarea"},null,8,["modelValue"])]),_:1})]),_:1},8,["model","rules"])]),_:1},8,["modelValue","title"])])}}};export{De as default};