var BookList = React.createClass({
	getInitialState: function() {
		return {
			books:[] 
		};
	},
	componentDidMount: function() {
		this.loadDataFromServer();
	},
	loadDataFromServer : function() {
		var url = this.props.url;
		$.get(url,function(res){
			this.setState({
				books:res 
			});
		}.bind(this));
	},
	render: function() {
		var books = this.state.books.map(function(book){
			return <Book book={book} />
		});
		return (
			<div className="bookList">
				{books}
			</div>
		);
	}

});