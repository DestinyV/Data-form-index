/*
* @Author: Jiyang Du
* @Date:   2018-05-03 10:08:58
* @Last Modified by:   Jiyang Du
* @Last Modified time: 2018-05-07 16:56:22
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
			this.containerDOMid = option.containerDOMid || '';
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
			outside_DOM.id = this.containerDOMid;
			outside_DOM.className = this.outDOMclassName;
			outside_DOM.appendChild(title_DOM);
			outside_DOM.appendChild(inside_DOM);
			//插入到mainpart中
			main_DOM.insertBefore(outside_DOM,main_DOM.childNodes[0]);
			//把要添加点击事件的DOM元素暴露到window中！
		},
		showEditor: function(edit){			//var self = this;			
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
			this.titleDOMid = option.titleDOMid || '';
			this.titleText = option.titleText || '未命名';
			this.contentDOM = option.contentDOM || 'div';
			this.contentDOMid = option.contentDOMid || '',
			this.outsideDOM = option.outsideDOM || 'div';
			this.insideDOMl = option.insideDOMl || 'i';
			this.inDOMlclassName = option.inDOMlclassName || '';
			this.insideDOMr = option.insideDOMr || 'p';
			this.inDOMrclassName = option.inDOMrclassName || '';
			this.item = option.item || [];
			this.mainDOM = option.mainDOM || 'main';
			this.edit_containerDOMid = option.EditContainerDOMid || '';
			this.editTitleid = option.editTitleid || '';
			this.editContentid = option.editContentid || '';
			this.item_input_DOM = option.item_input_DOM || '';
			this.item_i_ClassName = option.item_i_ClassName || '';
			this.item_input_ClassName = option.item_input_ClassName || '';
			this.item_text_ClassName = option.item_text_ClassName || '';
			this.item_add_ClassName = option.item_add_ClassName	|| '';
			this.item_del_ClassName = option.item_del_ClassName	|| '';
		},
		build: function(){
			var main_DOM = document.querySelector('#' + this.mainDOM);
			//动态创建DOM元素
			var container_DOM = document.createElement(this.containerDOM);
			container_DOM.id = this.containerDOMid;
			container_DOM.className = this.containerClassname;
			var title_DOM = document.createElement(this.titleDOM);
			title_DOM.id = this.titleDOMid;
			title_DOM.innerText = this.titleText;
			container_DOM.appendChild(title_DOM);
			var content_DOM = document.createElement(this.contentDOM);
				content_DOM.id = this.contentDOMid;
			for(let i = 0;i < this.item.length; i+=1){
				var outside_DOM = document.createElement(this.outsideDOM);
				var inside_DOMl = document.createElement(this.insideDOMl);
					inside_DOMl.className = this.inDOMlclassName;
				var inside_DOMr = document.createElement(this.insideDOMr);
					inside_DOMr.className = this.inDOMrclassName;
					inside_DOMr.innerText = this.item[i].innerText;
				outside_DOM.appendChild(inside_DOMl);
				outside_DOM.appendChild(inside_DOMr);
				content_DOM.appendChild(outside_DOM);
			}
			container_DOM.appendChild(content_DOM);
			//动态添加到mainpart中
			main_DOM.insertBefore(container_DOM,main_DOM.childNodes[0]);
		},
		showEditor: function(edit){
			edit.innerHTML = '';//刷新edit区域
			var edit_containerDOM = document.createElement('div');
				edit_containerDOM.id = this.edit_containerDOMid;
			var edit_titleDOM = document.createElement('div');
				var edit_titleDOM_head = document.createElement('h3');
					edit_titleDOM_head.innerText = '标题';
				var edit_titleDOM_body = document.createElement('input');
					edit_titleDOM_body.id = this.editTitleid;
					edit_titleDOM_body.required = true;
					edit_titleDOM_body.value = this.titleText?this.titleText:'';
			edit_titleDOM.appendChild(edit_titleDOM_head);
			edit_titleDOM.appendChild(edit_titleDOM_body);
			var edit_contentDOM = document.createElement('ul');
				edit_contentDOM.id = this.editContentid;
			//通过获取main区域choice的子元素来确定创建几个相应编辑DOM！
			var nodes = document.getElementById(this.contentDOMid).children;
			for(let i = 0; i < nodes.length; i+=1){
				var edit_content_item = document.createElement('li');
					var itemDOM_i = document.createElement('i');
						itemDOM_i.className = this.item_i_ClassName;
					var itemDOM_radio = document.createElement('input');
						itemDOM_radio.type = this.item_input_DOM;
						itemDOM_radio.className = this.item_input_ClassName;
					var itemDOM_text = document.createElement('input');
						itemDOM_text.value = nodes[i].innerText;
						itemDOM_text.type = 'text';
						itemDOM_text.required = true;
						itemDOM_text.className = this.item_text_ClassName;
					var itemDOM_add = document.createElement('i');
						itemDOM_add.innerText = '+';
						itemDOM_add.className = this.item_add_ClassName;
					var itemDOM_del = document.createElement('i');
						itemDOM_del.innerText = '-';
						itemDOM_del.className = this.item_del_ClassName;
				edit_content_item.appendChild(itemDOM_i);
				edit_content_item.appendChild(itemDOM_radio);
				edit_content_item.appendChild(itemDOM_text);
				edit_content_item.appendChild(itemDOM_add);
				edit_content_item.appendChild(itemDOM_del);
				//添加到contentDOM中！
				edit_contentDOM.appendChild(edit_content_item);
			}
			//再添加到整个editDOM中
			edit_containerDOM.appendChild(edit_titleDOM);
			edit_containerDOM.appendChild(edit_contentDOM);
			edit.appendChild(edit_containerDOM);
		},
		DataChange: function(_this){
			if(_this){
				_this.showEditor(edit);//重新再动态创建editDOM 否则还是之前新建的
			}
			var self = _this;
			//通过传入的id获取编辑区DOM
			var title = document.getElementById(_this.titleDOMid);//h3
			var content = document.getElementById(_this.contentDOMid);//div item容器
			var mainediter = document.getElementById(_this.edit_containerDOMid);//最大div
			var EditTitle = document.getElementById(_this.editTitleid);//input
			var EditContent = document.getElementById(_this.editContentid);//ul
			var nodes = EditContent.children;//项目li
			var items = content.children;//项目div
			mainediter.onkeypress = function(e){//debugger;//title 文本数据传输
				var e = event || window.event;
				if(e && e.keyCode === 13){
					if(EditTitle.value !== ''){
						self.titleText = EditTitle.value;
						title.innerText = EditTitle.value;
					}
				}
			}
			EditTitle.onchange = function(e){//title 文本数据传输
				if(EditTitle.value !== ''){
					self.titleText = EditTitle.value;
					title.innerText = EditTitle.value;
				}
			}
			for(let i = 0; i < nodes.length;i+=1){
				if(nodes[i].children[2].value){//input value
					nodes[i].children[2].onchange = function(e){//每个小项目文本修改后传输
						if(this.value){
							self.item[i].innerText = this.value;
						items[i].children[1].innerText = this.value;
						}
					}
					nodes[i].children[2].onkeypress = function(e){//每个小项目单击键盘enter后
						var e = event || window.event;
						if(e && e.keyCode === 13 && this.value){
							self.item[i].innerText = this.value;
							items[i].children[1].innerText = this.value;
						}
					}
					
				}
			}
		},
		removeItem: function(){
			console.log('remove-item');
		}
	}