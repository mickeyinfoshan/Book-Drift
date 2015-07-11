var CommentList = React.createClass({
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
			return <Comment comment={c} />
		});
		return (
			<div className="commentList">
			<h4>评论：</h4>
				{comments}
			</div>
		);
	}
});