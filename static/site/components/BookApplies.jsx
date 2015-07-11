var BookApplies = React.createClass({
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
				<span style={{margin:15}}>
					<UserAvatar userId={apply.user} /><br/>
					<span>{apply.time}</span>
				</span>
			);
		});
		return (
			<div style={{display:'flex',alignItems:'center'}}>
				<h4>申请者们：</h4>
				{applies}
			</div>
		);
	}
});