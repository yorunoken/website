use crate::{
    api::{delete, get, post},
    database::with_db,
};
use libsql::Connection;
use warp::{body::json, Filter};

pub fn routes(
    db: Connection,
) -> impl Filter<Extract = impl warp::Reply, Error = warp::Rejection> + Clone {
    // GET routes
    let get_post = warp::path!("api" / "posts" / String)
        .and(warp::get())
        .and(with_db(db.clone()))
        .and_then(get::blog_post);

    let get_comments = warp::path!("api" / "posts" / String / "comments")
        .and(warp::get())
        .and(with_db(db.clone()))
        .and_then(get::comments);

    let get_comment = warp::path!("api" / "comment" / String)
        .and(warp::get())
        .and(with_db(db.clone()))
        .and_then(get::comment);

    let get_health = warp::path!("api" / "health")
        .and(warp::get())
        .and_then(get::health);

    // POST routes

    let post_comment = warp::path!("api" / "posts" / String / "comments")
        .and(warp::post())
        .and(json())
        .and(with_db(db.clone()))
        .and_then(post::comment);

    let like_blog_post = warp::path!("api" / "posts" / String / "like")
        .and(warp::post())
        .and(json())
        .and(with_db(db.clone()))
        .and_then(post::like_blog_post);

    let like_comment = warp::path!("api" / "comment" / u64 / "like")
        .and(warp::post())
        .and(json())
        .and(with_db(db.clone()))
        .and_then(post::like_comment);

    // DELETE routes

    let delete_comment = warp::path!("api" / "user" / String / "comment" / u64)
        .and(warp::delete())
        .and(with_db(db.clone()))
        .and_then(delete::comment);

    let unlike_comment = warp::path!("api" / "user" / String / "comment" / u64 / "unlike")
        .and(warp::delete())
        .and(with_db(db.clone()))
        .and_then(delete::unlike_comment);

    let unlike_blog_post = warp::path!("api" / "user" / String / "posts" / String / "unlike")
        .and(warp::delete())
        .and(with_db(db.clone()))
        .and_then(delete::unlike_blog_post);

    // GET
    get_health
        .or(get_post)
        .or(get_comments)
        .or(get_comment)
        // POST
        .or(post_comment)
        .or(like_comment)
        .or(like_blog_post)
        // DELETE
        .or(delete_comment)
        .or(unlike_comment)
        .or(unlike_blog_post)
}
