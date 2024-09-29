use crate::models::{BlogPost, BlogPostDbSchema};
use libsql::{params, Connection};
use warp::{http::StatusCode, Rejection, Reply};

pub async fn blog_post(blog_post_id: String, db: Connection) -> Result<impl Reply, Rejection> {
    // Reset db to not make it expire.
    db.reset().await;

    let mut rows = match db
        .query(
            "SELECT c.*, GROUP_CONCAT(cl.discord_id) as likers
                    FROM blog_posts c
                    LEFT JOIN blog_post_likes cl ON c.id = cl.blog_post_id
                    WHERE c.id = ?
                    GROUP BY c.id",
            params![blog_post_id],
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
            let mut comment: BlogPost = BlogPostDbSchema::from_row(&row);
            if let Ok(Some(likers_str)) = row.get::<Option<String>>(1) {
                comment.likers = likers_str.split(',').map(String::from).collect();
            }
            comment.likes = comment.likers.len() as u64;

            Ok(warp::reply::with_status(
                warp::reply::json(&comment),
                StatusCode::OK,
            ))
        }
        Ok(None) => Ok(warp::reply::with_status(
            warp::reply::json(&format!("{{\"error\": \"Blog post not found\"}}")),
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
