import{P as fe,r as c,l as me,a as u,y as he,b as d,d as m,e as p,f as a,w as t,u as l,F as G,m as C,k as _,z as _e,h as f,B as Q,Q as W,D as ge,t as O,J as be,R as ve,S as ye,N as we,j as P,T as Ve,U as ke,V as xe,W as Ge,X as Ce,E as T,p as Ue,Y as Ae}from"./index-sKYmNANA.js";import{g as ze}from"./attachConfig-C4U5uJ4c.js";const Fe={class:"page"},Te={class:"search-box"},Se={class:"right-tool"},Ie={class:"table-box"},Re={class:"block"},Ne={key:1,controls:"",preload:"none",style:{width:"100%","max-height":"100%"}},Be=["src"],Le={key:2},De=p("div",{class:"el-upload__text"},[f(" 拖拽文件到此处或者"),p("em",null,"点击上传")],-1),Ee=p("div",{class:"el-upload__tip"}," 请先选择存储策略及分组,如不选择将使用默认存储策略及分组 ",-1),Oe={style:{"padding-right":"15px"}},Pe={key:1,preload:"none",controls:"",style:{width:"100%","max-height":"100%"}},je=["src"],Je={key:2,controls:"",preload:"none"},Me=["src"],qe={key:3},Ke={class:"showForm"},Qe={class:"dialog-footer"},$e={__name:"AttachView",setup(We){let X=localStorage.getItem(fe.STORAGE_TOKEN),Y=Ve.baseURL,j=c([]),S=c(!1);const J=c();let x=c(!1),g=c(!1),U=c(""),A=c([]),I=c([]),R=c(null),$={Authorization:"Bearer "+JSON.parse(X).accessToken};const N=c(),z=c(),h=c({attachConfigId:R.value,attachGroup:"default",fileList:[]}),H=me({name:[{required:!0,message:"请输入附件名称",trigger:"blur"}]}),i=c({pageNo:1,pageSize:20,total:0,name:"",attachConfigId:void 0,storage:void 0,attachGroup:void 0}),n=c({name:"",type:"",attachGroup:"default",path:"",url:"",desc:"",mineType:""});function y(){S.value=!0,ke(i.value).then(r=>{j.value=r.data.list,i.value.total=r.data.total,S.value=!1})}function Z(){B(),y()}function ee(){i.value={attachConfigId:void 0,attachGroup:void 0,storage:void 0,name:""},J.value.resetFields()}function le(){h.value={attachConfigId:R.value,attachGroup:"default",fileList:[]},N.value&&N.value.resetFields()}function ae(){le(),U.value="上传附件",B(),x.value=!0}function B(){xe().then(r=>{A.value=r.data})}function te(){ze().then(r=>{I.value=r.data,r.data.forEach(o=>{o.master&&(R.value=o.id)})})}function oe(r){L(),Ge(r.id).then(o=>{n.value=o.data,U.value="详情",g.value=!0})}function L(){n.value={name:"",type:"",attachGroup:"default",path:"",url:"",desc:"",mineType:""},z.value&&z.value.resetFields()}function ne(){z.value.validate(r=>{r&&Ce(n.value).then(o=>{o.code===200?(T.success("修改成功"),g.value=!1,L(),y()):T.error(o.msg)})})}function de(r){Ue.confirm("确定要删除["+r.name+"]吗？删除后该文件将无法找回!","提示",{confirmButtonText:"确认",cancelButtonText:"取消",type:"warning"}).then(()=>{Ae(r.id).then(o=>{o.code===200&&o.data?(T.success("删除成功"),y()):T.error("删除失败")})}).catch(()=>{})}return B(),te(),y(),(r,o)=>{const w=u("el-option"),k=u("el-select"),s=u("el-form-item"),V=u("el-input"),b=u("el-button"),D=u("el-form"),E=u("el-col"),M=u("el-row"),v=u("el-table-column"),q=u("el-image"),F=u("el-link"),ie=u("el-table"),ue=u("el-pagination"),re=u("el-icon"),se=u("el-upload"),K=u("el-dialog"),pe=he("loading");return d(),m("div",Fe,[p("div",Te,[a(D,{inline:!0,model:l(i),class:"demo-form-inline",ref_key:"searchFormRef",ref:J},{default:t(()=>[a(s,{label:"分组"},{default:t(()=>[a(k,{modelValue:l(i).attachGroup,"onUpdate:modelValue":o[0]||(o[0]=e=>l(i).attachGroup=e),placeholder:"请选择分组",filterable:"","allow-create":"",clearable:"",style:{width:"200px"}},{default:t(()=>[(d(!0),m(G,null,C(l(A),e=>(d(),_(w,{key:e.attachGroup,label:e.attachGroup,value:e.attachGroup},null,8,["label","value"]))),128))]),_:1},8,["modelValue"])]),_:1}),a(s,{label:"附件名称"},{default:t(()=>[a(V,{modelValue:l(i).name,"onUpdate:modelValue":o[1]||(o[1]=e=>l(i).name=e),placeholder:"请输入附件名称",clearable:""},null,8,["modelValue"])]),_:1}),a(s,{label:"存储器类型"},{default:t(()=>[a(k,{modelValue:l(i).storage,"onUpdate:modelValue":o[2]||(o[2]=e=>l(i).storage=e),placeholder:"请选择存储器类型",clearable:"",style:{width:"200px"}},{default:t(()=>[(d(),_(w,{key:0,label:"本地磁盘",value:0})),(d(),_(w,{key:1,label:"S3对象存储",value:1}))]),_:1},8,["modelValue"])]),_:1}),a(s,{label:"存储策略"},{default:t(()=>[a(k,{modelValue:l(i).attachConfigId,"onUpdate:modelValue":o[3]||(o[3]=e=>l(i).attachConfigId=e),placeholder:"请选择存储策略",clearable:"",style:{width:"200px"}},{default:t(()=>[(d(!0),m(G,null,C(l(I),e=>(d(),_(w,{key:e.id,label:e.name,value:e.id},null,8,["label","value"]))),128))]),_:1},8,["modelValue"])]),_:1}),a(s,null,{default:t(()=>[a(b,{type:"primary",onClick:y,icon:l(_e)},{default:t(()=>[f("查询")]),_:1},8,["icon"]),a(b,{icon:l(Q),onClick:ee},{default:t(()=>[f("重置")]),_:1},8,["icon"])]),_:1})]),_:1},8,["model"])]),a(M,{gutter:10,class:"mb8"},{default:t(()=>[a(E,{span:1.5},{default:t(()=>[a(b,{icon:l(W),type:"primary",plain:"",onClick:ae},{default:t(()=>[f("上传附件")]),_:1},8,["icon"])]),_:1}),p("div",Se,[a(b,{icon:l(Q),circle:"",onClick:y},null,8,["icon"])])]),_:1}),p("div",Ie,[ge((d(),_(ie,{data:l(j),style:{width:"100%",height:"100%"},"row-key":"id","show-overflow-tooltip":!0},{default:t(()=>[a(v,{label:"序号","min-width":"50",type:"index"}),a(v,{prop:"name",label:"附件名称","min-width":"150"}),a(v,{prop:"attachGroup",label:"预览","min-width":"100"},{default:t(e=>[p("div",Re,[e.row.type&&e.row.type==="img"?(d(),_(q,{key:0,style:{width:"100%","max-height":"100%"},src:e.row.url,"zoom-rate":1.2,"max-scale":7,"min-scale":.2,"preview-src-list":[e.row.url],"initial-index":4,"append-to-body":"",fit:"cover","preview-teleported":""},null,8,["src","preview-src-list"])):e.row.type&&e.row.type==="video"?(d(),m("video",Ne,[p("source",{src:e.row.url},null,8,Be)])):(d(),m("i",Le,[f("无法预览，点击 "),a(F,{type:"primary",underline:!1,style:{"font-size":"12px","vertical-align":"baseline"},target:"_blank",href:"/api/attach/file/"+e.row.configId+"/get/"+e.row.path},{default:t(()=>[f("下载 ")]),_:2},1032,["href"])]))])]),_:1}),a(v,{prop:"url",label:"访问地址","min-width":"240"},{default:t(e=>[a(F,{href:e.row.url,target:"_blank",underline:!1},{default:t(()=>[f(O(e.row.url),1)]),_:2},1032,["href"])]),_:1}),a(v,{prop:"type",label:"附件类型","min-width":"100"}),a(v,{prop:"attachGroup",label:"分组","min-width":"100"},{default:t(e=>[p("span",null,O(e.row.attachGroup),1)]),_:1}),a(v,{prop:"createTime",label:"上传时间","min-width":"100"},{default:t(e=>[p("span",null,O(l(be)(e.row.createTime)),1)]),_:1}),a(v,{label:"操作",width:"180",fixed:"right"},{default:t(e=>[a(b,{size:"small",type:"primary",link:"",icon:l(ve),onClick:ce=>oe(e.row)},{default:t(()=>[f("详情")]),_:2},1032,["icon","onClick"]),a(F,{type:"primary",underline:!1,target:"_blank",icon:l(ye),style:{"font-size":"12px"},href:"/api/attach/file/"+e.row.configId+"/get/"+e.row.path},{default:t(()=>[f("下载 ")]),_:2},1032,["icon","href"]),a(b,{size:"small",type:"primary",link:"",icon:l(we),onClick:ce=>de(e.row)},{default:t(()=>[f("删除")]),_:2},1032,["icon","onClick"])]),_:1})]),_:1},8,["data"])),[[pe,l(S)]]),a(ue,{"current-page":l(i).pageNo,"onUpdate:currentPage":o[4]||(o[4]=e=>l(i).pageNo=e),"page-size":l(i).pageSize,"onUpdate:pageSize":o[5]||(o[5]=e=>l(i).pageSize=e),"page-sizes":[10,20,30,50],layout:"total,sizes,prev, pager, next, jumper",background:"",small:"",onChange:y,total:l(i).total},null,8,["current-page","page-size","total"])]),a(K,{modelValue:l(x),"onUpdate:modelValue":o[9]||(o[9]=e=>P(x)?x.value=e:x=e),title:l(U),width:"600px",draggable:"",onClose:Z},{default:t(()=>[a(D,{ref_key:"addFormRef",ref:N,model:l(h),"label-width":"80px","status-icon":""},{default:t(()=>[a(s,{label:"存储策略",prop:"name"},{default:t(()=>[a(k,{modelValue:l(h).attachConfigId,"onUpdate:modelValue":o[6]||(o[6]=e=>l(h).attachConfigId=e),placeholder:"请选择存储策略",clearable:""},{default:t(()=>[(d(!0),m(G,null,C(l(I),e=>(d(),_(w,{key:e.id,label:e.name,value:e.id},null,8,["label","value"]))),128))]),_:1},8,["modelValue"])]),_:1}),a(s,{label:"分组",prop:"attachGroup"},{default:t(()=>[a(k,{modelValue:l(h).attachGroup,"onUpdate:modelValue":o[7]||(o[7]=e=>l(h).attachGroup=e),placeholder:"请选择分组",filterable:"","allow-create":""},{default:t(()=>[(d(!0),m(G,null,C(l(A),e=>(d(),_(w,{key:e.attachGroup,label:e.attachGroup,value:e.attachGroup},null,8,["label","value"]))),128))]),_:1},8,["modelValue"])]),_:1}),a(s,{label:"附件描述",prop:"name"},{default:t(()=>[a(se,{class:"upload-demo",drag:"",headers:l($),action:l(Y)+"/api/auth/attach/upload",multiple:"",style:{width:"100%"},"file-list":l(h).fileList,"onUpdate:fileList":o[8]||(o[8]=e=>l(h).fileList=e),data:{attachConfigId:l(h).attachConfigId,attachGroup:l(h).attachGroup}},{tip:t(()=>[Ee]),default:t(()=>[a(re,{class:"el-icon--upload"},{default:t(()=>[a(l(W))]),_:1}),De]),_:1},8,["headers","action","file-list","data"])]),_:1})]),_:1},8,["model"])]),_:1},8,["modelValue","title"]),a(K,{modelValue:l(g),"onUpdate:modelValue":o[18]||(o[18]=e=>P(g)?g.value=e:g=e),title:l(U),width:"800px",draggable:""},{footer:t(()=>[p("span",Qe,[a(b,{type:"primary",onClick:ne},{default:t(()=>[f("修 改")]),_:1}),a(b,{onClick:o[17]||(o[17]=e=>{P(g)?g.value=!1:g=!1,L()})},{default:t(()=>[f("取 消")]),_:1})])]),default:t(()=>[a(M,null,{default:t(()=>[a(E,{xs:24,sm:12,md:12,lg:12,xl:12},{default:t(()=>[p("div",Oe,[l(n).type&&l(n).type==="img"?(d(),_(q,{key:0,style:{width:"100%","max-height":"100%"},src:l(n).url,"zoom-rate":1.2,"max-scale":7,"min-scale":.2,"preview-src-list":[l(n).url],"initial-index":4,fit:"cover"},null,8,["src","preview-src-list"])):l(n).type&&l(n).type==="video"?(d(),m("video",Pe,[p("source",{src:l(n).url},null,8,je)])):l(n).type&&l(n).type==="audio"?(d(),m("audio",Je,[p("source",{src:l(n).url},null,8,Me)])):(d(),m("i",qe,[f("无法预览，点击 "),a(F,{type:"primary",underline:!1,style:{"font-size":"12px","vertical-align":"baseline"},target:"_blank",href:"/api/attach/file/"+l(n).configId+"/get/"+l(n).path},{default:t(()=>[f("下载 ")]),_:1},8,["href"])]))])]),_:1}),a(E,{xs:24,sm:12,md:12,lg:12,xl:12},{default:t(()=>[p("div",Ke,[a(D,{ref_key:"showFormRef",ref:z,model:l(n),"label-width":"auto",rules:l(H),"label-position":"top"},{default:t(()=>[a(s,{label:"附件名称",prop:"name"},{default:t(()=>[a(V,{modelValue:l(n).name,"onUpdate:modelValue":o[10]||(o[10]=e=>l(n).name=e)},null,8,["modelValue"])]),_:1}),a(s,{label:"附件mineType"},{default:t(()=>[a(V,{modelValue:l(n).mineType,"onUpdate:modelValue":o[11]||(o[11]=e=>l(n).mineType=e),disabled:""},null,8,["modelValue"])]),_:1}),a(s,{label:"附件类型"},{default:t(()=>[a(V,{modelValue:l(n).type,"onUpdate:modelValue":o[12]||(o[12]=e=>l(n).type=e),disabled:""},null,8,["modelValue"])]),_:1}),a(s,{label:"分组"},{default:t(()=>[a(k,{modelValue:l(n).attachGroup,"onUpdate:modelValue":o[13]||(o[13]=e=>l(n).attachGroup=e),placeholder:"请选择分组",filterable:"",style:{width:"100%"},"allow-create":""},{default:t(()=>[(d(!0),m(G,null,C(l(A),e=>(d(),_(w,{key:e.attachGroup,label:e.attachGroup,value:e.attachGroup},null,8,["label","value"]))),128))]),_:1},8,["modelValue"])]),_:1}),a(s,{label:"存储路径"},{default:t(()=>[a(V,{modelValue:l(n).path,"onUpdate:modelValue":o[14]||(o[14]=e=>l(n).path=e),disabled:""},null,8,["modelValue"])]),_:1}),a(s,{label:"访问地址"},{default:t(()=>[a(V,{modelValue:l(n).url,"onUpdate:modelValue":o[15]||(o[15]=e=>l(n).url=e),disabled:""},null,8,["modelValue"])]),_:1}),a(s,{label:"附件描述"},{default:t(()=>[a(V,{modelValue:l(n).desc,"onUpdate:modelValue":o[16]||(o[16]=e=>l(n).desc=e),autosize:{minRows:2,maxRows:4},type:"textarea",resize:"none",placeholder:"请输入附件描述"},null,8,["modelValue"])]),_:1})]),_:1},8,["model","rules"])])]),_:1})]),_:1})]),_:1},8,["modelValue","title"])])}}};export{$e as default};