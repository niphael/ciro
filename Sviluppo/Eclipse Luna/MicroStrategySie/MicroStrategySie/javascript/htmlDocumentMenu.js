function showSubMenu(sSubBlock,sParentBlock,sParentOption){var oMenu=getObj(sSubBlock);oMenu.style.zIndex=1000;var deleteElements=false;var nElements=0;var lX;var lY;updateCheckedAndEnabledOptions(sSubBlock);if(oMenu.getAttribute("C")!="1"){var p=document.getElementById(sParentOption);var dyn=p.getAttribute("dyn");if(dyn&&dyn.length>0){var scp=p.getAttribute("scp");var dyn_all=p.getAttribute("dyn_all");if(dyn_all==null){dyn_all=true;}var cmd=p.getAttribute("cmd");if(cmd==null){cmd="";}eval(dyn+'("'+sSubBlock+'",'+dyn_all+',"'+scp+'","'+cmd+'");');}else{completeMenu(sSubBlock);}}hideSubMenu(sSubBlock,sParentBlock,sParentOption);lX=getObjLeft(sParentBlock)+getObjWidth(sParentOption);lY=getObjSumTop(sParentOption);positionContextMenu(lX,lY,oMenu);if(bIsIE4){togglePulldowns(oMenu,false);}oMenu.style.visibility="visible";}function OMS(tdMenu){if(tdMenu.getAttribute("E")=="1"){tdMenu.className="menu-row-selected "+tdMenu.className.replace("menu-row-selected ","");if(tdMenu.getAttribute("SB")=="1"){showSubMenu("mb"+tdMenu.getAttribute("C"),tdMenu.getAttribute("B"),tdMenu.getAttribute("ID"));}else{hideSubMenu("mb"+tdMenu.getAttribute("C"),tdMenu.getAttribute("B"),tdMenu.getAttribute("ID"));}}}function toggleMenuCheckImage(tdMenu,control){if(eval(control)){tdMenu.setAttribute("H","1");}else{tdMenu.setAttribute("H","0");}getObj(tdMenu.getAttribute("B")).setAttribute("C","0");}function OCS(tdMenu){var target;if(tdMenu.getAttribute("E")=="1"){if(tdMenu.getAttribute("SB")!="1"){bIsOver=false;microstrategy.hidePopups(true);target=tdMenu.getAttribute("T");var js=tdMenu.getAttribute("JS");var appendState=tdMenu.getAttribute("P")!="0";var url=tdMenu.getAttribute("U");if(target=="1"){url=url+"&iframe=true";target="frameManager";}if(js!=null&&js.length!=0){this.href=url;if(target!="0"){this.target=target;}eval(js);toggleMenuCheckImage(tdMenu,tdMenu.getAttribute("DC"));}else{var keepSubmitting=true;if(microstrategy&&microstrategy.eventManager){keepSubmitting=microstrategy.eventManager.notifyOrphanBones("onmenusubmitform");}if(keepSubmitting){var oNewForm=createDynamicForm(url);if(target!="0"){oNewForm.target=target;}if(appendState){submitForm(oNewForm);}else{oNewForm.method="GET";oNewForm.submit();}}}}}}function OOS(tdMenu){if(tdMenu.getAttribute("E")=="1"){tdMenu.className=tdMenu.className.replace("menu-row-selected ","").replace("menu-row-selected","");}}