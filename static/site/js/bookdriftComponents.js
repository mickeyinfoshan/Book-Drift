var AddBookForm = React.createClass({displayName: "AddBookForm",
	submit : function(e) {
		e.preventDefault();
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
				}
				else{
					//this.props.registerFailHandler();
				}
			}
		});
	},
	render: function() {
		return (
			React.createElement("form", {className: "form-horizontal", onSubmit: this.submit, id: "addBookForm"}, 
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
      					"//", React.createElement("input", {type: "text", className: "form-control", id: "inputDescription", ref: "description", name: "description"}), 
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
			React.createElement("a", {href: "#", className: "btn btn-primary", role: "button", onClick: this.addApply}, "想要") 
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
		return (
			React.createElement("div", {className: "col-sm-3 col-md-3"}, 
			React.createElement("div", {className: "book thumbnail", style: {textAlign:'center',border:'none'}}, 
				React.createElement("img", {src: picture, style: {width:242,height:200}}), 
      			React.createElement("div", {className: "caption"}, 
        			React.createElement("h3", null, this.props.book.fields.name), 
        			React.createElement("p", null, this.props.book.fields.author), 
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
	render: function() {
		var picture = '/media/' + this.props.book.fields.picture;
		return (
			React.createElement("div", {className: "container"}, 
				React.createElement("div", {className: "pull-left"}, 
					React.createElement("img", {src: picture})
				), 
				React.createElement("div", {className: "pull-left", style: {marginLeft:50,width:500}}, 
					React.createElement("p", null, "书名：", this.props.book.fields.name), 
					React.createElement("p", null, "作者：", this.props.book.fields.author), 
					React.createElement("p", null, "类型：", this.props.book.fields.kind), 
					React.createElement("p", null, "拥有者：", React.createElement(UserAvatar, {userId: this.props.book.fields.originOwner})), 
					React.createElement("p", null, "所在处：", React.createElement(UserAvatar, {userId: this.props.book.fields.currentOwner})), 
					React.createElement("p", {style: {width:400}}, 
						React.createElement("h4", null, "简介："), 
						React.createElement("span", {style: {width:400}}, this.props.book.fields.description)
					), 
					React.createElement("p", null, React.createElement(ApplyButton, {book: this.props.book}), React.createElement(LikeButton, {book: this.props.book}))
				), React.createElement("br", {style: {clear:'both'}}), 
				React.createElement("hr", null), 
				React.createElement(BookApplies, {bookId: this.props.book.pk}), 
				React.createElement("hr", null), 
				React.createElement(CommentList, {book: this.props.book}), 
				React.createElement("hr", null), 
				React.createElement(AddCommentForm, {book: this.props.book})
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
			nextApply:null 
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
				this.setState({
					nextApply:nextApply 
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
	render: function() {
		var picture = '/media/' + this.props.book.fields.picture;
		var rightPart = this.getRightPart();
		return (
			React.createElement("div", {className: "media", style: {borderTop:'solid 1px #ddd'}}, 
  				React.createElement("div", {className: "media-left"}, 
      				React.createElement("img", {className: "media-object", src: picture})
				), 
  				React.createElement("div", {className: "media-body"}, 
    				React.createElement("h4", {className: "media-heading"}, this.props.book.fields.name), 
    				React.createElement("p", null, this.props.book.fields.author), 
    				React.createElement("span", {className: "pull-right"}, rightPart)
  				)
			)
		);
	}
});
var BookRecordList = React.createClass({displayName: "BookRecordList",
	getInitialState: function() {
		return {
			books:[] 
		};
	},
	componentDidMount: function() {
		this.loadDataFromServer();
	},
	loadDataFromServer : function() {
		var userId = localStorage['userId'];
		var url = '/book/of/' + userId + '/';
		$.get(url,function(res){
			res = JSON.parse(res);
			this.setState({
				books:res 
			});
			//console.log(this.state.books);
		}.bind(this));
	},
	render: function() {
		var bookRecords = this.state.books.map(function(book){
			return React.createElement(BookRecord, {book: book})
		});
		console.log(bookRecords);
		return (
			React.createElement("div", {className: "list container"}, 
				bookRecords
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
			React.createElement("a", {href: "#", className: "btn btn-default", role: "button", onClick: this.addLike}, 
        		React.createElement("span", {className: "glyphicon glyphicon-thumbs-up"}, this.state.like)
        	)
		);
	}
});
var LoginForm = React.createClass({displayName: "LoginForm",
	submit:function(e){
		e.preventDefault();
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
				}
				else{
					//this.props.registerFailHandler();
				}
			}
		});
		//.fail(this.props.registerFailHandler);
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
var RegisterForm = React.createClass({displayName: "RegisterForm",
	submit:function(e){
		e.preventDefault();
		$.ajax({
			url:'/user/register/',
			type : 'POST',
			data: new FormData(e.target),
			contentType: false,
    		processData: false,
    		success : function(res){
				alert(res);
				if(res=='200'){
					$('#registerForm input').val('');
					//this.props.registerSuccessHandler();
				}
				else{
					//this.props.registerFailHandler();
				}
			}
		});
		//.fail(this.props.registerFailHandler);
	},
	render:function() {
		return (
			React.createElement("form", {className: "form-horizontal", id: "registerForm", onSubmit: this.submit}, 
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