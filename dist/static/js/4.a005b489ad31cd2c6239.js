webpackJsonp([4],{"2gkk":function(t,e,i){"use strict";e.a={name:"Sticky",props:{stickyTop:{type:Number,default:0},zIndex:{type:Number,default:1},className:{type:String}},data:function(){return{active:!1,position:"",currentTop:"",width:void 0,height:void 0,child:null,stickyHeight:0}},mounted:function(){var t=this;this.$nextTick(function(){t.height=t.$el.getBoundingClientRect().height}),window.addEventListener("scroll",this.handleScroll)},activated:function(){this.handleScroll()},destroyed:function(){window.removeEventListener("scroll",this.handleScroll)},methods:{sticky:function(){this.active||(this.position="fixed",this.active=!0,this.width=this.width+"px")},reset:function(){this.active&&(this.position="",this.width="auto",this.active=!1)},handleScroll:function(){if(this.width=this.$el.getBoundingClientRect().width,this.$el.getBoundingClientRect().top<=this.stickyTop)return void this.sticky();this.reset()}}}},"9wLW":function(t,e,i){t.exports=i.p+"static/img/404.a57b6f3.png"},"JLq+":function(t,e,i){var n=i("y9pc");"string"==typeof n&&(n=[[t.i,n,""]]),n.locals&&(t.exports=n.locals);i("rjj0")("a30a5380",n,!0)},Tw8L:function(t,e,i){"use strict";var n=function(){var t=this,e=t.$createElement,i=t._self._c||e;return i("div",{staticClass:"order-container"},[i("sticky",[i("el-tabs",{on:{"tab-click":t.handleClick},model:{value:t.activeName,callback:function(e){t.activeName=e},expression:"activeName"}},[i("el-tab-pane",{attrs:{label:"我的快递",name:"first"}}),t._v(" "),i("el-tab-pane",{attrs:{label:"等待付款",name:"second"}})],1),t._v(" "),i("div",{staticClass:"sub-navbar"},[i("label",{attrs:{for:""}},[t._v("时间:")]),t._v(" "),i("el-date-picker",{attrs:{type:"datetimerange","picker-options":t.pickerOptions2,"range-separator":"至","start-placeholder":"开始日期","end-placeholder":"结束日期",align:"right"},model:{value:t.from.time,callback:function(e){t.$set(t.from,"time",e)},expression:"from.time"}})],1)],1),t._v(" "),i("div",{staticClass:"el-table"},[t._m(0,!1,!1),t._v(" "),i("table",{staticClass:"el-table__body"},[t._m(1,!1,!1),t._v(" "),t._m(2,!1,!1),t._v(" "),i("tr",[t._m(3,!1,!1),t._v(" "),i("td",[t._v("\n          1213\n        ")]),t._v(" "),i("td",[t._v("23KG")]),t._v(" "),i("td",[t._v("出货")]),t._v(" "),t._m(4,!1,!1),t._v(" "),i("td",[i("el-button",[t._v("删除")])],1)]),t._v(" "),i("tr",[t._m(5,!1,!1),t._v(" "),i("td",[t._v("\n          1213\n        ")]),t._v(" "),i("td",[t._v("23KG")]),t._v(" "),i("td",[t._v("出货")]),t._v(" "),t._m(6,!1,!1),t._v(" "),i("td",[i("el-button",[t._v("删除")])],1)])])])],1)},a=[function(){var t=this,e=t.$createElement,i=t._self._c||e;return i("table",{staticClass:"el-table__header"},[i("colgroup",[i("col",{attrs:{width:"30"}}),t._v(" "),i("col",{attrs:{width:"10"}}),t._v(" "),i("col",{attrs:{width:"10"}}),t._v(" "),i("col",{attrs:{width:"20"}}),t._v(" "),i("col",{attrs:{width:"10"}}),t._v(" "),i("col",{attrs:{width:"20"}})]),t._v(" "),i("tr",[i("th",[t._v("服务商")]),t._v(" "),i("th",[t._v("订单数量")]),t._v(" "),i("th",[t._v("订单重量（kg）")]),t._v(" "),i("th",[t._v("订单状态")]),t._v(" "),i("th",[t._v("订单金额")]),t._v(" "),i("th",[t._v("操作")])])])},function(){var t=this,e=t.$createElement,i=t._self._c||e;return i("colgroup",[i("col",{attrs:{width:"30"}}),t._v(" "),i("col",{attrs:{width:"10"}}),t._v(" "),i("col",{attrs:{width:"10"}}),t._v(" "),i("col",{attrs:{width:"20"}}),t._v(" "),i("col",{attrs:{width:"10"}}),t._v(" "),i("col",{attrs:{width:"20"}})])},function(){var t=this,e=t.$createElement,i=t._self._c||e;return i("tr",[i("td",{attrs:{colspan:"6"}},[t._v(" 顶啊点")])])},function(){var t=this,e=t.$createElement,n=t._self._c||e;return n("td",[n("img",{attrs:{src:i("9wLW"),width:"200",alt:""}})])},function(){var t=this,e=t.$createElement,i=t._self._c||e;return i("td",[i("span",{staticClass:"red"},[t._v(" $28")])])},function(){var t=this,e=t.$createElement,n=t._self._c||e;return n("td",[n("img",{attrs:{src:i("9wLW"),width:"200",alt:""}})])},function(){var t=this,e=t.$createElement,i=t._self._c||e;return i("td",[i("span",{staticClass:"red"},[t._v(" $28")])])}],r={render:n,staticRenderFns:a};e.a=r},"e+iX":function(t,e,i){"use strict";function n(t){i("JLq+")}Object.defineProperty(e,"__esModule",{value:!0});var a=i("pnLg"),r=i("Tw8L"),s=i("VU/8"),o=n,l=s(a.a,r.a,!1,o,null,null);e.default=l.exports},"oMR/":function(t,e,i){"use strict";var n=function(){var t=this,e=t.$createElement,i=t._self._c||e;return i("div",{style:{height:t.height+"px",zIndex:t.zIndex}},[i("div",{class:t.className,style:{top:t.stickyTop+"px",zIndex:t.zIndex,position:t.position,width:t.width,height:t.height+"px"}},[t._t("default",[i("div",[t._v("sticky")])])],2)])},a=[],r={render:n,staticRenderFns:a};e.a=r},pnLg:function(t,e,i){"use strict";var n=i("vHhr");e.a={name:"order",data:function(){return{loading:!1,activeName:"first",from:{time:null},pickerOptions2:{shortcuts:[{text:"最近一周",onClick:function(t){var e=new Date,i=new Date;i.setTime(i.getTime()-6048e5),t.$emit("pick",[i,e])}},{text:"最近一个月",onClick:function(t){var e=new Date,i=new Date;i.setTime(i.getTime()-2592e6),t.$emit("pick",[i,e])}},{text:"最近三个月",onClick:function(t){var e=new Date,i=new Date;i.setTime(i.getTime()-7776e6),t.$emit("pick",[i,e])}}]}}},methods:{submitForm:function(){},handleClick:function(){}},components:{Sticky:n.a}}},vHhr:function(t,e,i){"use strict";var n=i("2gkk"),a=i("oMR/"),r=i("VU/8"),s=r(n.a,a.a,!1,null,null,null);e.a=s.exports},y9pc:function(t,e,i){e=t.exports=i("FZ+f")(!0),e.push([t.i,".el-table>table{width:100%}.order-container .el-tabs__header{margin-bottom:0}.sub-navbar{height:50px;line-height:50px;position:relative;width:100%;padding-right:20px;padding-left:20px;-webkit-transition:position .6s ease;transition:position .6s ease;background:-webkit-gradient(linear,left top,right top,from(#eee),color-stop(#f8f8f8),color-stop(100%,#f4f4f4),color-stop(0,#2178f1));background:linear-gradient(90deg,#eee,#f8f8f8,#f4f4f4 100%,#2178f1 0)}.table-fixed{table-layout:fixed}","",{version:3,sources:["E:/web/work/logistics-admin/src/views/order/index.vue"],names:[],mappings:"AACA,gBACE,UAAY,CACb,AAID,kCACE,eAAgB,CACjB,AACD,YACE,YAAa,AACb,iBAAkB,AAClB,kBAAmB,AACnB,WAAY,AAEZ,mBAAoB,AACpB,kBAAmB,AACnB,qCAAsC,AACtC,6BAA8B,AAC9B,qIAA8I,AAC9I,qEAA2E,CAC5E,AACD,aACE,kBAAoB,CACrB",file:"index.vue",sourcesContent:["\n.el-table > table {\n  width: 100%;\n}\n.order-container {\n  /* padding: 0 20px; */\n}\n.order-container .el-tabs__header {\n  margin-bottom: 0\n}\n.sub-navbar {\n  height: 50px;\n  line-height: 50px;\n  position: relative;\n  width: 100%;\n  /* text-align: right; */\n  padding-right: 20px;\n  padding-left: 20px;\n  -webkit-transition: position .6s ease;\n  transition: position .6s ease;\n  background: -webkit-gradient(linear, left top, right top, from(#eee), color-stop(#f8f8f8), color-stop(100%, #f4f4f4), color-stop(0, #2178f1));\n  background: linear-gradient(90deg, #eee, #f8f8f8, #f4f4f4 100%, #2178f1 0);\n}\n.table-fixed {\n  table-layout: fixed;\n}\n"],sourceRoot:""}])}});
//# sourceMappingURL=4.a005b489ad31cd2c6239.js.map