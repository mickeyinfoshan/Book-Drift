var ApplyButton = React.createClass({
	addApply : function() {
		var userId = localStorage['userId'];
		var bookId = this.props.book.pk;
		var url = '/drift/' + bookId + '/apply/by/' + userId + '/';
		$.get(url,function(res){
			if(res == '200'){
				alert("申请成功");
			}
		});
	},
	render: function() {
		return (
			<a href="#" className="btn btn-primary" role="button" onClick={this.addApply}>想要</a> 
		);
	}
});