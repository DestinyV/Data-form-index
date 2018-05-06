/*
* @Author: Jiyang Du
* @Date:   2018-05-03 10:08:58
* @Last Modified by:   Jiyang Du
* @Last Modified time: 2018-05-06 17:04:08
*/
/*文本项目对象*/
	function Text(option){
			this._init(option);
			option.Manager.unshift(this);
		}
	Text.prototype = {
		_init:function(option){
			this.titleDOM = option.titleDOM || 'h3';//默认值为h3
			this.titleDOMid = option.titleDOMid || '';
			this.titleText = option.titleText || '未命名';
			this.insideDOM = option.insideDOM || 'div';
			this.insideDOMid = option.insideDOMid || '';
			this.insideText = option.insideText || '';
			this.inDOMclassName = option.inDOMclassName || 'inner-div';
			this.outsideDOM = option.outsideDOM || 'div';
			this.outsideDOMid = option.outsideDOMid || '';
			this.outDOMclassName = option.outDOMclassName || '';
			this.mainDOM = option.mainDOM || 'main';
			this.editDOMid = option.editDOMid || '';
			this.EditTitleid = option.EditTitleid || '';
			this.EditContentid = option.EditContentid || '';
		},
		build:function(){
			var main_DOM = document.querySelector('#' + this.mainDOM);
			//动态创建DOM元素
			var title_DOM = document.createElement(this.titleDOM);
			title_DOM.id = this.titleDOMid; 
			title_DOM.innerText = this.titleText;
			var inside_DOM = document.createElement(this.insideDOM);
			inside_DOM.id = this.insideDOMid;
			inside_DOM.className = this.inDOMclassName;
			inside_DOM.innerText= this.insideText;
			var outside_DOM = document.createElement(this.outsideDOM);
			outside_DOM.id = this.outsideDOMid;
			outside_DOM.className = this.outDOMclassName;
			outside_DOM.appendChild(title_DOM);
			outside_DOM.appendChild(inside_DOM);
			//插入到mainpart中
			main_DOM.insertBefore(outside_DOM,main_DOM.childNodes[0]);
			//把要添加点击事件的DOM元素暴露到window中！
		},
		showEditor: function(edit){
			//var self = this;			
				edit.innerHTML = '';
				var edit_DOM = document.createElement('div');
				edit_DOM.id = this.editDOMid;
				var edit_titleDOM = document.createElement('div');
				var edit_titleDOM_head = document.createElement('h3');
				edit_titleDOM_head.innerText = '标题';
				var edit_titleDOM_body = document.createElement('input');
				edit_titleDOM_body.id = this.EditTitleid;
				edit_titleDOM_body.value = this.titleText?this.titleText:'未命名';
				edit_titleDOM_body.required = true;
				edit_titleDOM.appendChild(edit_titleDOM_head);
				edit_titleDOM.appendChild(edit_titleDOM_body);
				var edit_contentDOM = document.createElement('div');
				var edit_contentDOM_head = document.createElement('h3');
				edit_contentDOM_head.innerText = '默认值';
				var edit_contentDOM_body = document.createElement('input');
				edit_contentDOM_body.id = this.EditContentid;
				edit_contentDOM_body.required = true;
				edit_contentDOM_body.value = this.insideText?this.insideText:'';
				edit_contentDOM.appendChild(edit_contentDOM_head);
				edit_contentDOM.appendChild(edit_contentDOM_body);
				edit_DOM.appendChild(edit_titleDOM);
				edit_DOM.appendChild(edit_contentDOM);
				edit.appendChild(edit_DOM);
		},
		DataChange: function(_this){//debugger;
			if(_this){
				_this.showEditor(edit);//重新再动态创建editDOM 否则还是之前新建的
			}
			var self = _this;
			//通过传入的id获取编辑区DOM
			var title = document.getElementById(_this.titleDOMid);
			var inside = document.getElementById(_this.insideDOMid);
			var mainediter = document.getElementById(_this.editDOMid);
			var EditTitle = document.getElementById(_this.EditTitleid);
			var EditContent = document.getElementById(_this.EditContentid);
			mainediter.onkeypress = function(e){
				var e = event || window.event;
				if(e && e.keyCode === 13){
					if(EditTitle.value !== ''){
						self.titleText = EditTitle.value;
						title.innerText = EditTitle.value;
					}
					if(EditContent.value !== ''){
						self.insideText = EditContent.value;
						inside.innerText = EditContent.value;
					}
				}
			}
			EditTitle.onchange = function(e){
				if(EditTitle.value !== ''){
					self.titleText = EditTitle.value;
					title.innerText = EditTitle.value;
				}
			}
			EditContent.onchange = function(e){
				if(EditContent.value !== ''){
					self.insideText = EditContent.value;
					inside.innerText = EditContent.value;
				}
			}
		},
		removeItem: function(array,item){//debugger;
			var main_DOM = document.querySelector('#' + this.mainDOM);
			var nodes = main_DOM.children;
			for(let i = 0;i < nodes.length;i+=1){
				if(nodes[i] === item){
					//从Manager中删除
					array.splice(i, 1);
					//从页面删除
					main_DOM.removeChild(nodes[i]);
				}
			}
		}
	}
/*选择项目对象*/
	function Choice(option){
		this._init(option);
		option.Manager.unshift(this);
	}
	Choice.prototype = {
		_init: function(option){
			this.containerDOM = option.containerDOM || 'div';
			this.containerClassname = option.containerClassname || '';
			this.containerDOMid = option.containerDOMid || '';
			this.titleDOM = option.titleDOM || 'h3';
			this.titleText = option.titleText || '未命名';
			this.outsideDOM = option.outsideDOM || 'div';
			this.outDOMclassName = option.outDOMclassName || '';
			this.insideDOMl = option.insideDOMl || 'i';
			this.insideDOMlText = option.insideDOMlText || '';
			this.inDOMlclassName = option.inDOMlclassName || '';
			this.insideDOMr = option.insideDOMr || 'p';
			this.insideDOMrText = option.insideDOMrText || '项目';
			this.inDOMrclassName = option.inDOMrclassName || '';
			this.mainDOM = option.mainDOM || 'main';
		},
		build: function(){
			var main_DOM = document.querySelector('#' + this.mainDOM);
			//动态创建DOM元素
			this.container_DOM = document.createElement(this.containerDOM);
			this.container_DOM.id = this.containerDOMid;
			this.container_DOM.className = this.containerClassname;
			var title_DOM = document.createElement(this.titleDOM);
			title_DOM.id = this.titleDOM + '-' + new Date().getTime();
			title_DOM.innerText = this.titleText;
			var outside_DOM = document.createElement(this.outsideDOM);
			outside_DOM.className = this.outDOMclassName;
			var inside_DOMl = document.createElement(this.insideDOMl);
			inside_DOMl.className = this.inDOMlclassName;
			inside_DOMl.innerText = this.insideDOMlText;
			var inside_DOMr = document.createElement(this.insideDOMr);
			inside_DOMr.className = this.inDOMrclassName;
			inside_DOMr.innerText = this.insideDOMrText;
			outside_DOM.appendChild(inside_DOMl);
			outside_DOM.appendChild(inside_DOMr);
			this.container_DOM.appendChild(title_DOM);
			this.container_DOM.appendChild(outside_DOM);
			this.container_DOM.appendChild(outside_DOM.cloneNode(true));
			this.container_DOM.appendChild(outside_DOM.cloneNode(true));
			//动态添加到mainpart中
			main_DOM.insertBefore(this.container_DOM,main_DOM.childNodes[0]);
		},
		showEditor: function(edit){
			this.container_DOM.addEventListener('click',function(){
				alert('click!Choice');
			},true);
		}
	}