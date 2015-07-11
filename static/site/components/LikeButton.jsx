var LikeButton = React.createClass({
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
			<a href="#" className="btn btn-default" role="button" onClick={this.addLike}>
        		<span className="glyphicon glyphicon-thumbs-up">{this.state.like}</span>
        	</a>
		);
	}
});