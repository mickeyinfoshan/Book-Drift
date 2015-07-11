var UpdateBookForm = React.createClass({
	submit : function(e) {
		e.preventDefault();
		var bookId = this.props.book.pk;
		var thisComponent = this;
		$.ajax({
			url:'/book/' + bookId + '/update/',
			type : 'POST',
			data: new FormData(e.target),
			contentType: false,
    		processData: false,
    		success : function(res){
				//alert(res);
				if(res == '200'){
					$('#updateBookForm input').val('');
					thisComponent.props.success();
				}
				else{
					//this.props.registerFailHandler();
				}
			}
		});
	},
	render: function() {
		return (
			<form className="form-horizontal" onSubmit={this.submit} id="updateBookForm" encType="multipart/form-data">
				<div className="form-group">
    				<label htmlFor="inputName" className="col-sm-2 control-label">书名</label>
    				<div className="col-sm-10">
      					<input type="text" className="form-control" id="inputName" ref="name" name="name" defaultValue={this.props.book.fields.name} onChange={null}/>
					</div>
				</div>
				<div className="form-group">
    				<label htmlFor="inputAuthor" className="col-sm-2 control-label">作者</label>
    				<div className="col-sm-10">
      					<input type="text" className="form-control" id="inputAuthor" ref="author" name="author" defaultValue={this.props.book.fields.author} onChange={null}/>
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
      					<input type="text" className="form-control" id="inputKind" ref="kind" name="kind" defaultValue={this.props.book.fields.kind} onChange={null}/>
					</div>
				</div>
				<div className="form-group">
    				<label htmlFor="inputDescription" className="col-sm-2 control-label">简介</label>
    				<div className="col-sm-10">
      					<textarea className="form-control" id="inputDescription" ref="description" name="description" defaultValue={this.props.book.fields.description} onChange={null}></textarea>
					</div>
				</div>
				<div className="form-group">
    				<div className="col-sm-10 col-sm-offset-2">
      					<input type="submit" className="form-control" defaultValue="提交"/>
					</div>
				</div>
			</form>
		);
	}
});