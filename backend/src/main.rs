mod api;
mod database;
mod models;
mod routes;

use dotenvy::from_filename;
use std::env;

#[tokio::main]
async fn main() {
    // Load environment variables
    from_filename(".env.local").ok();

    let pool = database::create_database().await;
    let api = routes::routes(pool);

    let port: u16 = env::var("PORT")
        .expect("Expected PORT to be defined in environment.")
        .parse()
        .expect("PORT is not a number!");

    println!("Server started at http://127.0.0.1:{port}");
    warp::serve(api).run(([127, 0, 0, 1], port)).await;
}
