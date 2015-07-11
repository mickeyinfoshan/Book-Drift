var UpdateUserForm = React.createClass({
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
			return (<div></div>);
		}
		return (
			<form className="form-horizontal" id="updateUserForm" onSubmit={this.submit} encType="multipart/form-data">
				<div className="form-group">
    				<label htmlFor="inputAccount" className="col-sm-2 control-label">用户名</label>
    				<div className="col-sm-10">
      					<input type="text" className="form-control" id="inputAccount" ref="account" name="account" value={this.state.user.fields.account}/>
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
      					<input type="text" className="form-control" id="inputName" ref="name" name="name" defaultValue={this.state.user.fields.name} />
					</div>
				</div>
			
				<div className="form-group">
    				<label htmlFor="inputPhone" className="col-sm-2 control-label">电话</label>
    				<div className="col-sm-10">
      					<input type="text" className="form-control" id="inputPhone" ref="phone" name="phone" defaultValue={this.state.user.fields.phone} />
					</div>
				</div>
			
				<div className="form-group">
    				<label htmlFor="inputAddress" className="col-sm-2 control-label">地址</label>
    				<div className="col-sm-10">
      					<input type="text" className="form-control" id="inputAddress" ref="address" name="address" defaultValue={this.state.user.fields.address} />
					</div>
				</div>
				<div className="form-group">
    				<div className="col-sm-10 col-sm-offset-2">
      					<input type="submit" className="form-control" value="提交"/>
					</div>
				</div>
			</form>
				
			
		);
	}
})