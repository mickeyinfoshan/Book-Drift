var AddCommentForm = React.createClass({
	setMark:function(e) {
		var id = e.target.id;
		var element = $('#' + id);
		element.prevAll().removeClass('glyphicon-star-empty');
		element.nextAll().removeClass('glyphicon-star');
		element.removeClass('glyphicon-star-empty');
		element.addClass('glyphicon-star');
		element.prevAll().addClass('glyphicon-star');
	},
	addComment : function() {
		var mark = $('.glyphicon-star').length;
		var content = React.findDOMNode(this.refs.content).value;
		var data = {
			mark : mark,
			content : content
		};
		var bookId = this.props.book.pk;
		var url = 'book/' + bookId + '/comment/add/';
		$.post(url,data,function(res){
			if(res!='200'){
				alert('添加评论失败');
			}
		});
	},
	render: function() {
		return (
			<div className="form-horizontal" id="addCommentForm">
				<div className="form-group">
					<span onClick={this.setMark} className="glyphicon glyphicon-star-empty" id="mark1"></span>
					<span onClick={this.setMark} className="glyphicon glyphicon-star-empty" id="mark2"></span>
					<span onClick={this.setMark} className="glyphicon glyphicon-star-empty" id="mark3"></span>
					<span onClick={this.setMark} className="glyphicon glyphicon-star-empty" id="mark4"></span>
					<span onClick={this.setMark} className="glyphicon glyphicon-star-empty" id="mark5"></span>
				</div>
				<div className="form-group">	
      				<input type="text" className="form-control" id="inputComment" ref="content" name="content"  placeholder="写下你的评论吧"/>
				</div>				
				<div className="form-group">
      				<button className="btn" onClick={this.addComment}>评论</button>
				</div>
			</div>
		);
	}
});