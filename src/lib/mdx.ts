import fs from 'fs';
import matter from 'gray-matter';
import path from 'path';

export async function getAllFilesFrontMatter<T>(directory: string) {
    const files = fs.readdirSync(directory);

    return files.map((filename) => {
        const filePath = path.join(directory, filename);
        const fileContent = fs.readFileSync(filePath, 'utf-8');
        const { data } = matter(fileContent);

        return {
            ...data,
            slug: filename.replace(/\.mdx?$/, ''),
        };
    });
}
