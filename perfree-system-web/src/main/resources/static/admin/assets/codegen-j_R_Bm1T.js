function a(e){return axios.post("/api/auth/codegen/getTableList",e)}function t(e){return axios.post("/api/auth/codegen/create-list",e)}function n(e){return axios.post("/api/auth/codegen/codegenTablePage",e)}function o(e){return axios.get("/api/auth/codegen/getCodegenInfoByTableId?tableId="+e)}function i(e){return axios.post("/api/auth/codegen/saveConfig",e)}export{a,t as b,n as c,o as g,i as s};