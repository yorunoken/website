use libsql::{params, Connection};
use warp::{http::StatusCode, Rejection, Reply};

pub async fn comment(
    discord_id: String,
    comment_id: u64,
    db: Connection,
) -> Result<impl Reply, Rejection> {
    // Reset db to not make it expire.
    db.reset().await;

    let tx = match db.transaction().await {
        Ok(tx) => tx,
        Err(e) => {
            eprintln!("Failed to start transaction: {}", e);
            return Ok(warp::reply::with_status(
                warp::reply::json(&format!(
                    "{{\"message\": \"Failed to start transaction: {}\"}}",
                    e
                )),
                StatusCode::INTERNAL_SERVER_ERROR,
            ));
        }
    };

    let delete_likes_query = "DELETE FROM comment_likes WHERE comment_id = ?";
    if let Err(e) = tx.query(delete_likes_query, params![comment_id]).await {
        eprintln!("Failed to delete comment likes: {}", e);
        return Ok(warp::reply::with_status(
            warp::reply::json(&format!(
                "{{\"message\": \"Failed to delete comment likes: {}\"}}",
                e
            )),
            StatusCode::INTERNAL_SERVER_ERROR,
        ));
    }

    let delete_comment_query = "DELETE FROM comments WHERE id = ? AND discord_id = ?";
    if let Err(e) = tx
        .query(delete_comment_query, params![comment_id, discord_id])
        .await
    {
        eprintln!("Failed to delete comment likes: {}", e);
        return Ok(warp::reply::with_status(
            warp::reply::json(&format!(
                "{{\"message\": \"Failed to delete comment likes: {}\"}}",
                e
            )),
            StatusCode::INTERNAL_SERVER_ERROR,
        ));
    }

    match tx.commit().await {
        Ok(_) => Ok(warp::reply::with_status(
            warp::reply::json(
                &"{{\"message\": \"Successfully deleted comment and associated likes!\"}}",
            ),
            StatusCode::OK,
        )),
        Err(e) => {
            eprintln!("Failed to commit transaction: {}", e);
            Ok(warp::reply::with_status(
                warp::reply::json(&format!(
                    "{{\"message\": \"Failed to commit transaction: {}\"}}",
                    e
                )),
                StatusCode::INTERNAL_SERVER_ERROR,
            ))
        }
    }
}

pub async fn unlike_comment(
    discord_id: String,
    comment_id: u64,
    db: Connection,
) -> Result<impl Reply, Rejection> {
    // Reset db to not make it expire.
    db.reset().await;

    let query = "DELETE FROM comment_likes WHERE comment_id = ? AND discord_id = ?";

    match db.query(query, params![comment_id, discord_id]).await {
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
