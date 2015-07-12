var AddBookForm = React.createClass({displayName: "AddBookForm",
	submit : function(e) {
		e.preventDefault();
		var thisComponent = this;
		$.ajax({
			url:'/book/add/by/' + localStorage['userId'] + '/',
			type : 'POST',
			data: new FormData(e.target),
			contentType: false,
    		processData: false,
    		success : function(res){
				//alert(res);
				if(res == '200'){
					$('#addBookForm input').val('');
					thisComponent.props.success();
				}
				
			}
		});
	},
	render: function() {
		return (
			React.createElement("form", {className: "form-horizontal", onSubmit: this.submit, id: "addBookForm", encType: "multipart/form-data"}, 
				React.createElement("div", {className: "form-group"}, 
    				React.createElement("label", {htmlFor: "inputName", className: "col-sm-2 control-label"}, "书名"), 
    				React.createElement("div", {className: "col-sm-10"}, 
      					React.createElement("input", {type: "text", className: "form-control", id: "inputName", ref: "name", name: "name"})
					)
				), 
				React.createElement("div", {className: "form-group"}, 
    				React.createElement("label", {htmlFor: "inputAuthor", className: "col-sm-2 control-label"}, "作者"), 
    				React.createElement("div", {className: "col-sm-10"}, 
      					React.createElement("input", {type: "text", className: "form-control", id: "inputAuthor", ref: "author", name: "author"})
					)
				), 
				React.createElement("div", {className: "form-group"}, 
    				React.createElement("label", {htmlFor: "inputPicture", className: "col-sm-2 control-label"}, "封面"), 
    				React.createElement("div", {className: "col-sm-10"}, 
      					React.createElement("input", {type: "file", className: "form-control", id: "inputPicture", ref: "picture", name: "picture"})
					)
				), 
				React.createElement("div", {className: "form-group"}, 
    				React.createElement("label", {htmlFor: "inputKind", className: "col-sm-2 control-label"}, "类型"), 
    				React.createElement("div", {className: "col-sm-10"}, 
      					React.createElement("input", {type: "text", className: "form-control", id: "inputKind", ref: "kind", name: "kind"})
					)
				), 
				React.createElement("div", {className: "form-group"}, 
    				React.createElement("label", {htmlFor: "inputDescription", className: "col-sm-2 control-label"}, "简介"), 
    				React.createElement("div", {className: "col-sm-10"}, 
      					React.createElement("textarea", {className: "form-control", id: "inputDescription", ref: "description", name: "description"})
					)
				), 
				React.createElement("div", {className: "form-group"}, 
    				React.createElement("div", {className: "col-sm-10 col-sm-offset-2"}, 
      					React.createElement("input", {type: "submit", className: "form-control", value: "提交"})
					)
				)
			)
		);
	}
});
var AddCommentForm = React.createClass({displayName: "AddCommentForm",
	setMark:function(e) {
		var id = e.target.id;
		var element = $('#' + id);
		element.prevAll('span').removeClass('glyphicon-star-empty');
		element.nextAll('span').removeClass('glyphicon-star');
		element.removeClass('glyphicon-star-empty');
		element.addClass('glyphicon-star');
		element.prevAll('span').addClass('glyphicon-star');
		element.nextAll('span').addClass('glyphicon-star-empty');
	},
	addComment : function() {
		var mark = $('.glyphicon-star').length;
		var content = React.findDOMNode(this.refs.content).value;
		var data = {
			mark : mark,
			content : content
		};
		var bookId = this.props.book.pk;
		var userId = localStorage['userId'];
		var url = '/book/' + bookId + '/comment/add/by/' + userId + '/';
		$.post(url,data,function(res){
			if(res!='200'){
				alert('添加评论失败');
			}
			else{
				$('.glyphicon').removeClass('glyphicon-star');
				$('#inputComment').val('');
				alert("成功添加评论");
			}
		});
	},
	render: function() {
		return (
			React.createElement("div", {className: "form-horizontal", id: "addCommentForm"}, 
				React.createElement("h4", null, "添加评论："), 
				React.createElement("div", {className: "form-group", style: {marginLeft:20}}, 
				React.createElement("label", null, "评分："), 
					React.createElement("span", {onClick: this.setMark, className: "glyphicon glyphicon-star-empty", id: "mark1"}), 
					React.createElement("span", {onClick: this.setMark, className: "glyphicon glyphicon-star-empty", id: "mark2"}), 
					React.createElement("span", {onClick: this.setMark, className: "glyphicon glyphicon-star-empty", id: "mark3"}), 
					React.createElement("span", {onClick: this.setMark, className: "glyphicon glyphicon-star-empty", id: "mark4"}), 
					React.createElement("span", {onClick: this.setMark, className: "glyphicon glyphicon-star-empty", id: "mark5"})
				), 
				React.createElement("div", {className: "form-group", style: {marginLeft:20}}, 
					React.createElement("label", {htmlFor: "inputComment"}, "内容："), 	
      				React.createElement("input", {type: "text", className: "form-control", id: "inputComment", ref: "content", name: "content", placeholder: "写下你的评论吧"})
				), 				
				React.createElement("div", {className: "form-group", style: {marginLeft:20}}, 
      				React.createElement("button", {className: "btn", onClick: this.addComment}, "评论")
				)
			)
		);
	}
});
var ApplyButton = React.createClass({displayName: "ApplyButton",
	addApply : function() {
		var userId = localStorage['userId'];
		var bookId = this.props.book.pk;
		var url = '/drift/' + bookId + '/apply/by/' + userId + '/';
		$.get(url,function(res){
			if(res == '200'){
				alert("申请成功");
			}
		});
	},
	render: function() {
		return (
			React.createElement("a", {className: "btn btn-primary", role: "button", onClick: this.addApply}, "想要") 
		);
	}
});
var ApplyHistory = React.createClass({displayName: "ApplyHistory",
	getInitialState: function() {
		return {
			users:[] 
		};
	},
	render: function() {
		return (
			React.createElement("div", null)
		);
	}
});
var Book = React.createClass({displayName: "Book",
	
	render: function() {
		var picture = '/media/' + this.props.book.fields.picture;
		var hash = "#" + this.props.book.pk;
		return (
			React.createElement("div", {className: "col-sm-3 book"}, 
			React.createElement("div", {className: "thumbnail", style: {textAlign:'center',border:'none'}}, 
				React.createElement("a", {href: hash}, 
					React.createElement("img", {src: picture, style: {width:242,height:200}})
				), 
      			React.createElement("div", {className: "caption"}, 
        			React.createElement("h3", null, this.props.book.fields.name), 
        			React.createElement("p", null, this.props.book.fields.author), 
        			React.createElement("p", null, this.props.book.fields.kind), 
        			React.createElement("p", null, 
        				React.createElement(ApplyButton, {book: this.props.book}), 
        				React.createElement(LikeButton, {book: this.props.book})
        			)
        		)
			)
			)
		);
	}
	
});
var BookApplies = React.createClass({displayName: "BookApplies",
	getInitialState: function() {
		return {
			applies:[] 
		};
	},
	componentDidMount: function() {
		this.loadDataFromServer();
	},
	loadDataFromServer : function() {
		var bookId = this.props.bookId;
		var url = '/drift/' + bookId + '/apply/get/';
		$.get(url,function(res){
			res = JSON.parse(res);
			var applies = res.map(function(apply){
				return {
					user : apply.fields.user,
					time : apply.fields.createTime
				};
			});
			this.setState({
				applies:applies
			});
		}.bind(this));
	},
	render: function() {
		var applies = this.state.applies.map(function(apply){
			return (
				React.createElement("span", {style: {margin:15}}, 
					React.createElement(UserAvatar, {userId: apply.user}), React.createElement("br", null), 
					React.createElement("span", null, apply.time)
				)
			);
		});
		return (
			React.createElement("div", {style: {display:'flex',alignItems:'center'}}, 
				React.createElement("h4", null, "申请者们："), 
				applies
			)
		);
	}
});
var BookDetail = React.createClass({displayName: "BookDetail",
	getInitialState: function() {
		return {
			book:{
				pk:this.props.bookId
			}
		};
	},
	componentDidMount: function() {
		this.loadDataFromServer();
	},
	loadDataFromServer:function() {
		var bookId = this.props.bookId;
		var url = '/book/' + bookId + '/get/';
		$.get(url,function(res){
			res = JSON.parse(res);
			var book = res[0];
			this.setState({
				book:book 
			});
		}.bind(this));
	},
	render: function() {
		if(!this.state.book.fields){
			return (React.createElement("div", null));
		}
		console.log(this.state.book);
		var picture = '/media/' + this.state.book.fields.picture;
		//console.log(picture);
		return (
			React.createElement("div", {className: "container"}, 
				React.createElement("div", {className: "pull-left"}, 
					React.createElement("img", {src: picture})
				), 
				React.createElement("div", {className: "pull-left", style: {marginLeft:50,width:500}}, 
					React.createElement("p", null, "书名：", this.state.book.fields.name), 
					React.createElement("p", null, "作者：", this.state.book.fields.author), 
					React.createElement("p", null, "类型：", this.state.book.fields.kind), 
					React.createElement("p", null, "拥有者：", React.createElement(UserAvatar, {userId: this.state.book.fields.originOwner})), 
					React.createElement("p", null, "所在处：", React.createElement(UserAvatar, {userId: this.state.book.fields.currentOwner})), 
					React.createElement("p", {style: {width:400}}, 
						React.createElement("h4", null, "简介："), 
						React.createElement("span", {style: {width:400}}, this.state.book.fields.description)
					), 
					React.createElement("p", null, React.createElement(ApplyButton, {book: this.state.book}), React.createElement(LikeButton, {book: this.state.book}))
				), React.createElement("br", {style: {clear:'both'}}), 
				React.createElement("hr", null), 
				React.createElement(BookApplies, {bookId: this.state.book.pk}), 
				React.createElement("hr", null), 
				React.createElement(CommentList, {book: this.state.book}), 
				React.createElement("hr", null), 
				React.createElement(AddCommentForm, {book: this.state.book})
			)
		);
	}
});
var BookList = React.createClass({displayName: "BookList",
	getInitialState: function() {
		return {
			books:[] 
		};
	},
	componentDidMount: function() {
		this.loadDataFromServer();
		//setInterval(this.loadDataFromServer,2000);
	},
	loadDataFromServer : function() {
		var url = this.props.url;
		$.get(url,function(res){
			res = JSON.parse(res);
			this.setState({
				books:res 
			});
		}.bind(this));
	},
	render: function() {
		console.log(this.state.books);
		var books = [];
		for(var bookIndex = 0; bookIndex<this.state.books.length; bookIndex++){
			var book = this.state.books[bookIndex];
			console.log(book);
			books.push(React.createElement(Book, {book: book}));
		}
		return (
			React.createElement("div", {className: "bookList"}, 
				books
			)
		);
	}

});
var BookRecord = React.createClass({displayName: "BookRecord",
	getInitialState: function() {
		return {
			nextApply:null,
			showForm : false 
		};
	},
	componentDidMount: function() {
		this.loadDataFromServer();
	},
	loadDataFromServer:function() {
		var bookId = this.props.book.pk;
		var url = '/drift/' + bookId + '/next/get/';
		$.get(url,function(res){
			res = JSON.parse(res);
			if(res.length){
				var nextApply = res[0];
				var showForm = this.state.showForm;
				this.setState({
					nextApply:nextApply ,
					showForm : showForm
				});
			}
		}.bind(this));
	},
	getRightPart : function() {
		var nextApply = this.state.nextApply;
		if(!nextApply){
			return (React.createElement("span", null, "暂无申请者"));
		}
		var nextUserId = nextApply.fields.user;
		return (
			React.createElement("span", null, 
				React.createElement(UserAvatar, {userId: nextUserId}), 
				React.createElement("span", {onClick: this.addDrift}, "转给他")
			)
		);
	},
	addDrift : function() {
		var nextApply = this.state.nextApply;
		var nextUserId = nextApply.fields.user;
		var bookId = this.props.book.pk;
		var url = '/drift/' + bookId + '/to/' + nextUserId + '/';
		$.get(url,function(res){
			if(res=='200'){
				this.unmount();
			}
		}.bind(this));
	},
	unmount: function() {
  		var node = this.getDOMNode();
  		React.unmountComponentAtNode(node);
  		$(node).remove();
	},
	showUpdateForm:function() {
		this.toggleForm(true);
	},
	closeForm:function() {
		this.toggleForm(false);
	},
	toggleForm:function(show){
		var nextApply = this.state.nextApply;
		this.setState({
			nextApply:nextApply,
			showForm:show 
		});
	},
	render: function() {
		var picture = '/media/' + this.props.book.fields.picture;
		var rightPart = this.getRightPart();
		return (
			React.createElement("div", {className: "media", style: {borderTop:'solid 1px #ddd'}}, 
  				React.createElement("div", {className: "media-left"}, 
      				React.createElement("img", {className: "media-object", src: picture, style: {width:242,height:200}})
				), 
  				React.createElement("div", {className: "media-body"}, 
    				React.createElement("h4", {className: "media-heading"}, this.props.book.fields.name), 
    				React.createElement("p", null, this.props.book.fields.author), 
    				React.createElement("p", null, this.props.book.fields.description), 
    				React.createElement("button", {className: "btn", onClick: this.showUpdateForm}, "修正"), 
    				React.createElement("span", {className: "pull-right"}, rightPart)
  				), 
  				React.createElement(ReactBootstrap.Modal, {show: this.state.showForm, onHide: this.closeForm}, 
					React.createElement(ReactBootstrap.Modal.Header, {closeButton: true}, 
            			React.createElement(ReactBootstrap.Modal.Title, null, "修正书籍")
          			), 
          			React.createElement(ReactBootstrap.Modal.Body, null, 
          				React.createElement(UpdateBookForm, {book: this.props.book, success: this.closeForm})
          			)
				)
			)
		);
	}
});
var BookRecordList = React.createClass({displayName: "BookRecordList",
	getInitialState: function() {
		return {
			books:[],
			showAddForm : false
		};
	},
	componentDidMount: function() {
		this.loadDataFromServer();
		setInterval(this.loadDataFromServer,2000);
	},
	loadDataFromServer : function() {
		var userId = localStorage['userId'];
		var url = '/book/of/' + userId + '/';
		$.get(url,function(res){
			res = JSON.parse(res);
			var showAddForm = this.state.showAddForm;
			this.setState({
				books:res,
				showAddForm:showAddForm 
			});
			//console.log(this.state.books);
		}.bind(this)).fail(ajaxFail);
	},
	addBook:function() {
		var books = this.state.books;
		this.setState({
			books:books,
			showAddForm : true 
		});
	},
	closeForm : function() {
		var books = this.state.books;
		this.setState({
			books:books,
			showAddForm : false
		});
	},
	render: function() {
		var bookRecords = this.state.books.map(function(book){
			return (React.createElement(BookRecord, {book: book}));
		});
		console.log(bookRecords);
		return (
			React.createElement("div", {className: "list container"}, 
			React.createElement("h4", null, "我的漂流书", React.createElement("span", {onClick: this.addBook, className: "pull-right"}, "添加")), 
				bookRecords, 
				React.createElement(ReactBootstrap.Modal, {show: this.state.showAddForm, onHide: this.closeForm}, 
					React.createElement(ReactBootstrap.Modal.Header, {closeButton: true}, 
            			React.createElement(ReactBootstrap.Modal.Title, null, "添加书籍")
          			), 
          			React.createElement(ReactBootstrap.Modal.Body, null, 
          				React.createElement(AddBookForm, {success: this.closeForm})
          			)
				)
			)
		);
	}
});
var BooksIndex = React.createClass({displayName: "BooksIndex",
	render: function() {
		return (
			React.createElement("div", {className: "container"}, 
				React.createElement("div", {className: "well"}, 
					React.createElement("h4", null, "热门书籍"), 
					React.createElement(BookList, {url: "/book/popular/"}), 
					React.createElement("div", {style: {clear:'both'}})
				), 
				React.createElement("div", null, 
					React.createElement(BookList, {url: "/book/all/"})
				)
			)
		);
	}
});
var Comment = React.createClass({displayName: "Comment",
	componentDidMount: function() {
		this.loadDataFromServer();
	},
	getInitialState: function() {
		return {
			userName:'' 
		};
	},
	loadDataFromServer : function() {
		var userId = this.props.comment.fields.user;
		var url = '/user/' + userId + '/get/';
		$.get(url,function(res){
			res = JSON.parse(res);
			name = res.fields.name;
			this.setState({
				userName:name 
			});
		}.bind(this));
	},
	render: function() {
		var avatar = '/user/' + this.props.comment.fields.user + '/avatar/get/';
		return (
			React.createElement("div", {className: "media"}, 
  				React.createElement("div", {className: "media-left"}, 
					React.createElement(UserAvatar, {userId: this.props.comment.fields.user})
				), 
  				React.createElement("div", {className: "media-body"}, 
    				React.createElement("h4", {className: "media-heading"}, this.state.userName), 
    				"评分：", this.props.comment.fields.mark, " ", React.createElement("br", null), 
   					"内容：", this.props.comment.fields.content
  				)
			)
		);
	}
});
var CommentList = React.createClass({displayName: "CommentList",
	getInitialState: function() {
		return {
			comments:[] 
		};
	},
	loadDataFromServer : function() {
		var bookId = this.props.book.pk;
		var url = '/book/' + bookId + '/comment/all/';
		$.get(url,function(res){
			res = JSON.parse(res);
			this.setState({
				comments:res 
			});
		}.bind(this));
	},
	componentDidMount: function() {
		this.loadDataFromServer();
		//setInterval(this.loadDataFromServer,5000);
		setInterval(this.loadDataFromServer,2000);
	},
	render: function() {
		var comments = this.state.comments.map(function(c){
			return React.createElement(Comment, {comment: c})
		});
		return (
			React.createElement("div", {className: "commentList"}, 
			React.createElement("h4", null, "评论："), 
				comments
			)
		);
	}
});
var DriftHistory = React.createClass({displayName: "DriftHistory",
	render: function() {
		return (
			React.createElement("div", null)
		);
	}
});
var LikeButton = React.createClass({displayName: "LikeButton",
	getInitialState: function() {
		return {
			like:0 
		};
	},
	componentDidMount: function() {
		this.loadDataFromServer();
		setInterval(this.loadDataFromServer,2000);
	},
	loadDataFromServer : function() {
		var url = '/book/' + this.props.book.pk + '/like/get/number/';
		$.get(url,function(res){
			this.setState({
				like:res 
			});
		}.bind(this));
	},
	addLike:function() {
		//if(!checkLogin()){
			//promptLogin();
		//}
		var userId = localStorage['userId'];
		var url = '/book/' + this.props.book.pk + '/like/by/' + userId +'/';
		$.get(url,function(res){
			if(res == 200){
				this.loadDataFromServer();
			}
		}.bind(this))
	},
	render: function() {
		return (
			React.createElement("a", {className: "btn btn-default", role: "button", onClick: this.addLike}, 
        		React.createElement("span", {className: "glyphicon glyphicon-thumbs-up"}, this.state.like)
        	)
		);
	}
});
var LoginForm = React.createClass({displayName: "LoginForm",
	submit:function(e){
		e.preventDefault();
		var thisComponent = this;
		$.ajax({
			url:'/user/login/',
			type : 'POST',
			data: new FormData(e.target),
			contentType: false,
    		processData: false,
    		success : function(res){
				//alert(res);
				if(res > 0){
					$('#loginForm input').val('');
					//this.props.registerSuccessHandler();
					localStorage['userId'] = res;
					thisComponent.props.success();

				}
				else{
					alert("用户名或密码错误");
				}
			}
		})
		.fail(ajaxFail);
	},
	render: function() {
		return (
			React.createElement("form", {className: "form-horizontal", id: "loginrForm", onSubmit: this.submit}, 
				React.createElement("div", {className: "form-group"}, 
    				React.createElement("label", {htmlFor: "inputAccount", className: "col-sm-2 control-label"}, "用户名"), 
    				React.createElement("div", {className: "col-sm-10"}, 
      					React.createElement("input", {type: "text", className: "form-control", id: "inputAccount", ref: "account", name: "account"})
					)
				), 
				React.createElement("div", {className: "form-group"}, 
    				React.createElement("label", {htmlFor: "inputPassword", className: "col-sm-2 control-label"}, "密码"), 
    				React.createElement("div", {className: "col-sm-10"}, 
      					React.createElement("input", {type: "password", className: "form-control", id: "inputPassword", ref: "password", name: "password"})
					)
				), 
			
				React.createElement("div", {className: "form-group"}, 
    				React.createElement("div", {className: "col-sm-10 col-sm-offset-2"}, 
      					React.createElement("input", {type: "submit", className: "form-control", value: "马上登录"})
					)
				)
			)
		);
	}
});
var MainView = React.createClass({displayName: "MainView",
	getView : function() {
		var hash = window.location.hash.substring(1);
		if(!hash || !this.checkLogin()){
			return (
				React.createElement(BooksIndex, null)
			);
		}
		if(!isNaN(hash)){
			var bookId = hash;
			return (
				React.createElement(BookDetail, {bookId: bookId})
			);
		}
		if(hash=='mybooks'){
			return React.createElement(BookRecordList, null);
		}
	},
	getInitialState: function() {
		return {
			showLoginForm:false,
			showRegisterForm:false,
			showUpdateUserForm:false 
		};
	},
	toggleLoginForm:function(show) {
		var showRegisterForm = this.state.showRegisterForm;
		var showUpdateUserForm = this.state.showUpdateUserForm;
		this.setState({
			showRegisterForm:showRegisterForm,
			showUpdateUserForm:showUpdateUserForm,
			showLoginForm:show
		});
	},
	openLoginForm:function(){
		this.toggleLoginForm(true);
	},
	closeLoginForm:function() {
		this.toggleLoginForm(false);
	},
	toggleRegisterForm : function(show) {
		var showLoginForm = this.state.showLoginForm;
		var showUpdateUserForm = this.state.showUpdateUserForm;
		this.setState({
			showRegisterForm:show,
			showUpdateUserForm:showUpdateUserForm,
			showLoginForm:showLoginForm
		});
	},
	openRegisterForm:function() {
		this.toggleRegisterForm(true);
	},
	closeRegisterForm:function() {
		this.toggleRegisterForm(false);
	},
	toggleUpdateUserForm : function(show) {
		var showLoginForm = this.state.showLoginForm;
		var showRegisterForm = this.state.showRegisterForm;
		this.setState({
			showRegisterForm:showRegisterForm,
			showUpdateUserForm:show,
			showLoginForm:showLoginForm
		});
	},
	openUpdateUserForm:function(){
		this.toggleUpdateUserForm(true);
	},
	closeUpdateUserForm:function(){
		this.toggleUpdateUserForm(false);
	},
	checkLogin:function() {
		if(!localStorage['userId']){
			this.openLoginForm();
			return false;
		}
		return true;
	},
	formSubmitSuccessHandler:function(){
		this.closeRegisterForm();
		this.closeLoginForm();
		this.closeUpdateUserForm();
	},
	getNav:function() {
		return (
		React.createElement("nav", {className: "navbar navbar-default"}, 
  			React.createElement("div", {className: "container"}, 
    			React.createElement("div", {className: "navbar-header"}, 
     				 	React.createElement("button", {type: "button", className: "navbar-toggle collapsed", "data-toggle": "collapse", "data-target": "#bs-example-navbar-collapse-1"}, 
        					React.createElement("span", {className: "sr-only"}, "Toggle navigation"), 
        					React.createElement("span", {className: "icon-bar"}), 
        					React.createElement("span", {className: "icon-bar"}), 
       					 	React.createElement("span", {className: "icon-bar"})
      					), 
      					React.createElement("a", {className: "navbar-brand", href: "#"}, "漂流书吧")
    			), 

        React.createElement("div", {className: "collapse navbar-collapse", id: "bs-example-navbar-collapse-1"}, 
      React.createElement("div", {className: "navbar-form navbar-left", role: "search"}, 
        React.createElement("div", {className: "form-group"}, 
          React.createElement("input", {type: "text", className: "form-control", placeholder: "搜索", id: "searchInputBox", onChange: this.search})
        )
      ), 
      React.createElement("ul", {className: "nav navbar-nav navbar-right"}, 
        React.createElement("li", {className: "dropdown"}, 
          React.createElement("a", {href: "#", className: "dropdown-toggle", "data-toggle": "dropdown", role: "button", "aria-expanded": "false"}, "我", React.createElement("span", {className: "caret"})), 
            React.createElement("ul", {className: "dropdown-menu"}, 
            React.createElement("li", {onClick: this.openLoginForm}, React.createElement("a", null, "登录/切换用户")), 
            React.createElement("li", {onClick: this.openRegisterForm}, React.createElement("a", null, "注册")), 
            React.createElement("li", {onClick: this.openUpdateUserForm}, React.createElement("a", null, "更新用户信息")), 
            React.createElement("li", null, React.createElement("a", {href: "#mybooks"}, "我的漂流书")), 
            React.createElement("li", {role: "separator", className: "divider"}), 
            React.createElement("li", {onClick: this.closeWindow}, React.createElement("a", null, "退出"))
          )
        )
      )
         )
        )
  )
	)},
	search:function(e) {
		console.log("search");
		var keyword = e.target.value.trim();
		$('.book').hide();
		$('.book:contains("' + keyword +'")').show();
	},
	closeWindow:function(){
		window.close();
	},
	render: function() {
		var view = this.getView();
		//this.openUpdateUserForm();
		var nav = this.getNav();
		return (
			React.createElement("div", null, 
				nav, 
				view, 
				React.createElement(ReactBootstrap.Modal, {show: this.state.showLoginForm, onHide: this.closeLoginForm}, 
					React.createElement(ReactBootstrap.Modal.Header, {closeButton: true}, 
            			React.createElement(ReactBootstrap.Modal.Title, null, "登录")
          			), 
          			React.createElement(ReactBootstrap.Modal.Body, null, 
          				React.createElement(LoginForm, {success: this.formSubmitSuccessHandler})
          			)
				), 
				React.createElement(ReactBootstrap.Modal, {show: this.state.showRegisterForm, onHide: this.closeRegisterForm}, 
					React.createElement(ReactBootstrap.Modal.Header, {closeButton: true}, 
            			React.createElement(ReactBootstrap.Modal.Title, null, "注册")
          			), 
          			React.createElement(ReactBootstrap.Modal.Body, null, 
          				React.createElement(RegisterForm, {success: this.formSubmitSuccessHandler})
          			)
				), 
				React.createElement(ReactBootstrap.Modal, {show: this.state.showUpdateUserForm, onHide: this.closeUpdateUserForm}, 
					React.createElement(ReactBootstrap.Modal.Header, {closeButton: true}, 
            			React.createElement(ReactBootstrap.Modal.Title, null, "用户信息")
          			), 
          			React.createElement(ReactBootstrap.Modal.Body, null, 
          				React.createElement(UpdateUserForm, {success: this.formSubmitSuccessHandler})
          			)
				)
			)
		);
	}
});
var RegisterForm = React.createClass({displayName: "RegisterForm",
	submit:function(e){
		e.preventDefault();
		var thisComponent = this;
		$.ajax({
			url:'/user/register/',
			type : 'POST',
			data: new FormData(e.target),
			contentType: false,
    		processData: false,
    		success : function(res){
				//alert(res);
				if(res=='200'){
					$('#registerForm input').val('');
					thisComponent.props.success();
				}
				else{
					//this.props.registerFailHandler();
				}
			}
		})
		.fail(ajaxFail);
	},
	render:function() {
		return (
			React.createElement("form", {className: "form-horizontal", id: "registerForm", onSubmit: this.submit, enctype: "multipart/form-data"}, 
				React.createElement("div", {className: "form-group"}, 
    				React.createElement("label", {htmlFor: "inputAccount", className: "col-sm-2 control-label"}, "用户名"), 
    				React.createElement("div", {className: "col-sm-10"}, 
      					React.createElement("input", {type: "text", className: "form-control", id: "inputAccount", ref: "account", name: "account"})
					)
				), 
				React.createElement("div", {className: "form-group"}, 
    				React.createElement("label", {htmlFor: "inputPassword", className: "col-sm-2 control-label"}, "密码"), 
    				React.createElement("div", {className: "col-sm-10"}, 
      					React.createElement("input", {type: "password", className: "form-control", id: "inputPassword", ref: "password", name: "password"})
					)
				), 
			
				React.createElement("div", {className: "form-group"}, 
    				React.createElement("label", {htmlFor: "inputAvatar", className: "col-sm-2 control-label"}, "头像"), 
    				React.createElement("div", {className: "col-sm-10"}, 
      					React.createElement("input", {type: "file", className: "form-control", id: "inputAvatar", ref: "avatar", name: "avatar"})
					)
				), 
			
				React.createElement("div", {className: "form-group"}, 
    				React.createElement("label", {htmlFor: "inputName", className: "col-sm-2 control-label"}, "昵称"), 
    				React.createElement("div", {className: "col-sm-10"}, 
      					React.createElement("input", {type: "text", className: "form-control", id: "inputName", ref: "name", name: "name"})
					)
				), 
			
				React.createElement("div", {className: "form-group"}, 
    				React.createElement("label", {htmlFor: "inputPhone", className: "col-sm-2 control-label"}, "电话"), 
    				React.createElement("div", {className: "col-sm-10"}, 
      					React.createElement("input", {type: "text", className: "form-control", id: "inputPhone", ref: "phone", name: "phone"})
					)
				), 
			
				React.createElement("div", {className: "form-group"}, 
    				React.createElement("label", {htmlFor: "inputAddress", className: "col-sm-2 control-label"}, "地址"), 
    				React.createElement("div", {className: "col-sm-10"}, 
      					React.createElement("input", {type: "text", className: "form-control", id: "inputAddress", ref: "address", name: "address"})
					)
				), 
				React.createElement("div", {className: "form-group"}, 
    				React.createElement("div", {className: "col-sm-10 col-sm-offset-2"}, 
      					React.createElement("input", {type: "submit", className: "form-control", value: "马上注册"})
					)
				)
			)
				
			
		);
	}
})
var UpdateBookForm = React.createClass({displayName: "UpdateBookForm",
	submit : function(e) {
		e.preventDefault();
		var bookId = this.props.book.pk;
		var thisComponent = this;
		$.ajax({
			url:'/book/' + bookId + '/update/',
			type : 'POST',
			data: new FormData(e.target),
			contentType: false,
    		processData: false,
    		success : function(res){
				//alert(res);
				if(res == '200'){
					$('#updateBookForm input').val('');
					thisComponent.props.success();
				}
				else{
					//this.props.registerFailHandler();
				}
			}
		});
	},
	render: function() {
		return (
			React.createElement("form", {className: "form-horizontal", onSubmit: this.submit, id: "updateBookForm", encType: "multipart/form-data"}, 
				React.createElement("div", {className: "form-group"}, 
    				React.createElement("label", {htmlFor: "inputName", className: "col-sm-2 control-label"}, "书名"), 
    				React.createElement("div", {className: "col-sm-10"}, 
      					React.createElement("input", {type: "text", className: "form-control", id: "inputName", ref: "name", name: "name", defaultValue: this.props.book.fields.name, onChange: null})
					)
				), 
				React.createElement("div", {className: "form-group"}, 
    				React.createElement("label", {htmlFor: "inputAuthor", className: "col-sm-2 control-label"}, "作者"), 
    				React.createElement("div", {className: "col-sm-10"}, 
      					React.createElement("input", {type: "text", className: "form-control", id: "inputAuthor", ref: "author", name: "author", defaultValue: this.props.book.fields.author, onChange: null})
					)
				), 
				React.createElement("div", {className: "form-group"}, 
    				React.createElement("label", {htmlFor: "inputPicture", className: "col-sm-2 control-label"}, "封面"), 
    				React.createElement("div", {className: "col-sm-10"}, 
      					React.createElement("input", {type: "file", className: "form-control", id: "inputPicture", ref: "picture", name: "picture"})
					)
				), 
				React.createElement("div", {className: "form-group"}, 
    				React.createElement("label", {htmlFor: "inputKind", className: "col-sm-2 control-label"}, "类型"), 
    				React.createElement("div", {className: "col-sm-10"}, 
      					React.createElement("input", {type: "text", className: "form-control", id: "inputKind", ref: "kind", name: "kind", defaultValue: this.props.book.fields.kind, onChange: null})
					)
				), 
				React.createElement("div", {className: "form-group"}, 
    				React.createElement("label", {htmlFor: "inputDescription", className: "col-sm-2 control-label"}, "简介"), 
    				React.createElement("div", {className: "col-sm-10"}, 
      					React.createElement("textarea", {className: "form-control", id: "inputDescription", ref: "description", name: "description", defaultValue: this.props.book.fields.description, onChange: null})
					)
				), 
				React.createElement("div", {className: "form-group"}, 
    				React.createElement("div", {className: "col-sm-10 col-sm-offset-2"}, 
      					React.createElement("input", {type: "submit", className: "form-control", defaultValue: "提交"})
					)
				)
			)
		);
	}
});
var UpdateUserForm = React.createClass({displayName: "UpdateUserForm",
	getInitialState: function() {
		return {
			user:null 
		};
	},
	componentDidMount: function() {
		this.loadDataFromServer();
	},
	loadDataFromServer:function(){
		var userId = localStorage['userId'];
		var url = '/user/' + userId + '/get/';
		$.get(url,function(res){
			res = JSON.parse(res);
			user = res[0];
			this.setState({
				user:user
			});
		}.bind(this));
	},
	submit:function(e){
		e.preventDefault();
		var userId = localStorage['userId'];
		var thisComponent = this;
		$.ajax({
			url:'/user/' + userId + '/update/',
			type : 'POST',
			data: new FormData(e.target),
			contentType: false,
    		processData: false,
    		success : function(res){
				//alert(res);
				if(res=='200'){
					$('#updateUserForm input').val('');
					//this.props.registerSuccessHandler();
					thisComponent.props.success();
				}
				else{
					ajaxFail();
				}
			}
		})
		.fail(ajaxFail);
	},
	render:function() {
		if(!this.state.user){
			return (React.createElement("div", null));
		}
		return (
			React.createElement("form", {className: "form-horizontal", id: "updateUserForm", onSubmit: this.submit, encType: "multipart/form-data"}, 
				React.createElement("div", {className: "form-group"}, 
    				React.createElement("label", {htmlFor: "inputAccount", className: "col-sm-2 control-label"}, "用户名"), 
    				React.createElement("div", {className: "col-sm-10"}, 
      					React.createElement("input", {type: "text", className: "form-control", id: "inputAccount", ref: "account", name: "account", value: this.state.user.fields.account})
					)
				), 
				React.createElement("div", {className: "form-group"}, 
    				React.createElement("label", {htmlFor: "inputPassword", className: "col-sm-2 control-label"}, "密码"), 
    				React.createElement("div", {className: "col-sm-10"}, 
      					React.createElement("input", {type: "password", className: "form-control", id: "inputPassword", ref: "password", name: "password"})
					)
				), 
			
				React.createElement("div", {className: "form-group"}, 
    				React.createElement("label", {htmlFor: "inputAvatar", className: "col-sm-2 control-label"}, "头像"), 
    				React.createElement("div", {className: "col-sm-10"}, 
      					React.createElement("input", {type: "file", className: "form-control", id: "inputAvatar", ref: "avatar", name: "avatar"})
					)
				), 
			
				React.createElement("div", {className: "form-group"}, 
    				React.createElement("label", {htmlFor: "inputName", className: "col-sm-2 control-label"}, "昵称"), 
    				React.createElement("div", {className: "col-sm-10"}, 
      					React.createElement("input", {type: "text", className: "form-control", id: "inputName", ref: "name", name: "name", defaultValue: this.state.user.fields.name})
					)
				), 
			
				React.createElement("div", {className: "form-group"}, 
    				React.createElement("label", {htmlFor: "inputPhone", className: "col-sm-2 control-label"}, "电话"), 
    				React.createElement("div", {className: "col-sm-10"}, 
      					React.createElement("input", {type: "text", className: "form-control", id: "inputPhone", ref: "phone", name: "phone", defaultValue: this.state.user.fields.phone})
					)
				), 
			
				React.createElement("div", {className: "form-group"}, 
    				React.createElement("label", {htmlFor: "inputAddress", className: "col-sm-2 control-label"}, "地址"), 
    				React.createElement("div", {className: "col-sm-10"}, 
      					React.createElement("input", {type: "text", className: "form-control", id: "inputAddress", ref: "address", name: "address", defaultValue: this.state.user.fields.address})
					)
				), 
				React.createElement("div", {className: "form-group"}, 
    				React.createElement("div", {className: "col-sm-10 col-sm-offset-2"}, 
      					React.createElement("input", {type: "submit", className: "form-control", value: "提交"})
					)
				)
			)
				
			
		);
	}
})
var UserAvatar = React.createClass({displayName: "UserAvatar",
	getInitialState: function() {
		return {
			user:null 
		};
	},
	componentDidMount: function() {
		this.loadDataFromServer();
	},
	loadDataFromServer:function() {
		$.get('/user/' + this.props.userId + '/get/',function(res){
			res = JSON.parse(res);
			user = res[0];
			this.setState({
				user:user 
			});
		}.bind(this));
	},
	render: function() {
		var avatarUrl = '/user/' + this.props.userId + '/avatar/get/';
		var avatarImg = (React.createElement("img", {style: {borderRadius:'50%',width:50,height:50,display:'inline-block'}, src: avatarUrl}));
		if(!this.state.user){
			return avatarImg;
		}
		var userName = this.state.user.fields.name;
		var userPhone = this.state.user.fields.phone;
		var userAddress = this.state.user.fields.address;
		var userId = this.props.userId;
		var elementId = 'userId_' + userId;
		return( 			
			React.createElement(ReactBootstrap.OverlayTrigger, {trigger: "hover", placement: "bottom", id: elementId, overlay: React.createElement(ReactBootstrap.Popover, {title: userName}, React.createElement("strong", null, "电话："), userPhone, React.createElement("br", null), React.createElement("strong", null, "地址："), userAddress)}, 
      			avatarImg
    		))
		;
	}
});