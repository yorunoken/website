use crate::models::{Comment, CommentDbSchema};
use libsql::{params, Connection};
use warp::{http::StatusCode, Rejection, Reply};

pub async fn comments(blog_post_id: String, db: Connection) -> Result<impl Reply, Rejection> {
    // Reset db to not make it expire.
    db.reset().await;

    let mut rows = match db
        .query(
            "SELECT c.*, GROUP_CONCAT(cl.discord_id) as likers
                        FROM comments c
                        LEFT JOIN comment_likes cl ON c.id = cl.comment_id
                        WHERE c.blog_post_id = ?
                        GROUP BY c.id
                        ORDER BY c.created_at DESC",
            params![blog_post_id],
        )
        .await
    {
        Ok(rows) => rows,
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
    };

    let mut comments: Vec<Comment> = Vec::new();

    loop {
        match rows.next().await {
            Ok(Some(row)) => {
                let mut comment: Comment = CommentDbSchema::from_row(&row);
                if let Ok(Some(likers_str)) = row.get::<Option<String>>(6) {
                    comment.likers = likers_str.split(',').map(String::from).collect();
                }
                comment.likes = comment.likers.len() as u64;
                comments.push(comment);
            }
            Ok(None) => break,
            _ => {
                return Ok(warp::reply::with_status(
                    warp::reply::json(&format!("{{\"error\": \"Failed to get row.\"}}",)),
                    StatusCode::INTERNAL_SERVER_ERROR,
                ));
            }
        }
    }

    Ok(warp::reply::with_status(
        warp::reply::json(&comments),
        StatusCode::OK,
    ))
}

pub async fn comment(comment_id: String, db: Connection) -> Result<impl Reply, Rejection> {
    // Reset db to not make it expire.
    db.reset().await;

    let mut rows = match db
        .query(
            "SELECT c.*, GROUP_CONCAT(cl.discord_id) as likers
                    FROM comments c
                    LEFT JOIN comment_likes cl ON c.id = cl.comment_id
                    WHERE c.id = ?
                    GROUP BY c.id",
            params![comment_id],
        )
        .await
    {
        Ok(rows) => rows,
        Err(e) => {
            eprintln!("Failed to query database: {}", e);
            return Ok(warp::reply::with_status(
                warp::reply::json(&format!(
                    "{{\"error\": \"Failed to query database: {}\"}}",
                    e
                )),
                StatusCode::INTERNAL_SERVER_ERROR,
            ));
        }
    };

    let row = rows.next().await;
    match row {
        Ok(Some(row)) => {
            let mut comment: Comment = CommentDbSchema::from_row(&row);
            if let Ok(Some(likers_str)) = row.get::<Option<String>>(6) {
                comment.likers = likers_str.split(',').map(String::from).collect();
            }
            comment.likes = comment.likers.len() as u64;

            Ok(warp::reply::with_status(
                warp::reply::json(&comment),
                StatusCode::OK,
            ))
        }
        Ok(None) => Ok(warp::reply::with_status(
            warp::reply::json(&format!("{{\"error\": \"Comment not found\"}}")),
            StatusCode::NOT_FOUND,
        )),
        _ => {
            return Ok(warp::reply::with_status(
                warp::reply::json(&format!("{{\"error\": \"Failed to get row.\"}}",)),
                StatusCode::INTERNAL_SERVER_ERROR,
            ));
        }
    }
}
