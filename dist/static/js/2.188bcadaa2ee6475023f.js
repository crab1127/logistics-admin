webpackJsonp([2],{"0mOP":function(t,e,n){"use strict";function i(t){n("H9HK")}Object.defineProperty(e,"__esModule",{value:!0});var a=n("E6W2"),o=n("fqWe"),l=n("VU/8"),s=i,r=l(a.a,o.a,!1,s,"data-v-6d17c1cb",null);e.default=r.exports},"2gkk":function(t,e,n){"use strict";e.a={name:"Sticky",props:{stickyTop:{type:Number,default:0},zIndex:{type:Number,default:1},className:{type:String}},data:function(){return{active:!1,position:"",currentTop:"",width:void 0,height:void 0,child:null,stickyHeight:0}},mounted:function(){var t=this;this.$nextTick(function(){t.height=t.$el.getBoundingClientRect().height}),window.addEventListener("scroll",this.handleScroll)},activated:function(){this.handleScroll()},destroyed:function(){window.removeEventListener("scroll",this.handleScroll)},methods:{sticky:function(){this.active||(this.position="fixed",this.active=!0,this.width=this.width+"px")},reset:function(){this.active&&(this.position="",this.width="auto",this.active=!1)},handleScroll:function(){if(this.width=this.$el.getBoundingClientRect().width,this.$el.getBoundingClientRect().top<=this.stickyTop)return void this.sticky();this.reset()}}}},E6W2:function(t,e,n){"use strict";var i=n("Dd8w"),a=n.n(i),o=n("vHhr"),l=n("Tr1n"),s={name:"",channelFeeRebateList:[{channelId:null,feeId:null,rebate:null}]};e.a={name:"address",computed:{dialogTitle:function(){return"add"===this.action?"from"===this.activeName?this.$t("address.tjsjrxx"):this.$t("address.tjfjrxx"):"from"===this.activeName?this.$t("address.xgsjrxx"):this.$t("address.xgfjrxx")}},data:function(){return{dialogVisible:!1,activeName:"from",action:"add",form:{},tableData:[],fetchChannel:[]}},watch:{activeName:function(t){this.load()}},mounted:function(){this.load()},methods:{onSubmit:function(){"add"===this.action?this.create():this.update()},onAdd:function(){this.action="add",this.form=a()({},s),this.dialogVisible=!0},onEdit:function(t){this.action="edit",this.form=a()({},t),this.dialogVisible=!0},onDel:function(t){var e=this,n="from"===this.activeName?t.fromAddrId:t.reachAddrId;this.$confirm(this.$t("address.delTip")).then(function(){return e.del(n)})},load:function(){var t=this;l.c().then(function(e){t.tableData=e.data})},update:function(){var t=this,e=this.form.id,n=a()({},this.form);l.d(e,n).then(function(e){t.load(),t.dialogVisible=!1})},create:function(){var t=this,e=a()({},this.form);l.a(e).then(function(e){t.load(),t.dialogVisible=!1})},del:function(t){var e=this;l.b(t).then(function(t){e.load()})},onAddChannel:function(){this.form.channelFeeRebateList.push({channelId:null,feeId:null,rebate:null})},onDelPick:function(t){this.form.pickUpLadderlList.splice(t,1)},loadChannel:function(){var t=this;l.e().then(function(e){t.channelList=e.data})}},components:{Sticky:o.a}}},H9HK:function(t,e,n){var i=n("LbCc");"string"==typeof i&&(i=[[t.i,i,""]]),i.locals&&(t.exports=i.locals);n("rjj0")("77db0bdd",i,!0)},LbCc:function(t,e,n){e=t.exports=n("FZ+f")(!0),e.push([t.i,".menu-add[data-v-6d17c1cb]{position:absolute;right:0;top:0}.channel-wrap[data-v-6d17c1cb]{border:1px dotted #fdd;padding:10px 10px 0;margin-bottom:10px}","",{version:3,sources:["E:/web/work/logistics-admin/src/views/set/member-level.vue"],names:[],mappings:"AACA,2BACE,kBAAmB,AACnB,QAAS,AACT,KAAO,CACR,AACD,+BACE,uBAAwB,AACxB,oBAAqB,AACrB,kBAAoB,CACrB",file:"member-level.vue",sourcesContent:["\n.menu-add[data-v-6d17c1cb] {\n  position: absolute;\n  right: 0;\n  top: 0;\n}\n.channel-wrap[data-v-6d17c1cb] {\n  border: 1px dotted #fdd;\n  padding: 10px 10px 0;\n  margin-bottom: 10px;\n}\n"],sourceRoot:""}])},Tr1n:function(t,e,n){"use strict";function i(t){return Object(h.a)({url:f.a.mailCost,method:"get",params:t})}function a(t){return Object(h.a)({url:f.a.mailCost,method:"post",data:t})}function o(t){return Object(h.a)({url:f.a.mailCost+"/"+t,method:"put"})}function l(t){return Object(h.a)({url:f.a.mailCost+"/"+t,method:"del"})}function s(t){return Object(h.a)({url:f.a.channel,method:"get",params:t})}function r(t){return Object(h.a)({url:f.a.discount,method:"get",params:t})}function c(t){return Object(h.a)({url:f.a.discount,method:"post",data:t})}function d(t){return Object(h.a)({url:f.a.discount+"/"+t,method:"put"})}function u(t){return Object(h.a)({url:f.a.discount+"/"+t,method:"del"})}e.f=i,e.g=a,e.i=o,e.h=l,e.e=s,e.c=r,e.a=c,e.d=d,e.b=u;var h=n("vLgD"),f=n("QmSG")},fqWe:function(t,e,n){"use strict";var i=function(){var t=this,e=t.$createElement,n=t._self._c||e;return n("div",[n("sticky",[n("el-button",{attrs:{type:"primary",icon:"plus"},on:{click:t.onAdd}},[t._v(t._s(t.$t("common.add")))])],1),t._v(" "),n("el-table",{staticStyle:{width:"100%"},attrs:{data:t.tableData,stripe:""}},[n("el-table-column",{attrs:{prop:"name",label:"会员名称",width:"180"}}),t._v(" "),n("el-table-column",{attrs:{prop:"moblie",label:"渠道",width:"180"}}),t._v(" "),n("el-table-column",{attrs:{prop:"address",label:"地址"}}),t._v(" "),n("el-table-column",{attrs:{width:"200",label:"操作"},scopedSlots:t._u([{key:"default",fn:function(e){return[n("el-button",{attrs:{type:"primary"}},[t._v("编辑")]),t._v(" "),n("el-button",[t._v("删除")])]}}])})],1),t._v(" "),n("el-dialog",{attrs:{title:t.dialogTitle,visible:t.dialogVisible,width:"50%"},on:{"update:visible":function(e){t.dialogVisible=e}}},[n("el-form",{attrs:{"label-width":"100px"}},[n("el-form-item",{attrs:{label:"会员等级名"}},[n("el-input",{attrs:{type:"text"},model:{value:t.form.name,callback:function(e){t.$set(t.form,"name",e)},expression:"form.name"}})],1),t._v(" "),t._l(t.form.channelFeeRebateList,function(e,i){return n("div",{key:i,staticClass:"channel-wrap"},[n("el-form-item",{attrs:{label:"渠道"}},[n("el-select",{model:{value:e.channelId,callback:function(n){t.$set(e,"channelId",n)},expression:"item.channelId"}})],1),t._v(" "),n("el-form-item",{attrs:{label:"费用类型"}},[n("el-select",{model:{value:e.feeId,callback:function(n){t.$set(e,"feeId",n)},expression:"item.feeId"}},[n("el-option",{attrs:{label:"feePickup",value:"feePickup"}}),t._v(" "),n("el-option",{attrs:{label:"feeDelivery",value:"feeDelivery"}}),t._v(" "),n("el-option",{attrs:{label:"feeLogistics",value:"feeLogistics"}})],1)],1),t._v(" "),n("el-form-item",{attrs:{label:"费用折扣"}},[n("el-input",{attrs:{type:"number"},model:{value:e.rebate,callback:function(n){t.$set(e,"rebate",n)},expression:"item.rebate"}})],1)],1)}),t._v(" "),n("el-form-item",[n("el-button",{on:{click:t.onAddChannel}},[t._v("\n          添加\n        ")])],1)],2),t._v(" "),n("span",{staticClass:"dialog-footer",attrs:{slot:"footer"},slot:"footer"},[n("el-button",{on:{click:function(e){t.dialogVisible=!1}}},[t._v(t._s(t.$t("common.cancel")))]),t._v(" "),n("el-button",{attrs:{type:"primary"},on:{click:t.onSubmit}},[t._v(t._s(t.$t("common.confirm")))])],1)],1)],1)},a=[],o={render:i,staticRenderFns:a};e.a=o},"oMR/":function(t,e,n){"use strict";var i=function(){var t=this,e=t.$createElement,n=t._self._c||e;return n("div",{style:{height:t.height+"px",zIndex:t.zIndex}},[n("div",{class:t.className,style:{top:t.stickyTop+"px",zIndex:t.zIndex,position:t.position,width:t.width,height:t.height+"px"}},[t._t("default",[n("div",[t._v("sticky")])])],2)])},a=[],o={render:i,staticRenderFns:a};e.a=o},vHhr:function(t,e,n){"use strict";var i=n("2gkk"),a=n("oMR/"),o=n("VU/8"),l=o(i.a,a.a,!1,null,null,null);e.a=l.exports}});
//# sourceMappingURL=2.188bcadaa2ee6475023f.js.map