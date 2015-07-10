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
		var userId = this.props.comment.fields.user_id;
		var url = '/user/' + userId + '/get/';
		$.get(url,function(res){
			name = res.fields.name;
			this.setState({
				userName:name 
			});
		}.bind(this));
	},
	render: function() {
		var avatar = '/user/' + this.props.comment.fields.user_id + '/avatar/get/';
		return (
			<div className="media">
  				<div className="media-left">
					<img className="media-object" src={avatar}>
				</div>
  				<div className="media-body">
    				<h4 className="media-heading">{this.state.userName}</h4>
   					{this.props.comment.fields.content}
  				</div>
			</div>
		);
	}
});