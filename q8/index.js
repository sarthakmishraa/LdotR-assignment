import express from "express";
import cors from "cors";

const app = express();
const PORT = process.env.PORT | 3000;

app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cors());

let blogs = [
    {
        id: 1,
        title: "First blog",
        description: "This is the first blog"
    },
    {
        id: 2,
        title: "Second blog",
        description: "This is the second blog"
    }
];

// blog backend home
app.get("/", (req, res) => {
    res.status(200).send("<h1>Visit /blogs to perform read all/one blog(s), add a blog, udpate a blog, delete a blog</h1>");
});

// read all blogs
app.get("/blogs", (req, res) => {
    res.status(200).send(blogs);
});

// read one blog
app.get("/blogs/:id", (req, res) => {
    const blogId = parseInt(req.params.id);

    const blog = blogs.find((blog) => blog.id === blogId);

    if(!blog) {
        return res.status(404).json({ message: `404: Blog with id: ${ blogId } not found` })
    }

    res.status(200).send(blog);
});

// create a new blog
app.post("/blogs", (req, res) => {

    const newTitle = req.body.title;
    const newDescription = req.body.description;

    if(!newTitle) {
        return res.status(404).json({ message: "Please add the title" });
    }

    if(!newDescription) {
        return res.status(404).json({ message: "Please add the description" });
    }

    const newBlog = {
        id: blogs.length + 1,
        title: newTitle,
        description: newDescription
    }

    blogs = [...blogs, newBlog];

    res.status(200).send(blogs);
});

// update a blog
app.put("/blogs/:id", (req, res) => {
    const blogId = parseInt(req.params.id);
    const updatedTitle = req.body.title;
    const updatedDescription = req.body.description;

    if(!updatedTitle) {
        return res.status(404).json({ message: "Please add the updated title" });
    }

    if(!updatedDescription) {
        return res.status(404).json({ message: "Please add the updated description" });
    }

    const blog = blogs.find((blog) => blog.id === blogId);

    if(!blog) {
        return res.status(404).json({ message: `404: Blog with id: ${ blogId } not found` })
    }

    blog.title = updatedTitle;
    blog.description = updatedDescription;

    res.status(200).send(blogs);
});

// delete a blog
app.delete("/blogs/:id", (req, res) => {
    const blogId = parseInt(req.params.id);

    const blog = blogs.find((blog) => blog.id === blogId);

    if(!blog) {
        return res.status(404).json({ message: `404: Blog with id: ${ blogId } not found` })
    }

    blogs = blogs.filter((blog) => blog.id !== blogId);

    res.status(200).send(blogs);
});

app.listen(PORT, () => {
    console.log(`Server is running on port: ${ PORT }`);
});