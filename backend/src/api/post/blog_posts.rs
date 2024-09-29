use crate::models::LikeBlogPost;
use libsql::{params, Connection};
use warp::{http::StatusCode, Rejection, Reply};

pub async fn like_blog_post(
    blog_post_id: String,
    request: LikeBlogPost,
    db: Connection,
) -> Result<impl Reply, Rejection> {
    // Reset db to not make it expire.
    db.reset().await;

    let LikeBlogPost { discord_id } = request;

    let query = "INSERT OR IGNORE INTO blog_post_likes (blog_post_id, discord_id)
                    VALUES (?, ?)";

    match db.query(query, params![blog_post_id, discord_id]).await {
        Ok(_) => Ok(warp::reply::with_status(
            warp::reply::json(&"{{\"message\": \"Successfully liked blog post!\"}}"),
            StatusCode::OK,
        )),
        Err(e) => {
            eprintln!("Failed to query database: {}", e);
            return Ok(warp::reply::with_status(
                warp::reply::json(&format!(
                    "{{\"message\": \"Failed to query database: {}\"}}",
                    e
                )),
                StatusCode::INTERNAL_SERVER_ERROR,
            ));
        }
    }
}
