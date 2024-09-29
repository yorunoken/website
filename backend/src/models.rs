use libsql::Row;
use serde::{Deserialize, Serialize};

// These are structures necessary to deserialize in `api`

#[derive(Deserialize, Serialize)]
pub struct PostComment {
    #[serde(rename = "discordId")]
    pub discord_id: String,
    pub username: String,
    pub text: String,
}

#[derive(Deserialize, Serialize)]
pub struct LikeComment {
    #[serde(rename = "discordId")]
    pub discord_id: String,
}

#[derive(Deserialize, Serialize)]
pub struct LikeBlogPost {
    #[serde(rename = "discordId")]
    pub discord_id: String,
}

// #[derive(Deserialize, Serialize)]
// pub struct PostReply {
//     #[serde(rename = "parentCommentId")]
//     pub parent_comment_id: u64,
//     #[serde(rename = "discordId")]
//     pub discord_id: String,
//     pub username: String,
//     pub text: String,
// }

// These are needed for database Serializations

#[derive(Deserialize, Serialize, Debug)]
pub struct Comment {
    pub id: u64,
    pub blog_post_id: String,
    pub discord_id: String,
    pub username: String,
    pub text: String,
    pub likes: u64,
    pub created_at: String,
    pub likers: Vec<String>,
}

#[derive(Deserialize, Serialize, Debug)]
pub struct BlogPost {
    pub id: String,
    pub likes: u64,
    pub likers: Vec<String>,
}

// #[derive(Deserialize, Serialize)]
// pub struct Reply {
//     pub id: u64,
//     pub parent_comment_id: u64,
//     pub discord_id: String,
//     pub username: String,
//     pub text: String,
//     pub likes: u64,
//     pub created_at: String,
// }

// Defining traits

pub trait CommentDbSchema {
    fn from_row(row: &Row) -> Self;
}

pub trait BlogPostDbSchema {
    fn from_row(row: &Row) -> Self;
}

// pub trait ReplyDbSchema {
//     fn from_row(row: &Row) -> Self;
// }

// Implement traits

impl CommentDbSchema for Comment {
    fn from_row(row: &Row) -> Self {
        Self {
            id: row.get(0).unwrap_or(0),
            blog_post_id: row.get(1).unwrap_or(String::new()),
            discord_id: row.get(2).unwrap_or(String::new()),
            username: row.get(3).unwrap_or(String::new()),
            text: row.get(4).unwrap_or(String::new()),
            likes: 0,
            created_at: row.get(5).unwrap_or(String::new()),
            likers: Vec::new(),
        }
    }
}

impl BlogPostDbSchema for BlogPost {
    fn from_row(row: &Row) -> Self {
        Self {
            id: row.get(0).unwrap_or(String::new()),
            likes: 0,
            likers: Vec::new(),
        }
    }
}

// impl ReplyDbSchema for Reply {
//     fn from_row(row: &Row) -> Self {
//         Self {
//             id: row.get(0).unwrap_or(0),
//             parent_comment_id: row.get(1).unwrap_or(0),
//             discord_id: row.get(2).unwrap_or(String::new()),
//             username: row.get(3).unwrap_or(String::new()),
//             text: row.get(4).unwrap_or(String::new()),
//             likes: row.get(5).unwrap_or(0),
//             created_at: row.get(6).unwrap_or(String::new()),
//         }
//     }
// }
