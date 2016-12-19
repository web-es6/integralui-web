/*
  filename: integralui.accordion.js
  version : 0.5.0 BETA
  Copyright © 2016 Lidor Systems. All rights reserved.

  This file is part of the "IntegralUI Web" Library. 
                                                                   
  The contents of this file are subject to the IntegralUI Web License, and may not be used except in compliance with the License.
  A copy of the License should have been installed in the product's root installation directory or it can be found at
  http://www.lidorsystems.com/products/web/iui-web-license-agreement.pdf.
                                                            
  This SOFTWARE is provided "AS IS", WITHOUT WARRANTY OF ANY KIND, either express or implied. See the License for the specific language 
  governing rights and limitations under the License. Any infringement will be prosecuted under applicable laws.                           
*/
var __extends=this&&this.__extends||function(f,b){function a(){this.constructor=f}for(var c in b)b.hasOwnProperty(c)&&(f[c]=b[c]);f.prototype=null===b?Object.create(b):(a.prototype=b.prototype,new a)},__decorate=this&&this.__decorate||function(f,b,a,c){var g=arguments.length,d=3>g?b:null===c?c=Object.getOwnPropertyDescriptor(b,a):c,e;if("object"===typeof Reflect&&"function"===typeof Reflect.decorate)d=Reflect.decorate(f,b,a,c);else for(var k=f.length-1;0<=k;k--)if(e=f[k])d=(3>g?e(d):3<g?e(b,a,d):
e(b,a))||d;return 3<g&&d&&Object.defineProperty(b,a,d),d},__metadata=this&&this.__metadata||function(f,b){if("object"===typeof Reflect&&"function"===typeof Reflect.metadata)return Reflect.metadata(f,b)},core_1=require("@angular/core"),integralui_core_1=require("./integralui.core"),integralui_common_service_1=require("../services/integralui.common.service"),integralui_data_service_1=require("../services/integralui.data.service"),integralui_groupbox_1=require("./integralui.groupbox"),IntegralUIAccordion=
function(f){function b(a,b,g,d){f.call(this,b);this.dataService=a;this.commonService=b;this.cmpResolver=g;this.baseService=d;this.numGroups=0;this.currentSelection=null;this.currentSelectedIndex=-1;this.prevComponent=this.selectedComponent=null;this.removeIndex=-1;this.trialRef=null;this.afterCollapse=new core_1.EventEmitter;this.afterExpand=new core_1.EventEmitter;this.beforeCollapse=new core_1.EventEmitter;this.beforeExpand=new core_1.EventEmitter;this.groupAdding=new core_1.EventEmitter;this.groupAdded=
new core_1.EventEmitter;this.clear=new core_1.EventEmitter;this.groupRemoving=new core_1.EventEmitter;this.groupRemoved=new core_1.EventEmitter;this.selectionChanged=new core_1.EventEmitter;this.groupList=[]}__extends(b,f);Object.defineProperty(b.prototype,"selectedIndex",{get:function(){return this.currentSelectedIndex},set:function(a){this.currentSelectedIndex!=a&&(this.currentSelectedIndex=a,this.selectComponentByIndex(a))},enumerable:!0,configurable:!0});Object.defineProperty(b.prototype,"selectedGroup",
{get:function(){return this.currentSelection},set:function(a){this.currentSelection!=a&&(this.currentSelection=a,this.selectGroup(a))},enumerable:!0,configurable:!0});b.prototype.ngOnInit=function(){this.baseService.setComponent(this);this.dataService.init(this.groups);this.generalClassName="iui-accordion";this.initStyle()};b.prototype.ngAfterViewInit=function(){var a=this,b=setTimeout(function(){var c=a.cmpResolver.resolveComponentFactory(integralui_core_1.IntegralUITComponent);c&&a.contentRef&&
(a.trialRef=a.contentRef.createComponent(c));clearTimeout(b)},100)};b.prototype.ngAfterContentInit=function(){this.groupList=this.contentList.toArray();this.numGroups=this.groupList.length;0<this.numGroups&&(0<=this.selectedIndex?this.selectComponentByIndex(this.selectedIndex):this.selectedGroup&&this.groups?this.selectComponentByIndex(this.groups.indexOf(this.selectedGroup)):this.selectComponentByIndex(0));this.updateLayout()};b.prototype.ngOnDestroy=function(){this.trialRef&&this.trialRef.destroy()};
b.prototype.ngAfterContentChecked=function(){this.contentList&&(this.groupList=this.contentList.toArray(),this.numGroups!=this.groupList.length&&(this.numGroups=this.groupList.length,this.selectComponentByIndex(this.selectedIndex)),0==this.numGroups&&(this.selectedComponent=null))};b.prototype.addGroup=function(a){this.callEventAdd("add",a)};b.prototype.clearGroups=function(){this.dataService.clear();this.clear.emit(null)};b.prototype.insertGroupAt=function(a,b){this.callEventAdd("at",a,b)};b.prototype.insertGroupBefore=
function(a,b){this.callEventAdd("ref",a,-1,b)};b.prototype.insertGroupAfter=function(a,b){this.callEventAdd("ref",a,-1,b,!0)};b.prototype.removeGroup=function(a){this.callEventRemove(a)};b.prototype.removeGroupAt=function(a){this.groups&&0<=a&&a<this.groups.length&&this.callEventRemove(this.groups[a])};b.prototype.callEventAdd=function(a,b,g,d,e){var c={cancel:!1,group:b};this.groupAdding.emit(c);if(1!=c.cancel){switch(a){case "at":this.dataService.insert(b,g);break;case "ref":this.dataService.insertByRef(b,
d,e);break;default:this.dataService.insert(b)}this.groupAdded.emit({group:b});this.selectedComponent||this.selectComponentByIndex(0)}};b.prototype.callEventRemove=function(a){var b={cancel:!1,group:a};this.groupRemoving.emit(b);1!=b.cancel&&(this.removeIndex=this.groups?this.groups.indexOf(a):-1,this.dataService.removeAt(a),this.groupRemoved.emit({group:a}))};b.prototype.closeGroups=function(a){this.groupList=this.contentList.toArray();this.groupList.forEach(function(b){b!=a&&(b.selected=!1,b.collapse())})};
b.prototype.toggleGroups=function(){var a=this;if(a.selectedComponent)var b=setTimeout(function(){var c=0,d=0,e=0,f=a.selectedComponent.getContentHeight(),h=0;if(a.selectedComponent.expanded){a.prevComponent&&(c=a.prevComponent.getContentHeight());var l=setInterval(function(){d<f?(e=0==e?1:e+2,d+=e,c-=e,c=0<c?c:0,h=.75*d/f,a.selectedComponent.setOpacity(h),a.selectedComponent.setContentHeight(d+"px"),a.prevComponent&&a.prevComponent.setContentHeight(c+"px")):(h=1,a.selectedComponent.setOpacity(h),
a.selectedComponent.setContentHeight("auto"),a.prevComponent&&(a.prevComponent.setContentHeight("0"),a.prevComponent.expanded=!1,a.invokeEvent("AFTER_COLLAPSE",a.prevComponent)),a.invokeEvent("AFTER_EXPAND",a.selectedComponent),clearInterval(l))},25)}else a.selectedComponent.setContentHeight("0"),a.prevComponent&&a.prevComponent.setContentHeight("auto");clearInterval(b)},100)};b.prototype.getGroupCurrentIndex=function(a){this.groupList=this.contentList.toArray();return a&&this.groupList?this.groupList.indexOf(a):
-1};b.prototype.getGroupDataIndex=function(a){return a&&(a=this.getGroupCurrentIndex(a),this.groups&&0<=a&&a<this.groups.length)?a:-1};b.prototype.getGroupData=function(a){return this.groups&&0<=a&&a<this.groups.length?this.groups[a]:null};b.prototype.getGroupIndex=function(a){return a&&this.groups?this.groups.indexOf(a):-1};b.prototype.getComponentData=function(a){if(a){if(a.data)return a.data;a=this.getGroupDataIndex(a);if(this.groups&&0<=a&&a<this.groups.length)return this.groups[a]}return null};
b.prototype.invokeEvent=function(a,b){var c=!0,d=this.getComponentData(b),e={cancel:!1,group:d};switch(a){case "AFTER_COLLAPSE":this.afterCollapse.emit({group:d});break;case "AFTER_EXPAND":this.afterExpand.emit({group:d});this.closeGroups(b);break;case "BEFORE_COLLAPSE":this.beforeCollapse.emit(e);c=!e.cancel;break;case "BEFORE_EXPAND":this.beforeExpand.emit(e),c=!e.cancel}return c};b.prototype.invokeMethod=function(a,b){var c=!0;switch(a){case "SELECT_GROUP":c=this.selectComponent(b);break;case "TOGGLE_GROUPS":this.selectComponent(b),
this.toggleGroups(),c=!1}return c};b.prototype.isIndexInRange=function(a){this.contentList&&(this.groupList=this.contentList.toArray());return this.groupList?0<=a&&a<this.groupList.length:!1};b.prototype.updateLayout=function(){};b.prototype.clearSelection=function(a){this.groupList=this.contentList.toArray();this.groupList.forEach(function(b){b!=a&&(b.selected=!1,b.expanded=!1)})};b.prototype.selectComponent=function(a){if(a&&a!=this.selectedComponent){var b=this.getGroupCurrentIndex(a);this.currentSelectedIndex=
b;this.groups&&0<=b&&b<this.groups.length&&(this.currentSelection=this.groups[b]);this.prevComponent=this.selectedComponent;this.selectedComponent=a;this.clearSelection(a);a.selected=!0;a.expanded=!0;this.selectionChanged.emit({index:b,group:this.getGroupData(this.getGroupDataIndex(a))});return!0}return!1};b.prototype.selectComponentByIndex=function(a){this.isIndexInRange(a)&&this.selectComponent(this.groupList[a])};b.prototype.selectGroup=function(a){this.groups&&(this.currentSelectedIndex=this.groups.indexOf(a),
this.selectComponentByIndex(this.currentSelectedIndex))};__decorate([core_1.ContentChildren(integralui_groupbox_1.IntegralUIGroupBox),__metadata("design:type",core_1.QueryList)],b.prototype,"contentList",void 0);__decorate([core_1.ViewChild("content",{read:core_1.ViewContainerRef}),__metadata("design:type",core_1.ViewContainerRef)],b.prototype,"contentRef",void 0);__decorate([core_1.Input(),__metadata("design:type",Array)],b.prototype,"groups",void 0);__decorate([core_1.Input(),__metadata("design:type",
Number),__metadata("design:paramtypes",[Number])],b.prototype,"selectedIndex",null);__decorate([core_1.Input(),__metadata("design:type",Object),__metadata("design:paramtypes",[Object])],b.prototype,"selectedGroup",null);__decorate([core_1.Output(),__metadata("design:type",core_1.EventEmitter)],b.prototype,"afterCollapse",void 0);__decorate([core_1.Output(),__metadata("design:type",core_1.EventEmitter)],b.prototype,"afterExpand",void 0);__decorate([core_1.Output(),__metadata("design:type",core_1.EventEmitter)],
b.prototype,"beforeCollapse",void 0);__decorate([core_1.Output(),__metadata("design:type",core_1.EventEmitter)],b.prototype,"beforeExpand",void 0);__decorate([core_1.Output(),__metadata("design:type",core_1.EventEmitter)],b.prototype,"groupAdding",void 0);__decorate([core_1.Output(),__metadata("design:type",core_1.EventEmitter)],b.prototype,"groupAdded",void 0);__decorate([core_1.Output(),__metadata("design:type",core_1.EventEmitter)],b.prototype,"clear",void 0);__decorate([core_1.Output(),__metadata("design:type",
core_1.EventEmitter)],b.prototype,"groupRemoving",void 0);__decorate([core_1.Output(),__metadata("design:type",core_1.EventEmitter)],b.prototype,"groupRemoved",void 0);__decorate([core_1.Output(),__metadata("design:type",core_1.EventEmitter)],b.prototype,"selectionChanged",void 0);return b=__decorate([core_1.Component({moduleId:module.id,selector:"iui-accordion",template:'\n\t\t<div [ngClass]="ctrlClass">\n\t\t\t<div #content>\n\t\t\t\t<ng-content></ng-content>\n\t\t\t</div>\n\t\t</div>\n\t',styleUrls:["css/integralui.accordion.css"],
inputs:["controlStyle","data","state"],providers:[integralui_core_1.IntegralUIBaseService,integralui_data_service_1.IntegralUIDataService],encapsulation:core_1.ViewEncapsulation.None}),__metadata("design:paramtypes",[integralui_data_service_1.IntegralUIDataService,integralui_common_service_1.IntegralUICommonService,core_1.ComponentFactoryResolver,integralui_core_1.IntegralUIBaseService])],b)}(integralui_core_1.IntegralUIBaseComponent);exports.IntegralUIAccordion=IntegralUIAccordion;