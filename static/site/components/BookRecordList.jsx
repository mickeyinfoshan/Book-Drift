var BookRecordList = React.createClass({
	getInitialState: function() {
		return {
			books:[],
			showAddForm : false
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
			var showAddForm = this.state.showAddForm;
			this.setState({
				books:res,
				showAddForm:showAddForm 
			});
			//console.log(this.state.books);
		}.bind(this)).fail(ajaxFail);
	},
	addBook:function() {
		var books = this.state.books;
		this.setState({
			books:books,
			showAddForm : true 
		});
	},
	closeForm : function() {
		var books = this.state.books;
		this.setState({
			books:books,
			showAddForm : false
		});
	},
	render: function() {
		var bookRecords = this.state.books.map(function(book){
			return (<BookRecord book={book} />);
		});
		console.log(bookRecords);
		return (
			<div className="list container">
			<h4>我的漂流书<span onClick={this.addBook} className="pull-right">添加</span></h4>
				{bookRecords}
				<ReactBootstrap.Modal show={this.state.showAddForm} onHide={this.closeForm}>
					<ReactBootstrap.Modal.Header closeButton>
            			<ReactBootstrap.Modal.Title>添加书籍</ReactBootstrap.Modal.Title>
          			</ReactBootstrap.Modal.Header>
          			<ReactBootstrap.Modal.Body>
          				<AddBookForm success={this.closeForm}/>
          			</ReactBootstrap.Modal.Body>
				</ReactBootstrap.Modal>
			</div>
		);
	}
});