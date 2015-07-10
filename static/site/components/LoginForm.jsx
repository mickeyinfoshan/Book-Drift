var LoginForm = React.createClass({
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
			<form className="form-horizontal" id="loginrForm" onSubmit={this.submit}>
				<div className="form-group">
    				<label htmlFor="inputAccount" className="col-sm-2 control-label">用户名</label>
    				<div className="col-sm-10">
      					<input type="text" className="form-control" id="inputAccount" ref="account" name="account" />
					</div>
				</div>
				<div className="form-group">
    				<label htmlFor="inputPassword" className="col-sm-2 control-label">密码</label>
    				<div className="col-sm-10">
      					<input type="password" className="form-control" id="inputPassword" ref="password" name="password" />
					</div>
				</div>
			
				<div className="form-group">
    				<div className="col-sm-10 col-sm-offset-2">
      					<input type="submit" className="form-control" value="马上登录"/>
					</div>
				</div>
			</form>
		);
	}
});