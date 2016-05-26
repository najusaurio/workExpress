import React from "react"

class AdminArticleAdd extends React.Component{
    constructor(props){
        super(props);
    }

    render(){

        const { csrfToken, article } = this.props;

        return(
            <div>
                <form action="/admin/article/save/" method="post">
                    <input type="hidden" name="_csrf" value={csrfToken}/>
                    <input type="checkbox" name="status" value={article.status} checked={article.status} />Status<br/>
                    Title: <input type="text" name="title" value={article.title}/><br/>
                    Slug: <input type="text" name="slug" value={article.slug}/><br/>
                    Content: <input type="text" name="content" value={article.content}/><br/>
                    Description: <input type="text" name="description" value={article.description}/><br/>
                    Tags: <input type="text" name="tags" value={article.tags}/><br/>
                    {
                        this.renderUpdate.call(this)
                    }
                </form>
                {
                    this.renderRemove.call(this)
                }
            </div>
        );
    }

    renderUpdate(){
        const { article } = this.props;

        if(article._id){
            return(
                <div>
                    Author: {article.author.username}<br/>
                    <input type="hidden" name="author" value={article.author._id.toString()}/>
                    <input type="submit" value="Update"/>
                </div>
            );
        }
        return(<input type="submit" value="Submit"/>);
    }

    renderRemove(){
        const { csrfToken, article } = this.props;

        if(article._id){
            return(
                <form action="/admin/article/remove/" method="post">
                    <input type="hidden" name="_csrf" value={csrfToken}/>
                    <input type="hidden" name="_id" value={article._id.toString()}/>
                    <input type="submit" value="Remove"/>
                </form>
            );
        }
        return null;
    }
}

module.exports=AdminArticleAdd;