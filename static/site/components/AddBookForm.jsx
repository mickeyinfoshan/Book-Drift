var AddBookForm = React.createClass({
	submit : function(e) {
		e.preventDefault();
		$.ajax({
			url:'/book/add/by/' + localStorage['userId'] + '/',
			type : 'POST',
			data: new FormData(e.target),
			contentType: false,
    		processData: false,
    		success : function(res){
				//alert(res);
				if(res == '200'){
					$('#addBookForm input').val('');
				}
				else{
					//this.props.registerFailHandler();
				}
			}
		});
	},
	render: function() {
		return (
			<form className="form-horizontal" onSubmit={this.submit} id="addBookForm">
				<div className="form-group">
    				<label htmlFor="inputName" className="col-sm-2 control-label">书名</label>
    				<div className="col-sm-10">
      					<input type="text" className="form-control" id="inputName" ref="name" name="name" />
					</div>
				</div>
				<div className="form-group">
    				<label htmlFor="inputAuthor" className="col-sm-2 control-label">作者</label>
    				<div className="col-sm-10">
      					<input type="text" className="form-control" id="inputAuthor" ref="author" name="author" />
					</div>
				</div>
				<div className="form-group">
    				<label htmlFor="inputPicture" className="col-sm-2 control-label">封面</label>
    				<div className="col-sm-10">
      					<input type="file" className="form-control" id="inputPicture" ref="picture" name="picture" />
					</div>
				</div>
				<div className="form-group">
    				<label htmlFor="inputKind" className="col-sm-2 control-label">类型</label>
    				<div className="col-sm-10">
      					<input type="text" className="form-control" id="inputKind" ref="kind" name="kind" />
					</div>
				</div>
				<div className="form-group">
    				<label htmlFor="inputDescription" className="col-sm-2 control-label">简介</label>
    				<div className="col-sm-10">
      					<input type="text" className="form-control" id="inputDescription" ref="description" name="description" />
					</div>
				</div>
				<div className="form-group">
    				<div className="col-sm-10 col-sm-offset-2">
      					<input type="submit" className="form-control" value="提交"/>
					</div>
				</div>
			</form>
		);
	}
});