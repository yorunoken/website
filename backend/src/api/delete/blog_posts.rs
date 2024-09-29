use libsql::{params, Connection};
use warp::{http::StatusCode, Rejection, Reply};

pub async fn unlike_blog_post(
    discord_id: String,
    blog_post_id: String,
    db: Connection,
) -> Result<impl Reply, Rejection> {
    // Reset db to not make it expire.
    db.reset().await;

    let query = "DELETE FROM blog_post_likes WHERE blog_post_id = ? AND discord_id = ?";

    match db.query(query, params![blog_post_id, discord_id]).await {
        Ok(_) => Ok(warp::reply::with_status(
            warp::reply::json(&"{{\"message\": \"Successfully unliked comment!\"}}"),
            StatusCode::OK,
        )),
        Err(e) => {
            eprintln!("Failed to unlike comment: {}", e);
            return Ok(warp::reply::with_status(
                warp::reply::json(&format!(
                    "{{\"message\": \"Failed to unlike comment: {}\"}}",
                    e
                )),
                StatusCode::INTERNAL_SERVER_ERROR,
            ));
        }
    }
}
