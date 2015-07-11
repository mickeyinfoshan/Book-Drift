var MainView = React.createClass({
	getView : function() {
		var hash = window.location.hash.substring(1);
		if(!hash || !this.checkLogin()){
			return (
				<BooksIndex />
			);
		}
		if(!isNaN(hash)){
			var bookId = hash;
			return (
				<BookDetail bookId={bookId} />
			);
		}
		if(hash=='mybooks'){
			return <BookRecordList />;
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
		<nav className="navbar navbar-default">
  			<div className="container">
    			<div className="navbar-header">
     				 	<button type="button" className="navbar-toggle collapsed" data-toggle="collapse" data-target="#bs-example-navbar-collapse-1">
        					<span className="sr-only">Toggle navigation</span>
        					<span className="icon-bar"></span>
        					<span className="icon-bar"></span>
       					 	<span className="icon-bar"></span>
      					</button>
      					<a className="navbar-brand" href="#">漂流书吧</a>
    			</div>

        <div className="collapse navbar-collapse" id="bs-example-navbar-collapse-1">
      <div className="navbar-form navbar-left" role="search">
        <div className="form-group">
          <input type="text" className="form-control" placeholder="搜索" id="searchInputBox" onChange={this.search} />
        </div>
      </div>
      <ul className="nav navbar-nav navbar-right">
        <li className="dropdown">
          <a href="#" className="dropdown-toggle" data-toggle="dropdown" role="button" aria-expanded="false">我<span className="caret"></span></a>
            <ul className="dropdown-menu">
            <li onClick={this.openLoginForm}><a>登录/切换用户</a></li>
            <li onClick={this.openRegisterForm}><a>注册</a></li>
            <li onClick={this.openUpdateUserForm}><a>更新用户信息</a></li>
            <li><a href="#mybooks">我的漂流书</a></li>
            <li role="separator" className="divider"></li>
            <li onClick={this.closeWindow}><a>退出</a></li>
          </ul>
        </li>
      </ul>
         </div>
        </div>
  </nav>
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
			<div>
				{nav}
				{view}
				<ReactBootstrap.Modal show={this.state.showLoginForm} onHide={this.closeLoginForm}>
					<ReactBootstrap.Modal.Header closeButton>
            			<ReactBootstrap.Modal.Title>登录</ReactBootstrap.Modal.Title>
          			</ReactBootstrap.Modal.Header>
          			<ReactBootstrap.Modal.Body>
          				<LoginForm success={this.formSubmitSuccessHandler}/>
          			</ReactBootstrap.Modal.Body>
				</ReactBootstrap.Modal>
				<ReactBootstrap.Modal show={this.state.showRegisterForm} onHide={this.closeRegisterForm}>
					<ReactBootstrap.Modal.Header closeButton>
            			<ReactBootstrap.Modal.Title>注册</ReactBootstrap.Modal.Title>
          			</ReactBootstrap.Modal.Header>
          			<ReactBootstrap.Modal.Body>
          				<RegisterForm success={this.formSubmitSuccessHandler}/>
          			</ReactBootstrap.Modal.Body>
				</ReactBootstrap.Modal>
				<ReactBootstrap.Modal show={this.state.showUpdateUserForm} onHide={this.closeUpdateUserForm}>
					<ReactBootstrap.Modal.Header closeButton>
            			<ReactBootstrap.Modal.Title>用户信息</ReactBootstrap.Modal.Title>
          			</ReactBootstrap.Modal.Header>
          			<ReactBootstrap.Modal.Body>
          				<UpdateUserForm  success={this.formSubmitSuccessHandler}/>
          			</ReactBootstrap.Modal.Body>
				</ReactBootstrap.Modal>
			</div>
		);
	}
});