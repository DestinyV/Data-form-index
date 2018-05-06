/*
* @Author: Jiyang Du
* @Date:   2018-05-02 11:38:53
* @Last Modified by:   Jiyang Du
* @Last Modified time: 2018-05-06 17:06:51
*/
window.onload = function(){
	var func = document.querySelector('#func'),
		func_list = document.querySelector('#func_list'),
		main = document.querySelector('#main'),
		mainform = [],
		edit = document.querySelector('#edit'),
		editform = [],
		objManager = [];

		var lis = func_list.children;
		lis[0].addEventListener('click',function(e){
			//每次点击new一个相应实例对象！
			var Stext = new Text({
				titleDOM : 'h3',
				titleDOMid :'h3-' + new Date().getTime() ,
				titleText : '未命名',
				insideDOM : 'div',
				insideDOMid : 'in-div-'+ new Date().getTime(),
				insideText: '',
				inDOMclassName : 'inner-div',
				outsideDOM : 'div',
				outsideDOMid : 'out-div-' + new Date().getTime(),
				outDOMclassName: 'Single-text',
				mainDOM : 'main',
				editDOMid: 'edit-div-' + new Date().getTime(),
				EditTitleid: 'title-input-'+ new Date().getTime(),
				EditContentid: 'content-input-'+ new Date().getTime(),
				Manager: objManager
			});
			Stext.build();
			GetManager('outsideDOMid');
		},true);
		lis[1].addEventListener('click',function(e){
			var Mtext = new Text({
				titleDOM : 'h3',
				titleDOMid :'h3-' + new Date().getTime() ,
				titleText : '未命名',
				insideDOM : 'div',
				insideDOMid : 'in-div-'+ new Date().getTime(),
				insideText: '',
				inDOMclassName : 'inner-div-multiply',
				outsideDOM : 'div',
				outsideDOMid : 'out-div-' + new Date().getTime(),
				outDOMclassName: 'Multiply-text',
				mainDOM : 'main',
				editDOMid: 'edit-div-' + new Date().getTime(),
				EditTitleid: 'title-input-'+ new Date().getTime(),
				EditContentid: 'content-input-'+ new Date().getTime(),
				Manager: objManager
			});
			Mtext.build();
			GetManager('outsideDOMid');
		},true);
		lis[2].addEventListener('click',function(e){
			var Schoice = new Choice({
				containerDOM :'div',
				containerClassname: 'single-choice',
				containerDOMid: 'div-' + new Date().getTime(),
				titleDOM : 'h3',
				titleText : '未命名',
				outsideDOM : 'div',
				outDOMclassName: '',
				insideDOMl : 'i',
				inDOMlclassName : 'Schoice-inside-i',
				insideDOMr : 'p',
				inDOMrclassName : 'Schoice-inside-p',
				mainDOM : 'main',
				Manager: objManager
			});
			Schoice.build();
			GetManager('containerDOMid',Schoice);
		},true);
		lis[3].addEventListener('click',function(e){
			var Mchoice = new Choice({
				containerDOM :'div',
				containerClassname: 'multiply-choice',
				containerDOMid: 'div-' + new Date().getTime(),
				titleDOM : 'h3',
				titleText : '未命名',
				outsideDOM : 'div',
				outDOMclassName: '',
				insideDOMl : 'i',
				inDOMlclassName : 'Mchoice-inside-i',
				insideDOMr : 'p',
				inDOMrclassName : 'Mchoice-inside-p',
				mainDOM : 'main',
				Manager: objManager
			});
			Mchoice.build();
			GetManager('containerDOMid',Mchoice);
		},true);

		//调用保存的实例对象！
		function GetManager(arg){
			for(let i = 0;i < objManager.length;i+=1){//debugger;
				if(objManager[i]){console.log(objManager);
					document.getElementById(objManager[i][arg]).addEventListener('click',function(){
						if(objManager[i]){
							objManager[i].showEditor(edit);
							objManager[i].DataChange(objManager[i]);
						}
					});
					document.getElementById(objManager[i][arg]).addEventListener('dblclick',function(e){
						objManager[i].removeItem(objManager,this);
					});
				}
			}
		}
		
		
	
	 














































































}