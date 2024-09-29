use crate::models::{LikeComment, PostComment};
use libsql::{params, Connection};
use warp::{http::StatusCode, Rejection, Reply};

pub async fn comment(
    blog_post_id: String,
    request: PostComment,
    db: Connection,
) -> Result<impl Reply, Rejection> {
    // Reset db to not make it expire.
    db.reset().await;

    let PostComment {
        discord_id,
        username,
        text,
    } = request;

    let query = "INSERT OR IGNORE INTO comments (blog_post_id, discord_id, username, text)
                    VALUES (?, ?, ?, ?)";

    match db
        .query(query, params![blog_post_id, discord_id, username, text])
        .await
    {
        Ok(_) => Ok(warp::reply::with_status(
            warp::reply::json(&"{{\"message\": \"Successfully inserted comment!\"}}"),
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

pub async fn like_comment(
    comment_id: u64,
    request: LikeComment,
    db: Connection,
) -> Result<impl Reply, Rejection> {
    // Reset db to not make it expire.
    db.reset().await;

    let LikeComment { discord_id } = request;

    let query = "INSERT OR IGNORE INTO comment_likes (comment_id, discord_id)
                    VALUES (?, ?)";

    match db.query(query, params![comment_id, discord_id]).await {
        Ok(_) => Ok(warp::reply::with_status(
            warp::reply::json(&"{{\"message\": \"Successfully liked comment!\"}}"),
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
