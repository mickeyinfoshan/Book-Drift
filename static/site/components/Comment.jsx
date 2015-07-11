var Comment = React.createClass({
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
			<div className="media">
  				<div className="media-left">
					<UserAvatar userId={this.props.comment.fields.user} />
				</div>
  				<div className="media-body">
    				<h4 className="media-heading">{this.state.userName}</h4>
    				评分：{this.props.comment.fields.mark} <br />
   					内容：{this.props.comment.fields.content}
  				</div>
			</div>
		);
	}
});