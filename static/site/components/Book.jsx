var Book = React.createClass({
	
	render: function() {
		var picture = '/media/' + this.props.book.fields.picture;
		var hash = "#" + this.props.book.pk;
		return (
			<div className="col-sm-3 book">
			<div className="thumbnail" style={{textAlign:'center',border:'none'}}>
				<a href={hash}>
					<img src={picture} style={{width:242,height:200}}/>
				</a>
      			<div className="caption">
        			<h3>{this.props.book.fields.name}</h3>
        			<p>{this.props.book.fields.author}</p>
        			<p>{this.props.book.fields.kind}</p>
        			<p>
        				<ApplyButton book={this.props.book} />
        				<LikeButton book={this.props.book} />
        			</p>
        		</div>
			</div>
			</div>
		);
	}
	
});