use warp::{Rejection, Reply};

pub async fn health() -> Result<impl Reply, Rejection> {
    Ok(warp::reply::json(&true))
}
