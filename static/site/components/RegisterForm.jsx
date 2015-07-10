var RegisterForm = React.createClass({
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
			<form className="form-horizontal" id="registerForm" onSubmit={this.submit}>
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
    				<label htmlFor="inputAvatar" className="col-sm-2 control-label">头像</label>
    				<div className="col-sm-10">
      					<input type="file" className="form-control" id="inputAvatar" ref="avatar" name="avatar"  />
					</div>
				</div>
			
				<div className="form-group">
    				<label htmlFor="inputName" className="col-sm-2 control-label">昵称</label>
    				<div className="col-sm-10">
      					<input type="text" className="form-control" id="inputName" ref="name" name="name" />
					</div>
				</div>
			
				<div className="form-group">
    				<label htmlFor="inputPhone" className="col-sm-2 control-label">电话</label>
    				<div className="col-sm-10">
      					<input type="text" className="form-control" id="inputPhone" ref="phone" name="phone" />
					</div>
				</div>
			
				<div className="form-group">
    				<label htmlFor="inputAddress" className="col-sm-2 control-label">地址</label>
    				<div className="col-sm-10">
      					<input type="text" className="form-control" id="inputAddress" ref="address" name="address" />
					</div>
				</div>
				<div className="form-group">
    				<div className="col-sm-10 col-sm-offset-2">
      					<input type="submit" className="form-control" value="马上注册"/>
					</div>
				</div>
			</form>
				
			
		);
	}
})