var BookRecordList = React.createClass({
	getInitialState: function() {
		return {
			books:[] 
		};
	},
	componentDidMount: function() {
		this.loadDataFromServer();
	},
	loadDataFromServer : function() {
		var userId = localStorage['userId'];
		var url = '/book/of/' + userId + '/';
		$.get(url,function(res){
			res = JSON.parse(res);
			this.setState({
				books:res 
			});
			//console.log(this.state.books);
		}.bind(this));
	},
	render: function() {
		var bookRecords = this.state.books.map(function(book){
			return <BookRecord book={book} />
		});
		console.log(bookRecords);
		return (
			<div className="list container">
				{bookRecords}
			</div>
		);
	}
});