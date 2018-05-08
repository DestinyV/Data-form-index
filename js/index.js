/*
* @Author: Jiyang Du
* @Date:   2018-05-02 11:38:53
* @Last Modified by:   Jiyang Du
* @Last Modified time: 2018-05-08 21:03:07
*/
window.onload = function(){
	var func = document.querySelector('#func'),
		func_list = document.querySelector('#func_list'),
		main = document.querySelector('#main'),
		edit = document.querySelector('#edit'),
		objManager = [],
		lis = func_list.children;

	/*localStorage reload  start*/
			var reload_pre = localStorage.getItem('Data_item');
			if(reload_pre){
				var reload_items = JSON.parse(reload_pre);
				for(let i = 0;i < reload_items.length;i+=1){
					reload_items[i].Manager = objManager;
					if(reload_items[i].item){
						var choice = new Choice(reload_items[i]);
						choice.build();
						Manager('containerDOMid');
					}else{
						var text = new Text(reload_items[i]);
						text.build();
						Manager('containerDOMid');
					}
				}
			}
	/*localStorage reload  end*/
	
		//给单行文字、多行文字、单项选择、多项选择添加点击事件
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
				containerDOMid : 'out-div-' + new Date().getTime(),
				outDOMclassName: 'Single-text',
				mainDOM : 'main',
				editDOMid: 'edit-div-' + new Date().getTime(),
				EditTitleid: 'title-input-'+ new Date().getTime(),
				EditContentid: 'content-input-'+ new Date().getTime(),
				Manager: objManager
			});
			Stext.build();
			Manager('containerDOMid');
			itemSave();
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
				containerDOMid : 'out-div-' + new Date().getTime(),
				outDOMclassName: 'Multiply-text',
				mainDOM : 'main',
				editDOMid: 'edit-div-' + new Date().getTime(),
				EditTitleid: 'title-input-'+ new Date().getTime(),
				EditContentid: 'content-input-'+ new Date().getTime(),
				Manager: objManager
			});
			Mtext.build();
			Manager('containerDOMid');
			itemSave();
		},true);
		lis[2].addEventListener('click',function(e){
			var Schoice = new Choice({
				containerDOM :'div',
				containerClassname: 'single-choice',
				containerDOMid: 'div-' + new Date().getTime(),
				titleDOM : 'h3',
				titleDOMid : 'h3-' + new Date().getTime(),
				titleText : '未命名',
				contentDOM: 'div',
				contentDOMid: 'div-content-' + new Date().getTime(),
				outsideDOM : 'div',
				insideDOMl : 'i',
				inDOMlclassName : 'Schoice-inside-i',
				insideDOMr : 'p',
				inDOMrclassName : 'Schoice-inside-p',
				item: [{
						display: true,
						checked: false,
						readonly: false,
						contentText: '项目'
					}, {
						display: true,
						checked: false,
						readonly: false,
						contentText: '项目'
					}, {
						display: true,
						checked: false,
						readonly: false,
						contentText: '项目'

					}],//text
				mainDOM : 'main',
				EditContainerDOMid:'edit-div-' + new Date().getTime(),
				editTitleid : 'edit-input-' + new Date().getTime(),
				editContentid : 'edit-ul-' + new Date().getTime(),
				item_input_DOM: 'radio',
				item_i_ClassName: 'item-i-single',
				item_input_ClassName: 'item-radio',
				item_text_ClassName: 'item-text',
				item_add_ClassName: 'item-add',
				item_del_ClassName: 'item-del',
				Manager: objManager
			});
			Schoice.build();
			Manager('containerDOMid');
			itemSave();
		},true);
		lis[3].addEventListener('click',function(e){
			var Mchoice = new Choice({
				containerDOM :'div',
				containerClassname: 'single-choice',
				containerDOMid: 'div-' + new Date().getTime(),
				titleDOM : 'h3',
				titleDOMid : 'h3-' + new Date().getTime(),
				titleText : '未命名',
				contentDOM: 'div',
				contentDOMid: 'div-content-' + new Date().getTime(),
				outsideDOM : 'div',
				insideDOMl : 'i',
				inDOMlclassName : 'Mchoice-inside-i',
				insideDOMr : 'p',
				inDOMrclassName : 'Mchoice-inside-p',
				item: [{
						display: true,
						checked: false,
						readonly: false,
						contentText: '项目'
					}, {
						display: true,
						checked: false,
						readonly: false,
						contentText: '项目'
					}, {
						display: true,
						checked: false,
						readonly: false,
						contentText: '项目'

					}],//text
				mainDOM : 'main',
				EditContainerDOMid:'edit-div-' + new Date().getTime(),
				editTitleid : 'edit-input-' + new Date().getTime(),
				editContentid : 'edit-ul-' + new Date().getTime(),
				item_input_DOM: 'checkbox',
				item_i_ClassName: 'item-i-multiply',
				item_input_ClassName: 'item-radio',
				item_text_ClassName: 'item-text',
				item_add_ClassName: 'item-add',
				item_del_ClassName: 'item-del',
				Manager: objManager
			});
			Mchoice.build();
			Manager('containerDOMid');
			itemSave();
		},true);

		//调用保存的实例对象！
		function Manager(arg){
			for(let i = 0;i < objManager.length;i+=1){//debugger;
				if(objManager[i]){console.log(objManager);
					document.getElementById(objManager[i][arg]).addEventListener('click',function(){
						if(objManager[i]){
							objManager[i].showEditor(edit);
							objManager[i].DataChange(objManager[i]);
							itemSave();
						}
					});
					document.getElementById(objManager[i][arg]).addEventListener('dblclick',function(e){
						if(objManager[i]){
							objManager[i].removeItem(objManager,this);
							itemSave();
						}
					});
				}
			}
		}
		/*loaclStorage 缓存start*/
		function itemSave(){
			if(objManager){
				localStorage.setItem('Data_item',JSON.stringify(objManager));
			}
		}
		/*loaclStorage 缓存end*/
}