var BooksIndex = React.createClass({
	render: function() {
		return (
			<div className="container">
				<div className="well">
					<h4>热门书籍</h4>
					<BookList url="/book/popular/" />
					<div style={{clear:'both'}}></div>
				</div>
				<div>
					<BookList url="/book/all/" />
				</div>
			</div>
		);
	}
});