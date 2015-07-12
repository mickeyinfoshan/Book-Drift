var AddCommentForm = React.createClass({
	setMark:function(e) {
		var id = e.target.id;
		var element = $('#' + id);
		element.prevAll('span').removeClass('glyphicon-star-empty');
		element.nextAll('span').removeClass('glyphicon-star');
		element.removeClass('glyphicon-star-empty');
		element.addClass('glyphicon-star');
		element.prevAll('span').addClass('glyphicon-star');
		element.nextAll('span').addClass('glyphicon-star-empty');
	},
	addComment : function() {
		var mark = $('.glyphicon-star').length;
		var content = React.findDOMNode(this.refs.content).value;
		var data = {
			mark : mark,
			content : content
		};
		var bookId = this.props.book.pk;
		var userId = localStorage['userId'];
		var url = '/book/' + bookId + '/comment/add/by/' + userId + '/';
		$.post(url,data,function(res){
			if(res!='200'){
				alert('添加评论失败');
			}
			else{
				$('.glyphicon').removeClass('glyphicon-star');
				$('#inputComment').val('');
				alert("成功添加评论");
			}
		});
	},
	render: function() {
		return (
			<div className="form-horizontal" id="addCommentForm">
				<h4>添加评论：</h4>
				<div className="form-group" style={{marginLeft:20}}>
				<label>评分：</label> 
					<span onClick={this.setMark} className="glyphicon glyphicon-star-empty" id="mark1"></span>
					<span onClick={this.setMark} className="glyphicon glyphicon-star-empty" id="mark2"></span>
					<span onClick={this.setMark} className="glyphicon glyphicon-star-empty" id="mark3"></span>
					<span onClick={this.setMark} className="glyphicon glyphicon-star-empty" id="mark4"></span>
					<span onClick={this.setMark} className="glyphicon glyphicon-star-empty" id="mark5"></span>
				</div>
				<div className="form-group" style={{marginLeft:20}}>
					<label htmlFor="inputComment">内容：</label> 	
      				<input type="text" className="form-control" id="inputComment" ref="content" name="content"  placeholder="写下你的评论吧"/>
				</div>				
				<div className="form-group" style={{marginLeft:20}}>
      				<button className="btn" onClick={this.addComment}>评论</button>
				</div>
			</div>
		);
	}
});