var UserAvatar = React.createClass({
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
		var avatarImg = (<img style={{borderRadius:'50%',width:50,height:50,display:'inline-block'}} src={avatarUrl} />);
		if(!this.state.user){
			return avatarImg;
		}
		var userName = this.state.user.fields.name;
		var userPhone = this.state.user.fields.phone;
		var userAddress = this.state.user.fields.address;
		var userId = this.props.userId;
		var elementId = 'userId_' + userId;
		return( 			
			<ReactBootstrap.OverlayTrigger trigger='hover' placement='bottom' id={elementId} overlay={<ReactBootstrap.Popover title={userName}><strong>电话：</strong>{userPhone}<br/><strong>地址：</strong>{userAddress}</ReactBootstrap.Popover>}>
      			{avatarImg}
    		</ReactBootstrap.OverlayTrigger>)
		;
	}
});