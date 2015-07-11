var BookDetail = React.createClass({
	getInitialState: function() {
		return {
			book:{
				pk:this.props.bookId
			}
		};
	},
	componentDidMount: function() {
		this.loadDataFromServer();
	},
	loadDataFromServer:function() {
		var bookId = this.props.bookId;
		var url = '/book/' + bookId + '/get/';
		$.get(url,function(res){
			res = JSON.parse(res);
			var book = res[0];
			this.setState({
				book:book 
			});
		}.bind(this));
	},
	render: function() {
		if(!this.state.book.fields){
			return (<div></div>);
		}
		console.log(this.state.book);
		var picture = '/media/' + this.state.book.fields.picture;
		//console.log(picture);
		return (
			<div className="container">
				<div className="pull-left">
					<img src={picture} />
				</div>
				<div className="pull-left" style={{marginLeft:50,width:500}}>
					<p>书名：{this.state.book.fields.name}</p>
					<p>作者：{this.state.book.fields.author}</p>
					<p>类型：{this.state.book.fields.kind}</p>
					<p>拥有者：<UserAvatar userId={this.state.book.fields.originOwner} /></p>
					<p>所在处：<UserAvatar userId={this.state.book.fields.currentOwner} /></p>
					<p style={{width:400}}>
						<h4>简介：</h4>
						<span style={{width:400}}>{this.state.book.fields.description}</span>
					</p>
					<p><ApplyButton book={this.state.book} /><LikeButton book={this.state.book} /></p>
				</div><br style={{clear:'both'}} />
				<hr />
				<BookApplies bookId={this.state.book.pk} />
				<hr />
				<CommentList book={this.state.book} />
				<hr />
				<AddCommentForm book={this.state.book} />
			</div>
		);
	}
});