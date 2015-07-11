var BookDetail = React.createClass({
	render: function() {
		var picture = '/media/' + this.props.book.fields.picture;
		return (
			<div className="container">
				<div className="pull-left">
					<img src={picture} />
				</div>
				<div className="pull-left" style={{marginLeft:50,width:500}}>
					<p>书名：{this.props.book.fields.name}</p>
					<p>作者：{this.props.book.fields.author}</p>
					<p>类型：{this.props.book.fields.kind}</p>
					<p>拥有者：<UserAvatar userId={this.props.book.fields.originOwner} /></p>
					<p>所在处：<UserAvatar userId={this.props.book.fields.currentOwner} /></p>
					<p style={{width:400}}>
						<h4>简介：</h4>
						<span style={{width:400}}>{this.props.book.fields.description}</span>
					</p>
					<p><ApplyButton book={this.props.book} /><LikeButton book={this.props.book} /></p>
				</div><br style={{clear:'both'}} />
				<hr />
				<BookApplies bookId={this.props.book.pk} />
				<hr />
				<CommentList book={this.props.book} />
				<hr />
				<AddCommentForm book={this.props.book} />
			</div>
		);
	}
});