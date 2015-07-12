var BookList = React.createClass({
	getInitialState: function() {
		return {
			books:[] 
		};
	},
	componentDidMount: function() {
		this.loadDataFromServer();
		//setInterval(this.loadDataFromServer,2000);
	},
	loadDataFromServer : function() {
		var url = this.props.url;
		$.get(url,function(res){
			res = JSON.parse(res);
			this.setState({
				books:res 
			});
		}.bind(this));
	},
	render: function() {
		console.log(this.state.books);
		var books = [];
		for(var bookIndex = 0; bookIndex<this.state.books.length; bookIndex++){
			var book = this.state.books[bookIndex];
			console.log(book);
			books.push(<Book book={book} />);
		}
		return (
			<div className="bookList">
				{books}
			</div>
		);
	}

});