export interface BlogCategory {
    name: string;
    folder: string;
    icon: string;
    posts: Post[]
}

export interface Post {
    name: string;
    file: string;
    date: string; // DD-MM-YYYYY
}